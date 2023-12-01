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

    // If the file name contains 'NN'
    if(file.name.indexOf('NN') !== -1) {
        // Delete the 'nam' text frame
        namTextFrame.remove();
    } else {
        namTextFrame.contents = extractedName;

        // Commented out the following block of code
   
   
   
        /*
   
   
   
   
   
   
        // If the name is longer than 6 characters
        if(extractedName.length > 6) {
            // Set the font size to 185pt
            namTextFrame.textRange.characterAttributes.size = 185;
            // Move the text frame up by half an inch (36 points in half an inch)
            namTextFrame.position = [namTextFrame.position[0], namTextFrame.position[1] + 36];
        }
   
   
   
   
   
        */
    }

    // Loop over all text frames
    for (var j = 0; j < doc.textFrames.length; j++) {
        var textFrame = doc.textFrames[j];

        // Check if the text frame is named "numfront" or "numback"
        if (textFrame.name === "numfront" || textFrame.name === "numback") {
            // If the file name contains 'NN'
            if(file.name.indexOf('NN') !== -1) {
                // Put the second number into the text object
                textFrame.contents = parts[1];
            } else {
                textFrame.contents = number;
            }
        }
    }

    doc.close(SaveOptions.SAVECHANGES);
}

// Close the log file
logFile.close();