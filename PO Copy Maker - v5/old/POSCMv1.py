#!/usr/bin/env python3
import shutil
import os

# Original file names + Variations add more here 
file_dict = {
    'XS': 'xs.ai',
    'S': 's.ai',
    'M': 'm.ai',
    'L': 'l.ai',
    'XL': 'xl.ai',
    '2XL': '2xl.ai',
    '3XL': '3xl.ai',
    '4XL': '4xl.ai',
    '5XL': '5xl.ai',

    'XS': 'XS.ai',
    'S': 'S.ai',
    'M': 'M.ai',
    'L': 'L.ai',
    'XL': 'XL.ai',
    '2XL': '2XL.ai',
    '3XL': '3XL.ai',
    '4XL': '4XL.ai',
    '5XL': '5XL.ai',

    'XXL': '2xl.ai',
    'XXXL': '3xl.ai',
    'XXXXL': '4xl.ai',
    'XXXXXL': '5xl.ai',

    'XXL': '2XL.ai',
    'XXXL': '3XL.ai',
    'XXXXL': '4XL.ai',
    'XXXXXL': '5XL.ai',

    '2x': '2xl.ai',
    '3x': '3xl.ai',
    '4x': '4xl.ai',
    '5x': '5xl.ai',
    '2X': '2xl.ai',
    '3X': '3xl.ai',
    '4X': '4xl.ai',
    '5X': '5xl.ai',

    '2x': '2XL.ai',
    '3x': '3XL.ai',
    '4x': '4XL.ai',
    '5x': '5XL.ai',
    '2X': '2XL.ai',
    '3X': '3XL.ai',
    '4X': '4XL.ai',
    '5X': '5XL.ai',

}

# Read the names and sizes from a .txt file
with open('names_sizes.txt', 'r') as f:
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
        shutil.copy(file_dict[size], new_file_name)  # Copy the files
    else:
        print(f"Size '{size}' not found for '{name}'")