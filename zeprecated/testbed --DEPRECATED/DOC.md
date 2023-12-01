# KDSUI 1.01b - The Doc

## INTRODUCTION - HIGHLEVEL
This script is designed to automate a specific task in Adobe Illustrator: creating batch oprorations. The script achieves this by reading names from a text file, modifying the dimensions of a text frame in an Illustrator document, applying a specified action to the text frame, and then exporting the resulting graphic to a designated location. 

## Function Definitions

### `importNames(fileLocation)`
This function is responsible for reading a text file and returning an array of names. The text file is expected to contain one name per line. The function works by creating a File object with the given file location, opening the file in read mode, initializing an empty array to hold the names, and then entering a loop that continues until the end of the file (EOF) is reached. In each iteration of the loop, a line is read from the file and pushed onto the array. Once the EOF is reached, the file is closed and the array of names is returned.

```javascript
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
```

### `runScript(names, output, height, action, width, skipAction, skipHeight)`
This function is the workhorse of the script, performing the main operations. It takes seven parameters: an array of names, an output directory, a height and width for the text frame, an action to be applied, and two boolean flags indicating whether to skip applying the action and setting the height. 

The function begins by opening an Illustrator file. It then enters a loop that iterates over each name in the array. In each iteration, it modifies the dimensions of a text frame named "nameplaceholder", applies the specified action (if not skipped), and exports the resulting graphic to the specified output directory. 

The function also handles some edge cases, such as creating the output directory if it doesn't already exist, and closing the Illustrator file without saving changes after each iteration to prevent unintentional modifications to the original file.

```javascript
function runScript(names, output, height, action, width, skipAction, skipHeight) {
    // ... function implementation ...
}
```

### `resetState()`
This function is responsible for reopening the original Illustrator file in order to reset the state for the next name in the list. It does this by getting the path to the folder containing the script, getting a list of all the files in the folder, looping through the files until it finds an Illustrator file, and then opening that file.

```javascript
function resetState() {
    // ... function implementation ...
}
```

## User Interface
The script provides a graphical user interface (GUI) in the form of a dialog box that appears when the script is run in Adobe Illustrator. The dialog box is divided into three panels: Import, Modify, and Output. Each panel contains several input fields and buttons that allow the user to customize the behavior of the script. > **Note:** Please see the Lower Level documentation on the UI and how its laid out

## Usage Instructions
To use the script, follow these steps:

1. Run the script in Adobe Illustrator. A dialog box will appear.
2. In the Import panel, specify the text files containing the fraternity and sorority names, or leave these fields blank to use the default names provided in the script.
3. In the Modify panel, specify the desired text width and height, and the action to be applied. Check the appropriate boxes if you wish to skip modifying the width, height, or applying the action.
4. In the Output panel, specify the directories where the resulting graphics should be saved.
5. Click the "Start" button to run the script with the specified settings. If you wish to reset all fields to their default values, click the "Defaults" button.

## Additional Notes
The script is designed with certain assumptions and behaviors in mind. It assumes that the text to be modified in the Illustrator file is named "nameplaceholder". If the specified output directories do not exist, the script will create them. After each name is processed, the script closes the Illustrator file without saving changes to prevent unintentional modifications to the original file.





# USER INTERFACE

## Dialog Creation

The script begins by creating a dialog box. This box will serve as the main interface for the user to interact with the script.

```javascript
var dialog = new Window("dialog", "KDSUI v1.01b");
dialog.orientation = 'column';
dialog.alignChildren = ['left', 'top'];
dialog.spacing = 10;
dialog.margins = 16;
dialog.preferredSize.width = 400;
```

## Import Panel

The Import panel is where the user can specify the text files from which the fraternity and sorority names should be imported.

```javascript
var importPanel = dialog.add("panel", undefined, "Import");
importPanel.orientation = 'column';
importPanel.alignChildren = ['left', 'top'];
importPanel.spacing = 10;
importPanel.margins = 16;
```

### Fraternity Names Import Option

This section allows the user to import a text file containing the names of fraternities.

```javascript
var fratNamesGroup = importPanel.add("group");
fratNamesGroup.add("statictext", undefined, "Fraternities Names:");
var fratNamesInput = fratNamesGroup.add("edittext", undefined, "");
fratNamesInput.characters = 20;
var fratNamesButton = fratNamesGroup.add("button", undefined, "Import");
fratNamesButton.onClick = function () {
    var file = File.openDialog("Select a text file for Frat Names");
    if (file) fratNamesInput.text = file.fsName;
}
```

