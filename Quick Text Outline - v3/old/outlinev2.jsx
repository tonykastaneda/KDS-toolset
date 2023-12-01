var folder = new File($.fileName).parent;
var files = folder.getFiles("*.ai");

for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var doc = app.open(file);

    // Unlock all layers in the document
    for (var k = 0; k < doc.layers.length; k++) {
        doc.layers[k].locked = false;
    }

    // Select all items in the document
    for (var j = 0; j < doc.pageItems.length; j++) {
        doc.pageItems[j].selected = true;
    }

    // Convert selected text to outlines
    app.executeMenuCommand('outline');

    // Save and close the document
    doc.save();
    doc.close();
}