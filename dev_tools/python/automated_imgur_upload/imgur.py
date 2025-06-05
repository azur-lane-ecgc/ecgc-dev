import json
import os
import webbrowser

import requests
from gsheets2img import main as gsheets2img


def load_config():
    with open("automated_imgur_upload/config/config.json", "r") as file:
        return json.load(file)


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


def delete_image(deletehash, access_token):
    url = f"https://api.imgur.com/3/image/{deletehash}"
    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.delete(url, headers=headers)
    return response.json()


def delete_all_images_from_album(album_id, access_token):
    url = f"https://api.imgur.com/3/album/{album_id}/images"
    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.get(url, headers=headers)
    images = response.json()["data"]

    if images:
        for image in images:
            deletehash = image["deletehash"]
            delete_image(deletehash, access_token)


def print_credit_limit(access_token):
    url = "https://api.imgur.com/3/credits"
    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.get(url, headers=headers)
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

    authorization_url = get_authorization_url(client_id)
    print(f"Please go to this URL and authorize access: {authorization_url}")
    webbrowser.open(authorization_url)

    pin = input("Enter the pin obtained from the authorization URL: ")
    tokens = get_tokens(client_id, client_secret, pin)

    access_token = tokens["access_token"]
    refresh_token = tokens["refresh_token"]
    album_id = "YoxqS7A"

    image_order = config["image_order"]

    with open("automated_imgur_upload/config/image_info.json", "r") as file:
        image_info = json.load(file)

    delete_all_images_from_album(album_id, access_token)
    print("Finished Deletion")

    upload_images_in_order(image_order, image_info, access_token, album_id)
    print("Finished Uploading")

    print()
    print("Success!!")
    print()
    print_credit_limit(access_token)
    print()


if __name__ == "__main__":
    gsheets2img()
    imgur()
