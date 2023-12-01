// Function to import names from a text file
function importNames(fileLocation) {
    var file = File(fileLocation);
    file.open('r');
    var names = [];
    while (!file.eof) {
        names.push(file.readln());
    }
    file.close();
    return names;
}

// Default Array of Names, Mainly all Frat and Soroitie Orginzations names

var defaultFratNames = ["Acacia", "Alpha Epsilon Pi", "Alpha Gamma Delta", "Alpha Gamma Rho", "Alpha Kappa Lambda",
    "Alpha Sigma Phi", "Alpha Tau Omega", "Beta Theta Pi", "Chi Phi", "Chi Psi", "Delta Chi",
    "Delta Kappa Epsilon", "Delta Sigma Phi", "Delta Tau Delta", "Delta Upsilon", "Kappa Alpha",
    "Kappa Delta Rho", "Kappa Sigma", "Lambda Chi Alpha", "Lambda Phi Epsilon", "Phi Gamma Delta",
    "Phi Kappa Psi", "Phi Kappa Sigma", "Phi Kappa Tau", "Phi Kappa Theta", "Phi Sigma Kappa",
    "Pi Alpha Phi", "Pi Kappa Alpha", "Pi Kappa Phi", "Sigma Alpha Epsilon", "Sigma Alpha Mu",
    "Sigma Chi", "Sigma Nu", "Sigma Phi Epsilon", "Sigma Pi", "Sigma Tau Gamma", "Tau Kappa Epsilon",
    "Theta Chi", "Theta Xi", "Zeta Beta Tau", "Zeta Psi", "Zeta Phi Rho"];

var defaultSoroNames = ["Alpha Chi Omega", "Alpha Delta Pi", "Alpha Kappa Delta Phi", "Alpha Omicron Pi", "Alpha Phi",
    "Chi Omega", "Tri Delta", "Delta Gamma", "Delta Phi Epsilon", "Gamma Phi Beta", "Kappa Alpha Theta",
    "Kappa Kappa Gamma", "Kappa Delta", "Pi Beta Phi", "Sigma Kappa", "Zeta Tau Alpha"];



// Get the script's directory
var scriptDir = new File($.fileName).parent.fsName;

// Output locations
var fratOutput = scriptDir + "/FRAT_EXPORTS";
var soroOutput = scriptDir + "/SORO_EXPORTS";


// Create dialog
var dialog = new Window("dialog", "KDSUI v1.02a");
dialog.orientation = 'column';
dialog.alignChildren = ['left', 'top'];
dialog.spacing = 10;
dialog.margins = 16;
dialog.preferredSize.width = 400;


// Create Import panel
var importPanel = dialog.add("panel", undefined, "Import");
importPanel.orientation = 'column';
importPanel.alignChildren = ['left', 'top'];
importPanel.spacing = 10;
importPanel.margins = 16;

        // Frat Names Import option
        var fratNamesGroup = importPanel.add("group");
        fratNamesGroup.add("statictext", undefined, "Fraternities Names:");
        var fratNamesInput = fratNamesGroup.add("edittext", undefined, "");
        fratNamesInput.characters = 20;
        var fratNamesButton = fratNamesGroup.add("button", undefined, "Import");
        fratNamesButton.onClick = function () {
            var file = File.openDialog("Select a text file for Frat Names");
            if (file) fratNamesInput.text = file.fsName;
        }

        // Soro Names Import option
        var soroNamesGroup = importPanel.add("group");
        soroNamesGroup.add("statictext", undefined, "Sororities Names:");
        var soroNamesInput = soroNamesGroup.add("edittext", undefined, "");
        soroNamesInput.characters = 20;
        var soroNamesButton = soroNamesGroup.add("button", undefined, "Import");
        soroNamesButton.onClick = function () {
            var file = File.openDialog("Select a text file for Soro Names");
            if (file) soroNamesInput.text = file.fsName;
        }



