// Get the path to the folder containing this script
var folderPath = new File($.fileName).path;

// Construct the paths to the other scripts
var scriptPath1 = folderPath + "/FRAT_SizeLimiter_Action1_Subfolder.jsx";
var scriptPath2 = folderPath + "/RGH.jsx";
var scriptPath3 = folderPath + "/SORO_SizeLimiter_Action1_Subfolder.jsx";

// Run the first script
$.evalFile(scriptPath1);

// Run the second script
$.evalFile(scriptPath2);

// Run the third script
$.evalFile(scriptPath3);