#!/bin/bash

# Get the directory where the script was run from
root_dir="$(pwd)"

# Create a new directory named 'zPRINT' in the current directory
mkdir -p "$root_dir/zPRINT"

# Use find to locate the zPRINT directories and copy the files
find "$root_dir" -type d -name 'zPRINT' -exec sh -c '
    for dir do
        cp "$dir"/* "'"$root_dir"'/zPRINT"
    done
' sh {} +