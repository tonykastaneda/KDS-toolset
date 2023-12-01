#target illustrator

if (app.documents.length > 0) {
    var doc = app.activeDocument;
    if (doc.selection.length > 0) {
        for (var i = 0; i < doc.selection.length; i++) {
            var item = doc.selection[i];
            var info = "Item " + (i + 1) + ":\n";
            info += "Type: " + item.typename + "\n";
            info += "Name: " + item.name + "\n";
            info += "Topmost Layer: " + item.layer.name + "\n";
            var parent = item.parent;
            while (parent.typename === "GroupItem") {
                parent = parent.parent;
            }
            if (parent.typename === "Layer") {
                info += "Immediate Parent Layer/Sublayer: " + parent.name + "\n";
            }
            var stackingOrder = 1;
            for (var j = 0; j < item.parent.pageItems.length; j++) {
                if (item.parent.pageItems[j] == item) {
                    stackingOrder = j + 1;
                    break;
                }
            }
            info += "Stacking Order within Parent Layer/Sublayer/Group: " + stackingOrder + "\n";
            info += "Position (x, y): " + item.position[0].toFixed(2) + ", " + item.position[1].toFixed(2) + " pt\n";
            info += "Size: " + item.width.toFixed(2) + " x " + item.height.toFixed(2) + " pt\n";
            alert(info);
        }
    } else {
        alert("No items selected.");
    }
}