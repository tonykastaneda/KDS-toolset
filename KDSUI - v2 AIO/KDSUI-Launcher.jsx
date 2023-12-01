// DIALOG
// ======
var dialog = new Window("dialog"); 
dialog.text = "KDSUI v2.0 Launcher BETA"; 
dialog.orientation = "column"; 
dialog.alignChildren = ["center","top"]; 
dialog.spacing = 10; 
dialog.margins = 16; 

// GROUP1
// ======
var group1 = dialog.add("group", undefined, {name: "group1"}); 
group1.orientation = "row"; 
group1.alignChildren = ["left","center"]; 
group1.spacing = 10; 
group1.margins = 9; 

var imageFile = new File(File($.fileName).path + "/launcher.png");
var image1 = group1.add("image", undefined, imageFile, {name: "image1"});

// DIALOG
// ======
var divider1 = dialog.add("panel", undefined, undefined, {name: "divider1"}); 
divider1.alignment = "fill"; 

// GROUP2
// ======
var group2 = dialog.add("group", undefined, {name: "group2"}); 
group2.orientation = "row"; 
group2.alignChildren = ["left","center"]; 
group2.spacing = 16; 
group2.margins = 12; 

var button1 = group2.add("button", undefined, undefined, {name: "button1"}); 
button1.text = "Standard Names"; 
button1.onClick = function() {
    $.evalFile(File($.fileName).path + "/KDSUIv2.jsx");
}

var button2 = group2.add("button", undefined, undefined, {name: "button2"}); 
button2.text = "All In One"; 
button2.onClick = function() {
    $.evalFile(File($.fileName).path + "/KDSUIv2-aio.jsx");
}

var button3 = group2.add("button", undefined, undefined, {name: "button3"}); 
button3.text = "Short Names"; 
button3.onClick = function() {
    $.evalFile(File($.fileName).path + "/KDSUIv2-nn.jsx");
}

// GROUP3
// ======
var group3 = dialog.add("group", undefined, {name: "group3"}); 
group3.orientation = "column"; 
group3.alignChildren = ["center","center"]; 
group3.spacing = 0; 
group3.margins = [40,0,40,0]; 

var statictext1 = group3.add("statictext", undefined, undefined, {name: "statictext1"}); 
statictext1.text = "KDSUI\u2122 v2.0 BETA \u00A9 KINETIC SOCIETY 2023"; 
statictext1.justify = "center"; 

var statictext2 = group3.add("statictext", undefined, undefined, {name: "statictext2"}); 
statictext2.text = "Designed & Created with \u2665 In Huntington Park, Los Angeles"; 
statictext2.justify = "center"; 

dialog.show();