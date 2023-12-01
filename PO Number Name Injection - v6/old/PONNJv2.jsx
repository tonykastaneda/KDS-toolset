var folder = new File($.fileName).parent; 
var files = folder.getFiles("*.ai");

// Create a log file in the same folder as the script
var logFile = new File(folder.fsName + "/log.txt");
logFile.open("w");

for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var parts = file.name.split('-');
    var extractedName = decodeURI(parts[1]); // decodeURI will change '%20' into spaces
    var number = parts[2].split('-')[0];

    // Write the extracted name and number to the log file
    logFile.writeln("File: " + file.name);
    logFile.writeln("Extracted Name: " + extractedName);
    logFile.writeln("Extracted Number: " + number);

    var doc = app.open(file);
    var namTextFrame = doc.textFrames.getByName("nam");
    var numFrontTextFrame = doc.textFrames.getByName("numfront");
    var numBackTextFrame = doc.textFrames.getByName("numback");

    namTextFrame.contents = extractedName;
    numFrontTextFrame.contents = number;
    numBackTextFrame.contents = number;

    // If the name is longer than 6 characters
    if(extractedName.length > 6) {
        // Set the font size to 175pt
        namTextFrame.textRange.characterAttributes.size = 175;
        // Move the text frame up by an inch (72 points in an inch)
        namTextFrame.position = [namTextFrame.position[0], namTextFrame.position[1] + 72];
    }

    doc.close(SaveOptions.SAVECHANGES);
}

// Close the log file
logFile.close();