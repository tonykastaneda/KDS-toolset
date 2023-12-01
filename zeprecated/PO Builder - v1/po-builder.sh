#!/bin/bash

# Get the directory of the current script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Run the Python script
python3 "$DIR/POSCMv4.py"

# Copy the .jsx file into the /EDITABLE folder
cp "$DIR/PONNJv5.jsx" "$DIR/EDITABLE/"

# Run the .jsx file in Adobe Illustrator
osascript -e '
tell application "Adobe Illustrator"
    with timeout of 0 seconds
        activate
        do javascript file "'"$DIR"'/EDITABLE/PONNJv5.jsx"
    end timeout
end tell
'

# Duplicate the /EDITABLE folder and rename it to /PRINT
cp -r "$DIR/EDITABLE/" "$DIR/PRINT"

# Copy the outlinev3.jsx file into the /PRINT folder
cp "$DIR/outlinev3.jsx" "$DIR/PRINT/"

# Run the outlinev3.jsx file in Adobe Illustrator
osascript -e '
tell application "Adobe Illustrator"
    with timeout of 0 seconds
        activate
        do javascript file "'"$DIR"'/PRINT/outlinev3.jsx"
    end timeout
end tell
'

# Delete specified files from the /PRINT folder
rm "$DIR/PRINT/log.txt"
rm "$DIR/PRINT/outlinev3.jsx"
rm "$DIR/PRINT/PONNJv5.jsx"