### Sorority Names Import Option

This section allows the user to import a text file containing the names of sororities.

```javascript
var soroNamesGroup = importPanel.add("group");
soroNamesGroup.add("statictext", undefined, "Sororities Names:");
var soroNamesInput = soroNamesGroup.add("edittext", undefined, "");
soroNamesInput.characters = 20;
var soroNamesButton = soroNamesGroup.add("button", undefined, "Import");
soroNamesButton.onClick = function () {
    var file = File.openDialog("Select a text file for Soro Names");
    if (file) soroNamesInput.text = file.fsName;
}
```

## Modify Panel

The Modify panel is where the user can specify the dimensions of the text frame and the action to be applied to it.

```javascript
var modifyPanel = dialog.add("panel", undefined, "Modify");
modifyPanel.orientation = 'column';
modifyPanel.alignChildren = ['left', 'top'];
modifyPanel.spacing = 10;
modifyPanel.margins = 16;
```

### Text Width Option

This section allows the user to specify the width of the text frame.

```javascript
var widthGroup = modifyPanel.add("group");
widthGroup.add("statictext", undefined, "Text Width in px:");
var widthInput = widthGroup.add("edittext", undefined, "");
widthInput.characters = 5;
widthInput.onChanging = function () {
    if (widthInput.text !== "") {
        widthCheckbox.value = false;
    }
}
```

### Text Height Option

This section allows the user to specify the height of the text frame.

```javascript
var heightGroup = modifyPanel.add("group");
heightGroup.add("statictext", undefined, "Text Height in px:");
var heightInput = heightGroup.add("edittext", undefined, "");
heightInput.characters = 5;
heightInput.onChanging = function () {
    if (heightInput.text !== "") {
        skipHeightCheckbox.value = false;
    }
}
```

### Action Option

This section allows the user to specify the action to be applied to the text frame.

```javascript
var actionGroup = modifyPanel.add("group");
actionGroup.add("statictext", undefined, "Action Name:");
var actionInput = actionGroup.add("edittext", undefined, "Action 1");
actionInput.characters = 10;
actionInput.onChanging = function () {
    if (actionInput.text !== "") {
        skipActionCheckbox.value = false;
    }
}
```

## Output Panel

The Output panel is where the user can specify the directories where the resulting graphics should be saved.

```javascript
var outputPanel = dialog.add("panel", undefined, "Output");
outputPanel.orientation = 'column';
outputPanel.alignChildren = ['left', 'top'];
outputPanel.spacing = 10;
outputPanel.margins = 16;
```

### Fraternity Output Location Option

This section allows the user to specify the output location for the fraternity graphics.

```javascript
var fratOutputGroup = outputPanel.add("group");
fratOutputGroup.add("statictext", undefined, "Fraternities Output:");
var fratOutputInput = fratOutputGroup.add("edittext", undefined, fratOutput);
fratOutputInput.characters = 20;
var fratOutputButton = fratOutputGroup.add("button", undefined, "Browse");
fratOutputButton.onClick = function () {
    var folder = Folder.selectDialog("Select a folder for Frat Output");
    if (folder) fratOutputInput.text = folder.fsName;
}
```

### Sorority Output Location Option

This section allows the user to specify the output location for the sorority graphics.

```javascript
var soroOutputGroup = outputPanel.add("group");
soroOutputGroup.add("statictext", undefined, "Sororities Output:");
var soroOutputInput = soroOutputGroup.add("edittext", undefined, soroOutput);
soroOutputInput.characters = 20;
var soroOutputButton = soroOutputGroup.add("button", undefined, "Browse");
soroOutputButton.onClick = function () {
    var folder = Folder.selectDialog("Select a folder for Soro Output");
    if (folder) soroOutputInput.text = folder.fsName;
}
```

## Buttons

The script includes three buttons: Cancel, Defaults, and Start. The Cancel button closes the dialog box, the Defaults button resets all fields to their default values, and the Start button runs the script with the specified settings.

```javascript
var buttonGroup = dialog.add("group");
buttonGroup.alignment = 'center';

var cancelButton = buttonGroup.add("button", undefined, "Cancel");
var defaultsButton = buttonGroup.add("button", undefined, "Defaults");
var startButton = buttonGroup.add("button", undefined, "Start");
startButton.graphics.foregroundColor = startButton.graphics.newPen(startButton.graphics.PenType.SOLID_COLOR, [0, 0, 1], 1);
```

## Event Listeners

