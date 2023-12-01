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
    response_json = json.loads(response.text)
    
    # Access the 'data' part of the response
    designs = response_json['data']
    
    # Open the output file in write mode
    with open('full_output.txt', 'w') as f_full, open('readable_output.txt', 'w') as f_readable:
        for design in designs:
            # Write the full design data to the full output file
            f_full.write(json.dumps(design))
            f_full.write('\n')  # Write a newline character after each design
            
            # Write only the id and title to the readable output file
            readable_design = {"id": design["id"], "title": design["title"]}
            f_readable.write(json.dumps(readable_design))
            f_readable.write('\n')  # Write a newline character after each design
elif response.status_code == 400:
    print("Bad input parameter")
else:
    print(f"Error: {response.status_code}")