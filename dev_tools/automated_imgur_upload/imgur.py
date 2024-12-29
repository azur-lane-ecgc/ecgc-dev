import json
import webbrowser
import requests

def load_config():
    with open('dev_tools/automated_imgur_upload/config/config.json', 'r') as file:
        return json.load(file)

def get_authorization_url(client_id):
    return f"https://api.imgur.com/oauth2/authorize?client_id={client_id}&response_type=pin&state=APPLICATION_STATE"

def get_tokens(client_id, client_secret, pin):
    token_url = "https://api.imgur.com/oauth2/token"
    data = {
        'client_id': client_id,
        'client_secret': client_secret,
        'grant_type': 'pin',
        'pin': pin
    }
    response = requests.post(token_url, data=data)
    return response.json()

def upload_image(image_key, image_repository, access_token, album_id):
    image_info = image_repository[image_key]
    image_path = image_info['path']
    title = image_info['title']
    description = image_info['title'] if image_info['description'] == "" else image_info['description']
    
    url = 'https://api.imgur.com/3/upload'
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    with open(image_path, 'rb') as image_file:
        files = {
            'image': image_file
        }
        data = {
            'album': album_id,
            'title': title,
            'description': description
        }
        response = requests.post(url, headers=headers, files=files, data=data)
        return response.json()

def upload_images_in_order(image_order, image_repository, access_token, album_id):
    for image_key in image_order:
        upload_response = upload_image(image_key, image_repository, access_token, album_id)
        print(f"Uploaded {image_key}: {upload_response['success']}")


def delete_image(deletehash, access_token):
    url = f'https://api.imgur.com/3/image/{deletehash}'
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    response = requests.delete(url, headers=headers)
    return response.json()

def delete_all_images_from_album(album_id, access_token):
    url = f'https://api.imgur.com/3/album/{album_id}/images'
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    response = requests.get(url, headers=headers)
    images = response.json()['data']

    for image in images:
        deletehash = image['deletehash']
        delete_image(deletehash, access_token)

def print_credit_limit(access_token):
    url = "https://api.imgur.com/3/credits"
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    response = requests.get(url, headers=headers)
    credits = response.json()['data']
    print(f"User Limit: {credits['UserLimit']}")
    print(f"User Remaining: {credits['UserRemaining']}")
    print(f"User Reset: {credits['UserReset']}")
    print(f"Client Limit: {credits['ClientLimit']}")
    print(f"Client Remaining: {credits['ClientRemaining']}")





if __name__ == "__main__":
    config = load_config()
    client_id = config['client_id']
    client_secret = config['client_secret']

    authorization_url = get_authorization_url(client_id)
    print(f"Please go to this URL and authorize access: {authorization_url}")
    webbrowser.open(authorization_url)

    pin = input("Enter the pin obtained from the authorization URL: ")
    tokens = get_tokens(client_id, client_secret, pin)

    access_token = tokens['access_token']
    refresh_token = tokens['refresh_token']
    album_id = "YoxqS7A"

    image_order = config['image_order']

    with open('dev_tools/automated_imgur_upload/config/image_info.json', 'r') as file:
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



