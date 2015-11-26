
///////////////////////////
//    MAIN NODE OBJECT   //
///////////////////////////


// type: 'r', 'f', 'ci'
MainNode = function(type){
	this.type = type;
	this.firstNode = undefined;
}


// coord: {x:1, y:2}
// childrenCoords: [{x:2, y:2}, {x:1, y:3}, ...]
// Check first if exists the node in the tree. If exists,
// call this function to indicate that is placed
MainNode.prototype.placeNode = function(coord, childrenCoords) {
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
MainNode.prototype.existsNode = function(coord){
    if (findNode(coord))
        return true;
    else
        return false;
}


// Returns the number of tiles not placed
MainNode.prototype.getNumNotPlaced = function(){
    if (this.firstNode)
        return this.firstNode.numChildrenNotPlaced();
    else
        return 0;
}

// Returns the number of tiles that are in
// the board and in this structure 
MainNode.prototype.getNumPlaced = function(){
    if (this.firstNode)
        return this.firstNode.numChildrenPlaced();
    else
        return 0;
}


// Merge two trees
// Call this when you're going to place a coord that is in two trees.
// coord is the common point in the two trees
MainNode.prototype.mergeWith = function(remoteTree, coord){
    remoteTree._setFirstNode(coord);
    var nodeDel = this.findNode(coord);
    var parent = nodeDel.parent;
    var delIndex = parent.children.indexOf(nodeDel);
    parent.children.splice(delIndex, 1);
    parent.children.push(remoteTree.firstNode);
    // TODO: deleteDupNodes();

}


//private methods: _
MainNode.prototype._getNotDupCoords = function(coords){
    var outCoords = [];
    for (var i = 0; i < coords.length; i++) {
        if (this.findNode(coords[i]) == undefined){
            outCoords.push(coords[i]);
        }
    };
    return outCoords;
}

// Change the first node to coord's node
MainNode.prototype._setFirstNode = function(coord){
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
MainNode.prototype.findNode = function(coord){
    var output = undefined;
    if (this.firstNode == undefined){
        output = undefined;
    } else {
        output = this.firstNode.findInChildren(coord);
    }
    return output;
}

// For debug issues
MainNode.prototype.printTree = function(){
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
// returns: Node object or undefined
Node.prototype.findInChildren = function(coord) {
	var nodeOut = undefined;
    if (coord){
    	for (var i = 0; i < this.children.length; i++){
    		if (this.children[i].coord.x == coord.x && this.children[i].coord.y == coord.y){
    			nodeOut = this.children[i];
    			break;
    		} else {
    			nodeOut = this.children[i].findInChildren(coord);
    			if (nodeOut != undefined)
    				break;
    		}
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


// For debug issues
Node.prototype.printTree = function(indent){
    console.log(Array(2 * indent).join(" ") + "- coord(" + 
        this.coord.x + "," + this.coord.y +")Placed:" + this.placed);
    for (var i=0; i<this.children.length; i++){
        this.children[i].printTree(indent + 1);
    }
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

console.log("--- Creating mainNode 1 ---");
var fieldTree1 = new MainNode('f');
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


console.log("--- Creating mainNode 2 ---");
var fieldTree2 = new MainNode('f');
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
