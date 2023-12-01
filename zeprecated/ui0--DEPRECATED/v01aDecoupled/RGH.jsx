// Get the path to the folder containing this script
var folder = new Folder(new File($.fileName).path);

// Get a list of all the files in the folder
var files = folder.getFiles();

// Loop through the files
for (var i = 0; i < files.length; i++) {
    // Check if the file is an Illustrator file
    if (files[i] instanceof File && files[i].name.match(/\.ai$/i)) {
        // Open the Illustrator file
        var doc = app.open(files[i]);
        // Stop looping after opening the first Illustrator file
        break;
    }
}