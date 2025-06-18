import json
import os
import time
import webbrowser
from datetime import datetime, timedelta

import requests


def load_config():
    with open("automated_imgur_upload/config/config.json", "r") as file:
        return json.load(file)


def load_tokens():
    token_file = "automated_imgur_upload/config/tokens.json"
    if os.path.exists(token_file):
        with open(token_file, "r") as file:
            return json.load(file)
    return None


def save_tokens(tokens):
    token_file = "automated_imgur_upload/config/tokens.json"
    os.makedirs(os.path.dirname(token_file), exist_ok=True)

    tokens["expires_at"] = (
        datetime.now() + timedelta(seconds=tokens["expires_in"])
    ).isoformat()

    with open(token_file, "w") as file:
        json.dump(tokens, file, indent=2)


def is_token_valid(tokens):
    if not tokens or "expires_at" not in tokens:
        return False

    expires_at = datetime.fromisoformat(tokens["expires_at"])
    # Consider token expired 5 minutes before actual expiration
    return datetime.now() < expires_at - timedelta(minutes=5)


def refresh_access_token(client_id, client_secret, refresh_token):
    token_url = "https://api.imgur.com/oauth2/token"
    data = {
        "refresh_token": refresh_token,
        "client_id": client_id,
        "client_secret": client_secret,
        "grant_type": "refresh_token",
    }

    response = requests.post(token_url, data=data)
    if response.status_code == 200:
        return response.json()
    return None


def get_authorization_url(client_id):
    return f"https://api.imgur.com/oauth2/authorize?client_id={client_id}&response_type=pin&state=APPLICATION_STATE"


def get_tokens(client_id, client_secret, pin):
    token_url = "https://api.imgur.com/oauth2/token"
    data = {
        "client_id": client_id,
        "client_secret": client_secret,
        "grant_type": "pin",
        "pin": pin,
    }
    response = requests.post(token_url, data=data)
    return response.json()


def get_valid_access_token(client_id, client_secret):
    stored_tokens = load_tokens()

    if stored_tokens and is_token_valid(stored_tokens):
        print("✅ Using existing valid access token")
        return stored_tokens["access_token"]

    if stored_tokens and "refresh_token" in stored_tokens:
        print("🔄 Refreshing access token...")
        new_tokens = refresh_access_token(
            client_id, client_secret, stored_tokens["refresh_token"]
        )

        if new_tokens and new_tokens.get("success", True):
            print("✅ Successfully refreshed access token")
            save_tokens(new_tokens)
            return new_tokens["access_token"]
        else:
            print("❌ Failed to refresh token, need new authorization")

    print("🔐 Need fresh authorization...")
    authorization_url = get_authorization_url(client_id)
    print(f"Please go to this URL and authorize access: {authorization_url}")
    webbrowser.open(authorization_url)

    pin = input("Enter the pin obtained from the authorization URL: ")
    tokens = get_tokens(client_id, client_secret, pin)

    if tokens.get("success", True):
        print("✅ Successfully obtained new tokens")
        save_tokens(tokens)
        return tokens["access_token"]
    else:
        raise Exception(f"Failed to get tokens: {tokens}")


def upload_image(image_key, image_repository, access_token, album_id):
    image_info = image_repository[image_key]
    relative_subpath = image_info["path"]
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.abspath(os.path.join(script_dir, "..", "..", ".."))
    image_path = os.path.join(project_root, relative_subpath)

    if not os.path.isfile(image_path):
        print(f"❌ File not found at {image_path}")
        return {"success": False, "error": f"File not found: {image_path}"}

    title = image_info["title"]
    description = image_info["description"] or title
    url = "https://api.imgur.com/3/upload"
    headers = {"Authorization": f"Bearer {access_token}"}

    with open(image_path, "rb") as image_file:
        files = {"image": image_file}
        data = {"album": album_id, "title": title, "description": description}
        response = requests.post(url, headers=headers, files=files, data=data)

    try:
        return response.json()
    except ValueError:
        return {
            "success": False,
            "status_code": response.status_code,
            "raw_text": response.text,
        }


def upload_images_in_order(image_order, image_repository, access_token, album_id):
    for image_key in image_order:
        upload_response = upload_image(
            image_key, image_repository, access_token, album_id
        )

        if upload_response.get("success", False):
            print(f"✅ Uploaded {image_key}")
        else:
            print(f"❌ Failed {image_key}: {upload_response}")

        time.sleep(0.15)


def delete_image(deletehash, access_token):
    url = f"https://api.imgur.com/3/image/{deletehash}"
    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.delete(url, headers=headers)
    return response.json()


def delete_all_images_from_album(album_id, access_token):
    url = f"https://api.imgur.com/3/album/{album_id}/images"
    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        print(f"❌ Failed to get album images: {response.status_code}")
        return

    images = response.json()["data"]

    if images:
        print(f"🗑️  Deleting {len(images)} images from album...")
        for image in images:
            deletehash = image["deletehash"]
            delete_image(deletehash, access_token)
    else:
        print("ℹ️ No images to delete from album")


def print_credit_limit(access_token):
    url = "https://api.imgur.com/3/credits"
    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        print(f"❌ Failed to get credits: {response.status_code}")
        return

    credits = response.json()["data"]
    print(f"User Limit: {credits['UserLimit']}")
    print(f"User Remaining: {credits['UserRemaining']}")
    print(f"User Reset: {credits['UserReset']}")
    print(f"Client Limit: {credits['ClientLimit']}")
    print(f"Client Remaining: {credits['ClientRemaining']}")


def imgur():
    config = load_config()
    client_id = config["client_id"]
    client_secret = config["client_secret"]
    album_id = "YoxqS7A"

    access_token = get_valid_access_token(client_id, client_secret)

    image_order = config["image_order"]

    with open("automated_imgur_upload/config/image_info.json", "r") as file:
        image_info = json.load(file)

    delete_all_images_from_album(album_id, access_token)
    print("✅ Finished Deletion")

    upload_images_in_order(image_order, image_info, access_token, album_id)
    print("✅ Finished Uploading")

    print()
    print("🎉 Success!!")
    print()
    print_credit_limit(access_token)
    print()


if __name__ == "__main__":
    imgur()
