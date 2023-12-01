var folder = new File($.fileName).parent;
var files = folder.getFiles("*.ai");

for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var doc = app.open(file);

    // Unlock all visible layers in the document
    for (var k = 0; k < doc.layers.length; k++) {
        if(doc.layers[k].visible) { // Skip if layer is hidden
            doc.layers[k].locked = false;
            
            // Select all items in the visible layer
            for (var j = 0; j < doc.layers[k].pageItems.length; j++) {
                doc.layers[k].pageItems[j].selected = true;
            }
            
            // Convert selected text to outlines
            app.executeMenuCommand('outline');
        }
    }

    // Save and close the document
    doc.save();
    doc.close();
}