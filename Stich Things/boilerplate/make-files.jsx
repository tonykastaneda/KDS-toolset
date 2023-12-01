#target illustrator

// Create log file
var scriptFile = new File($.fileName);
var logFile = new File(scriptFile.path + "/make-log.txt");
if(!logFile.exists) {
    logFile.open('w');
    logFile.close();
}

// Function to search folders recursively
function searchFolders(folder) {
    var files = folder.getFiles();
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        if (file instanceof Folder) {
            searchFolders(file);
        } else if (file instanceof File && file.name.match(/_.*\.ai$/) && file.name.indexOf("Block_") == -1) {
            processFile(file);
        }
    }
}

// Function to process each file
function processFile(file) {
    // Check if file has already been processed
    logFile.open('r');
    var log = logFile.read();
    logFile.close();
    if(log.indexOf(file.name) != -1) {
        return; // Skip this file
    }

    var doc = app.open(file);
    var number = file.name.split('-')[1].split('.')[0];
    doc.saveAs(new File(file.path + "/outline-" + number + ".ai"));
    doc.close();
    
    doc = app.open(file);
    doc.saveAs(new File(file.path + "/preview-" + number + ".ai"));
    doc.close();

    // Log that this file has been processed
    logFile.open('a');
    logFile.writeln(file.name);
    logFile.close();
}

// Start the script
var rootFolder = scriptFile.parent;
searchFolders(rootFolder);