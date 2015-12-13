
///////////////////////////
//      TREE OBJECT      //
///////////////////////////


// type: 'r', 'f', 'ci'
Tree = function(type){
	this.type = type;
	this.firstNode = undefined;
}


// coord: {x:1, y:2}
// childrenCoords: [{x:2, y:2}, {x:1, y:3}, ...]
// Check first if exists the node in the tree. If exists,
// call this function to indicate that is placed
Tree.prototype.placeNode = function(coord, childrenCoords) {
    var childrenCoords = childrenCoords || [];

	if (this.firstNode == undefined){
		this.firstNode = new Node(coord, null, childrenCoords, true);
	} else {
        childrenCoords = this._getNotDupCoords(childrenCoords);
		var node = this.findNode(coord);
		if (node)
            node.placed = true;
			node.setChildren(childrenCoords);
	}
}


// Returns frue or false if coord is in the tree
// coord: {x:1, y:2}
Tree.prototype.existsNode = function(coord){
    if (this.findNode(coord))
        return true;
    else
        return false;
}


// Returns the number of tiles not placed
Tree.prototype.getNumNotPlaced = function(){
    if (this.firstNode)
        return this.firstNode.numChildrenNotPlaced();
    else
        return 0;
}

// Returns the number of tiles that are in
// the board and in this structure 
Tree.prototype.getNumPlaced = function(){
    if (this.firstNode)
        return this.firstNode.numChildrenPlaced();
    else
        return 0;
}

//TODO: Improve
// Merge two trees
// Call this when you're going to place a coord that is in two trees.
// coord is the common point in the two trees
Tree.prototype.mergeWith = function(remoteTree, coord){
    remoteTree._setFirstNode(coord);
    var nodeDel = this.findNode(coord);
    var parent = nodeDel.parent;
    var delIndex = parent.children.indexOf(nodeDel);
    parent.children.splice(delIndex, 1);
    parent.children.push(remoteTree.firstNode);
    remoteTree.firstNode.parent = parent;
    this._deleteDupNodes();
}


//private methods: _
Tree.prototype._getNotDupCoords = function(coords){
    var outCoords = [];
    for (var i = 0; i < coords.length; i++) {
        if (this.findNode(coords[i]) == undefined){
            outCoords.push(coords[i]);
        }
    };
    return outCoords;
}

// Change the first node to coord's node
Tree.prototype._setFirstNode = function(coord){
    var firstNode = this.findNode(coord);
    if (!firstNode)
        return;
    var aux = firstNode;
    var prev = null;
    var parent = null;
    var delIndex = 0;
    while (aux){
        parent = aux.parent;
        aux.parent = prev;
        if (prev){
            delIndex = aux.children.indexOf(prev);
            aux.children.splice(delIndex, 1);
        }
        if (parent)
            aux.children.push(parent);
        prev = aux;
        aux = parent;
    }
    this.firstNode = firstNode;
}

// coord: {x:1, y:2}
Tree.prototype.findNode = function(coord){
    var output = undefined;
    if (this.firstNode == undefined){
        output = undefined;
    } else {
        output = this.firstNode.findInChildren(coord);
    }
    return output;
}


Tree.prototype._deleteDupNodes = function(){
    var coords = [];
    if (this.firstNode)
        coords.push(this.firstNode.coord);
        this.firstNode.delDupCoords(coords);
}

// For debug issues
Tree.prototype.printTree = function(){
    if (this.firstNode)
        this.firstNode.printTree(1);
    else
        console.log("Empty tree");
}




///////////////////////////
//      NODE OBJECT      //
///////////////////////////


// coord: {x:1, y:2}
// childrenCoords: [{x:2, y:2}, {x:1, y:3}, ...]
// placed: true or false
Node = function(coord, parent, childrenCoords, placed){
    var childrenCoords = childrenCoords || [];
    var placed = placed || false;
    this.coord = coord;
	this.placed = placed;
    this.parent = parent || null;
	this.children = [];
    this.setChildren(childrenCoords);
}


// coord: {x:1, y:2}
// returns: Node object or undefined if the coord is
// found in the node or in the childs
Node.prototype.findInChildren = function(coord) {
	var nodeOut = undefined;
    if (!coord)
        return undefined;
    if (sameCoord(this.coord, coord)){
        nodeOut = this;
    }else{
        for (var i = 0; i < this.children.length; i++){
            nodeOut = this.children[i].findInChildren(coord);
            if (nodeOut)
                break;
        }
    }
	return nodeOut;
};

