for file in *.eps; do inkscape "$file" --export-type="dxf" --export-filename="${file%.eps}.dxf"; done