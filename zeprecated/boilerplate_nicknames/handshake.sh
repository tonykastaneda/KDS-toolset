#!/bin/bash

# Using relative paths based on the location of this script

# Get the directory of the current script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

chmod a+x "$DIR/soro_export/logo_export/logo-data-soro-make.sh"
chmod a+x "$DIR/frat_export/logo_export/logo-data-frat-make.sh"
chmod a+x "$DIR/soro_mockup_export/mockup_pngs/renamer.py"
chmod a+x "$DIR/frat_mockup_export/mockup_pngs/renamer.py"
