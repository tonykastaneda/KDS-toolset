// Arrays of names
var fratNames = [
    "Acacia", "Alpha Epsilon Pi", "Alpha Gamma Delta", "Alpha Gamma Rho", "Alpha Kappa Lambda", 
    "Alpha Sigma Phi", "Alpha Tau Omega", "Beta Theta Pi", "Chi Phi", "Chi Psi", "Delta Chi", 
    "Delta Kappa Epsilon", "Delta Sigma Phi", "Delta Tau Delta", "Delta Upsilon", "Kappa Alpha", 
    "Kappa Delta Rho", "Kappa Sigma", "Lambda Chi Alpha", "Lambda Phi Epsilon", "Phi Gamma Delta", 
    "Phi Kappa Psi", "Phi Kappa Sigma", "Phi Kappa Tau", "Phi Kappa Theta", "Phi Sigma Kappa", 
    "Pi Alpha Phi", "Pi Kappa Alpha", "Pi Kappa Phi", "Sigma Alpha Epsilon", "Sigma Alpha Mu", 
    "Sigma Chi", "Sigma Nu", "Sigma Phi Epsilon", "Sigma Pi", "Sigma Tau Gamma", "Tau Kappa Epsilon", 
    "Theta Chi", "Theta Xi", "Zeta Beta Tau", "Zeta Psi", "Zeta Phi Rho"
];

var soroNames = [
    "Alpha Chi Omega", "Alpha Delta Pi", "Alpha Kappa Delta Phi", "Alpha Omicron Pi", "Alpha Phi", 
    "Chi Omega", "Tri Delta", "Delta Gamma", "Delta Phi Epsilon", "Gamma Phi Beta", "Kappa Alpha Theta", 
    "Kappa Kappa Gamma", "Kappa Delta", "Pi Beta Phi", "Sigma Kappa", "Zeta Tau Alpha"
];

// Output locations
var fratOutput = "FRAT_EXPORTS";
var soroOutput = "SORO_EXPORTS";

// Function to reset the state
function resetState() {
    // Get the path to the folder containing this script
    var folder = new Folder(new File($.fileName).path);

    // Get a list of all the files in the folder
    var files = folder.getFiles();

    // Loop through the files
    for (var i = 0; i < files.length; i++) {
        // Check if the file is an Illustrator file
        if (files[i] instanceof File && files[i].name.match(/\.ai$/i)) {
            // Open the Illustrator file
            var doc = app.open(files[i]);
            // Stop looping after opening the first Illustrator file
            break;
        }
    }
}

// Function to run the script
function runScript(names, output) {
    // Get the path of the current (active) document
    var docPath = app.activeDocument.fullName;

    // Create the subfolder if it doesn't exist
    var folder = new Folder(docPath.parent + "/" + output);
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

        // Set the height of the text frame
        textFrame.height = 69;

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
}

// Run the script for the first set of names and output location
runScript(fratNames, fratOutput);

// Reset the state
resetState();

// Run the script for the second set of names and output location
runScript(soroNames, soroOutput);
