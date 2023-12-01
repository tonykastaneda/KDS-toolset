// Array of names
var names = [
    "Acacia", "Alpha Epsilon Pi", "Alpha Gamma Delta", "Alpha Gamma Rho", "Alpha Kappa Lambda", 
    "Alpha Sigma Phi", "Alpha Tau Omega", "Beta Theta Pi", "Chi Phi", "Chi Psi", "Delta Chi", 
    "Delta Kappa Epsilon", "Delta Sigma Phi", "Delta Tau Delta", "Delta Upsilon", "Kappa Alpha", 
    "Kappa Delta Rho", "Kappa SIgma", "Lambda Chi Alpha", "Lambda Phi Epsilon", "Phi Gamma Delta", 
    "Phi Kappa Psi", "Phi Kappa Sigma", "Phi Kappa Tau", "Phi Kappa Theta", "Phi Sigma Kappa", 
    "Pi Alpha Phi", "Pi Kappa Alpha", "Pi Kappa Phi", "Sigma Alpha Epsilon", "Sigma Alpha Mu", 
    "Sigma Chi", "Sigma Nu", "Sigma Phi Epsilon", "Sigma Pi", "Sigma Tau Gamma", "Tau Kappa Epsilon", 
    "Theta Chi", "Theta Xi", "Zeta Beta Tau", "Zeta Psi", "Zeta Phi Rho"
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