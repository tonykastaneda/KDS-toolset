#!/usr/bin/env python3
import shutil
import os

# Get the directory of the script
script_dir = os.path.dirname(os.path.realpath(__file__))

# Create a new directory named "EDITABLE" if it doesn't exist
editable_dir = os.path.join(script_dir, 'EDITABLE')
os.makedirs(editable_dir, exist_ok=True)


# Now define your file_dict
file_dict = {
    'XS': [os.path.join(script_dir, 'xs.ai')],
    'S': [os.path.join(script_dir, 's.ai')],
    'M': [os.path.join(script_dir, 'm.ai')],
    'L': [os.path.join(script_dir, 'l.ai')],
    'XL': [os.path.join(script_dir, 'xl.ai')],
    '2XL': [os.path.join(script_dir, '2xl.ai')],
    '3XL': [os.path.join(script_dir, '3xl.ai')],
    '4XL': [os.path.join(script_dir, '4xl.ai')],
    '5XL': [os.path.join(script_dir, '5xl.ai')],
    '6XL': [os.path.join(script_dir, '6xl.ai')],

    'XXL': [os.path.join(script_dir, '2xl.ai')],
    'XXXL': [os.path.join(script_dir, '3xl.ai')],
    'XXXXL': [os.path.join(script_dir, '4xl.ai')],
    'XXXXXL': [os.path.join(script_dir, '5xl.ai')],
    'XXXXXXL': [os.path.join(script_dir, '6xl.ai')],



    'xs': [os.path.join(script_dir, 'xs.ai')],
    's': [os.path.join(script_dir, 's.ai')],
    'm': [os.path.join(script_dir, 'm.ai')],
    'l': [os.path.join(script_dir, 'l.ai')],
    'xl': [os.path.join(script_dir, 'xl.ai')],
    '2xl': [os.path.join(script_dir, '2xl.ai')],
    '3xl': [os.path.join(script_dir, '3xl.ai')],
    '4xl': [os.path.join(script_dir, '4xl.ai')],
    '5xl': [os.path.join(script_dir, '5xl.ai')],
    '6xl': [os.path.join(script_dir, '6xl.ai')],

    'xxl': [os.path.join(script_dir, '2xl.ai')],
    'xxxl': [os.path.join(script_dir, '3xl.ai')],
    'xxxxl': [os.path.join(script_dir, '4xl.ai')],
    'xxxxxl': [os.path.join(script_dir, '5xl.ai')],
    'xxxxxxl': [os.path.join(script_dir, '6xl.ai')],


}


# Read the names and sizes from a .txt file
with open(os.path.join(script_dir, 'names_sizes.txt'), 'r') as f:
    lines = f.readlines()

# Iterate over each line
for i, line in enumerate(lines, start=1):
    # Split the line into parts
    parts = line.strip().split("\t")
    
    # Check if there are 3 parts (name, number, size)
    if len(parts) == 3:
        name, number, size = parts
    elif len(parts) == 2:
        # Check if the first part is a number
        if parts[0].isdigit():
            name = "NN"
            number, size = parts
        else:
            name, size = parts
            number = "NN"
    else:
        name = "NN"
        size = parts[0]
        number = "NN"
    
    # Check if the size exists in the file_dict
    if size in file_dict:
        # Create a new file name
        new_file_name = f"{i}-{name}-{number}-{size}.ai"
        print(new_file_name)  # Print the new file name
        for file in file_dict[size]:
            try:
                shutil.copy(file, os.path.join(editable_dir, new_file_name))  # Try to copy the file
                break  # If the copy operation was successful, break the loop
            except FileNotFoundError:
                continue  # If the file was not found, continue to the next file
    else:
        print(f"Size '{size}' not found for '{name}'")