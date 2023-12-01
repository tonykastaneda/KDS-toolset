#!/usr/bin/env python3

import os

def rename_and_move_files():
    """
    Rename files in the directory where the script is located to extract the desired name.
    Then, create a folder based on the new name, append the "80max" directory name, 
    and move the file into it.
    """
    
    # Get the directory where the script is located
    directory = os.path.dirname(os.path.abspath(__file__))

    # Change to that directory
    os.chdir(directory)
    
    # Get the name of the directory two levels up (which should be "80max")
    two_dirs_up = os.path.basename(os.path.dirname(os.path.dirname(directory)))
    
    # Ensure that the directory two levels up is "80max"
    if two_dirs_up != "80max":
        print("Error: The directory two levels up is not '80max'. Please ensure the script is in the right location.")
        return

    # List all files in the directory
    files_in_directory = os.listdir()
    
    # Filter out files that are likely to have the described pattern
    files_to_rename = [f for f in files_in_directory if '_export_' in f and '.png.PSD.png' in f]
    
    for filename in files_to_rename:
        desired_part = filename.split('_export_')[-1].split('.png.PSD.png')[0] + '.png'
        desired_part = desired_part.replace('-', ' ')  # Replacing dashes with spaces
        os.rename(filename, desired_part)
        print(f"Renamed {filename} to {desired_part}")

        # Create a directory with the name of the PNG (excluding .png), appending the "80max" directory name
        new_dir = desired_part.replace('.png', '') + ' - ' + two_dirs_up
        if not os.path.exists(new_dir):
            os.makedirs(new_dir)

        # Move the PNG file into the new directory
        os.rename(desired_part, os.path.join(new_dir, desired_part))

if __name__ == "__main__":
    rename_and_move_files()
