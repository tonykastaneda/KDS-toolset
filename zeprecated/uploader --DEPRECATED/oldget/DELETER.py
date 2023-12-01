import requests
import json

# Define the base URL
base_url = 'https://stage.affinity-gateway.com/designs/'

# Define headers
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 16746eca-dff1-4c32-aaf8-8635d86dc664'
}

# Open the file in read mode
with open('IDLIST.txt', 'r') as f:
    for line in f:
        # Parse the line as JSON
        design = json.loads(line)
        
        # Extract the design ID
        design_id = design['id']
        
        # Send the DELETE request
        response = requests.delete(base_url + str(design_id), headers=headers)
        
        # Check the status code
        if response.status_code == 200:
            print(f'Design {design_id} deleted successfully')
        elif response.status_code in [401, 403, 404]:
            print(f'Failed to delete design {design_id}. Status code: {response.status_code}')
        else:
            print(f'Error: {response.status_code}')