// childrenCoords: [{x:2, y:2}, {x:1, y:3}, ...]
Node.prototype.setChildren = function(childrenCoords){
    var childrenCoords = childrenCoords || [];
	for (var i = 0; i < childrenCoords.length; i++){
		this.children.push(new Node(childrenCoords[i], this));
	}
}


//Returns the number of all the children not placed
Node.prototype.numChildrenNotPlaced = function (){
    var num = 0;
    if (!this.placed)
        num++;
    for (var i=0; i<this.children.length; i++){
        num += this.children[i].numChildrenNotPlaced();
    }
    return num;
}


//Returns the number of all the children placed and the own node
Node.prototype.numChildrenPlaced = function (){
    var num = 0;
    if (this.placed)
        num++;
    for (var i=0; i<this.children.length; i++){
        num += this.children[i].numChildrenPlaced();
    }
    return num;
}


// Delete the childs that are duplicate with the
// coords that are in the array
// arrCoords: [{x:2, y:2}, {x:1, y:3}, ...]
Node.prototype.delDupCoords = function(arrCoords){
    this.children = this.children.filter(function(node){
        var keepthis = true;
        for (var i = 0; i<arrCoords.length; i++){
            if (sameCoord(node.coord, arrCoords[i])){
                keepthis = false;
                break;
            }
        }
        if (keepthis){
            arrCoords.push(node.coord);
            node.delDupCoords(arrCoords);
        }
        return keepthis;
    });
}

// For debug issues
Node.prototype.printTree = function(indent){
    console.log(Array(2 * indent).join(" ") + "- coord(" + 
        this.coord.x + "," + this.coord.y +")Placed:" + this.placed);
    for (var i=0; i<this.children.length; i++){
        this.children[i].printTree(indent + 1);
    }
}


//////////////////////////
//    Compare coords    //
//////////////////////////

// Compare 2 coords
var sameCoord = function(coord1, coord2){
    return coord1.x == coord2.x && coord1.y == coord2.y;
}


///////////////////////////
//        PRUEBAS        //
///////////////////////////

/*coord1 = {x: 1, y: 1};
coord2 = {x: 2, y: 2};
coord3 = {x: 3, y: 3};
coord4 = {x: 4, y: 4};
coord5 = {x: 5, y: 5};
coord6 = {x: 6, y: 6};
coord7 = {x: 7, y: 7};
coord8 = {x: 8, y: 8};
coord9 = {x: 9, y: 9};

console.log("--- Creating Tree 1 ---");
var fieldTree1 = new Tree('f');
console.log("Adding c1");
fieldTree1.placeNode(coord1, [coord2, coord3]);
console.log("Adding c2");
fieldTree1.placeNode(coord2, [coord4, coord3]);
console.log("Adding c4");
fieldTree1.placeNode(coord4);
console.log("END");

console.log("not placed: " + fieldTree1.getNumNotPlaced());
console.log("placed: " + fieldTree1.getNumPlaced());
fieldTree1.printTree();


console.log("--- Creating Tree 2 ---");
var fieldTree2 = new Tree('f');
console.log("Adding c1");
fieldTree2.placeNode(coord5, [coord4, coord6]);
console.log("Adding c2");
fieldTree2.placeNode(coord6, [coord7, coord4]);
console.log("END");

console.log("not placed: " + fieldTree2.getNumNotPlaced());
console.log("placed: " + fieldTree2.getNumPlaced());
fieldTree2.printTree();

console.log("--- Merging the trees ---");
fieldTree1.mergeWith(fieldTree2, coord4);
console.log("Merged!");
fieldTree1.printTree();*/


