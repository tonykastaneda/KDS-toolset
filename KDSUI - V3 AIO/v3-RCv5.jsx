var defaultNames1 = [
    "Acacia",
    "Alpha Epsilon Pi",
    "Alpha Gamma Delta",
    "Alpha Gamma Rho",
    "Alpha Kappa Lambda",
    "Alpha Sigma Phi",
    "Alpha Tau Omega",
    "Beta Theta Pi",
    "Chi Phi",
    "Chi Psi",
    "Delta Chi",
    "Delta Kappa Epsilon",
    "Delta Sigma Phi",
    "Delta Tau Delta",
    "Delta Upsilon",
    "Kappa Delta Rho",
    "Kappa Sigma",
    "Lambda Phi Epsilon",
    "Phi Gamma Delta",
    "Phi Kappa Psi",
    "Phi Kappa Sigma",
    "Phi Kappa Tau",
    "Phi Kappa Theta",
    "Phi Sigma Kappa",
    "Pi Alpha Phi",
    "Pi Kappa Alpha",
    "Pi Kappa Phi",
    "Sigma Alpha Epsilon",
    "Sigma Alpha Mu",
    "Sigma Chi",
    "Sigma Nu",
    "Sigma Phi Epsilon",
    "Sigma Pi",
    "Sigma Tau Gamma",
    "Theta Chi",
    "Theta Xi",
    "Zeta Beta Tau",
    "Zeta Psi",
    "Zeta Phi Rho",
    "Psi Upsilon",
    "Pi Lambda Phi",
    "Theta Delta Chi",
    "AEPi",
    "Alpha Gam",
    "AGR",
    "AKL",
    "Alpha Sig",
    "TAUS",
    "BETA",
    "DEKES",
    "Delta Sig",
    "DELTS",
    "Delta U",
    "Kappa Alpha", 
    "KDR",
    "Kappa Sig",
    "Lambda Chi",
    "Lambdas",
    "Phi Delt",
    "Phi Gam",
    "FIJI",
    "Phi Psi",
    "Phi Kap",
    "Skulls",
    "Phi Tau", 
    "Phi Kapps",
    "Phi Sig",
    "PAPhi",
    "PIKE",
    "Pi Kapp",
    "SAE",
    "Sammy",
    "SIGEP",
    "Sig Tau",
    "TKE",
    "ZEBES",
    "ZBT",
    "ZETAS", 
    "Theta Delt"];

var defaultNames2 = [
    "Alpha Chi Omega",
    "Alpha Delta Pi",
    "alpha Kappa Delta Phi",
    "Alpha Omicron Pi",
    "Alpha Phi",
    "Chi Omega",
    "Tri Delta",
    "Delta Gamma",
    "Delta Phi Epsilon",
    "Gamma Phi Beta",
    "Kappa Alpha Theta",
    "Kappa Kappa Gamma",
    "Kappa Delta",
    "Pi Beta Phi",
    "Sigma Kappa",
    "Zeta Tau Alpha",
    "Delta Delta Delta",
    "Phi Mu", 
    "Alpha Chi",
    "AXO",
    "ADPi",
    "aKDPhi",
    "AOII",
    "CHI O",
    "DG",
    "DPhiE",
    "Gamma Phi",
    "Theta",
    "Kappa",
    "Pi Phi",
    "ZETA", 
    "ZTA",
    "Pi Lam"];



var originalFile = new File(app.activeDocument.fullName);
var exportFolder1 = new Folder(originalFile.path + "/frat_export");
var exportFolder2 = new Folder(originalFile.path + "/soro_export");
var logFile = new File(originalFile.path + "/processed_log.txt"); // Log file

if (!exportFolder1.exists) {
    exportFolder1.create();
}

if (!exportFolder2.exists) {
    exportFolder2.create();
}

function processNames(names, exportFolder) {
    // Read the log file once before the loop starts
    logFile.open('r');
    var logContents = logFile.read();
    logFile.close();

    for (var k = 0; k < names.length; k++) {
        var name = names[k];

        // Check if name has already been processed
        if (logContents.search(new RegExp("^" + name + "$", "m")) !== -1) {
            continue; // Skip this name if it's in the log file
        }

        var doc = app.open(originalFile); 

        var textFrame = doc.pageItems.getByName("nameplaceholder"); 

        if (textFrame == null) {
            alert("Error: 'nameplaceholder' does not exist.");
            return;
        }

        if (textFrame.typename !== "TextFrame") {
            alert("Error: 'nameplaceholder' is not a TextFrame.");
            return;
        }

        var originalWidth = textFrame.width; // Store the original width

        // Calculate the center of the text frame
        var centerX = textFrame.position[0] + textFrame.width / 2;
        var centerY = textFrame.position[1] - textFrame.height / 2;

        textFrame.name = 'logo'; // This line changes the name of the sublayer

        var firstBaselineShift = textFrame.textRange.characters[0].characterAttributes.baselineShift;
        var firstFontSize = textFrame.textRange.characters[0].characterAttributes.size;
        var lastBaselineShift = textFrame.textRange.characters[textFrame.textRange.characters.length - 1].characterAttributes.baselineShift;
        var lastFontSize = textFrame.textRange.characters[textFrame.textRange.characters.length - 1].characterAttributes.size;

        var originalFontSize = textFrame.textRange.characters[1].characterAttributes.size;

        textFrame.contents = name;

        for (var i = 0; i < textFrame.textRange.characters.length; i++) {
            textFrame.textRange.characters[i].characterAttributes.baselineShift = 0;
            textFrame.textRange.characters[i].characterAttributes.size = originalFontSize;
        }

        textFrame.textRange.characters[0].characterAttributes.baselineShift = firstBaselineShift;
        textFrame.textRange.characters[0].characterAttributes.size = firstFontSize;

        if (name.length > 1) {
            textFrame.textRange.characters[name.length - 1].characterAttributes.baselineShift = lastBaselineShift;
            textFrame.textRange.characters[name.length - 1].characterAttributes.size = lastFontSize;
        }

        // If the name is 6 characters or longer, adjust the width
        if (name.length >= 6) {
            textFrame.width = originalWidth;

            // Set the center of the text frame
            textFrame.position = [centerX - textFrame.width / 2, centerY + textFrame.height / 2];
        }

        var saveOptions = new IllustratorSaveOptions();
        var newFile = new File(exportFolder + "/" + name + ".ai");
        doc.saveAs(newFile, saveOptions);

        doc.close(SaveOptions.DONOTSAVECHANGES);

        // Log the processed name
        logFile.open('a');
        logFile.writeln(name);
        logFile.close();
    }
}

processNames(defaultNames1, exportFolder1);
processNames(defaultNames2, exportFolder2);






