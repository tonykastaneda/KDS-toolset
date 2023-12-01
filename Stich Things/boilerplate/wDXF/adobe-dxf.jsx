#target illustrator

// get the folder that contains the script
var scriptFolder = (new File($.fileName)).parent;

// create output folder
var outputFolder = new Folder(scriptFolder + "/adobe-dxf");
if(!outputFolder.exists) {
    outputFolder.create();
}

// get all EPS files in the script folder
var epsFiles = scriptFolder.getFiles("*.eps");

// loop through all EPS files
for (var i = 0; i < epsFiles.length; i++) {
    // open the file
    var doc = app.open(epsFiles[i]);

    // create a new File object for the DXF
    var dxfFile = new File(outputFolder + "/" + doc.name.replace(".eps", ".dxf"));

    // set DXF save options
    var saveOptions = new ExportOptionsAutoCAD();
    saveOptions.exportFileFormat = AutoCADExportFileFormat.DXF;

    // save as DXF
    doc.exportFile(dxfFile, ExportType.AUTOCAD, saveOptions);

    // close the document
    doc.close(SaveOptions.DONOTSAVECHANGES);
}