// Predefined names
var defaultNames1 = ["Acacia", "Alpha Epsilon Pi", "Alpha Gamma Delta", "Alpha Gamma Rho", "Alpha Kappa Lambda",
"Alpha Sigma Phi", "Alpha Tau Omega", "Beta Theta Pi", "Chi Phi", "Chi Psi", "Delta Chi",
"Delta Kappa Epsilon", "Delta Sigma Phi", "Delta Tau Delta", "Delta Upsilon", "Kappa Alpha",
"Kappa Delta Rho", "Kappa Sigma", "Lambda Chi Alpha", "Lambda Phi Epsilon", "Phi Gamma Delta",
"Phi Kappa Psi", "Phi Kappa Sigma", "Phi Kappa Tau", "Phi Kappa Theta", "Phi Sigma Kappa",
"Pi Alpha Phi", "Pi Kappa Alpha", "Pi Kappa Phi", "Sigma Alpha Epsilon", "Sigma Alpha Mu",
"Sigma Chi", "Sigma Nu", "Sigma Phi Epsilon", "Sigma Pi", "Sigma Tau Gamma", "Tau Kappa Epsilon",
"Theta Chi", "Theta Xi", "Zeta Beta Tau", "Zeta Psi", "Zeta Phi Rho"];

var defaultNames2 = ["Alpha Chi Omega", "Alpha Delta Pi", "Alpha Kappa Delta Phi", "Alpha Omicron Pi", "Alpha Phi",
"Chi Omega", "Tri Delta", "Delta Gamma", "Delta Phi Epsilon", "Gamma Phi Beta", "Kappa Alpha Theta",
"Kappa Kappa Gamma", "Kappa Delta", "Pi Beta Phi", "Sigma Kappa", "Zeta Tau Alpha"];

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

function handleCheckboxClick(checkbox, oppositeCheckbox, inputField) {
    checkbox.onClick = function() {
        if(checkbox.value) {
            oppositeCheckbox.value = false;
            inputField.text = '';
        }
    };
}

function handleInputChange(inputField, checkbox1, checkbox2) {
    inputField.onChanging = function() {
        if(inputField.text != '') {
            checkbox1.value = false;
            checkbox2.value = false;
        }
    };
}

function handleBrowseButtonClick(button, inputField, dialogTitle, isFolder) {
    button.onClick = function() {
        var fileOrFolder = isFolder ? Folder.selectDialog(dialogTitle) : File.openDialog(dialogTitle, "*.txt");
        if (fileOrFolder) {
            inputField.text = fileOrFolder.fsName;
        }
    };
}

function handleClearButtonClick(button, inputField) {
    button.onClick = function() {
        inputField.text = "";
    };
}

// Create main window
var win = new Window("dialog", "KDSUI v1.5b");

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
handleBrowseButtonClick(browseButton1, input1, "Select a text file");
handleClearButtonClick(clearButton1, input1);
handleBrowseButtonClick(browseButton2, input2, "Select a text file");
handleClearButtonClick(clearButton2, input2);
handleCheckboxClick(keepWidthCheckbox, dontModifyCheckbox, widthInput);
handleCheckboxClick(dontModifyCheckbox, keepWidthCheckbox, widthInput);
handleInputChange(widthInput, keepWidthCheckbox, dontModifyCheckbox);
handleCheckboxClick(keepHeightCheckbox, dontModifyHeightCheckbox, heightInput);
handleCheckboxClick(dontModifyHeightCheckbox, keepHeightCheckbox, heightInput);
handleInputChange(heightInput, keepHeightCheckbox, dontModifyHeightCheckbox);
handleCheckboxClick(skipActionCheckbox, null, actionInput);
handleInputChange(actionInput, skipActionCheckbox, null);
handleBrowseButtonClick(outputBrowseButton1, outputInput1, "Select a folder for Output Set 1", true);
handleClearButtonClick(outputClearButton1, outputInput1);
handleBrowseButtonClick(outputBrowseButton2, outputInput2, "Select a folder for Output Set 2", true);
handleClearButtonClick(outputClearButton2, outputInput2);

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
    outputInput1.text = subFolder1.fsName; // Reset output location for output set 1
    outputInput2.text = subFolder2.fsName; // Reset output location for output set 2
    fontSizeFirstInput.text = ''; // Reset font size for first character
    fontSizeLastInput.text = ''; // Reset font size for last character
    widthInput.text = '';
    heightInput.text = '';
};

