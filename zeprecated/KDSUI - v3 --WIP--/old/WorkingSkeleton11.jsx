var defaultNames1 = ["Acacia", "Alpha Epsilon Pi", "Alpha Gamma Delta",];

var defaultNames2 = ["Alpha Chi Omega", "Alpha Delta Pi", "alpha Kappa Delta Phi", "Alpha Omicron Pi",];

var originalFile = new File(app.activeDocument.fullName);
var exportFolder1 = new Folder(originalFile.path + "/frat_export");
var exportFolder2 = new Folder(originalFile.path + "/soro_export");

if (!exportFolder1.exists) {
    exportFolder1.create();
}

if (!exportFolder2.exists) {
    exportFolder2.create();
}

function processNames(names, exportFolder) {
    for (var k = 0; k < names.length; k++) {
        var name = names[k];

        var doc = app.open(originalFile); 

        var textFrame = doc.pageItems.getByName("nameplaceholder"); 

        if (textFrame == null) {
            alert("Error: 'nameplaceholder' does not exist.");
            return;
        }

        if (textFrame.typename !== "TextFrame") {
            alert("Error: 'nameplaceholder' is not a TextFrame.");
            return;
        }

        var originalWidth = textFrame.width; // Store the original width

        textFrame.name = 'logo'; // This line changes the name of the sublayer

        var firstBaselineShift = textFrame.textRange.characters[0].characterAttributes.baselineShift;
        var firstFontSize = textFrame.textRange.characters[0].characterAttributes.size;
        var lastBaselineShift = textFrame.textRange.characters[textFrame.textRange.characters.length - 1].characterAttributes.baselineShift;
        var lastFontSize = textFrame.textRange.characters[textFrame.textRange.characters.length - 1].characterAttributes.size;

        var originalFontSize = textFrame.textRange.characters[1].characterAttributes.size;

        textFrame.contents = name;

        // Adjust the width of the text frame to match the original width
        textFrame.resize(originalWidth / textFrame.width * 100, 100, true, true, true, true, 1, Transformation.CENTER);

        for (var i = 0; i < textFrame.textRange.characters.length; i++) {
            textFrame.textRange.characters[i].characterAttributes.baselineShift = 0;
            textFrame.textRange.characters[i].characterAttributes.size = originalFontSize;
        }

        textFrame.textRange.characters[0].characterAttributes.baselineShift = firstBaselineShift;
        textFrame.textRange.characters[0].characterAttributes.size = firstFontSize;

        if (name.length > 1) {
            textFrame.textRange.characters[name.length - 1].characterAttributes.baselineShift = lastBaselineShift;
            textFrame.textRange.characters[name.length - 1].characterAttributes.size = lastFontSize;
        }

        var saveOptions = new IllustratorSaveOptions();
        var newFile = new File(exportFolder + "/" + name + ".ai");
        doc.saveAs(newFile, saveOptions);

        doc.close(SaveOptions.DONOTSAVECHANGES);
    }
}

processNames(defaultNames1, exportFolder1);
processNames(defaultNames2, exportFolder2);