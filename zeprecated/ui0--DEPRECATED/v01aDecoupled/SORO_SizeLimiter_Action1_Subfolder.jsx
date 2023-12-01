// Array of names
var names = [
    "Alpha Chi Omega", "Alpha Delta Pi", "Alpha Kappa Delta Phi", "Alpha Omicron Pi", "Alpha Phi", 
    "Chi Omega", "Tri Delta", "Delta Gamma", "Delta Phi Epsilon", "Gamma Phi Beta", "Kappa Alpha Theta", 
    "Kappa Kappa Gamma", "Kappa Delta", "Pi Beta Phi", "Sigma Kappa", "Zeta Tau Alpha"
];

// Get the path of the current (active) document
var docPath = app.activeDocument.fullName;

// Specify the name of the subfolder
var subfolder = "SORO_EXPORTS";

// Create the subfolder if it doesn't exist
var folder = new Folder(docPath.parent + "/" + subfolder);
if (!folder.exists) {
    folder.create();
}

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

    
    // Set the height of the text frame here
    // textFrame.height = 69;


    // Select the text frame
    textFrame.selected = true;

    // Run the action
    app.doScript("Action 1", "Default Actions");

    
    // Save a copy of the document with the new name
    var file = new File(folder.fsName + "/" + names[i] + ".ai");
    doc.saveAs(file);

    // Close the document without saving
    doc.close(SaveOptions.DONOTSAVECHANGES);
}