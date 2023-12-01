#!/usr/bin/env python3
import shutil
import os

# Get the directory of the script
script_dir = os.path.dirname(os.path.realpath(__file__))

# Now define your file_dict
file_dict = {
    'XS': [os.path.join(script_dir, 'xs.ai'), os.path.join(script_dir, 'XS.ai')],
    'S': [os.path.join(script_dir, 's.ai'), os.path.join(script_dir, 'S.ai')],
    'M': [os.path.join(script_dir, 'm.ai'), os.path.join(script_dir, 'M.ai')],
    'L': [os.path.join(script_dir, 'l.ai'), os.path.join(script_dir, 'L.ai')],
    'XL': [os.path.join(script_dir, 'xl.ai'), os.path.join(script_dir, 'XL.ai')],
    '2XL': [os.path.join(script_dir, '2xl.ai'), os.path.join(script_dir, '2XL.ai'), os.path.join(script_dir, 'XXL.ai')],
    '3XL': [os.path.join(script_dir, '3xl.ai'), os.path.join(script_dir, '3XL.ai'), os.path.join(script_dir, 'XXXL.ai')],
    '4XL': [os.path.join(script_dir, '4xl.ai'), os.path.join(script_dir, '4XL.ai'), os.path.join(script_dir, 'XXXXL.ai')],
    '5XL': [os.path.join(script_dir, '5xl.ai'), os.path.join(script_dir, '5XL.ai'), os.path.join(script_dir, 'XXXXXL.ai')],
    'XXL': [os.path.join(script_dir, '2xl.ai'), os.path.join(script_dir, '2XL.ai')],
    'XXXL': [os.path.join(script_dir, '3xl.ai'), os.path.join(script_dir, '3XL.ai')],
    'XXXXL': [os.path.join(script_dir, '4xl.ai'), os.path.join(script_dir, '4XL.ai')],
    'XXXXXL': [os.path.join(script_dir, '5xl.ai'), os.path.join(script_dir, '5XL.ai')],
    '2x': [os.path.join(script_dir, '2xl.ai'), os.path.join(script_dir, '2XL.ai')],
    '3x': [os.path.join(script_dir, '3xl.ai'), os.path.join(script_dir, '3XL.ai')],
    '4x': [os.path.join(script_dir, '4xl.ai'), os.path.join(script_dir, '4XL.ai')],
    '5x': [os.path.join(script_dir, '5xl.ai'), os.path.join(script_dir, '5XL.ai')],
    '2X': [os.path.join(script_dir, '2xl.ai'), os.path.join(script_dir, '2XL.ai')],
    '3X': [os.path.join(script_dir, '3xl.ai'), os.path.join(script_dir, '3XL.ai')],
    '4X': [os.path.join(script_dir, '4xl.ai'), os.path.join(script_dir, '4XL.ai')],
    '5X': [os.path.join(script_dir, '5xl.ai'), os.path.join(script_dir, '5XL.ai')],
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
        name, size = parts
        number = "NN"
    else:
        name = "NONAME"
        size = parts[0]
        number = "NN"
    
    # Check if the size exists in the file_dict
    if size in file_dict:
        # Create a new file name
        new_file_name = f"{i}-{name}-{number}-{size}.ai"
        print(new_file_name)  # Print the new file name
        for file in file_dict[size]:
            shutil.copy(file, os.path.join(script_dir, new_file_name))  # Copy the files
    else:
        print(f"Size '{size}' not found for '{name}'")