#!/usr/bin/env python3

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
    clients = [
  {"id":1082,"name":"alpha Kappa Delta Phi","short_name":"\u03b1\u039a\u0394\u03a6"},
    {"id":1081,"name":"Delta Kappa Epsilon","short_name":"\u0394\u039a\u0395"},
    {"id":10609,"name":"Lambda Phi Epsilon","short_name":"\u039b\u03a6\u0395"},
    {"id":1044,"name":"Sigma Alpha Epsilon","short_name":"\u03a3\u0391\u0395"},
    {"id":1071,"name":"Alpha Kappa Lambda","short_name":"\u0391\u039a\u039b"},
    {"id":1010,"name":"Alpha Epsilon Pi","short_name":"\u0391\u0395\u03a0"},
    {"id":1011,"name":"Alpha Gamma Delta","short_name":"\u0391\u0393\u0394"},
    {"id":1061,"name":"Kappa Alpha Theta","short_name":"\u039a\u0391\u0398"},
    {"id":1064,"name":"Kappa Kappa Gamma","short_name":"\u039a\u039a\u0393"},
    {"id":1049,"name":"Sigma Phi Epsilon","short_name":"\u03a3\u03a6\u0395"},
    {"id":1052,"name":"Tau Kappa Epsilon","short_name":"\u03a4\u039a\u0395"},
    {"id":1059,"name":"Lambda Chi Alpha","short_name":"\u039b\u03a7\u0391"},
    {"id":1057,"name":"Phi Kappa Sigma","short_name":"\u03a6\u039a\u03a3"},
    {"id":1039,"name":"Phi Kappa Theta","short_name":"\u03a6\u039a\u0398"},
    {"id":1085,"name":"Phi Sigma Kappa","short_name":"\u03a6\u03a3\u039a"},
    {"id":1012,"name":"Alpha Omicron Pi","short_name":"\u0391\u039f\u03a0"},
    {"id":1025,"name":"Delta Phi Epsilon","short_name":"\u0394\u03a6\u0395"},
    {"id":1016,"name":"Alpha Tau Omega","short_name":"\u0391\u03a4\u03a9"},
    {"id":1026,"name":"Delta Sigma Phi","short_name":"\u0394\u03a3\u03a6"},
    {"id":1027,"name":"Delta Tau Delta","short_name":"\u0394\u03a4\u0394"},
    {"id":1063,"name":"Kappa Delta Rho","short_name":"\u039a\u0394\u03a1"},
    {"id":1036,"name":"Phi Gamma Delta","short_name":"FIJI"},
    {"id":1042,"name":"Pi Kappa Alpha","short_name":"\u03a0\u039a\u0391"},
    {"id":1051,"name":"Sigma Tau Gamma","short_name":"\u03a3\u03a4\u0393"},
    {"id":1015,"name":"Alpha Sigma Phi","short_name":"\u0391\u03a3\u03a6"},
    {"id":1058,"name":"Alpha Gamma Rho","short_name":"\u0391\u0393\u03a1"},
    {"id":1007,"name":"Alpha Chi Omega","short_name":"\u0391\u03a7\u03a9"},
    {"id":1037,"name":"Phi Kappa Psi","short_name":"\u03a6\u039a\u03a8"},
    {"id":1038,"name":"Phi Kappa Tau","short_name":"\u03a6\u039a\u03a4"},
    {"id":1045,"name":"Sigma Alpha Mu","short_name":"\u03a3\u0391\u039c"},
    {"id":1028,"name":"Delta Upsilon","short_name":"\u0394\u03a5"},
    {"id":1008,"name":"Alpha Delta Pi","short_name":"\u0391\u0394\u03a0"},
    {"id":1030,"name":"Gamma Phi Beta","short_name":"\u0393\u03a6\u0392"},
    {"id":1070,"name":"Zeta Tau Alpha","short_name":"\u0396\u03a4\u0391"},
    {"id":1077,"name":"Pi Alpha Phi","short_name":"\u03a0\u0391\u03a6"},
    {"id":1098,"name":"Pi Kappa Phi","short_name":"\u03a0\u039a\u03a6"},
    {"id":1056,"name":"Zeta Beta Tau","short_name":"\u0396\u0392\u03a4"},
    {"id":1018,"name":"Beta Theta Pi","short_name":"\u0392\u0398\u03a0"},
    {"id":1033,"name":"Kappa Sigma","short_name":"\u039a\u03a3"},
    {"id":1032,"name":"Kappa Delta","short_name":"\u039a\u0394"},
    {"id":1046,"name":"Sigma Kappa","short_name":"\u03a3\u039a"},
    {"id":1024,"name":"Delta Gamma","short_name":"\u0394\u0393"},
    {"id":1021,"name":"Pi Beta Phi","short_name":"\u03a0\u0392\u03a6"},
    {"id":1031,"name":"Kappa Alpha Order","short_name":"\u039a\u0391"},
    {"id":1022,"name":"Delta Chi","short_name":"\u0394\u03a7"},
    {"id":1047,"name":"Sigma Chi","short_name":"\u03a3\u03a7"},
    {"id":1048,"name":"Sigma Nu","short_name":"\u03a3\u039d"},
    {"id":1053,"name":"Theta Chi","short_name":"\u0398\u03a7"},
    {"id":1013,"name":"Alpha Phi","short_name":"\u0391\u03a6"},
    {"id":1019,"name":"Chi Omega","short_name":"\u03a7\u03a9"},
    {"id":1023,"name":"Delta Delta Delta","short_name":"\u0394\u0394\u0394"},
    {"id":1020,"name":"Chi Phi","short_name":"\u03a7\u03a6"},
    {"id":1021,"name":"Chi Psi","short_name":"\u03a7\u03a8"},
    {"id":1050,"name":"Sigma Pi","short_name":"\u03a3\u03a0"},
    {"id":1089,"name":"Theta Xi","short_name":"\u0398\u039e"},
    {"id":12529,"name":"Zeta Psi","short_name":"Z\u03a8"},
    {"id":15618,"name":"Acacia","short_name":"Acacia"}
    ]
    for client in clients:
        if client['name'].lower() == image_name.lower():
            return client['id']
    return None

