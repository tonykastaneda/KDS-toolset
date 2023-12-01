#!/bin/bash

# Get the directory of the current script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Get the start time
START_TIME=$(date +%s)

# Run ExtendScript
osascript -e '
tell application "Adobe Illustrator"
    with timeout of 0 seconds
        activate
        do javascript file "'"$DIR"'/v3-RCv5.jsx"
    end timeout
end tell
'

# Run additional ExtendScripts
osascript -e '
tell application "Adobe Illustrator"
    with timeout of 0 seconds
        activate
        do javascript file "'"$DIR"'/frat_export/logo-extractor.jsx"
    end timeout
end tell
'

osascript -e '
tell application "Adobe Illustrator"
    with timeout of 0 seconds
        activate
        do javascript file "'"$DIR"'/soro_export/logo-extractor.jsx"
    end timeout
end tell
'

# Run shell scripts
sh "$DIR/frat_export/logo_export/logo-data-frat-make.sh"
sh "$DIR/soro_export/logo_export/logo-data-soro-make.sh"

# Get the end time
END_TIME=$(date +%s)

# Calculate the time it took in seconds
TIME_DIFF=$(($END_TIME - $START_TIME))

# Calculate minutes and remainder seconds
TIME_MINUTES=$(($TIME_DIFF / 60))
TIME_SECONDS=$(($TIME_DIFF % 60))

echo "Time taken: $TIME_MINUTES min $TIME_SECONDS sec"