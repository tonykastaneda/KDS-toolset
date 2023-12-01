// Array of names
var names = [
    "Acacia", "Alpha Epsilon Pi", "Alpha Gamma Delta", "Alpha Gamma Rho", "Alpha Kappa Lambda", 
    "Alpha Sigma Phi", "Alpha Tau Omega", "Beta Theta Pi", "Chi Phi", "Chi Psi", "Delta Chi", 
    "Delta Kappa Epsilon", "Delta Sigma Phi", "Delta Tau Delta", "Delta Upsilon", "Kappa Alpha", 
    "Kappa Delta Rho", "Kappa SIgma", "Lambda Chi Alpha", "Lambda Phi Epsilon", "Phi Gamma Delta", 
    "Phi Kappa Psi", "Phi Kappa Sigma", "Phi Kappa Tau", "Phi Kappa Theta", "Phi Sigma Kappa", 
    "Pi Alpha Phi", "Pi Kappa Alpha", "Pi Kappa Phi", "Sigma Alpha Epsilon", "Sigma Alpha Mu", 
    "Sigma Chi", "Sigma Nu", "Sigma Phi Epsilon", "Sigma Pi", "Sigma Tau Gamma", "Tau Kappa Epsilon", 
    "Theta Chi", "Theta Xi", "Zeta Beta Tau", "Zeta Psi", "Zeta Phi Rho"
];

// Get the path of the current (active) document
var docPath = app.activeDocument.fullName;

// Loop through the array of names
for (var i = 0; i < names.length; i++) {
    // Reopen the document
    var doc = app.open(docPath);

    // Get the specific text frame by its name
    var textFrame = doc.pageItems.getByName("nameplaceholder");

    // Get the width of the text frame
    var desiredWidth = textFrame.width;

    // Replace the text in the text frame
    textFrame.contents = names[i];

    // Get the current width of the text frame
    var currentWidth = textFrame.width;

    // Calculate the ratio of the desired width to the current width
    var ratio = desiredWidth / currentWidth;

    // Adjust the font size based on the ratio
    textFrame.textRange.characterAttributes.size *= ratio;

    // Select the text frame
    textFrame.selected = true;

    // Run the action
    app.doScript("Action 1", "Default Actions");

    // Save a copy of the document with the new name
    var file = new File(doc.path + "/" + names[i] + ".ai");
    doc.saveAs(file);

    // Close the document without saving
    doc.close(SaveOptions.DONOTSAVECHANGES);
}