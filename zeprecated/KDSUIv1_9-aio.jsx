// Predefined names
var defaultNames1 = [
    "Acacia",
    "Alpha Epsilon Pi",
    "Alpha Gamma Delta",
    "Alpha Gamma Rho",
    "Alpha Kappa Lambda",
    "Alpha Sigma Phi",
    "Alpha Tau Omega",
    "Beta Theta Pi",
    "Chi Phi",
    "Chi Psi",
    "Delta Chi",
    "Delta Kappa Epsilon",
    "Delta Sigma Phi",
    "Delta Tau Delta",
    "Delta Upsilon",
    "Kappa Alpha",
    "Kappa Delta Rho",
    "Kappa Sigma",
    "Lambda Phi Epsilon",
    "Phi Gamma Delta",
    "Phi Kappa Psi",
    "Phi Kappa Sigma",
    "Phi Kappa Tau",
    "Phi Kappa Theta",
    "Phi Sigma Kappa",
    "Pi Alpha Phi",
    "Pi Kappa Alpha",
    "Pi Kappa Phi",
    "Sigma Alpha Epsilon",
    "Sigma Alpha Mu",
    "Sigma Chi",
    "Sigma Nu",
    "Sigma Phi Epsilon",
    "Sigma Pi",
    "Sigma Tau Gamma",
    "Theta Chi",
    "Theta Xi",
    "Zeta Beta Tau",
    "Zeta Psi",
    "Zeta Phi Rho",
    "AEPi",
    "ALPHA GAM",
    "AGR",
    "AKL",
    "ALPHA SIG",
    "TAUS",
    "BETA",
    "DEKES",
    "DELTA SIG",
    "DELTS",
    "DELTA U",
    "KAPPA ALPHA",
    "KDR",
    "KAPPA SIG",
    "LAMBDA CHI",
    "LAMBDAS",
    "PHI DELT",
    "PHI GAM",
    "FIJI",
    "PHI PSI",
    "PHI KAP",
    "SKULLS",
    "PHI TAU",
    "PHI KAPPS",
    "PHI SIG",
    "PAPhi",
    "PIKE",
    "PI KAPP",
    "SAE",
    "SAMMY",
    "SIGEP",
    "SIG TAU",
    "TKE",
    "ZEBES",
    "ZBT",
    "ZETAS"
];

var defaultNames2 = [
    "Alpha Chi Omega",
    "Alpha Delta Pi",
    "alpha Kappa Delta Phi",
    "Alpha Omicron Pi",
    "Alpha Phi",
    "Chi Omega",
    "Tri Delta",
    "Delta Gamma",
    "Delta Phi Epsilon",
    "Gamma Phi Beta",
    "Kappa Alpha Theta",
    "Kappa Kappa Gamma",
    "Kappa Delta",
    "Pi Beta Phi",
    "Sigma Kappa",
    "Zeta Tau Alpha",
    "ALPHA CHI",
    "AXO",
    "ADPi",
    "aKDPhi",
    "AOII",
    "CHI O",
    "DG",
    "DPhiE",
    "GAMMA PHI",
    "THETA",
    "KAPPA",
    "PI PHI",
    "ZETA",
    "ZTA"
]; 


function importNames(fileLocation) {
    if (!fileLocation) return null; // if no file location is provided, return null

    var file = new File(fileLocation);
    file.open('r');
    var names = [];
    while (!file.eof) {
        names.push(file.readln());
    }
    file.close();
    return names;
}

function getFirstAiFile() {
    var scriptFile = new File($.fileName); // Get the current script file
    var scriptFolder = scriptFile.parent; // Get the folder containing the script

    var aiFiles = scriptFolder.getFiles(function(file) {
        return file instanceof File && file.name.match(/\.ai$/i); // Match files with .ai extension
    });

    if (aiFiles.length > 0) {
        return aiFiles[0]; // Return the first .ai file
    } else {
        alert("Error: No .ai files found in the script folder.");
        return null;
    }
}






// Create main window
var win = new Window("dialog", "KDSUI v1.9 AIO");

// Create Import panel
var importPanel = win.add("panel", undefined, "Import");
importPanel.alignChildren = "left";

        // Create group 1
        var group1 = importPanel.add("group");
        group1.orientation = "row";
        group1.alignChildren = "left";
        group1.add("statictext", undefined, "Import Set 1:");
        var input1 = group1.add("edittext", undefined, "");
        input1.preferredSize.width = 200;
        var browseButton1 = group1.add("button", undefined, "Browse");
        var clearButton1 = group1.add("button", undefined, "Clear");

        // Create group 2
        var group2 = importPanel.add("group");
        group2.orientation = "row";
        group2.alignChildren = "left";
        group2.add("statictext", undefined, "Import Set 2:");
        var input2 = group2.add("edittext", undefined, "");
        input2.preferredSize.width = 200;
        var browseButton2 = group2.add("button", undefined, "Browse");
        var clearButton2 = group2.add("button", undefined, "Clear");


