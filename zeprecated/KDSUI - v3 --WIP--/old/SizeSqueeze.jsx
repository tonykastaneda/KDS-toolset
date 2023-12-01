var doc = app.activeDocument; // active document
var sel = doc.selection; // selected items

if (sel.length > 0 && sel[0].typename == "TextFrame") {
    var textFrame = sel[0];
    var baselineShifts = [];
    var fontSizes = [];
    var originalWidth = textFrame.width;

    // Store the baseline shift and font size values for each character
    for (var i = 0; i < textFrame.textRange.characters.length; i++) {
        baselineShifts.push(textFrame.textRange.characters[i].characterAttributes.baselineShift);
        fontSizes.push(textFrame.textRange.characters[i].characterAttributes.size);
    }

    // Store the baseline shift and font size of the last character separately
    var lastBaselineShift = baselineShifts[baselineShifts.length - 1];
    var lastFontSize = fontSizes[fontSizes.length - 1];

    // Change the text
    textFrame.contents = "New Text";

    // Check if the new text has expanded the frame
    if (textFrame.width > originalWidth) {
        var scaleFactor = originalWidth / textFrame.width;
        textFrame.textRange.characterAttributes.horizontalScale = scaleFactor * 100;
    }

    // Reapply the baseline shift and font size values to each corresponding character
    for (var i = 0; i < textFrame.textRange.characters.length; i++) {
        if (i < baselineShifts.length) {
            textFrame.textRange.characters[i].characterAttributes.baselineShift = baselineShifts[i];
            textFrame.textRange.characters[i].characterAttributes.size = fontSizes[i];
        }
    }

    // Ensure the last character of the new text has the same properties as the last character of the original text
    textFrame.textRange.characters[textFrame.textRange.characters.length - 1].characterAttributes.baselineShift = lastBaselineShift;
    textFrame.textRange.characters[textFrame.textRange.characters.length - 1].characterAttributes.size = lastFontSize;
} else {
    alert("Please select a TextFrame object.");
}