startButton.onClick = function() {
    var fileLocation = getFirstAiFile();

    if (fileLocation === null) {
        return;
    }

    var names1 = importNames(input1.text) || defaultNames1;
    var names2 = importNames(input2.text) || defaultNames2;

    var width = widthInput.text !== '' ? widthInput.text : (keepWidthCheckbox.value ? 'keep' : 'dontModify');
    var height = heightInput.text !== '' ? heightInput.text : (keepHeightCheckbox.value ? 'keep' : 'dontModify');
    var action = actionInput.text !== '' ? actionInput.text : (skipActionCheckbox.value ? '' : 'Default Action');

    var fontSizeFirst = fontSizeFirstInput.text !== '' ? parseFloat(fontSizeFirstInput.text) : 0;
    var fontSizeLast = fontSizeLastInput.text !== '' ? parseFloat(fontSizeLastInput.text) : 0;

    runScript(names1, outputInput1.text, height, action, width, fileLocation, fontSizeFirst, fontSizeLast);
    runScript(names2, outputInput2.text, height, action, width, fileLocation, fontSizeFirst, fontSizeLast);
};

// Set default values
actionInput.text = 'Action 1';
keepWidthCheckbox.value = true;
dontModifyCheckbox.value = false;
keepHeightCheckbox.value = false;
dontModifyHeightCheckbox.value = true;
input1.text = '';
input2.text = '';

var scriptFile = new File($.fileName); // Get the current script file
var scriptFolder = scriptFile.parent; // Get the folder containing the script

var subFolder1 = new Folder(scriptFolder + "/set1_export"); // Specify the subfolder for output set 1
if (!subFolder1.exists) {
    subFolder1.create(); // If the subfolder doesn't exist, create it
}
outputInput1.text = subFolder1.fsName; // Set the default output location for output set 1

var subFolder2 = new Folder(scriptFolder + "/set2_export"); // Specify the subfolder for output set 2
if (!subFolder2.exists) {
    subFolder2.create(); // If the subfolder doesn't exist, create it
}
outputInput2.text = subFolder2.fsName; // Set the default output location for output set 2

win.show();

function runScript(names, outputLocation, height, action, width, originalFileLocation, fontSizeFirst, fontSizeLast) {
    for (var i = 0; i < names.length; i++) {
        var doc = app.open(new File(originalFileLocation)); 
        app.activeDocument = doc; 

        var textFrame = doc.pageItems.getByName("nameplaceholder"); 

        if (textFrame.typename !== "TextFrame") {
            alert("Error: 'nameplaceholder' is not a TextFrame.");
            return;
        }

        var originalPosition = textFrame.position;
        var originalWidth = textFrame.width;
        var originalHeight = textFrame.height;

        textFrame.contents = names[i]; 

        if (fontSizeFirst !== 0 && textFrame.textRange.characters.length > 0) {
            textFrame.textRange.characters[0].characterAttributes.size = fontSizeFirst;
        }
        if (fontSizeLast !== 0 && textFrame.textRange.characters.length > 1) {
            textFrame.textRange.characters[textFrame.textRange.characters.length - 1].characterAttributes.size = fontSizeLast;
        }

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

        // Run the action
        if (action !== '') {
            app.selection = [textFrame];
            app.doScript(action, "Default Actions");
        }

        // Save the document to the output location
        var timestamp = new Date().getTime(); // Get the current timestamp
        var outputFile = new File(outputLocation + "/" + names[i] + "_" + timestamp + ".ai");
        doc.saveAs(outputFile);

        doc.close(SaveOptions.DONOTSAVECHANGES); // Close the document without saving changes
    }
}