// Create Modify panel
var modifyPanel = dialog.add("panel", undefined, "Modify");
modifyPanel.orientation = 'column';
modifyPanel.alignChildren = ['left', 'top'];
modifyPanel.spacing = 10;
modifyPanel.margins = 16;

        // Add options for width
        var widthGroup = modifyPanel.add("group");
        widthGroup.add("statictext", undefined, "Text Width in px:");
        var widthInput = widthGroup.add("edittext", undefined, "");
        widthInput.characters = 5;
        widthInput.onChanging = function () {
            if (widthInput.text !== "") {
                widthCheckbox.value = false;
            }
        }
        // Add checkbox for skipping text width
        var widthCheckbox = widthGroup.add("checkbox", undefined, "Don't Modify width");
        widthCheckbox.value = true;
        widthCheckbox.onClick = function () {
            if (widthCheckbox.value) {
                widthInput.text = "";
            }
        }
        // Add input for height
        var heightGroup = modifyPanel.add("group");
        heightGroup.add("statictext", undefined, "Text Height in px:");
        var heightInput = heightGroup.add("edittext", undefined, "");
        heightInput.characters = 5;
        heightInput.onChanging = function () {
            if (heightInput.text !== "") {
                skipHeightCheckbox.value = false;
            }
        }
        // Add checkbox for skipping text height
        var skipHeightCheckbox = heightGroup.add("checkbox", undefined, "Don't Modify height");
        skipHeightCheckbox.value = true; // This sets the default state to checked
        heightInput.text = skipHeightCheckbox.value ? "" : "50"; // If checkbox is checked, leave input field blank
        skipHeightCheckbox.onClick = function () {
            if (skipHeightCheckbox.value) {
                heightInput.text = "";
            } else {
                heightInput.text = "50"; // This sets the default height when the checkbox is unchecked
            }
        }
        // Add input for action
        var actionGroup = modifyPanel.add("group");
        actionGroup.add("statictext", undefined, "Action Name:");
        var actionInput = actionGroup.add("edittext", undefined, "Action 1");
        actionInput.characters = 10;
        actionInput.onChanging = function () {
            if (actionInput.text !== "") {
                skipActionCheckbox.value = false;
            }
        }
        // Add checkbox for skipping action
        var skipActionCheckbox = actionGroup.add("checkbox", undefined, "Skip action");
        skipActionCheckbox.value = false;
        skipActionCheckbox.onClick = function () {
            if (skipActionCheckbox.value) {
                actionInput.text = "";
            }
        }



// Create Output panel
var outputPanel = dialog.add("panel", undefined, "Output");
outputPanel.orientation = 'column';
outputPanel.alignChildren = ['left', 'top'];
outputPanel.spacing = 10;
outputPanel.margins = 16;

        // Add input for frat output location
        var fratOutputGroup = outputPanel.add("group");
        fratOutputGroup.add("statictext", undefined, "Fraternities Output:");
        var fratOutputInput = fratOutputGroup.add("edittext", undefined, fratOutput);
        fratOutputInput.characters = 20;
        var fratOutputButton = fratOutputGroup.add("button", undefined, "Browse");
        fratOutputButton.onClick = function () {
            var folder = Folder.selectDialog("Select a folder for Frat Output");
            if (folder) fratOutputInput.text = folder.fsName;
        }

        // Add input for soro output location
        var soroOutputGroup = outputPanel.add("group");
        soroOutputGroup.add("statictext", undefined, "Sororities Output:");
        var soroOutputInput = soroOutputGroup.add("edittext", undefined, soroOutput);
        soroOutputInput.characters = 20;
        var soroOutputButton = soroOutputGroup.add("button", undefined, "Browse");
        soroOutputButton.onClick = function () {
            var folder = Folder.selectDialog("Select a folder for Soro Output");
            if (folder) soroOutputInput.text = folder.fsName;
        }






// Add buttons
var buttonGroup = dialog.add("group");
buttonGroup.alignment = 'center';

var cancelButton = buttonGroup.add("button", undefined, "Cancel");
var defaultsButton = buttonGroup.add("button", undefined, "Defaults");
var startButton = buttonGroup.add("button", undefined, "Start");
startButton.graphics.foregroundColor = startButton.graphics.newPen(startButton.graphics.PenType.SOLID_COLOR, [0, 0, 1], 1);





// Event listener for cancel button
cancelButton.onClick = function () {
    dialog.close();
}

// Event listener for defaults button
defaultsButton.onClick = function () {
    widthCheckbox.value = true;
    widthInput.text = "";
    heightInput.text = "";
    skipHeightCheckbox.value = true;
    actionInput.text = "Action 1";
    skipActionCheckbox.value = false;
    fratNamesInput.text = "";
    soroNamesInput.text = "";
    fratOutputInput.text = fratOutput;
    soroOutputInput.text = soroOutput;
}

// Event listener for start button
startButton.onClick = function () {
    var fratNames = fratNamesInput.text ? importNames(fratNamesInput.text) : defaultFratNames;
    var soroNames = soroNamesInput.text ? importNames(soroNamesInput.text) : defaultSoroNames;
    var fratOutputPath = fratOutputInput.text || fratOutput;
    var soroOutputPath = soroOutputInput.text || soroOutput;
    runScript(fratNames, fratOutputPath, heightInput.text, actionInput.text, widthCheckbox.value ? null : widthInput.text, skipActionCheckbox.value, skipHeightCheckbox.value);
    resetState();
    runScript(soroNames, soroOutputPath, heightInput.text, actionInput.text, widthCheckbox.value ? null : widthInput.text, skipActionCheckbox.value, skipHeightCheckbox.value);
    dialog.close();
}


// Show dialog
dialog.show();


function runScript(names, output, height, action, width, skipAction, skipHeight) {
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

        // Store the initial position of the text frame
        var initialPosition = textFrame.position;

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
        if (!skipHeight) {
            textFrame.height = height;
        }

        // Select the text frame
        textFrame.selected = true;

        // Run the action
        if (!skipAction) {
            app.doScript(action, "Default Actions");
        }
        // Set the position of the text frame back to its initial position
        textFrame.position = initialPosition;

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
