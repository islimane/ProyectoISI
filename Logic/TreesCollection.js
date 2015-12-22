///////////////////////////
//      TREE OBJECT      //
///////////////////////////


// type: 'r', 'f', 'ci'
// Allow create a tree with a node
// Coord: {x:1, y:2}
// area: ['se','sw']
// Coord and area aren't required
Tree = function(type, coord, area){
    this.dummies = [];
    this.type = type;
    this.firstNode = undefined;
    if (coord && area){
        this.placeNode(coord, area);
    }
}

// coord: {x:1, y:2}
// area: ['se','sw']
// ---Check first if exists the node in the tree---.
// If exists, call this function to indicate that is placed
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
// 0 -> Tree completed
Tree.prototype.getLeftChildren = function(){
    if (this.firstNode){
        var remaining = this.firstNode.remainingCoords();
        return remaining.length;
    } else {
        return 0;
    }
}


// Returns the number of tiles placed in this tree
Tree.prototype.getNumOfTiles = function(){
    if (this.firstNode){
        var placed = this.firstNode.placedCoords();
        return placed.length;
    } else {
        return 0;
    }
}


// Merge two trees
// Call this when you're going to place a coord that is in two trees.
// coord is the common point in the two trees
// Return -1 if an error occurred. Error is printed in the terminal
Tree.prototype.mergeWith = function(remoteTree, coord, area){
    var output = remoteTree._setFirstNode(coord, area);
    if (output == -1)
        return -1; 
    var nodes = this.findNodes(coord, area);
    if (nodes.length == 0){
        console.warn("Node<" + node + ">,area<" + area + "> not found in this tree");
        return -1;
    }
    var nodeMerge = nodes[0];
    var childrenFNRemote = remoteTree.firstNode.children;
    childrenFNRemote.forEach(function(nodeChild){
        nodeMerge.children.push(nodeChild);
    });
}


/***********************
**  USED INTERNALLY   **
***********************/


