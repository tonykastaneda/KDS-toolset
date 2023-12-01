import requests
import json

# Define the base URL
base_url = 'https://api.stage.affinitygateway.com/designs'

# Define headers
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 16746eca-dff1-4c32-aaf8-8635d86dc664'
}

# Define query parameters
params = {
    'page_size': 100,  # Maximum number of results to return
    'page': 1  # 1-based page number of result set
}

# Send the GET request
response = requests.get(base_url, headers=headers, params=params)

# Check the status code
if response.status_code == 200:
    # Parse the response
    designs = json.loads(response.text)
    for design in designs:
        print(design)
elif response.status_code == 400:
    print("Bad input parameter")
else:
    print(f"Error: {response.status_code}")