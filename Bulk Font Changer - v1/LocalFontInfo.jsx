#target illustrator

if (app.documents.length > 0) {
    var doc = app.activeDocument;
    if (doc.selection.length > 0 && doc.selection[0].typename == "TextFrame") {
        var textFrame = doc.selection[0];
        var font = textFrame.textRange.characterAttributes.textFont;
        
        alert("Font name: " + font.name + "\n" +
              "PostScript name: " + font.postScriptName + "\n" +
              "Family: " + font.family + "\n" +
              "Style: " + font.style);
    } else {
        alert("Please select a text frame.");
    }
}