The script includes event listeners for each of the buttons. The Cancel button's event listener closes the dialog box, the Defaults button's event listener resets all fields to their default values, and the Start button's event listener runs the script with the specified settings.

```javascript
cancelButton.onClick = function () {
    dialog.close();
}

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
```





# EVENT LISTENRS

### Cancel Button Event Listener

This event listener is triggered when the "Cancel" button is clicked. It closes the dialog box.

```javascript
cancelButton.onClick = function () {
    dialog.close();
}
```

### Defaults Button Event Listener

This event listener is triggered when the "Defaults" button is clicked. It resets all the input fields and checkboxes to their default values.

```javascript
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
```

### Start Button Event Listener

This event listener is triggered when the "Start" button is clicked. It performs the following actions:

1. Imports the fraternity and sorority names from the specified text files (or uses the default names if no files were specified).
2. Sets the output paths for the fraternity and sorority graphics (or uses the default paths if none were specified).
3. Runs the script with the specified settings for the fraternity names.
4. Resets the state of the Illustrator file.
5. Runs the script with the specified settings for the sorority names.
6. Closes the dialog box.

```javascript
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
```

In this context, `runScript` is a function that opens an Illustrator file, modifies the dimensions of the text frame, applies an action, and exports the result to a specified location. The `resetState` function reopens the original Illustrator file to reset the state for the next name in the list.  


# SCRIPT STRUCTURE

The script must be ran in this order to maintain consistency. If you wish to add on to this do so at the end of the chain before the Save function here:
```javascript
var file = new File(folder.fsName + "/" + names[i] + ".ai");
var saveOptions = new IllustratorSaveOptions();
doc.saveAs(file, saveOptions);
```



## Script Run In Order

**Get the path of the current (active) document:** This line retrieves the full file path of the currently active Illustrator document.

    ```javascript
    var docPath = app.activeDocument.fullName;
    ```

**Create the subfolder if it doesn't exist:** This block of code checks if the output folder exists. If it does not, it creates it.

    ```javascript
    var folder = new Folder(output);
    if (!folder.exists) {
        folder.create();
    }
    ```

**Loop through the array of names:** This loop iterates over each name in the provided list.

    ```javascript
    for (var i = 0; i < names.length; i++) {
    ```

**Reopen the document:** This line opens the original Illustrator document for each iteration of the loop.

    ```javascript
    var doc = app.open(docPath);
    ```

**Get the specific text frame by its name:** This line retrieves the text frame named "nameplaceholder" from the document.

    ```javascript
    var textFrame = doc.pageItems.getByName("nameplaceholder");
    ```

**Get the width of the text frame:** This line retrieves the width of the text frame, or uses the provided width if one was specified.

    ```javascript
    var desiredWidth = width || textFrame.width;
    ```

**Replace the text in the text frame:** This line replaces the placeholder text in the text frame with the current name from the list.

    ```javascript
    textFrame.contents = names[i];
    ```

**Get the current width of the text frame:** This line retrieves the current width of the text frame after the text has been replaced.

    ```javascript
    var currentWidth = textFrame.width;
    ```

**Calculate the ratio of the desired width to the current width:** This line calculates the ratio between the desired width and the current width of the text frame.

    ```javascript
    var ratio = desiredWidth / currentWidth;
    ```

**Adjust the font size based on the ratio:** This line scales the font size in the text frame based on the calculated ratio.

    ```javascript
    textFrame.textRange.characterAttributes.size *= ratio;
    ```

**Set the height of the text frame:** If the `skipHeight` option is not enabled, this line sets the height of the text frame to the provided value.

    ```javascript
    if (!skipHeight) {
        textFrame.height = height;
    }
    ```

**Select the text frame:** This line selects the text frame in the Illustrator document.

    ```javascript
    textFrame.selected = true;
    ```

**Run the action:** If the `skipAction` option is not enabled, this line runs the specified action on the selected text frame.

    ```javascript
    if (!skipAction) {
        app.doScript(action, "Default Actions");
    }
    ```

**Save a copy of the document with the new name:** This block of code saves a copy of the modified document in the output folder, with the current name from the list as the filename.

    ```javascript
    var file = new File(folder.fsName + "/" + names[i] + ".ai");
    var saveOptions = new IllustratorSaveOptions();
    doc.saveAs(file, saveOptions);
    ```

**Close the document without saving:** This line closes the modified document without saving the changes, so that the original document remains unchanged for the next iteration of the loop.

    ```javascript
    doc.close(SaveOptions.DONOTSAVECHANGES);
    ```
    

# LAUNCHER --*WIP*--