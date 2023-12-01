import os
import base64
import requests
import json
import random
import string
from datetime import datetime
from tqdm import tqdm
from colorama import Fore, Style

def get_client_id(image_name):
    response = requests.get('https://api.affinitygateway.com/clients')
    clients = response.json()
    for client in clients:
        if client['name'] == image_name:
            return client['id']
    return None

def create_upi(client_id):
    random_str = ''.join(random.choices(string.ascii_uppercase + string.digits, k=9))
    date_str = datetime.now().strftime('%m%d%y')
    return f"{client_id}-{random_str}-{date_str}"

def send_image(image_path, product_category, description, is_expedited):
    image_name = os.path.splitext(os.path.basename(image_path))[0]
    root_folder_name = os.path.basename(os.path.dirname(image_path))
    with open(image_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    
    data = {
        "title": f"{image_name} - {root_folder_name}",
        "internal_code": f"{image_name}_001",
        "product_category_id": 8 if product_category.lower() == 'jersey' else 11,
        "image": encoded_string,
        "image_filename": f"{image_name}.png",
        "description": description,
        "primary_client_id": get_client_id(image_name),
        "is_expedited": is_expedited.lower() == 'true',
        "upi": [create_upi(get_client_id(image_name))]
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 16746eca-dff1-4c32-aaf8-8635d86dc664'
    }

    response = requests.post('https://api.stage.affinitygateway.com/design', headers=headers, data=json.dumps(data))
    return response

def main():
    image_folder = input("Enter the path to the image folder: ")
    product_category = input("Enter the product category (Jersey/Shorts): ")
    description = input("Enter the description: ")
    is_expedited = input("Is expedited (True/False): ")

    files = [f for f in os.listdir(image_folder) if f.endswith('.png')]

    with tqdm(total=len(files), ncols=70) as pbar:
        for file in files:
            image_path = os.path.join(image_folder, file)
            response = send_image(image_path, product_category, description, is_expedited)
            if response.status_code == 200:
                print(Fore.GREEN + '✔ Upload Complete' + Style.RESET_ALL)
            else:
                print(Fore.RED + '✘ Upload Failed' + Style.RESET_ALL)
                print('Failed file:', image_path)
                print('Status code:', response.status_code)
            pbar.update(1)

if __name__ == "__main__":
    main()