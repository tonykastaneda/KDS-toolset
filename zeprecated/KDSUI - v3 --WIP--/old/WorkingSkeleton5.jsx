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

function processNames(names) {
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

        var originalWidth = textFrame.width;
        var baselineShifts = [];
        var fontSizes = [];

        // Store the baseline shift and font size values for each character
        for (var j = 0; j < textFrame.textRange.characters.length; j++) {
            baselineShifts.push(textFrame.textRange.characters[j].characterAttributes.baselineShift);
            fontSizes.push(textFrame.textRange.characters[j].characterAttributes.size);
        }

        // Store the baseline shift and font size of the last character separately
        var lastBaselineShift = baselineShifts[baselineShifts.length - 1];
        var lastFontSize = fontSizes[fontSizes.length - 1];

        // Change the text
        var newText = name; // use the name from the list
        textFrame.contents = newText;

        // Check if the new text has expanded the frame and is longer than 6 characters
        if (newText.length > 6 && textFrame.width > originalWidth) {
            var scaleFactor = originalWidth / textFrame.width;
            textFrame.textRange.characterAttributes.horizontalScale = scaleFactor * 100;
        }

        // Reapply the baseline shift and font size values to each corresponding character
        for (var j = 0; j < textFrame.textRange.characters.length; j++) {
            if (j < baselineShifts.length) {
                textFrame.textRange.characters[j].characterAttributes.baselineShift = baselineShifts[j];
                textFrame.textRange.characters[j].characterAttributes.size = fontSizes[j];
            }
        }

        // Ensure the last character of the new text has the same properties as the last character of the original text
        textFrame.textRange.characters[textFrame.textRange.characters.length - 1].characterAttributes.baselineShift = lastBaselineShift;
        textFrame.textRange.characters[textFrame.textRange.characters.length - 1].characterAttributes.size = lastFontSize;

        // Save the document with the new name
        var saveOptions = new IllustratorSaveOptions();
        var newFile = new File(doc.path + "/" + name + ".ai");
        doc.saveAs(newFile, saveOptions);

        // Close the new document
        doc.close(SaveOptions.DONOTSAVECHANGES);
    }
}

processNames(defaultNames1);
processNames(defaultNames2);