mkdir -p ink-dxf

for file in *.eps; do 
    inkscape "$file" --export-type="dxf" --export-filename="ink-dxf/${file%.eps}.dxf"
done