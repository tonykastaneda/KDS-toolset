if (app.documents.length > 0) {
    var doc = app.activeDocument;
    if (doc.selection.length > 0) {
        var selectedObject = doc.selection[0];
        var appearance = selectedObject.appliedEffect;
        var message = "Selected object appearance details:\n";

        // Check if the selected object has any applied effects
        if (appearance.length > 0) {
            for (var i = 0; i < appearance.length; i++) {
                message += "\nEffect " + (i + 1) + ":";
                message += "\nEffect name: " + appearance[i].effectName;
                message += "\nEffect parameters: " + JSON.stringify(appearance[i].parameters);
            }
        } else {
            message += "\nNo effects applied to the selected object.";
        }

        // Display the message
        alert(message);
    } else {
        alert("No object selected.");
    }
} else {
    alert("No open documents.");
}