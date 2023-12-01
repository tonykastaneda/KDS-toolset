var defaultNames1 = ["Acacia", "Alpha Epsilon Pi", "Alpha Gamma Delta", "Alpha Gamma Rho", "Alpha Kappa Lambda",
"Alpha Sigma Phi", "Alpha Tau Omega", "Beta Theta Pi", "Chi Phi", "Chi Psi", "Delta Chi",
"Delta Kappa Epsilon", "Delta Sigma Phi", "Delta Tau Delta", "Delta Upsilon", "Kappa Alpha",
"Kappa Delta Rho", "Kappa Sigma", "Lambda Phi Epsilon", "Phi Gamma Delta",
"Phi Kappa Psi", "Phi Kappa Sigma", "Phi Kappa Tau", "Phi Kappa Theta", "Phi Sigma Kappa",
"Pi Alpha Phi", "Pi Kappa Alpha", "Pi Kappa Phi", "Sigma Alpha Epsilon", "Sigma Alpha Mu",
"Sigma Chi", "Sigma Nu", "Sigma Phi Epsilon", "Sigma Pi", "Sigma Tau Gamma",
"Theta Chi", "Theta Xi", "Zeta Beta Tau", "Zeta Psi", "Zeta Phi Rho"];

var defaultNames2 = ["Alpha Chi Omega", "Alpha Delta Pi", "alpha Kappa Delta Phi", "Alpha Omicron Pi", "Alpha Phi",
"Chi Omega", "Tri Delta", "Delta Gamma", "Delta Phi Epsilon", "Gamma Phi Beta", "Kappa Alpha Theta",
"Kappa Kappa Gamma", "Kappa Delta", "Pi Beta Phi", "Sigma Kappa", "Zeta Tau Alpha"];





var originalFile = new File(app.activeDocument.fullName); // Store the original document path
var exportFolder1 = new Folder(originalFile.path + "/frat_export"); // Create a new folder object for defaultNames1
var exportFolder2 = new Folder(originalFile.path + "/soro_export"); // Create a new folder object for defaultNames2

// Check if the export folders exist, if not create them
if (!exportFolder1.exists) {
    exportFolder1.create();
}

if (!exportFolder2.exists) {
    exportFolder2.create();
}

function processNames(names, exportFolder) {
    for (var k = 0; k < names.length; k++) {
        var name = names[k];

        var doc = app.open(originalFile); // Open the original document

        var textFrame = doc.pageItems.getByName("nameplaceholder"); // Get the text frame by name

        if (textFrame == null) {
            alert("Error: 'nameplaceholder' does not exist.");
            return;
        }

        if (textFrame.typename !== "TextFrame") {
            alert("Error: 'nameplaceholder' is not a TextFrame.");
            return;
        }

        // Store the baseline shift and font size values for the first and last character
        var firstBaselineShift = textFrame.textRange.characters[0].characterAttributes.baselineShift;
        var firstFontSize = textFrame.textRange.characters[0].characterAttributes.size;
        var lastBaselineShift = textFrame.textRange.characters[textFrame.textRange.characters.length - 1].characterAttributes.baselineShift;
        var lastFontSize = textFrame.textRange.characters[textFrame.textRange.characters.length - 1].characterAttributes.size;

        // Store the original font size
        var originalFontSize = textFrame.textRange.characters[1].characterAttributes.size;

        // Change the text
        textFrame.contents = name;

        // Reset all characters to original font size and no baseline shift
        for (var i = 0; i < textFrame.textRange.characters.length; i++) {
            textFrame.textRange.characters[i].characterAttributes.baselineShift = 0;
            textFrame.textRange.characters[i].characterAttributes.size = originalFontSize;
        }

        // Apply the baseline shift and font size values of the first character from the placeholder to the first character of the new name
        textFrame.textRange.characters[0].characterAttributes.baselineShift = firstBaselineShift;
        textFrame.textRange.characters[0].characterAttributes.size = firstFontSize;

        // Apply the baseline shift and font size values of the last character from the placeholder to the last character of the new name
        if (name.length > 1) {
            textFrame.textRange.characters[name.length - 1].characterAttributes.baselineShift = lastBaselineShift;
            textFrame.textRange.characters[name.length - 1].characterAttributes.size = lastFontSize;
        }

        // Save the document with the new name in the export folder
        var saveOptions = new IllustratorSaveOptions();
        var newFile = new File(exportFolder + "/" + name + ".ai");
        doc.saveAs(newFile, saveOptions);

        // Close the new document
        doc.close(SaveOptions.DONOTSAVECHANGES);
    }
}

processNames(defaultNames1, exportFolder1);
processNames(defaultNames2, exportFolder2);