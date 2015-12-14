
///////////////////////////
//      TREE OBJECT      //
///////////////////////////


// type: 'r', 'f', 'ci'
Tree = function(type){
    this.type = type;
    this.firstNode = undefined;
}

// coord: {x:1, y:2}
// area: ['se','sw']
// Check first if exists the node in the tree. If exists,
// call this function to indicate that is placed
// Return 0 is everything was ok
// Return -1 is something was wrong, msg in the console.
Tree.prototype.placeNode = function(coord, area){
    var childrenElements = getChildrenElements(coord, area);
    if (this.firstNode == undefined){
        this.firstNode = new Node(coord, null, 'x', childrenElements, true);
    } else {
        childrenElements = this._getNotPlacedCoords(childrenElements);
        var nodes = this.findNodes(coord, area);
        if (nodes.length > 0){
            nodes.forEach(function(node){
                node.placed = true;
                node.setChildren(childrenElements);
            });
            return 0;
        }else{
            console.warn("There wasn't any node with: <" + coord + "><" + area + ">");
            return -1;
        }
    }
}


// Returns true or false if coord is in the tree
// coord: {x:1, y:2}
Tree.prototype.existsNode = function(coord, area){
    var nodes = this.findNodes(coord, area);
    return nodes.length > 0
}


// Returns the number of tiles not placed
Tree.prototype.numRemainingTiles = function(){
    if (this.firstNode){
        var remaining = this.firstNode.remainingCoords();
        return remaining.length;
    } else {
        return 0;
    }
}

// Returns the number of tiles placed
Tree.prototype.numTilesPlaced = function(){
    if (this.firstNode){
        var placed = this.firstNode.placedCoords();
        return placed.length;
    } else {
        return 0;
    }
}

/***********************
**  USED INTERNALLY   **
***********************/


// coord: {x:1, y:2}
// area: ['n', 'se' ...]
Tree.prototype.findNodes = function(coord, area){
    var nodes = [];
    var that = this;
    if (this.firstNode != undefined){
        nodes = that.firstNode.findNodes(coord, area);
    }
    return nodes;
}

// Guiven coords returns wich of that coords arent placed
Tree.prototype._getNotPlacedCoords = function(childrenElements){
    var notPlaced = [];
    var that = this;
    notPlaced = childrenElements.filter(function(element){
        return !that._isPlaced(element.coord)
    });
    return notPlaced;
}

