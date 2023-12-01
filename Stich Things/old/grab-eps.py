#!/usr/bin/env python3

import os
import shutil

# set the root directory to the current directory
root_dir = os.getcwd()

# specify the destination directory
dest_dir = os.path.join(root_dir, 'xEPS')

# create the destination directory if it doesn't exist
if not os.path.exists(dest_dir):
    os.makedirs(dest_dir)

# walk through the root directory and its subdirectories
for dirpath, dirnames, filenames in os.walk(root_dir):
    # for each file in the current directory
    for filename in filenames:
        # if the file is an .eps file
        if filename.endswith('.eps'):
            # construct the full file path
            file_path = os.path.join(dirpath, filename)
            # construct the destination file path
            dest_file_path = os.path.join(dest_dir, filename)

            # if a file with the same name already exists in the destination directory, skip it
            if os.path.exists(dest_file_path):
                continue

            # copy the file to the destination directory
            shutil.copy(file_path, dest_file_path)

print('Copying completed.')