/*console.log("--- Creating Tree 1 ---");
var fieldTree1 = new Tree('f');
console.log("Adding nodes 1... ");
fieldTree1.placeNode(coord1, [coord2, coord3, coord4, coord5]);
fieldTree1.placeNode(coord2, [coord3, coord7]);
fieldTree1.placeNode(coord3, [coord4, coord5]);
fieldTree1.placeNode(coord4, [coord8, coord9, coord1]);

console.log("not placed: " + fieldTree1.getNumNotPlaced());
console.log("placed: " + fieldTree1.getNumPlaced());
fieldTree1.printTree();

console.log("--- Creating Tree 2 ---");
var fieldTree2 = new Tree('f');
console.log("Adding nodes 2... ");
fieldTree2.placeNode(coord5, [coord2, coord3, coord6]);
fieldTree2.placeNode(coord2, [coord3, coord6]);
if (fieldTree2.existsNode(coord7))
    fieldTree2.placeNode(coord7, [coord4, coord5]);
fieldTree2.placeNode(coord6, [coord8, coord9, coord1]);

console.log("not placed: " + fieldTree2.getNumNotPlaced());
console.log("placed: " + fieldTree2.getNumPlaced());
fieldTree2.printTree();


console.log("--- Merging the trees ---");
fieldTree1.mergeWith(fieldTree2, coord9);
console.log("Merged!");
fieldTree1.printTree();*/


//////////////////////////
//    GET COORD CHILD   //
//////////////////////////
getCoordChild = function(parentCoord, zone){
    if (zone == 'n' || zone == 'ne' || zone == 'nw'){
        return {x: parentCoord.x, y: parentCoord.y - 1};
    } else if (zone == 's' || zone == 'se' || zone == 'sw'){
        return {x: parentCoord.x, y: parentCoord.y + 1};
    } else if (zone == 'w' || zone == 'ws' || zone == 'wn'){
        return {x: parentCoord.x - 1, y: parentCoord.y};
    } else if (zone == 'e' || zone == 'es' || zone == 'en'){
        return {x: parentCoord.x + 1, y: parentCoord.y};
    } else{
        console.warn('In treeStructure getCoordChild: Not a valid zone: <' + zone + '>');
        return {};
    }
}


//////////////////////////
//    GET AREAS TILE    //
//////////////////////////

