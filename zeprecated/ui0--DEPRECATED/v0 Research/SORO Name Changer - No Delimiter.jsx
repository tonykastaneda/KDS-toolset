// Array of names
var names = [
    "Alpha Chi Omega", "Alpha Delta Pi", "Alpha Kappa Delta Phi", "Alpha Omicron Pi", "Alpha Phi", 
    "Chi Omega", "Tri Delta", "Delta Gamma", "Delta Phi Epsilon", "Gamma Phi Beta", "Kappa Alpha Theta", 
    "Kappa Kappa Gamma", "Kappa Delta", "Pi Beta Phi", "Sigma Kappa", "Zeta Tau Alpha"
];

// Get the current (active) document
var doc = app.activeDocument;

// Loop through the array of names
for (var i = 0; i < names.length; i++) {
    // Replace the text in the first text frame
    doc.textFrames[0].contents = names[i];

    // Save a copy of the document with the new name
    var file = new File(doc.path + "/" + names[i] + ".ai");
    doc.saveAs(file);
}