// coord: {x:1, y:2}
// area: ['n', 'se' ...]
// coord is obligatory. If area is not passed by argument
// it find only the nodes with that coord
Tree.prototype.findNodes = function(coord, area){
    var area = area || ['n','s','e','w','nw','sw','wn','ws','ne','se','en','es'];
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


// Set the first node of a tree a determinate coord
// and keep all the nodes
Tree.prototype._setFirstNode = function(coord, area){
    var nodes = this.findNodes(coord, area);
    if (nodes.length == 0){
        console.warn("coord " + coord + " isn't in the tree");
        return -1;
    }
    var firstNode = nodes[0];

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
        that.children.push(new Node(child.coord, that, child.zone, [], false));
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

predefTiles = [
    {
        type: 0,
        //         [ n,  nw,   w,  sw,   s,  se,   e,  ne,   c  ]
        positions: ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'cl'],
        dummies: [true, false, false, false, false, false, false, false, true],
        banner: false,
        total: 4
    },
    {
        type: 1,
        //         [ n,  nw,   w,  sw,   s,  se,   e,  ne,   c  ]
        positions: ['f', 'f', 'f', 'f', 'r', 'f', 'f', 'f', 'cl'],
        dummies: [true, false, false, false, true, false, false, false, true],
        banner: false,
        total: 2
    },
    {
        type: 2,
        //         [ n,    nw,   w,    sw,   s,    se,   e,    ne,   c  ]
        positions: ['ci', 'ci', 'ci', 'ci', 'ci', 'ci', 'ci', 'ci', 'ci'],
        dummies: [false, false, false, false, false, false, false, false, true],
        banner: true,
        total: 1
    },
    {
        type: 3,
        //         [ n,    nw,   w,   sw,  s,   se,   e,   ne,   c  ]
        positions: ['ci', 'ci', 'ci', 'f', 'f', 'f', 'ci', 'ci', 'ci'],
        dummies: [false, false, false, false, true, false, false, false, true],
        banner: false,
        total: 3
    },
    {
        type: 4,
        //         [ n,   nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci', 'ci', 'ci', 'f', 'f', 'f', 'ci', 'ci', 'ci'],
        dummies: [false, false, false, false, true, false, false, false, true],
        banner: true,
        total: 1
    },
    {
        type: 5,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci', 'ci', 'ci', 'f', 'r', 'f', 'ci', 'ci', 'ci'],
        dummies: [false, false, false, true, true, true, false, false, true],
        banner: false,
        total: 1
    },
    {
        type: 6,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci', 'ci', 'ci', 'f', 'r', 'f', 'ci', 'ci', 'ci'],
        dummies: [false, false, false, true, true, true, false, false, true],
        banner: true,
        total: 2   
    },
    {
        type: 7,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci', 'ci', 'ci', 'f', 'f', 'f', 'f', 'f', 'f'],
        dummies: [false, true, false, false, false, true, false, false, false],
        banner: false,
        total: 3   
    },
    {
        type: 8,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci', 'ci', 'ci', 'f', 'f', 'f', 'f', 'f', 'f'],
        dummies: [false, true, false, false, false, true, false, false, false],
        banner: true,
        total: 2   
    },
    {
        type: 9,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci', 'ci', 'ci', 'f', 'r', 'f', 'r', 'f', 'f'],
        dummies: [false, true, false, false, true, true, false, false, true],
        banner: false,
        total: 3   
    },
    {
        type: 10,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci', 'ci', 'ci', 'f', 'r', 'f', 'r', 'f', 'f'],
        dummies: [false, true, false, false, true, true, false, false, true],
        banner: true,
        total: 2   
    },
    {
        type: 11,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['f',  'f',  'ci', 'f', 'f', 'f', 'ci', 'f', 'ci'],
        dummies: [true, false, false, false, true, false, false, false, true],
        banner: false,
        total: 1  
    },
    {
        type: 12,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['f',  'f',  'ci', 'f', 'f', 'f', 'ci', 'f', 'ci'],
        dummies: [true, false, false, false, true, false, false, false, true],
        banner: true,
        total: 2  
    },
    {
        type: 13,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci',  'f',  'ci', 'f', 'f', 'f', 'f', 'f', 'f'],
        dummies: [true, false, true, false, false, false, false, false, true],
        banner: false,
        total: 2  
    },
    {
        type: 14,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci',  'f',  'f', 'f', 'ci', 'f', 'f', 'f', 'f'],
        dummies: [true, false, false, false, true, false, false, false, true],
        banner: false,
        total: 3  
    },
    {
        type: 15,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci',  'f',  'f', 'f', 'f', 'f', 'f', 'f', 'f'],
        dummies: [true, false, false, false, false, false, false, false, true],
        banner: false,
        total: 5  
    },
    {
        type: 16,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci',  'f',  'r', 'f', 'r', 'f', 'f', 'f', 'f'],
        dummies: [true, false, false, true, true, false, false, false, true],
        banner: false,
        total: 3 
    },
    {
        type: 17,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci',  'f',  'f', 'f', 'r', 'f', 'r', 'f', 'f'],
        dummies: [true, false, false, false, true, true, false, false, true],
        banner: false,
        total: 3 
    },
    {
        type: 18,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci',  'f',  'r', 'f', 'r', 'f', 'r', 'f', 'x'],
        dummies: [true, false, true, true, true, true, true, true, false],
        banner: false,
        total: 3 
    },
    {
        type: 19,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci',  'f',  'r', 'f', 'f', 'f', 'r', 'f', 'r'],
        dummies: [true, false, false, false, true, false, false, true, true],
        banner: false,
        total: 4 
    },
    {
        type: 20,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['r',  'f',   'f', 'f', 'r', 'f', 'f', 'f',  'r'],
        dummies: [false, false, true, false, false, false, true, false, true],
        banner: false,
        total: 8 
    },
    {
        type: 21,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['f',  'f',  'r', 'f', 'r', 'f', 'f', 'f',  'r'],
        dummies: [false, false, false, true, true, false, false, true, false],
        banner: false,
        total: 9 
    },
    {
        type: 22,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['f',  'f',   'r', 'f', 'r', 'f', 'r', 'f',  'x'],
        dummies: [true, false, true, true, true, true, true, false, false],
        banner: false,
        total: 4 
    },
    {
        type: 23,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['r',  'f',   'r', 'f', 'r', 'f', 'r', 'f',  'x'],
        dummies: [true, true, true, true, true, true, true, true, false],
        banner: false,
        total: 1 
    },

];

////////////////////////
//    TILE OBJECT     //
////////////////////////

// args:
// orientation: 0, 1, 2, 3 (clockwise)
Tile = function (type, orientation){
    this.type = type;
    var tmpTile = predefTiles[type].positions;
    this.orientation = orientation || 0;
    this.positions = {
        get n  () { return predefTiles[type].positions[(0+this.orientation*2)%8]; },
        get nw () { return predefTiles[type].positions[(1+this.orientation*2)%8]; },
        get w  () { return predefTiles[type].positions[(2+this.orientation*2)%8]; },
        get sw () { return predefTiles[type].positions[(3+this.orientation*2)%8]; },
        get s  () { return predefTiles[type].positions[(4+this.orientation*2)%8]; },
        get se () { return predefTiles[type].positions[(5+this.orientation*2)%8]; },
        get e  () { return predefTiles[type].positions[(6+this.orientation*2)%8]; },
        get ne () { return predefTiles[type].positions[(7+this.orientation*2)%8]; },
        get c  () { return predefTiles[type].positions[8]; }
    }
}

// Turns 90 degrees clockwise
Tile.prototype.turnTile = function(){
    this.orientation = (this.orientation + 1) % 4;
}

/////////////////////////
//    TILES OBJECT     //
/////////////////////////

Tiles = function() {
    this.queue = [];
    this.currentTile = null;
}

//Returns random int between maximum(excluded)
//and minimum(included)
function getRandomArbitrary (max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}

//Returns true if there are tiles left from
//each type, false if the contrary
function filterByTotal (obj) {
    if(obj.total > 0){
        return true;
    }else{
        return false;
    }
}

Tiles.prototype.initTiles = function() {
    var startingTiles = JSON.parse(JSON.stringify(predefTiles));
    while(this.queue.length < 72){
        var remainingTiles = startingTiles.filter(filterByTotal);
        var Type = getRandomArbitrary(remainingTiles.length,0);
        if(remainingTiles[Type].total !== 0){
            --remainingTiles[Type].total;
            var tile = new Tile(remainingTiles[Type].type, 0);
            this.queue.push(tile);
        }else {
            throw "No more units of the picked tile"
        }
    }
};

Tiles.prototype.popTile = function() {
    if(this.queue.length > 0){
        this.currentTile = this.queue.pop();
        if(this.currentTile == null){
            throw "Popped null tile"
        }
        return this.currentTile;
    }
};






















































debug = false;


/////////////////////////////
// TreesCollection OBJECT  //
/////////////////////////////

// TreesCollection constructor
TreesCollection = function(){
	this.collection = {
        fieldTrees: [],
        cityTrees: [],
        roadTrees: []
    };

    // Poinst per tile
    this.points = {
        fieldTile: 1,
        cityTile: 2,
        roadTile: 1
    }
}

// This function inserts the tile in one
// or more than one tree, depending on
// the zones of the tile.
// Also, this function returns null if 
// no tree has completed, and returns the
// players with their additional points if 
// some tree has completed with the following
// format: [["Player1", points],["Player2",points],...]
// coor: {x: 0, y: 4}
TreesCollection.prototype.insertTile = function(tile, coor){
    if(debug) console.log("insertTile({" + tile.type + ", " + tile.orientation + "}, [" + coor.x  + "," + coor.y + "]" + ")");
    var completedTrees = saveTileInTrees(coor, tile, 
        this.collection.fieldTrees, 
        this.collection.cityTrees, 
        this.collection.roadTrees);
    if(checkCompletedTrees(completedTrees)){
        toArrayOfTrees(completedTrees);
    }else{
        if(debug) console.log("There is no completed tree");
        return null;
    }
}




///////////////////////////////
//    FOR MANAGING TREES     //
///////////////////////////////

computePoints = function(completedTrees){
    // TO DO: process the trees in orther to
    //        get the players points
}

// this function check if there is at least
// a completed Tree in the completedTrees array
checkCompletedTrees = function(completedTrees){
    for(i in completedTrees){
        if(completedTrees[i].length>0)
            return true;
    }
    return false;
}

// this function turns an array of arrays of trees
// into an array of trees
toArrayOfTrees = function(arrayOfArrays){
    var arrayOfTrees = [];
    for(i in arrayOfArrays){
        if(arrayOfArrays[i].length>0){
            for(n in arrayOfArrays[i]){
                arrayOfTrees.push(arrayOfArrays[i][n]);
            }
        }
    }
    arrayOfArrays = arrayOfTrees;
}

// this function returns an array of completed Trees by type of zone
// completedTrees = [[completed fTrees],[completed ciTrees],[completed rTrees]];
saveTileInTrees = function(coord, tile, fieldTrees, cityTrees, roadTrees){
    var areasOfAllTypes = getAreasTile(tile.type, tile.orientation); //{f: [['se'],['sw']], r: [['s']], ci: [['n','e','w']] }
    if(debug) console.log(areasOfAllTypes);
    var completedTrees = [];
    var fTrees = saveTileInTreesOfAType(areasOfAllTypes.f, fieldTrees, coord, 'f');
    var ciTrees = saveTileInTreesOfAType(areasOfAllTypes.ci, cityTrees, coord, 'ci');
    var rTrees = saveTileInTreesOfAType(areasOfAllTypes.r, roadTrees, coord, 'r');
    completedTrees.push(fTrees, ciTrees, rTrees);
    return completedTrees;
}

// areas: eg. areasOfAllTypes.f
// treesOfType: eg. the array of field Trees
// coord: {x: 0, y: 4}
// type: 'r', 'f' or 'r'
// this function returns an array of completed Trees
saveTileInTreesOfAType = function(areas, treesOfType, coord, type){
    var completedTrees = [];
    areas.forEach(function(area){
        var trees = findTreesNeed(coord, area, treesOfType);
        if (trees.length == 0){
            if(debug) console.log("NEW TREE: (" + type + ", [" + coord.x  + "," + coord.y + "],  " + area + ")");
            var newTree = new Tree(type, coord, area);
            treesOfType.push(newTree);
            if(debug){
                console.log("****************************************************");
                newTree.printTree();
                console.log("****************************************************\n");
            }
        } else if (trees.length == 1){
            if(debug) console.log("ONE TREE");
            trees[0].placeNode(coord, area);
            if(debug){
                console.log("****************************************************");
                trees[0].printTree();
                console.log("****************************************************\n");
            }
        } else {
            if(debug) console.log("MULTIPLE TREES");
            for (var i = 1; i< (trees.length -1); i++){
                trees[0].mergeWith(trees[i], coord, area);
                var delTree = treesOfType.indexOf(trees[i]);
                treesOfType.splice(delTree, 1);
            }
            trees[0].placeNode(coord, area);
            if(debug){
                console.log("****************************************************");
                trees[0].printTree();
                console.log("****************************************************\n");
            }
        }
        // If the tree is completed, add it to completedTrees
        if(trees[0]!=undefined && trees[0].getLeftChildren()==0){
            completedTrees.push(trees[0]);
            trees[0].printTree();
        }
    });
    return completedTrees;
}

// coord: {x: 0, y: 4}
// area: a part of areasOfAllTypes.f, eg. ['se'] or ['n','e','w']
// treesArray: eg. the array of field Trees
findTreesNeed = function(coord, area, treesArray){
    var trees = [];
    treesArray.forEach(function(tree){
        if (tree.existsNode(coord, area))
            trees.push(tree);
    });
    return trees;
}


//////////////////////////
//    GET AREAS TILE    //
//////////////////////////

// This is a preset method than guiven a typeTile returns all the posibles
// areas in the tile of city, road and field.
getAreasTile = function(typeTile, orientation){
    //       0    1     2     3    4     5     6     7    8     9    10    11
    zone = ['n', 'ne', 'en', 'e', 'es', 'se', 's', 'sw', 'ws', 'w', 'wn', 'nw'];
    turn = (orientation*3);
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
        return {f:  [ [ zone[(0+turn)%12], zone[(3+turn)%12], zone[(9+turn)%12], zone[(7+turn)%12], zone[(5+turn)%12] ] ],
                r:  [ [ zone[(6+turn)%12] ] ],
                ci: [] }
        break;
    case 2:
        return {f:  [],
                r:  [],
                ci: [ [ zone[(0+turn)%12], zone[(3+turn)%12], zone[(6+turn)%12], zone[(9+turn)%12] ] ] }
        break;
    case 3:
        return {f:  [ [ zone[(6+turn)%12] ] ],
                r:  [],
                ci: [ [ zone[(0+turn)%12], zone[(3+turn)%12], zone[(9+turn)%12] ] ] }
        break;
    case 4://banner
        return {f:  [ [ zone[(6+turn)%12] ] ],
                r:  [],
                ci: [ [ zone[(0+turn)%12], zone[(3+turn)%12], zone[(9+turn)%12] ] ] }
        break;
    case 5:
        return {f:  [ [ zone[(5+turn)%12] ], [ zone[(7+turn)%12] ] ],
                r:  [ [ zone[(6+turn)%12] ] ],
                ci: [ [ zone[(0+turn)%12], zone[(3+turn)%12], zone[(9+turn)%12] ] ] }
        break;
    case 6://banner
        return {f:  [ [ zone[(5+turn)%12] ], [ zone[(7+turn)%12] ] ],
                r:  [ [ zone[(6+turn)%12] ] ],
                ci: [ [ zone[(0+turn)%12], zone[(3+turn)%12], zone[(9+turn)%12] ] ] }
        break;
    case 7:
        return {f:  [ [ zone[(3+turn)%12], zone[(6+turn)%12] ] ],
                r:  [],
                ci: [ [ zone[(0+turn)%12], zone[(9+turn)%12] ] ] }
        break;
    case 8: //banner
        return {f:  [ [ zone[(3+turn)%12], zone[(6+turn)%12] ] ],
                r:  [],
                ci: [ [ zone[(0+turn)%12], zone[(9+turn)%12] ] ] }
        break;
    case 9:
        return {f:  [ [ zone[(2+turn)%12], zone[(7+turn)%12] ], [ zone[(4+turn)%12], zone[(5+turn)%12] ] ],
                r:  [ [ zone[(3+turn)%12], zone[(6+turn)%12] ] ],
                ci: [ [ zone[(0+turn)%12], zone[(9+turn)%12] ] ] }
        break;
    case 10: //banner
        return {f:  [ [ zone[(2+turn)%12], zone[(7+turn)%12] ], [ zone[(4+turn)%12], zone[(5+turn)%12] ] ],
                r:  [ [ zone[(3+turn)%12], zone[(6+turn)%12] ] ],
                ci: [ [ zone[(0+turn)%12], zone[(9+turn)%12] ] ] }
        break;
    case 11:
        return {f:  [ [ zone[(0+turn)%12] ], [ zone[(6+turn)%12] ] ],
                r:  [],
                ci: [ [ zone[(3+turn)%12], zone[(9+turn)%12] ] ] }
        break;
    case 12: //banner
        return {f:  [ [ zone[(0+turn)%12] ], [ zone[(6+turn)%12] ] ],
                r:  [],
                ci: [ [ zone[(3+turn)%12], zone[(9+turn)%12] ] ] }
        break;
    case 13:
        return {f:  [ [ zone[(3+turn)%12], zone[(6+turn)%12] ] ],
                r:  [],
                ci: [ [ zone[(0+turn)%12] ], [ zone[(9+turn)%12] ] ] }
        break;
    case 14:
        return {f:  [ [ zone[(3+turn)%12], zone[(9+turn)%12] ] ],
                r:  [],
                ci: [ [ zone[(0+turn)%12] ], [ zone[(6+turn)%12] ] ] }
        break;
    case 15:
        return {f:  [ [ zone[(3+turn)%12], zone[(6+turn)%12], zone[(9+turn)%12] ] ],
                r:  [],
                ci: [ [ zone[(0+turn)%12] ] ] }
        break;
    case 16:
        return {f:  [ [ zone[(3+turn)%12], zone[(5+turn)%12], zone[(10+turn)%12] ], [ zone[(7+turn)%12], zone[(8+turn)%12] ] ],
                r:  [ [ zone[(6+turn)%12], zone[(9+turn)%12] ] ],
                ci: [ [ zone[(0+turn)%12] ] ] }
        break;
    case 17:
        return {f:  [ [ zone[(2+turn)%12], zone[(7+turn)%12], zone[(9+turn)%12] ], [ zone[(4+turn)%12], zone[(5+turn)%12] ] ],
                r:  [ [ zone[(3+turn)%12], zone[(6+turn)%12] ] ],
                ci: [ [ zone[(0+turn)%12] ] ] }
        break;
    case 18:
        return {f:  [ [ zone[(2+turn)%12], zone[(10+turn)%12] ], [ zone[(4+turn)%12], zone[(5+turn)%12] ], [ zone[(7+turn)%12], zone[(8+turn)%12] ] ],
                r:  [ [ zone[(3+turn)%12] ], [ zone[(6+turn)%12] ], [ zone[(9+turn)%12] ] ],
                ci: [ [ zone[(0+turn)%12] ] ] }
        break;
    case 19:
        return {f:  [ [ zone[(4+turn)%12], zone[(6+turn)%12], zone[(8+turn)%12] ], [ zone[(2+turn)%12], zone[(10+turn)%12] ] ],
                r:  [ [ zone[(3+turn)%12], zone[(9+turn)%12] ] ],
                ci: [ [ zone[(0+turn)%12] ] ] }
        break;
    case 20:
        return {f:  [ [ zone[(1+turn)%12], zone[(3+turn)%12], zone[(5+turn)%12] ], [ zone[(7+turn)%12], zone[(9+turn)%12], zone[(11+turn)%12] ] ],
                r:  [ [ zone[(0+turn)%12], zone[(6+turn)%12] ] ],
                ci: [] }
        break;
    case 21:
        return {f:  [ [ zone[(0+turn)%12], zone[(3+turn)%12], zone[(5+turn)%12], zone[(10+turn)%12] ], [ zone[(7+turn)%12], zone[(8+turn)%12] ] ],
                r:  [ [ zone[(6+turn)%12], zone[(9+turn)%12] ] ],
                ci: [] }
        break;
    case 22:
        return {f:  [ [ zone[(0+turn)%12], zone[(2+turn)%12], zone[(10+turn)%12] ], [ zone[(4+turn)%12], zone[(5+turn)%12] ], [ zone[(7+turn)%12], zone[(8+turn)%12] ] ],
                r:  [ [ zone[(3+turn)%12] ], [ zone[(6+turn)%12] ], [ zone[(9+turn)%12] ] ],
                ci: [] }
        break;
    case 23:
        return {f:  [ [ zone[(1+turn)%12], zone[(2+turn)%12] ], [ zone[(4+turn)%12], zone[(5+turn)%12] ], [ zone[(7+turn)%12], zone[(8+turn)%12] ], [ zone[(10+turn)%12], zone[(11+turn)%12] ] ],
                r:  [ [ zone[(0+turn)%12] ], [ zone[(3+turn)%12] ], [ zone[(6+turn)%12] ], [ zone[(9+turn)%12] ] ],
                ci: [] }
        break;
    default:
        console.error ("In TreeStructure getAreasTile: It's not a valid type: <" + typeTile + ">");
        return {f: [], r: [], ci: []}
    }
}


c = new TreesCollection();

t = new Tile(19, 2);
c.insertTile(t, {x:49, y:49});