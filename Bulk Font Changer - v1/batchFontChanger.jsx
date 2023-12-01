#target illustrator

var scriptPath = new File($.fileName).path;
var rootFolder = new Folder(scriptPath);
var sourceFontName = "MLBMariners";
var targetFontName = "MLBMariners-Redux";

processFolder(rootFolder);

function processFolder(folder) {
    var files = folder.getFiles();
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        if (file instanceof Folder) {
            processFolder(file);
        } else if (file instanceof File && file.name.match(/\.ai$/i)) {
            processFile(file);
        }
    }
}

function processFile(file) {
    var doc = app.open(file);
    unlockAllLayers(doc.layers);
    changeFontInDocument(doc, sourceFontName, targetFontName);
    doc.save();
    doc.close();
}

function unlockAllLayers(layers) {
    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        layer.locked = false;
        if (layer.layers.length > 0) {
            unlockAllLayers(layer.layers);
        }
    }
}

function changeFontInDocument(doc, sourceFontName, targetFontName) {
    for (var i = 0; i < doc.textFrames.length; i++) {
        var textFrame = doc.textFrames[i];
        if (textFrame.textRange.contents != "" && textFrame.textRange.characterAttributes.textFont.name == sourceFontName) {
            var fonts = app.textFonts;
            for (var j = 0; j < fonts.length; j++) {
                if (fonts[j].name == targetFontName) {
                    textFrame.textRange.characterAttributes.textFont = fonts[j];
                    break;
                }
            }
        }
    }
}