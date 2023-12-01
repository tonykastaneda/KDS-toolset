#!/usr/bin/env python3
import os
import re

# The sizes to look for in the filename
sizes = ['xs', 's', 'm', 'l', 'xl', 'xxl', '2xl', '3xl', '4xl', '5xl', '6xl']

# Normalization map
size_map = {'xxl': '2xl', 'xxxl': '3xl', 'xxxxl': '4xl', 'xxxxxl': '5xl', 'xxxxxxl': '6xl'}

def normalize_size(size):
    return size_map.get(size, size)

def rename_files(directory, print_directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".ai"):
                for size in sizes:
                    if re.search(fr'{size}(\b| –)', file, re.IGNORECASE):
                        normalized_size = normalize_size(size)
                        base_filename = f'BASEBALL_{normalized_size.upper()}'
                        new_filename = base_filename + '.ai'
                        destination = os.path.join(print_directory, new_filename)

                        # Handle duplicate filenames
                        counter = 1
                        while os.path.exists(destination):
                            new_filename = f'{base_filename} {counter}.ai'
                            destination = os.path.join(print_directory, new_filename)
                            counter += 1

                        source = os.path.join(root, file)
                        os.rename(source, destination)
                        print(f'File {file} renamed to {new_filename}')

# Get the current working directory
directory = os.getcwd()

# Specify the print directory
print_directory = os.path.join(directory, 'print')

rename_files(directory, print_directory)