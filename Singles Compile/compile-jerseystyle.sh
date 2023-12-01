#!/bin/bash

# Get the directory of the script
script_dir="$(dirname "$0")"

# Create the output directory if it doesn't exist
mkdir -p "$script_dir/zPRINT"

# Initialize a counter
counter=1

# List of strings to exclude
exclude=("The Block_" "ballpark_" "legacy_" "Jersey_")

# Find all .ai files with an underscore in their name
find . -name '*_*.ai' -print0 | while IFS= read -r -d '' file; do
    # Get the base name of the file
    base_name=$(basename "$file")

    # Check if the base name contains any of the exclude strings
    skip=false
    for ex in "${exclude[@]}"; do
        if [[ $base_name == *"$ex"* ]]; then
            skip=true
            break
        fi
    done

    # If skip is true, skip this iteration of the loop
    if $skip; then
        continue
    fi

    # Separate the file name and extension
    filename=${base_name%.*}
    extension=${base_name##*.}

    # Copy the file to the output directory with the counter suffix
    cp "$file" "$script_dir/zPRINT/${filename}-$counter.$extension"

    # Increment the counter
    ((counter++))
done