// Create Modify panel
var modifyPanel = win.add("panel", undefined, "Modify");
modifyPanel.alignChildren = "left";

        // Create group for Width
        var widthGroup = modifyPanel.add("group");
        widthGroup.orientation = "row";
        widthGroup.alignChildren = "left";
        widthGroup.add("statictext", undefined, "Width in Pixels:");
        var widthInput = widthGroup.add("edittext", undefined, "");
        widthInput.preferredSize.width = 100;
        var keepWidthCheckbox = widthGroup.add("checkbox", undefined, "Keep Text Frame Width");
        var dontModifyCheckbox = widthGroup.add("checkbox", undefined, "Don\'t Modify");

        // Create group for Height
        var heightGroup = modifyPanel.add("group");
        heightGroup.orientation = "row";
        heightGroup.alignChildren = "left";
        heightGroup.add("statictext", undefined, "Height in Pixels:");
        var heightInput = heightGroup.add("edittext", undefined, "");
        heightInput.preferredSize.width = 100;
        var keepHeightCheckbox = heightGroup.add("checkbox", undefined, "Keep Text Frame Height");
        var dontModifyHeightCheckbox = heightGroup.add("checkbox", undefined, "Don\'t Modify");

        // Create group for Actions
        var actionGroup = modifyPanel.add("group");
        actionGroup.orientation = "row";
        actionGroup.alignChildren = "left";
        actionGroup.add("statictext", undefined, "Name of Action:");
        var actionInput = actionGroup.add("edittext", undefined, "");
        actionInput.preferredSize.width = 200;
        var skipActionCheckbox = actionGroup.add("checkbox", undefined, "Skip Action");
                
        // Create group for Font Size of First Character
        var fontSizeFirstGroup = modifyPanel.add("group");
        fontSizeFirstGroup.orientation = "row";
        fontSizeFirstGroup.alignChildren = "left";
        fontSizeFirstGroup.add("statictext", undefined, "Font Size (First Character):");
        var fontSizeFirstInput = fontSizeFirstGroup.add("edittext", undefined, "");
        fontSizeFirstInput.preferredSize.width = 100;
        
        // Create group for Font Size of Last Character
        var fontSizeLastGroup = modifyPanel.add("group");
        fontSizeLastGroup.orientation = "row";
        fontSizeLastGroup.alignChildren = "left";
        fontSizeLastGroup.add("statictext", undefined, "Font Size (Last Character):");
        var fontSizeLastInput = fontSizeLastGroup.add("edittext", undefined, "");
        fontSizeLastInput.preferredSize.width = 100;


// Create Output panel
var outputPanel = win.add("panel", undefined, "Output");
outputPanel.alignChildren = "left";

        // Create group for Output Set 1
        var outputGroup1 = outputPanel.add("group");
        outputGroup1.orientation = "row";
        outputGroup1.alignChildren = "left";
        outputGroup1.add("statictext", undefined, "Output Set 1:");
        var outputInput1 = outputGroup1.add("edittext", undefined, "");
        outputInput1.preferredSize.width = 200;
        var outputBrowseButton1 = outputGroup1.add("button", undefined, "Browse");
        var outputClearButton1 = outputGroup1.add("button", undefined, "Clear");

        // Create group for Output Set 2
        var outputGroup2 = outputPanel.add("group");
        outputGroup2.orientation = "row";
        outputGroup2.alignChildren = "left";
        outputGroup2.add("statictext", undefined, "Output Set 2:");
        var outputInput2 = outputGroup2.add("edittext", undefined, "");
        outputInput2.preferredSize.width = 200;
        var outputBrowseButton2 = outputGroup2.add("button", undefined, "Browse");
        var outputClearButton2 = outputGroup2.add("button", undefined, "Clear");

// Create buttons panel
var buttonsPanel = win.add("group");
buttonsPanel.orientation = "row";
buttonsPanel.alignment = "center";
var cancelButton = buttonsPanel.add("button", undefined, "Close");
var defaultsButton = buttonsPanel.add("button", undefined, "Defaults");
var startButton = buttonsPanel.add("button", undefined, "Start");

