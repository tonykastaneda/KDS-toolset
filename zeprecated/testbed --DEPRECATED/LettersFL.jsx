function changeFirstLastCharsSize() {
    // Get the active document
    var doc = app.activeDocument;

    // Get the text frame by its name
    var textFrame = doc.pageItems.getByName("placehoolder");

    // Check if the text frame has at least two characters
    if (textFrame.contents.length >= 2) {
        // Get the first and last characters
        var firstChar = textFrame.textRange.characters[0];
        var lastChar = textFrame.textRange.characters[textFrame.contents.length - 1];

        // Set the size of the first and last characters
        firstChar.characterAttributes.size = 124; // change to desired size
        lastChar.characterAttributes.size = 124; // change to desired size
    }
}

changeFirstLastCharsSize();