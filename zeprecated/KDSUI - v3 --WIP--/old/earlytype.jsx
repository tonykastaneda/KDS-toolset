var doc = app.activeDocument; // active document
var sel = doc.selection; // selected items

if (sel.length > 0 && sel[0].typename == "TextFrame") {
    var textFrame = sel[0];
    
    // Store the baseline shift values
    var firstChar = textFrame.textRange.characters[0]; // first character
    var lastChar = textFrame.textRange.characters[textFrame.textRange.characters.length-1]; // last character
    var firstBaselineShift = firstChar.characterAttributes.baselineShift; // baseline shift of first character
    var lastBaselineShift = lastChar.characterAttributes.baselineShift; // baseline shift of last character
    
    // Change the text
    textFrame.contents = "New Text";

    // Reset all characters' baseline shift to 0
    for (var i = 0; i < textFrame.textRange.characters.length; i++) {
        textFrame.textRange.characters[i].characterAttributes.baselineShift = 0;
    }

    // Reapply the baseline shift values to the first and last characters
    textFrame.textRange.characters[0].characterAttributes.baselineShift = firstBaselineShift;
    textFrame.textRange.characters[textFrame.textRange.characters.length-1].characterAttributes.baselineShift = lastBaselineShift;
} else {
    alert("Please select a TextFrame object.");
}