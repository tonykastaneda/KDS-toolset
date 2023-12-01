function replaceAll(str, find, replace) {
    return str.split(find).join(replace);
}

var folder = new File($.fileName).parent; 
var files = folder.getFiles("*.ai");

// Create a log file in the same folder as the script
var logFile = new File(folder.fsName + "/log.txt");
logFile.open("w");

for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var parts = file.name.split('-');
    var extractedName = decodeURI(parts[1]);
    extractedName = replaceAll(extractedName, "%20", " ");
    var number = parts[2].split('-')[0];

    // Write the extracted name and number to the log file
    logFile.writeln("File: " + file.name);
    logFile.writeln("Extracted Name: " + extractedName);
    logFile.writeln("Extracted Number: " + number);

    var doc = app.open(file);
    var namTextFrame = doc.textFrames.getByName("nam");

    namTextFrame.contents = extractedName;




    /*

    // If the name is longer than 6 characters
    if(extractedName.length > 6) {
        // Set the font size to 185pt
        namTextFrame.textRange.characterAttributes.size = 170;
        // Move the text frame up by half an inch (36 points in half an inch)
        namTextFrame.position = [namTextFrame.position[0], namTextFrame.position[1] + 36];
    }

    */

    
    // Loop over all text frames
    for (var j = 0; j < doc.textFrames.length; j++) {
        var textFrame = doc.textFrames[j];

        // Check if the text frame is named "numfront" or "numback"
        if (textFrame.name === "numfront" || textFrame.name === "numback") {
            textFrame.contents = number;
        }
    }

    doc.close(SaveOptions.SAVECHANGES);
}

// Close the log file
logFile.close();