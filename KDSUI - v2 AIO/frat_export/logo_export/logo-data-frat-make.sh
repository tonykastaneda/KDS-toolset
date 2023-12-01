#!/bin/bash

# Change the working directory to the directory of the script (logo_export)
cd "$(dirname "$0")"

# Move up two directories to reach the PROJECT directory
PROJECT_DIR="../../"

# Create the "frat_mockup_export" subfolder in the root of the PROJECT directory
output_folder="${PROJECT_DIR}frat_mockup_export/"
mkdir -p "$output_folder"

file_name="${output_folder}frat_logo_data.txt"  # Use absolute path for logo_data.txt

# Find all image files (extensions: jpg, jpeg, png, gif, bmp) in the current directory and its subdirectories
image_files=$(find . -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.bmp" \) 2>/dev/null)

# Write the paths of image files to the logo_data.txt file with newlines
echo "PixelVariable1" > "$file_name"
for path in $image_files; do
  # Get the absolute path for the image file
  absolute_path=$(realpath "$path")
  echo "$absolute_path" >> "$file_name"
done

echo "Successfully created and moved 'logo_data.txt' as variable data."