// Event listeners
browseButton1.onClick = function() {
    var file1 = File.openDialog("Select a text file", "*.txt");
    if (file1) {
        input1.text = file1.fsName;
    }
};
clearButton1.onClick = function() {
    input1.text = "";
};
browseButton2.onClick = function() {
    var file2 = File.openDialog("Select a text file", "*.txt");
    if (file2) {
        input2.text = file2.fsName;
    }
};
fontSizeFirstInput.onChange = function() {
    if(isNaN(fontSizeFirstInput.text)) {
        alert("Please enter a valid number for the first character's font size.");
        fontSizeFirstInput.text = '';
    }
};

fontSizeLastInput.onChange = function() {
    if(isNaN(fontSizeLastInput.text)) {
        alert("Please enter a valid number for the last character's font size.");
        fontSizeLastInput.text = '';
    }
};
clearButton2.onClick = function() {
    input2.text = "";
};
keepWidthCheckbox.onClick = function() {
    if(keepWidthCheckbox.value) {
        dontModifyCheckbox.value = false;
        widthInput.text = '';
    }
};
dontModifyCheckbox.onClick = function() {
    if(dontModifyCheckbox.value) {
        keepWidthCheckbox.value = false;
        widthInput.text = '';
    }
};
widthInput.onChange = function() {
    if(widthInput.text != '') {
        keepWidthCheckbox.value = false;
        dontModifyCheckbox.value = false;
    }
};
keepHeightCheckbox.onClick = function() {
    if(keepHeightCheckbox.value) {
        dontModifyHeightCheckbox.value = false;
        heightInput.text = '';
    }
};
dontModifyHeightCheckbox.onClick = function() {
    if(dontModifyHeightCheckbox.value) {
        keepHeightCheckbox.value = false;
        heightInput.text = '';
    }
};
heightInput.onChange = function() {
    if(heightInput.text != '') {
        keepHeightCheckbox.value = false;
        dontModifyHeightCheckbox.value = false;
    }
};
skipActionCheckbox.onClick = function() {
    if(skipActionCheckbox.value) {
        actionInput.text = '';
    }
};
actionInput.onChange = function() {
    if(actionInput.text != '') {
        skipActionCheckbox.value = false;
    }
};
outputBrowseButton1.onClick = function() {
    var folder1 = Folder.selectDialog("Select a folder for Output Set 1");
    if (folder1) {
        outputInput1.text = folder1.fsName;
    }
};
outputClearButton1.onClick = function() {
    outputInput1.text = "";
};
outputBrowseButton2.onClick = function() {
    var folder2 = Folder.selectDialog("Select a folder for Output Set 2");
    if (folder2) {
        outputInput2.text = folder2.fsName;
    }
};
outputClearButton2.onClick = function() {
    outputInput2.text = "";
};
cancelButton.onClick = function() {
    win.close();
};
defaultsButton.onClick = function() {
    actionInput.text = 'Action 1';
    keepWidthCheckbox.value = true;
    dontModifyCheckbox.value = false;
    keepHeightCheckbox.value = false;
    dontModifyHeightCheckbox.value = true;
    input1.text = '';
    input2.text = '';
    outputInput1.text = '';
    outputInput2.text = '';
    fontSizeFirstInput.text = '';
    fontSizeLastInput.text = '';
};

startButton.onClick = function() {
    try {
        var names1 = importNames(input1.text) || defaultNames1;
        var names2 = importNames(input2.text) || defaultNames2;
        var width = keepWidthCheckbox.value ? 'keep' : (dontModifyCheckbox.value ? 'dontModify' : widthInput.text);
        var height = keepHeightCheckbox.value ? 'keep' : (dontModifyHeightCheckbox.value ? 'dontModify' : heightInput.text);
        var action = skipActionCheckbox.value ? '' : actionInput.text;
        var output1 = outputInput1.text;
        var output2 = outputInput2.text;
        var fontSizeFirst = fontSizeFirstInput.text;
        var fontSizeLast = fontSizeLastInput.text;

        var originalFileLocation = getFirstAiFile();
        if (originalFileLocation) { // If a .ai file was found
            // Run the script with the parameters from the UI
            runScript(names1, output1, height, action, width, fontSizeFirst, fontSizeLast, originalFileLocation);
            runScript(names2, output2, height, action, width, fontSizeFirst, fontSizeLast, originalFileLocation);
        }
    } catch (error) {
        alert("Error: " + error);
    }
};

// Set default values
actionInput.text = 'Action 1';
keepWidthCheckbox.value = true;
dontModifyCheckbox.value = false;
keepHeightCheckbox.value = false;
dontModifyHeightCheckbox.value = true;
input1.text = '';
input2.text = '';
fontSizeFirstInput.text = '';
fontSizeLastInput.text = '';

