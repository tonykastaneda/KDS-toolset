// Define the subfolder name where PNG files will be saved
var subfolderName = "mockup_pngs";

// Get the folder where the script is located
var scriptFolder = Folder($.fileName).parent;

// Create a subfolder within the script folder to save the PNG files
var subfolder = new Folder(scriptFolder + "/" + subfolderName);
if (!subfolder.exists) {
  subfolder.create();
}

// Function to export a document as PNG
function exportAsPNG(doc, outputPath) {
  var pngOptions = new ExportOptionsSaveForWeb();
  pngOptions.format = SaveDocumentType.PNG;
  pngOptions.PNG8 = false;

  doc.exportDocument(new File(outputPath), ExportType.SAVEFORWEB, pngOptions);
}

// Main function to process the opened PSD files
function processPSDFiles() {
  // Get all the Photoshop files (PSD) in the script folder
  var files = scriptFolder.getFiles("*.psd");

  // Loop through each Photoshop file and export as PNG
  for (var i = 0; i < files.length; i++) {
    var file = files[i];

    // Open the PSD file
    app.open(file);

    // Get the active document
    var doc = app.activeDocument;

    // Generate the output path for the PNG file
    var outputPath = subfolder + "/" + doc.name.replace(".psd", "") + ".png";

    // Export the document as PNG
    exportAsPNG(doc, outputPath);

    // Close the document without saving changes
    doc.close(SaveOptions.DONOTSAVECHANGES);
  }

  // Notify completion
  alert("PNG export completed!");
}

// Check if the script is run from File -> Scripts or dragged into Photoshop
if (app.documents.length === 0) {
  // If no documents are open, run the script on the files in the script folder
  processPSDFiles();
} else {
  // If documents are open, run the script on the active document
  var activeDocument = app.activeDocument;
  exportAsPNG(activeDocument, subfolder + "/" + activeDocument.name.replace(".psd", "") + ".png");
  alert("PNG export completed!");
}