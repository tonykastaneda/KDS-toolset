#target illustrator

// specify the folder
var inputFolder = Folder.selectDialog("Select the folder with .ai files");

if (inputFolder != null) {
    processFolder(inputFolder);
}

function processFolder(folder) {
    // get all files in the folder
    var files = folder.getFiles();

    // loop through all files
    for (var i = 0; i < files.length; i++) {
        var file = files[i];

        if (file instanceof Folder) {
            // if it's a folder, recurse
            processFolder(file);
        } else if (file.name === "outline.ai") {
            // if it's a file named "outline.ai", process it
            processFile(file);
        }
    }
}

function processFile(file) {
    // open the file
    var doc = app.open(file);

    // specify the EPS save options
    var opts = new EPSSaveOptions();
    opts.cmykPostScript = true;

    // construct the output file name
    var outputFile = new File(file.path + "/" + file.name.replace(".ai", ".eps"));

    // save as eps
    doc.saveAs(outputFile, opts);

    // close the document
    doc.close(SaveOptions.DONOTSAVECHANGES);
}