var scriptFile = new File($.fileName); // Get the current script file
var scriptFolder = scriptFile.parent; // Get the folder containing the script

var subFolder1 = new Folder(scriptFolder + "/frat_export"); // Specify the subfolder for output set 1
if (!subFolder1.exists) {
    subFolder1.create(); // If the subfolder doesn't exist, create it
}
outputInput1.text = subFolder1.fsName; // Set the default output location for output set 1

var subFolder2 = new Folder(scriptFolder + "/soro_export"); // Specify the subfolder for output set 2
if (!subFolder2.exists) {
    subFolder2.create(); // If the subfolder doesn't exist, create it
}
outputInput2.text = subFolder2.fsName; // Set the default output location for output set 2

win.show();
function runScript(names, outputLocation, height, action, width, fontSizeFirst, fontSizeLast, originalFileLocation) {
    for (var i = 0; i < names.length; i++) {
        var doc = app.open(new File(originalFileLocation)); // Open the original file
        app.activeDocument = doc; // Make the opened document the active document

        var textFrame = doc.pageItems.getByName("nameplaceholder"); // Get the text frame by name

        if (textFrame.typename !== "TextFrame") {
            alert("Error: 'nameplaceholder' is not a TextFrame.");
            return;
        }

        // Store the original position, width, and height of the text frame
        var originalPosition = textFrame.position;
        var originalWidth = textFrame.width;
        var originalHeight = textFrame.height;

        // Modify the text frame
        textFrame.contents = names[i]; // Change the contents to the current name

        // Change the font size of the first and last characters
var fontSizeFirstNum = parseFloat(fontSizeFirst);
var fontSizeLastNum = parseFloat(fontSizeLast);

if (!isNaN(fontSizeFirstNum) && textFrame.textRange.characters.length > 0) {
    textFrame.textRange.characters[0].characterAttributes.size = fontSizeFirstNum;
}

if (!isNaN(fontSizeLastNum) && textFrame.textRange.characters.length > 1) {
    textFrame.textRange.characters[textFrame.textRange.characters.length - 1].characterAttributes.size = fontSizeLastNum;
}

    /*
        // Change the font size of the first character
        if (textFrame.characters.length > 0) {
            var fontSizeFirstNum = parseFloat(fontSizeFirst);
            if (!isNaN(fontSizeFirstNum)) {
                textFrame.characters[0].characterAttributes.size = fontSizeFirstNum;
            }
        }

// Change the font size of all characters
var fontSizeFirstNum = parseFloat(fontSizeFirst);
var fontSizeLastNum = parseFloat(fontSizeLast);
if (!isNaN(fontSizeFirstNum) && !isNaN(fontSizeLastNum)) {
    // Change the font size of the first character
    if (textFrame.characters.length > 0) {
        textFrame.characters[0].characterAttributes.size = fontSizeFirstNum;
    }
    
    // Change the font size of the last visible character
    for (var j = textFrame.characters.length - 1; j > 0; j--) {
        if (textFrame.characters[j].contents.trim() !== "") {
            textFrame.characters[j].characterAttributes.size = fontSizeLastNum;
            break;
        }
    }
}
*/

        if (width === 'keep') {
            textFrame.width = originalWidth; // Set the width to the original width
        }
        else if (width !== 'dontModify') {
            textFrame.width = parseFloat(width);
        }
        if (height === 'keep') {
            textFrame.height = originalHeight; // Set the height to the original height
        }
        else if (height !== 'dontModify') {
            textFrame.height = parseFloat(height);
        }

        // Calculate the changes in width and height
        var deltaWidth = textFrame.width - originalWidth;
        var deltaHeight = textFrame.height - originalHeight;

        // Adjust the position of the text frame to maintain its center position
        textFrame.position = [originalPosition[0] - deltaWidth / 2, originalPosition[1] + deltaHeight / 2];

        // Select Object overrider
        app.selection = [textFrame];

        // Run the action
        if (action !== '') {
            app.doScript(action, "Default Actions");
        }

        // Attempt to rename the selected object
        if (app.selection.length > 0) {
            var selectedObject = app.selection[0];
            if ('name' in selectedObject) {
                selectedObject.name = "logo";
            } else {
                alert("The selected object cannot be renamed.");
            }
        } else {
            alert("No object selected.");
        }

        // Save the document to the output location
        var timestamp = new Date().getTime(); // Get the current timestamp
        var outputFile = new File(outputLocation + "/" + names[i] + ".ai");
        doc.saveAs(outputFile);

        doc.close(SaveOptions.DONOTSAVECHANGES); // Close the document without saving changes
    }
}