// Returns if a coord is in the tree and is placed
Tree.prototype._isPlaced = function(coord){
    var output = false;
    if (this.firstNode == undefined){
        output = false;
    } else {
        output = this.firstNode.isPlaced(coord);
    }
    return output;
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
// childrenElements: [{coord: {x:2, y:4}, zone: 'n'}, {...}, ...]
// parent: Node
// pos: 'n' ... or 'x' when is the first node
// placed: true or false
Node = function(coord, parent, pos, childrenElements, placed){
    var childrenElements = childrenElements || [];
    this.pos = pos || 'x';
    this.coord = coord;
    this.placed = placed || false;
    this.parent = parent || null;
    this.children = [];
    this.setChildren(childrenElements);
}


// childrenElements: [{coord: {x:2, y:4}, zone: 'n'}, {...}, ...]
// Assign new children to this Node
Node.prototype.setChildren = function(childrenElements){
    var childrenElements = childrenElements || [];
    var that = this;
    childrenElements.forEach(function(child){
        that.children.push(new Node(child.coord, this, child.zone, [], false));
    });
}

// coord: {x:1, y:2}
// returns: Nodes found
Node.prototype.findNodes = function(coord, area) {
    var nodes = [];
    if (!coord || !area)
        return [];

    if (sameCoord(this.coord, coord) && posInArea(this.pos, area))
        nodes.push(this);

    this.children.forEach(function(child){
        var nodesIn = child.findNodes(coord, area);
        nodesIn.forEach(function(node){
            nodes.push(node);
        });
    });

    return nodes;
}

//Returns the number of all the coordinates not placed
Node.prototype.remainingCoords = function (coordsNotPlaced){
    var coordsNotPlaced = coordsNotPlaced || [];
    if (!this.placed && !coordInArray(this.coord, coordsNotPlaced))
        coordsNotPlaced.push(this.coord)

    this.children.forEach(function(child){
        coordsNotPlaced = child.remainingCoords(coordsNotPlaced);
    });
    return coordsNotPlaced;
}


//Returns the number of all the children placed and the own node
Node.prototype.placedCoords = function (coordsPlaced){
    var coordsPlaced = coordsPlaced || [];
    if (this.placed && !coordInArray(this.coord, coordsPlaced))
        coordsPlaced.push(this.coord)

    this.children.forEach(function(child){
        coordsPlaced = child.placedCoords(coordsPlaced);
    });
    return coordsPlaced;
}


// Returns if a coord is already placed in the tree
Node.prototype.isPlaced = function(coord){
    var output = false;
    if (!coord)
        return false;
    if (sameCoord(this.coord, coord) && this.placed){
        output = true;
    }else{
        this.children.forEach(function(child){
            if (child.isPlaced(coord))
                output = true;
        });
    }
    return output;
}


// For debug issues
Node.prototype.printTree = function(indent){
    console.log(Array(2 * indent).join(" ") + "- coord(" + 
        this.coord.x + "," + this.coord.y +")zone(" + this.pos + ")Placed:" + this.placed);
    for (var i=0; i<this.children.length; i++){
        this.children[i].printTree(indent + 1);
    }
}




////////////////////////////
//     OTHER FUNCTIONS    //
////////////////////////////


// This function returns the coordinates and the zone
// of the children that a parent need to be completed
// input: coord: {x:2, y:2}; area: ['n','e','w']
// output:  [{coord: {x:2, y:4}, zone: 'n'}, ...]
var getChildrenElements = function(coord, area){
    var output = [];
    area.forEach(function(element){
        output.push(getCoordAndZoneChild(coord, element));
    });
    return output;
}


// Compare 2 coords
var sameCoord = function(coord1, coord2){
    return coord1.x == coord2.x && coord1.y == coord2.y;
}


// Returns if the pos guiven is in the area
var posInArea = function(pos, area){
    var is = false;
    area.forEach(function(element){
        if (element == pos)
            is = true;
    });
    return is;
}

// Returns if the coord is in the array
var coordInArray = function(coord, coordsArray){
    var is = false;
    coordsArray.forEach(function(element){
        if (sameCoord(coord, element))
            is = true;
    });
    return is;
}


//////////////////////////
//    GET COORD CHILD   //
//////////////////////////
// From parentCoord  ({x:2, y:3}) and parentZone('s') returns
// the tuple coord and zone of the child next to the parent
// output: {coord: {x:2, y:4}, zone: 'n'}
getCoordAndZoneChild = function(parentCoord, parentZone){
    var coordc;
    var zonec;
    switch(parentZone){
    case 'n':
        coordc = {x: parentCoord.x, y: parentCoord.y - 1};
        zonec = 's';
        break;
    case 'ne':
        coordc = {x: parentCoord.x, y: parentCoord.y - 1};
        zonec = 'se';
        break;
    case 'nw':
        coordc = {x: parentCoord.x, y: parentCoord.y - 1};
        zonec = 'sw';
        break;
    case 's':
        coordc = {x: parentCoord.x, y: parentCoord.y + 1};
        zonec = 'n';
        break;
    case 'se':
        coordc = {x: parentCoord.x, y: parentCoord.y + 1};
        zonec = 'ne';
        break;
    case 'sw':
        coordc = {x: parentCoord.x, y: parentCoord.y + 1};
        zonec = 'nw';
        break;
    case 'e':
        coordc = {x: parentCoord.x + 1, y: parentCoord.y};
        zonec = 'w';
        break;
    case 'es':
        coordc = {x: parentCoord.x + 1, y: parentCoord.y};
        zonec = 'ws';
        break;
    case 'en':
        coordc = {x: parentCoord.x + 1, y: parentCoord.y};
        zonec = 'wn';
        break;
    case 'w':
        coordc = {x: parentCoord.x - 1, y: parentCoord.y};
        zonec = 'e';
        break;
    case 'wn':
        coordc = {x: parentCoord.x - 1, y: parentCoord.y};
        zonec = 'en';
        break;
    case 'ws':
        coordc = {x: parentCoord.x - 1, y: parentCoord.y};
        zonec = 'es';
        break;
    default:
        console.warn('In treeStructure getCoordChild: Not a valid zone: <' + parentZone + '>');
        coordc = {};
        zonec = '';
    }
    return {coord: coordc, zone: zonec}
}


