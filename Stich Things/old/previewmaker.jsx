#target illustrator

var rootFolder = new Folder(new File($.fileName).parent);
var previewFolder = new Folder(rootFolder + "/zPREVIEWS");

if(!previewFolder.exists)
    previewFolder.create();

processFiles(rootFolder);

function processFiles(folder) {
    var files = folder.getFiles();
    for(var i = 0; i < files.length; i++){
        if (files[i] instanceof Folder){
            processFiles(files[i]); // Recursive call for sub-folders
        } else if (files[i].name.indexOf("preview") === 0 && files[i].name.indexOf(".ai") !== -1){
            var doc = app.open(files[i]);
            var targetFile = new File(previewFolder + "/" + files[i].name.replace(".ai", ".png"));
            var pngSaveOptions = new ExportOptionsPNG24();
            pngSaveOptions.antiAliasing = true;
            pngSaveOptions.transparency = true;
            doc.exportFile(targetFile, ExportType.PNG24, pngSaveOptions);
            doc.close(SaveOptions.DONOTSAVECHANGES);
        }
    }
}