def create_upi(client_id):
    random_str = ''.join(random.choices(string.ascii_uppercase + string.digits, k=9))
    date_str = datetime.now().strftime('%m%d%y')
    return f"{client_id}-{random_str}-{date_str}"

def main():
    root_folder = input("Enter root folder: ")
    description = input("Enter description: ")
    product_category = input("Enter product category: ")
    is_expedited = input("Is expedited (true/false): ")

    files = []
    for root, dirs, filenames in os.walk(root_folder):
        for filename in filenames:
            files.append(os.path.join(root, filename))

    data_list = []
    for file in files:
        with open(file, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')

        image_name = os.path.splitext(os.path.basename(file))[0]
        client_id = get_client_id(image_name.split(' - ')[0])

        if client_id is None:  # Skip this file if no corresponding client ID was found
            print(f"No client ID found for {image_name}. Skipping this file.")
            continue

        root_folder_name = os.path.basename(root_folder)

        data = {
            # Your data dictionary here
        }
        data_list.append(data)

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 16746eca-dff1-4c32-aaf8-8635d86dc664'
    }

    with tqdm(total=len(data_list), ncols=70) as pbar:
        for data in data_list:
            response = requests.post('https://api.stage.affinitygateway.com/designs', headers=headers, data=json.dumps(data))

            if response.status_code == 200:
                print(Fore.GREEN + '✔ Upload Complete' + Style.RESET_ALL)
            else:
                print(Fore.RED + '✘ Upload Failed' + Style.RESET_ALL)
                print('Status code:', response.status_code)
            
            pbar.update(1)

if __name__ == "__main__":
    main()