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


// Get the script's directory
var scriptDir = new File($.fileName).parent.fsName;

// Output locations
var fratOutput = scriptDir + "/FRAT_EXPORTS";
var soroOutput = scriptDir + "/SORO_EXPORTS";


// Create dialog
var dialog = new Window("dialog", "KSUI v0.4a");
dialog.orientation = 'column';
dialog.alignChildren = ['left', 'top'];
dialog.spacing = 10;
dialog.margins = 16;
dialog.preferredSize.width = 400;

// Add options for width
var widthGroup = dialog.add("group");
var widthCheckbox = widthGroup.add("checkbox", undefined, "Keep width");
widthCheckbox.value = true;
widthGroup.add("statictext", undefined, "Define width:");
var widthInput = widthGroup.add("edittext", undefined, "");
widthInput.characters = 5;

// Add input for height
var heightGroup = dialog.add("group");
heightGroup.add("statictext", undefined, "Text Height in px:");
var heightInput = heightGroup.add("edittext", undefined, "60");
heightInput.characters = 5;

// Add input for action
var actionGroup = dialog.add("group");
actionGroup.add("statictext", undefined, "Action Name:");
var actionInput = actionGroup.add("edittext", undefined, "Action 1");
actionInput.characters = 10;

// Add input for frat output location
var fratOutputGroup = dialog.add("group");
fratOutputGroup.add("statictext", undefined, "Frat Output Location:");
var fratOutputInput = fratOutputGroup.add("edittext", undefined, fratOutput);
fratOutputInput.characters = 20;
var fratOutputButton = fratOutputGroup.add("button", undefined, "Browse");
fratOutputButton.onClick = function() {
    var folder = Folder.selectDialog("Select a folder for Frat Output");
    if (folder) fratOutputInput.text = folder.fsName;
}

// Add input for soro output location
var soroOutputGroup = dialog.add("group");
soroOutputGroup.add("statictext", undefined, "Soro Output Location:");
var soroOutputInput = soroOutputGroup.add("edittext", undefined, soroOutput);
soroOutputInput.characters = 20;
var soroOutputButton = soroOutputGroup.add("button", undefined, "Browse");
soroOutputButton.onClick = function() {
    var folder = Folder.selectDialog("Select a folder for Soro Output");
    if (folder) soroOutputInput.text = folder.fsName;
}

// Add buttons
var buttonGroup = dialog.add("group");
var cancelButton = buttonGroup.add("button", undefined, "Cancel");
var defaultsButton = buttonGroup.add("button", undefined, "Defaults");
var startButton = buttonGroup.add("button", undefined, "Start");
startButton.graphics.foregroundColor = startButton.graphics.newPen(startButton.graphics.PenType.SOLID_COLOR, [0, 0, 1], 1);

// Event listener for cancel button
cancelButton.onClick = function() {
    dialog.close();
}

// Event listener for defaults button
defaultsButton.onClick = function() {
    widthCheckbox.value = true;
    widthInput.text = "";
    heightInput.text = "60";
    actionInput.text = "Action 1";
    fratOutputInput.text = fratOutput;
    soroOutputInput.text = soroOutput;
}

// Event listener for start button
startButton.onClick = function() {
    var fratOutputPath = fratOutputInput.text || fratOutput;
    var soroOutputPath = soroOutputInput.text || soroOutput;
    runScript(fratNames, fratOutputPath, heightInput.text, actionInput.text, widthCheckbox.value ? null : widthInput.text);
    resetState();
    runScript(soroNames, soroOutputPath, heightInput.text, actionInput.text, widthCheckbox.value ? null : widthInput.text);
    dialog.close();
}

// Show dialog
dialog.show();


function runScript(names, output, height, action, width) {
    // Get the path of the current (active) document
    var docPath = app.activeDocument.fullName;

    // Create the subfolder if it doesn't exist
    var folder = new Folder(output);
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
        var desiredWidth = width || textFrame.width;

        // Replace the text in the text frame
        textFrame.contents = names[i];

        // Get the current width of the text frame
        var currentWidth = textFrame.width;

        // Calculate the ratio of the desired width to the current width
        var ratio = desiredWidth / currentWidth;

        // Adjust the font size based on the ratio
        textFrame.textRange.characterAttributes.size *= ratio;

        // Set the height of the text frame
        textFrame.height = height;

        // Select the text frame
        textFrame.selected = true;

        // Run the action
        app.doScript(action, "Default Actions");

    // Save a copy of the document with the new name
    var file = new File(folder.fsName + "/" + names[i] + ".ai");
    var saveOptions = new IllustratorSaveOptions();
    doc.saveAs(file, saveOptions);

        // Close the document without saving
        doc.close(SaveOptions.DONOTSAVECHANGES);
    }
}

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