// The comments that are  above the return are the type without turning the tile
getAreasTile = function(typeTile, orientation){
    //       0    1     2     3    4     5     6     7    8     9    10    11
    zone = ['n', 'ne', 'en', 'e', 'es', 'se', 's', 'sw', 'ws', 'w', 'wn', 'nw'];
    turn = (orientation*3)%12;
    switch(typeTile){
    case 0:
        //              n             s             e             w
        return {f:  [ [ zone[0+turn], zone[6+turn], zone[3+turn], zone[9+turn] ] ],
                // no roads, no cities:
                r:  [],
                ci: []
                }
        break;
    case 1:
        return {f:  [ [ zone[0+turn], zone[3+turn], zone[9+turn], zone[7+turn], zone[5+turn] ] ],
                r:  [ [ zone[6+turn] ] ],
                ci: [] }
        break;
    case 2:
        return {f:  [],
                r:  [],
                ci: [ [ zone[0+turn], zone[3+turn], zone[6+turn], zone[9+turn] ] ] }
        break;
    case 3:
        return {f:  [ [ zone[6+turn] ] ],
                r:  [],
                ci: [ [ zone[0+turn], zone[3+turn], zone[9+turn] ] ] }
        break;
    case 4://banner
        return {f:  [ [ zone[6+turn] ] ],
                r:  [],
                ci: [ [ zone[0+turn], zone[3+turn], zone[9+turn] ] ] }
        break;
    case 5:
        return {f:  [ [ zone[5+turn], zone[7+turn] ] ],
                r:  [ [ zone[6+turn] ] ],
                ci: [ [ zone[0+turn], zone[3+turn], zone[9+turn] ] ] }
        break;
    case 6://banner
        return {f:  [ [ zone[5+turn], zone[7+turn] ] ],
                r:  [ [ zone[6+turn] ] ],
                ci: [ [ zone[0+turn], zone[3+turn], zone[9+turn] ] ] }
        break;
    case 7:
        return {f:  [ [ zone[3+turn], zone[6+turn] ] ],
                r:  [],
                ci: [ [ zone[0+turn], zone[9+turn] ] ] }
        break;
    case 8: //banner
        return {f:  [ [ zone[3+turn], zone[6+turn] ] ],
                r:  [],
                ci: [ [ zone[0+turn], zone[9+turn] ] ] }
        break;
    case 9:
        return {f:  [ [ zone[2+turn], zone[7+turn] ], [ zone[4+turn], zone[5+turn] ] ],
                r:  [ [ zone[3+turn], zone[6+turn] ] ],
                ci: [ [ zone[0+turn], zone[9+turn] ] ] }
        break;
    case 10: //banner
        return {f:  [ [ zone[2+turn], zone[7+turn] ], [ zone[4+turn], zone[5+turn] ] ],
                r:  [ [ zone[3+turn], zone[6+turn] ] ],
                ci: [ [ zone[0+turn], zone[9+turn] ] ] }
        break;
    case 11:
        return {f:  [ [ zone[0+turn] ], [ zone[6+turn] ] ],
                r:  [],
                ci: [ [ zone[3+turn], zone[9+turn] ] ] }
        break;
    case 12: //banner
        return {f:  [ [ zone[0+turn] ], [ zone[6+turn] ] ],
                r:  [],
                ci: [ [ zone[3+turn], zone[9+turn] ] ] }
        break;
    case 13:
        return {f:  [ [ zone[3+turn], zone[6+turn] ] ],
                r:  [],
                ci: [ [ zone[0+turn] ], [ zone[9+turn] ] ] }
        break;
    case 14:
        return {f:  [ [ zone[3+turn], zone[9+turn] ] ],
                r:  [],
                ci: [ [ zone[0+turn] ], [ zone[6+turn] ] ] }
        break;
    case 15:
        return {f:  [ [ zone[3+turn], zone[6+turn], zone[9+turn] ] ],
                r:  [],
                ci: [ [ zone[0+turn] ] ] }
        break;
    case 16:
        return {f:  [ [ zone[3+turn], zone[5+turn], zone[10+turn] ], [ zone[7+turn], zone[8+turn] ] ],
                r:  [ [ zone[6+turn], zone[9+turn] ] ],
                ci: [ [ zone[0+turn] ] ] }
        break;
    case 17:
        return {f:  [ [ zone[2+turn], zone[7+turn], zone[9+turn] ], [ zone[4+turn], zone[5+turn] ] ],
                r:  [ [ zone[3+turn], zone[6+turn] ] ],
                ci: [ [ zone[0+turn] ] ] }
        break;
    case 18:
        return {f:  [ [ zone[2+turn], zone[10+turn] ], [ zone[4+turn], zone[5+turn] ], [ zone[7+turn], zone[8+turn] ] ],
                r:  [ [ zone[3+turn] ], [ zone[6+turn] ], [ zone[9+turn] ] ],
                ci: [ [ zone[0+turn] ] ] }
        break;
    case 19:
        return {f:  [ [ zone[4+turn], zone[6+turn], zone[8+turn] ], [ zone[2+turn], zone[10+turn] ] ],
                r:  [ [ zone[3+turn], zone[9+turn] ] ],
                ci: [ [ zone[0+turn] ] ] }
        break;
    case 20:
        return {f:  [ [ zone[1+turn], zone[3+turn], zone[5+turn] ], [ zone[7+turn], zone[9+turn], zone[11+turn] ] ],
                r:  [ [ zone[0+turn], zone[6+turn] ] ],
                ci: [] }
        break;
    case 21:
        return {f:  [ [ zone[0+turn], zone[3+turn], zone[5+turn], zone[10+turn] ], [ zone[7+turn], zone[8+turn] ] ],
                r:  [ [ zone[6+turn], zone[9+turn] ] ],
                ci: [] }
        break;
    case 22:
        return {f:  [ [ zone[0+turn], zone[2+turn], zone[10+turn] ], [ zone[4+turn], zone[5+turn] ], [ zone[7+turn], zone[8+turn] ] ],
                r:  [ [ zone[3+turn] ], [ zone[6+turn] ], [ zone[9+turn] ] ],
                ci: [] }
        break;
    case 23:
        return {f:  [ [ zone[1+turn], zone[2+turn] ], [ zone[4+turn], zone[5+turn] ], [ zone[7+turn], zone[8+turn] ], [ zone[10+turn], zone[11+turn] ] ],
                r:  [ [ zone[0+turn] ], [ zone[3+turn] ], [ zone[6+turn] ], [ zone[9+turn] ] ],
                ci: [] }
        break;
    default:
        console.error ("In TreeStructure getAreasTile: It's not a valid type: <" + typeTile + ">");
        return {f: [], r: [], ci: []}
    }

}

