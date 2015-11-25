
///////////////////////////
//    MAIN NODE OBJECT   //
///////////////////////////


// type: 'r', 'f', 'ci'
// firstNodeCoords: {x:1, y:2}
// firstNodeChildrenCoords: [{x:2, y:2}, {x:1, y:3}, ...]
MainNode = function(type){
	this.type = type;
	this.firstNode = undefined;
}


// coord: {x:1, y:2}
// childrenCoords: [{x:2, y:2}, {x:1, y:3}, ...]
MainNode.prototype.placeNode = function(coord, childrenCoords) {
    var childrenCoords = childrenCoords || [];

	if (this.firstNode == undefined){
		this.firstNode = new Node(coord, childrenCoords, true);
	} else {
		var node = this.findNode(coord);
		if (node)
            node.placed = true;
			node.setChildren(childrenCoords);
	}
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


MainNode.prototype.getNumNotPlaced = function(){
    if (this.firstNode)
        return this.firstNode.numChildrenNotPlaced();
    else
        return 0
}


// For debug issues
MainNode.prototype.printTree = function(){
    this.firstNode.printTree(1);
}



///////////////////////////
//      NODE OBJECT      //
///////////////////////////


// coord: {x:1, y:2}
// childrenCoords: [{x:2, y:2}, {x:1, y:3}, ...]
// placed: true or false
Node = function(coord, childrenCoords, placed){
    var childrenCoords = childrenCoords || [];
    var placed = placed || false;
    this.coord = coord;
	this.placed = placed;
	this.nodes = [];
    this.setChildren(childrenCoords);
}


// coord: {x:1, y:2}
// returns: Node object or undefined
Node.prototype.findInChildren = function(coord) {
	var nodeOut = undefined;
    if (coord){
    	for (var i = 0; i < this.nodes.length; i++){
    		if (this.nodes[i].coord.x == coord.x && this.nodes[i].coord.y == coord.y){
    			nodeOut = this.nodes[i];
    			break;
    		} else {
    			nodeOut = this.nodes[i].findInChildren(coord);
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
		this.nodes.push(new Node(childrenCoords[i]));
	}
}


//Returns the number of all the children placed and the own node
Node.prototype.numChildrenNotPlaced = function (){
    var num = 0;
    if (!this.placed)
        num++;
    for (var i=0; i<this.nodes.length; i++){
        num += this.nodes[i].numChildrenNotPlaced();
    }
    return num;
}

// For debug issues
Node.prototype.printTree = function(indent){
    console.log(Array(2 * indent).join(" ") + "- coord(" + 
        this.coord.x + "," + this.coord.y +")Placed:" + this.placed);
    for (var i=0; i<this.nodes.length; i++){
        this.nodes[i].printTree(indent + 1);
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

console.log("Creating mainNode");
var fieldTree = new MainNode('f');
console.log("Adding c1");
fieldTree.placeNode(coord1, [coord2, coord3]);
console.log("Adding c2");
fieldTree.placeNode(coord2, [coord4]);
console.log("Adding c4");
fieldTree.placeNode(coord4);
console.log("END");

console.log(fieldTree.getNumNotPlaced());
fieldTree.printTree()*/
