#!/bin/bash

# Get the directory of the script
script_dir="$(dirname "$0")"

# Create the output directory if it doesn't exist
mkdir -p "$script_dir/yBASE PRINT"

# Find all .ai files with an underscore in their name
find . -name '*_*.ai' -print0 | while IFS= read -r -d '' file; do
    # Copy the file to the output directory
    cp "$file" "$script_dir/yBASE PRINT"
done