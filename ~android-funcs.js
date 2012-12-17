var DIR = "AndroidTools";
var ICON_DIR = "Icons";
var EL_DIR = "Elements";
var TEMP_DIR = "Templates";
var HOLO_LIGHT = "holo_light";
var HOLO_DARK = "holo_dark";
var HOLO = "holo";

function stripExt(filename) {
	return filename.substr(0, filename.lastIndexOf('.')) || filename;
}

/**
 * Load a file into a new layer.
 */
function placeFile(file) {

	// Place object as layer
	// I have no idea, what all that does... But I assume there must be a more elegant way.
	var desc = new ActionDescriptor();
	desc.putPath( charIDToTypeID('null'), file );
	desc.putEnumerated( charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), charIDToTypeID('Qcsa') );
	var offsetDesc = new ActionDescriptor();
	offsetDesc.putUnitDouble( charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), 0.000000 );
	offsetDesc.putUnitDouble( charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), 0.000000 );
	desc.putObject( charIDToTypeID('Ofst'), charIDToTypeID('Ofst'), offsetDesc );
	executeAction( charIDToTypeID('Plc '), desc, DialogModes.NO );

	// The following line is nice. I want the rest above to be looking the same.
	app.activeDocument.activeLayer.rasterize(RasterizeType.ENTIRELAYER);

}

/**
 * Import a file into the current document.
 * This will open the file and duplicate its active layer into the current
 * document. This assumes, that every file will have one root layer set, that
 * is then automaticaly selected by photoshop, when opened.
 */
function importFile(file) {
	
	var curDoc = app.activeDocument;

	var f = open(file);
	
	f.activeLayer.duplicate(curDoc, ElementPlacement.PLACEATBEGINNING);
	f.close(SaveOptions.DONOTSAVECHANGES);

	app.activeDocument = curDoc;

}

