(function() {
    function arrayContains(array, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] == value) {
                return true;
            }
        }
        return false;
    }

    // Get the files in the script's directory
    var scriptDir = File($.fileName).parent;
    var files = scriptDir.getFiles("*.ai");  // Adjust the file type if necessary

    // Create the output directory
    var outputDir = new Folder(scriptDir + "/logo_export");
    if (!outputDir.exists) {
        outputDir.create();
    }

    // Create the log file
    var logFile = new File(scriptDir + "/processed_log.txt");
    if (!logFile.exists) {
        logFile.open('w');
        logFile.close();
    }

    // Read the log file
    logFile.open('r');
    var processedFiles = logFile.read().split('\n');
    logFile.close();

    // Loop through each file
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        
        // Decode the file name to handle spaces correctly
        var decodedFileName = decodeURI(file.name.split('.')[0]);

        // Check if file has already been processed
        if (arrayContains(processedFiles, decodedFileName)) {
            continue;  // Skip to the next file if it has already been processed
        }

        // Open the document
        var doc = app.open(file);

        // Check if the item exists in the document
        if (doc.pageItems.getByName("logo") != null) {
            // Get the item by name
            var object1 = doc.pageItems.getByName("logo");

            // Select the object
            doc.selection = [object1];

            // Copy the selected item
            app.copy();

            // Create a new temporary document
            var tempDoc = app.documents.add();

            // Paste the item into the temporary document
            app.paste();

            // Select the pasted item
            var pastedItem = tempDoc.pageItems[0];

            // Resize the pasted item (800% scale)
            pastedItem.resize(800, 800, true, true, true, true, 800, Transformation.CENTER);

            // Create the PNG options
            var options = new ExportOptionsPNG24();
            options.antiAliasing = true;
            options.transparency = true;
            options.artBoardClipping = false;

            // Export the file
            tempDoc.exportFile(new File(outputDir + "/" + decodedFileName + ".png"), ExportType.PNG24, options);

            // Close the temporary document without saving
            tempDoc.close(SaveOptions.DONOTSAVECHANGES);

            // Close the original document without saving
            doc.close(SaveOptions.DONOTSAVECHANGES);
            
            // Write the processed file name to the log file
            logFile.open('a');
            logFile.writeln(decodedFileName);
            logFile.close();
        } else {
            // Close the original document without saving if logo doesn't exist
            doc.close(SaveOptions.DONOTSAVECHANGES);
        }
    }
})();