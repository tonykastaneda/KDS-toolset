#!/usr/bin/env python3
import os

def rename_files_in_folder():
    """
    Rename files in the directory where the script is located to extract the desired name.
    """
    
    # Get the directory where the script is located
    directory = os.path.dirname(os.path.abspath(__file__))

    # Change to that directory
    os.chdir(directory)
    
    # List all files in the directory
    files_in_directory = os.listdir()
    
    # Filter out files that are likely to have the described pattern
    files_to_rename = [f for f in files_in_directory if '_export_' in f and '.png.PSD.png' in f]
    
    for filename in files_to_rename:
        desired_part = filename.split('_export_')[-1].split('.png.PSD.png')[0] + '.png'
        desired_part_with_spaces = desired_part.replace('-', ' ')  # Replacing dashes with spaces
        os.rename(filename, desired_part_with_spaces)
        print(f"Renamed {filename} to {desired_part_with_spaces}")

if __name__ == "__main__":
    rename_files_in_folder()