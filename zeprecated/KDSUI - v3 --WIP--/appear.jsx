    var doc = app.activeDocument; // the active document

// Check if an object is selected
if (doc.selection.length > 0) {
    var selectedObj = doc.selection[0]; // the first selected object

    // Get the appearance of the selected object
    var selectedAppearance = selectedObj.graphicStyles[0].appliedGraphicStyle;

    // Find the TextFrame named "come" in the topmost layer
    var topLayer = doc.layers[0]; // the topmost layer
    for (var i = 0; i < topLayer.textFrames.length; i++) {
        var textFrame = topLayer.textFrames[i];
        if (textFrame.name == "come") {
            // Apply the appearance to the TextFrame
            textFrame.graphicStyles[0].appliedGraphicStyle = selectedAppearance;
            break;
        }
    }
} else {
    alert("Please select an object.");
}