// DIALOG
// ======
var dialog = new Window("dialog"); 
    dialog.text = "KDSUI 1.01b Launcher"; 
    dialog.orientation = "column"; 
    dialog.alignChildren = ["center","top"]; 
    dialog.spacing = 10; 
    dialog.margins = 16; 

    var scriptPath = new File($.fileName).path; 
var imagePath = scriptPath + "/toplogo.png"; 
var image1 = dialog.add("image", undefined, File(imagePath));


// DIVDER
var divider1 = dialog.add("panel", undefined, undefined, {name: "divider1"}); 
divider1.alignment = "fill"; 


// GROUP1
// ======
var group1 = dialog.add("group", undefined, {name: "group1"}); 
    group1.orientation = "row"; 
    group1.alignChildren = ["left","center"]; 
    group1.spacing = 10; 
    group1.margins = 0; 

var button1 = group1.add("button", undefined, undefined, {name: "button1"}); 
    button1.text = "BATCH MAKE"; 

//var divider1 = group1.add("panel", undefined, undefined, {name: "divider1"}); 
//    divider1.alignment = "fill"; 

var button2 = group1.add("button", undefined, undefined, {name: "button2"}); 
    button2.enabled = false; 
    button2.text = "PRINT MAKE WIP"; 


// DIVDER
var divider1 = dialog.add("panel", undefined, undefined, {name: "divider1"}); 
divider1.alignment = "fill"; 

// BOTTOM TEXT
var statictext1 = dialog.add("group", undefined , {name: "statictext1"}); 
    statictext1.getText = function() { var t=[]; for ( var n=0; n<statictext1.children.length; n++ ) { var text = statictext1.children[n].text || ''; if ( text === '' ) text = ' '; t.push( text ); } return t.join('\n'); }; 
    statictext1.orientation = "column"; 
    statictext1.alignChildren = ["center","center"]; 
    statictext1.spacing = 0; 

    statictext1.add("statictext", undefined, "KDSUI™ 1.0b Launcher © KINETIC SOCIETY 2023"); 
    statictext1.add("statictext", undefined, "Designed &amp; Created with ♥ In Huntington Park, Los Angeles"); 

dialog.show();

