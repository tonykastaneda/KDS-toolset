var scriptFile = new File($.fileName);
var inputFolder = scriptFile.parent;

var pngOutputFolder = new Folder(inputFolder + "/png_output");
var jpegOutputFolder = new Folder(inputFolder + "/jpeg_output");

if (!pngOutputFolder.exists) {
    pngOutputFolder.create();
}

if (!jpegOutputFolder.exists) {
    jpegOutputFolder.create();
}

var files = inputFolder.getFiles("*.ai");

for (var i = 0; i < files.length; i++) {
    var doc = app.open(files[i]);

    // Save as PNG
    var pngFile = new File(pngOutputFolder + "/" + doc.name.split('.')[0] + ".png");
    var pngExportOpts = new ExportOptionsPNG24();
    pngExportOpts.transparency = true;
    pngExportOpts.artBoardClipping = true;
    doc.exportFile(pngFile, ExportType.PNG24, pngExportOpts);

    // Save as JPEG
    var jpegFile = new File(jpegOutputFolder + "/" + doc.name.split('.')[0] + ".jpg");
    var jpegExportOpts = new ExportOptionsJPEG();
    jpegExportOpts.qualitySetting = 100;
    jpegExportOpts.artBoardClipping = true;
    doc.exportFile(jpegFile, ExportType.JPEG, jpegExportOpts);

    doc.close(SaveOptions.DONOTSAVECHANGES);
}
