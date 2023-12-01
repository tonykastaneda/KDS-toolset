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

// Create main window
var win = new Window("dialog", "Script UI");

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
var dontModifyCheckbox = widthGroup.add("checkbox", undefined, "Don’t Modify");

// Create group for Height
var heightGroup = modifyPanel.add("group");
heightGroup.orientation = "row";
heightGroup.alignChildren = "left";
heightGroup.add("statictext", undefined, "Height in Pixels:");
var heightInput = heightGroup.add("edittext", undefined, "");
heightInput.preferredSize.width = 100;
var keepHeightCheckbox = heightGroup.add("checkbox", undefined, "Keep Text Frame Height");
var dontModifyHeightCheckbox = heightGroup.add("checkbox", undefined, "Don’t Modify");

// Create group for Actions
var actionGroup = modifyPanel.add("group");
actionGroup.orientation = "row";
actionGroup.alignChildren = "left";
actionGroup.add("statictext", undefined, "Name of Action:");
var actionInput = actionGroup.add("edittext", undefined, "");
actionInput.preferredSize.width = 200;
var skipActionCheckbox = actionGroup.add("checkbox", undefined, "Skip Action");

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
var cancelButton = buttonsPanel.add("button", undefined, "Cancel");
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
};
startButton.onClick = function() {
    // Start the script with the user defined parameters
};

// Set default values
actionInput.text = 'Action 1';
keepWidthCheckbox.value = true;
dontModifyCheckbox.value = false;
keepHeightCheckbox.value = false;
dontModifyHeightCheckbox.value = true;
input1.text = '';
input2.text = '';
outputInput1.text = '';
outputInput2.text = '';

win.show();




function runScript(names, outputLocation, height, action, width) {
    var doc = app.activeDocument; // Get the active document

    for (var i = 0; i < names.length; i++) {
        var textFrame = doc.textFrames.itemByName("nameplaceholder"); // Get the text frame by name

        // Modify the text frame
        textFrame.contents = names[i]; // Change the contents to the current name

        // If width or height aren't 'keep' or 'dontModify', set them
        if (width !== 'keep' && width !== 'dontModify') {
            textFrame.width = width;
        }
        if (height !== 'keep' && height !== 'dontModify') {
            textFrame.height = height;
        }

        // If an action is defined, do the action
        if (action) {
            app.doScript(action, ScriptLanguage.JAVASCRIPT);
        }

        // Save the document to the output location
        var outputFile = new File(outputLocation + "/" + names[i] + ".ai");
        doc.saveAs(outputFile);
    }
}