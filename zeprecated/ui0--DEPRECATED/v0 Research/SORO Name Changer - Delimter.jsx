// Array of names
var names = [
    "Alpha Chi Omega", "Alpha Delta Pi", "Alpha Kappa Delta Phi", "Alpha Omicron Pi", "Alpha Phi", 
    "Chi Omega", "Tri Delta", "Delta Gamma", "Delta Phi Epsilon", "Gamma Phi Beta", "Kappa Alpha Theta", 
    "Kappa Kappa Gamma", "Kappa Delta", "Pi Beta Phi", "Sigma Kappa", "Zeta Tau Alpha"
];

// Get the current (active) document
var doc = app.activeDocument;

// Desired width in px (Illustrator uses points, 1 px = 1/72 inch)
// The line `var desiredWidth = 250 * 72 / 96;` is calculating the desired width of the text frame in points, which is the unit of measurement that Adobe Illustrator uses internally.
//Here's a breakdown:

// + `250` is the desired width in pixels.
// + `72 / 96` is a conversion factor. It's converting pixels to points. Adobe Illustrator uses points as its default unit of measurement, and there are 72 points in an inch. The value `96` represents a common screen resolution in dots per inch (DPI), so this fraction is converting pixels (at 96 DPI) to points (at 72 DPI).
// +  The result of `250 * 72 / 96` is the desired width in points.

//So, this line is converting a width from pixels to points, because Illustrator doesn't work in pixels natively. The conversion factor may need to be adjusted depending on the specific DPI of your working environment.

//If you want to make the text frame larger, you would increase the pixel value in the `var desiredWidth = 250 * 72 / 96;` line.
//For example, if you wanted the text frame to be 300 pixels wide instead of 250, you would change the line to `var desiredWidth = 300 * 72 / 96;`.

//Remember, the actual physical size on screen or when printed will depend on the resolution (DPI) of your display or printer. The conversion factor (72/96) assumes a display resolution of 96 DPI, which is common for many screens, but may not be correct for all situations.

// Consider this a Max-Width in PX
var desiredWidth = 350 * 72 / 96;

// Loop through the array of names
for (var i = 0; i < names.length; i++) {
    // Replace the text in the first text frame
    var textFrame = doc.textFrames[0];
    textFrame.contents = names[i];

    // Get the current width of the text frame
    var currentWidth = textFrame.width;

    // Calculate the ratio of the desired width to the current width
    var ratio = desiredWidth / currentWidth;

    // Adjust the font size based on the ratio
    textFrame.textRange.characterAttributes.size *= ratio;

    // Save a copy of the document with the new name (WILL SAVE IN THE FOLDER THE SCRIPT AND ORINGAL FINAL ARE IN)
    var file = new File(doc.path + "/" + names[i] + ".ai");
    doc.saveAs(file);
}