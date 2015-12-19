/////////////////////////////
// TreesCollection OBJECT  //
/////////////////////////////

// TreesCollection constructor
TreesCollection = function(){
	// collection[0] -> fieldTrees
	// collection[1] -> cityTrees
	// collection[2] -> rowTrees
	this.collection = [[],[],[]];
}

// This function inserts the tile in one
// or more than one tree, depending on
// the zones of the tile.
// coor: [xx,yy] --> e.g [4,52]
TreesCollection.prototype.insertTile = function(tileType, orientation, coor){
    var t = new Tile(tileType, orientation);
    // get the diferent areas of the tile
    areas = getAreasTile(t);
}