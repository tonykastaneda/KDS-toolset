var folder = new File($.fileName).parent;
var files = folder.getFiles("*.ai");

for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var doc = app.open(file);

    // Convert all text frames to outlines
    for (var j = 0; j < doc.textFrames.length; j++) {
        var textFrame = doc.textFrames[j];

        // Check if the layer is locked or if the text frame is locked
        if (!textFrame.layer.locked && !textFrame.locked) {
            textFrame.createOutline();
        }
    }

    // Save and close the document
    doc.save();
    doc.close();
}