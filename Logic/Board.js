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
        dummies: [false, false, true, false, false, false, true, false, false],
        banner: true,
        total: 1
    },
    {
        type: 3,
        //         [ n,    nw,   w,   sw,  s,   se,   e,   ne,   c  ]
        positions: ['ci', 'ci', 'ci', 'f', 'f', 'f', 'ci', 'ci', 'ci'],
        dummies: [false, false, true, false, true, false, true, false, false],
        banner: false,
        total: 3
    },
    {
        type: 4,
        //         [ n,   nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci', 'ci', 'ci', 'f', 'f', 'f', 'ci', 'ci', 'ci'],
        dummies: [false, false, true, false, true, false, true, false, false],
        banner: true,
        total: 1
    },
    {
        type: 5,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci', 'ci', 'ci', 'f', 'r', 'f', 'ci', 'ci', 'ci'],
        dummies: [false, false, true, true, true, true, true, false, false],
        banner: false,
        total: 1
    },
    {
        type: 6,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci', 'ci', 'ci', 'f', 'r', 'f', 'ci', 'ci', 'ci'],
        dummies: [false, false, true, true, true, true, true, false, false],
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
        dummies: [false, true, false, true, true, true, false, true, false],
        banner: false,
        total: 3
    },
    {
        type: 10,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci', 'ci', 'ci', 'f', 'r', 'f', 'r', 'f', 'f'],
        dummies: [false, true, false, true, true, true, false, true, false],
        banner: true,
        total: 2
    },
    {
        type: 11,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['f',  'f',  'ci', 'f', 'f', 'f', 'ci', 'f', 'ci'],
        dummies: [true, false, true, false, true, false, true, false, false],
        banner: false,
        total: 1
    },
    {
        type: 12,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['f',  'f',  'ci', 'f', 'f', 'f', 'ci', 'f', 'ci'],
        dummies: [true, false, true, false, true, false, true, false, false],
        banner: true,
        total: 2
    },
    {
        type: 13,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci',  'f',  'ci', 'f', 'f', 'f', 'f', 'f', 'f'],
        dummies: [true, false, true, false, true, false, true, false, false],
        banner: false,
        total: 2
    },
    {
        type: 14,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci',  'f',  'f', 'f', 'ci', 'f', 'f', 'f', 'f'],
        dummies: [true, false, true, false, true, false, true, false, false],
        banner: false,
        total: 3
    },
    {
        type: 15,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci',  'f',  'f', 'f', 'f', 'f', 'f', 'f', 'f'],
        dummies: [true, false, false, false, true, false, false, false, false],
        banner: false,
        total: 5
    },
    {
        type: 16,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci',  'f',  'r', 'f', 'r', 'f', 'f', 'f', 'f'],
        dummies: [true, false, false, true, true, false, true, false, false],
        banner: false,
        total: 3
    },
    {
        type: 17,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci',  'f',  'f', 'f', 'r', 'f', 'r', 'f', 'f'],
        dummies: [true, false, true, false, true, true, false, false, false],
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
        dummies: [true, false, true, false, true, false, true, true, false],
        banner: false,
        total: 4
    },
    {
        type: 20,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['r',  'f',   'f', 'f', 'r', 'f', 'f', 'f',  'r'],
        dummies: [true, false, true, false, true, false, true, false, false],
        banner: false,
        total: 8
    },
    {
        type: 21,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['f',  'f',  'r', 'f', 'r', 'f', 'f', 'f',  'f'],
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
    var that = this;
    this.positions = {
        get n  () { return predefTiles[type].positions[(0+that.orientation*2)%8]; },
        get nw () { return predefTiles[type].positions[(1+that.orientation*2)%8]; },
        get w  () { return predefTiles[type].positions[(2+that.orientation*2)%8]; },
        get sw () { return predefTiles[type].positions[(3+that.orientation*2)%8]; },
        get s  () { return predefTiles[type].positions[(4+that.orientation*2)%8]; },
        get se () { return predefTiles[type].positions[(5+that.orientation*2)%8]; },
        get e  () { return predefTiles[type].positions[(6+that.orientation*2)%8]; },
        get ne () { return predefTiles[type].positions[(7+that.orientation*2)%8]; },
        get c  () { return predefTiles[type].positions[8]; }
    };
    this.dummies = {
        get n  () { return predefTiles[type].dummies[(0+that.orientation*2)%8]; },
        get nw () { return predefTiles[type].dummies[(1+that.orientation*2)%8]; },
        get w  () { return predefTiles[type].dummies[(2+that.orientation*2)%8]; },
        get sw () { return predefTiles[type].dummies[(3+that.orientation*2)%8]; },
        get s  () { return predefTiles[type].dummies[(4+that.orientation*2)%8]; },
        get se () { return predefTiles[type].dummies[(5+that.orientation*2)%8]; },
        get e  () { return predefTiles[type].dummies[(6+that.orientation*2)%8]; },
        get ne () { return predefTiles[type].dummies[(7+that.orientation*2)%8]; },
        get c  () { return predefTiles[type].dummies[8]; }
    }
}

// Turns 90 degrees clockwise
Tile.prototype.turnTile = function(){
    this.orientation = (this.orientation + 1) % 4;
}

/////////////////////////
//    TILES OBJECT     //
/////////////////////////

var initTiles = function (queue) {
    var startingTiles = JSON.parse(JSON.stringify(predefTiles));
    while(queue.length < 72){
        var remainingTiles = startingTiles.filter(filterByTotal);
        var Type = getRandomArbitrary(remainingTiles.length,0);
        if(remainingTiles[Type].total !== 0){
            --remainingTiles[Type].total;
            var tile = new Tile(remainingTiles[Type].type, 0);
            queue.push(tile);
        }else {
            throw "No more units of the picked tile"
        }
    }
}

Tiles = function() {
    this.queue = [];
    initTiles(this.queue);
    this.currentTile = this.popTile();
}

//Returns random int between maximum(excluded)
//and minimum(included)
var getRandomArbitrary = function (max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}

//Returns true if there are tiles left from
//each type, false if the contrary
var filterByTotal = function (obj) {
    if(obj.total > 0){
        return true;
    }else{
        return false;
    }
}

Tiles.prototype.popTile = function() {
    if(this.queue.length > 0){
        this.currentTile = this.queue.pop();
        if(this.currentTile == null){
            throw "Popped null tile"
        }
        return this.currentTile;
    }
}

///////////////////////////
//      TREE OBJECT      //
///////////////////////////


// type: 'r', 'f', 'ci'
// Allow create a tree with a node
// Coord: {x:1, y:2}
// area: ['se','sw']
// tileType: eg. 19
// dummy: Dummy object
// Coord, area, tileType and dummy aren't required
Tree = function(type, coord, area, tileType, dummy){
    this.dummies = [];
    this.type = type;
    this.firstNode = undefined;
    this.id = getRandomId(type);
    if (coord && area)
        this.placeNode(coord, area, tileType, dummy);
}

// coord: {x:1, y:2}
// area: ['se','sw']
// tileType: eg. 19
// dummy: Dummy object
// ---Check first if exists the node in the tree---.
// If exists, call this function to indicate that is placed
// Return 0 is everything was ok
// Return -1 is something was wrong, msg in the console.
Tree.prototype.placeNode = function(coord, area, tileType, dummy){
    if (tileType === undefined)
        console.warn("Tree " + this.id + ": You aren't telling the tile type");
    var childrenElements = getChildrenElements(coord, area);
    if (this.firstNode == undefined){
        this.firstNode = new Node(coord, null, 'x', childrenElements, true, tileType);
        if (dummy){
            var coorDummy = {x:dummy.coord[0], y:dummy.coord[1]};
            if (sameCoord(coorDummy, coord) && posInArea2(dummy.position, area))
                this.dummies.push(dummy);
        }
    } else {
        childrenElements = this._getNotPlacedCoords(childrenElements);
        var nodes = this.findNodes(coord, area);
        if (nodes.length > 0){
            nodes.forEach(function(node){
                node.placed = true;
                node.setChildren(childrenElements);
                node.tileType = (tileType===undefined) ? -1 : tileType;
            });
            if (dummy){
                var coorDummy = {x:dummy.coord[0], y:dummy.coord[1]};
                if (sameCoord(coorDummy, coord) &&  posInArea2(dummy.position, area))
                    this.dummies.push(dummy);
            }
            return 0;
        }else{
            console.warn("There wasn't any node with: <" + coord + "><" + area + ">");
            return -1;
        }
    }
}


// Returns true or false if coord is in the tree
// independently it is placed or not
// coord: {x:1, y:2}
// area: ['n', 'se' ...]
Tree.prototype.existsNode = function(coord, area){
    var nodes = this.findNodes(coord, area);
    return nodes.length > 0
}


/*
 *  Returns the coords that the tree already need to be closed
 *  format: [{x:50, y:49},{x:49,y:49},...]
 */
Tree.prototype.getLeftCoords = function(){
    if (this.firstNode){
        var remaining = this.firstNode.remainingCoords();
        return remaining;
    } else {
        return [];
    }
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
// remoteTree: Tree object for adding to this tree
// coord: {x:1, y:2}
// area: ['n', 'se' ...]
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
    var dummiesRemote = remoteTree.dummies;
    thisTree = this;
    dummiesRemote.forEach(function(dummy){
        thisTree.dummies.push(dummy);
    });
}


// Returns the number of banners in a tree (only for cities)
Tree.prototype.getNumOfBanners = function(){
    if (this.firstNode){
        var tilesBanner = this.firstNode.nodesBanners();
        return tilesBanner.length;
    } else {
        return 0;
    }
}


// coord: {x:1, y:2}
// area: ['n', 'se' ...] -----> YOU CAN SKYP THIS ARGUMENT
// Returns if a coord is in the tree and is placed (true or false)
Tree.prototype.isPlaced = function(coord, area){
    var area = area || ['n','s','e','w','nw','sw','wn','ws','ne','se','en','es','x'];
    var output = false;
    if (this.firstNode == undefined){
        output = false;
    } else {
        output = this.firstNode.isPlaced(coord, area);
    }
    return output;
}


/***********************
**  USED INTERNALLY   **
***********************/


// coord: {x:1, y:2}
// area: ['n', 'se' ...]
// coord is obligatory. If area is not passed by argument
// it find only the nodes with that coord
Tree.prototype.findNodes = function(coord, area){
    var area = area || ['n','s','e','w','nw','sw','wn','ws','ne','se','en','es','x'];
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
        return !that.isPlaced(element.coord)
    });
    return notPlaced;
}




// For debug issues
Tree.prototype.printTree = function(){
    if (this.firstNode){
        var treeType ="";
        switch(this.type){
        case 'ci': treeType = 'city'; break;
        case 'r': treeType = 'road'; break;
        case 'f': treeType = 'field'; break;
        default: treeType = 'Unknow';
        }
        console.log(" ------ " + treeType + " tree ------ ");
        console.log(" ID:" + this.id + 
                    " LEFT:" + this.getLeftChildren() + 
                    ",TOTAL:" + this.getNumOfTiles()  +
                    ",BANNERS:" + this.getNumOfBanners() + 
                    ",DUMMIES:" + this.dummies.length);
        this.firstNode.printTree(1);
    }else{
        console.log("Empty tree");
    }
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
// tileType
Node = function(coord, parent, pos, childrenElements, placed, tileType){
    var childrenElements = childrenElements || [];
    this.pos = pos || 'x';
    this.coord = coord;
    this.placed = placed || false;
    this.parent = parent || null;
    this.tileType = (tileType===undefined) ? -1 : tileType;
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
// coord: {x:1, y:2}
// area: ['n', 'se' ...]
Node.prototype.isPlaced = function(coord, area){
    var area = area || ['n','s','e','w','nw','sw','wn','ws','ne','se','en','es','x'];
    var output = false;
    if (!coord)
        return false;
    if (sameCoord(this.coord, coord) && this.placed && posInArea(this.pos, area)){
        output = true;
    }else{
        this.children.forEach(function(child){
            if (child.isPlaced(coord, area))
                output = true;
        });
    }
    return output;
}


// For debug issues
Node.prototype.printTree = function(indent){
    console.log(Array(2 * indent).join(" ") + "- coord(" + 
        this.coord.x + "," + this.coord.y +")zone(" + this.pos + 
        ")Placed(" + this.placed + ")Type(" + this.tileType + ")");
    for (var i=0; i<this.children.length; i++){
        this.children[i].printTree(indent + 1);
    }
}


Node.prototype.nodesBanners = function(coordsBanner){
    var coordsBanner = coordsBanner || [];
    if (hasBanner(this.tileType) && !coordInArray(this.coord, coordsBanner))
        coordsBanner.push(this.coord)

    this.children.forEach(function(child){
        coordsBanner = child.nodesBanners(coordsBanner);
    });
    return coordsBanner;
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
    var area = area || [];
    area.forEach(function(element){
        if (element == pos)
            is = true;
    });
    return is;
}


// Returns if the pos guiven is in the area
// with a conversion for predefTiles style
var posInArea2 = function(pos, area){
    var is = false;
    var area = area || [];
    area.forEach(function(element){
        if (getOriginalZone(element) == pos)
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


// Returns if a tile type has banner
var hasBanner = function(tileType){
    var bannerTypes = [2, 4, 6, 8, 10, 12];
    for (var i = 0; i< bannerTypes.length; i++){
        if (tileType == bannerTypes[i])
            return true;
    }
    return false;
}


// Generate an id 
var getRandomId = function(){
    var id = "";
    id += Math.floor(1 + Math.random()*1000).toString();
    var d = new Date();
    id += d.getTime().toString();
    return id;
}


// Converts the zone
// eg. 'en' -> 'ne'
var getOriginalZone = function(zone){
    switch(zone){
    case 'en': 
        return 'ne';
        break;
    case 'es':
        return 'se';
        break;
    case 'wn':
        return 'nw';
        break;
    case 'ws':
        return 'sw';
        break;
    default:
        return zone;
        break;
    }
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

















































/////////////////////////////
//      CELL OBJECT        //
/////////////////////////////

// cell constructor, the cell is initialized without tile
Cell = function(x, y){
    this.tile = null;
    this.x = x;
    this.y = y;
}

/////////////////////////////
//      BOARD OBJECT       //
/////////////////////////////

HORIZONTAL_MAXSIZE = 100;
VERTICAL_MAXSIZE = 100;

Board = function(){
    this.cells = initializeBoard();
    // this field is an array of cells
    // in which we may have a posibility
    // to put a tile if it matches
    this.availableCells = getAvailableCells(this);
}

// This function inserts a tile on the
// given coordinates with a given orientation
// coor: [xx,yy] --> e.g [4,52]
Board.prototype.insertTile = function(tile, coor, dummy){
    this.cells[coor[0]][coor[1]].tile = tile;
    // Update availableCells
    this.availableCells = getAvailableCells(this);
}

// this function returns an array
// of arrays of cells in which, the given tile,
// fits, for each rotation
// allMatchingCells: [[matchingCells for Rot0],
//                    [matchingCells for Rot3],
//                    [matchingCells for Rot2],
//                    [matchingCells for Rot3]]
Board.prototype._getAllMatchingCells = function(tile){
    var allMatchingCells = [];
    for(var i=0; i<4; i++){
        var tempTile = new Tile(tile.type, i);
        var matchingCells = this.getMatchingCells(tempTile);
        allMatchingCells.push(matchingCells);
        //console.log("MATCHINGCELLS: " + matchingCells);
    }
    return allMatchingCells;
}

// this function returns an array
// of cells in which, the given tile,
// fits
Board.prototype.getMatchingCells = function(tile){
    var matchingCells = [];
    var that = this;
    this.availableCells.forEach(function(elem, index){
        var coor = [elem.x, elem.y];
        if(itFits(that, tile, coor)){
            if(!isInArray(elem, matchingCells))
                matchingCells.push(elem);
        }
    });
    return matchingCells;
}

var isInArray = function(value, array){
  return array.indexOf(value) > -1;
}

var initializeBoard = function(){
    var cells = [];
    for(var i=0;i<HORIZONTAL_MAXSIZE;i++){
        var column = [];
        for(var j=0;j<VERTICAL_MAXSIZE;j++){
            column.push(new Cell(i, j));
        }
        cells.push(column);
        column = [];
    }
    // Insert the initial tile on the board
    var t = new Tile(19, 2);
    cells[49][49].tile = t;
    return cells;
}

// this this function returns an array of cells
// in which we may have a posibility
// to put a tile if it matches
var getAvailableCells = function(board){
    var availableCells = [];
    var haveTile = false;
    var emptyCell = true;
    var cell = null;
    var availableCell = null;
    for(var i=0;i<HORIZONTAL_MAXSIZE;i++){
        for(var j=0;j<VERTICAL_MAXSIZE;j++){
            cell = board.cells[i][j];
            if(checkCell(cell, haveTile, emptyCell)=='previous'){
                availableCells.push(board.cells[i][j-1]);
                haveTile = true;
                emptyCell = false;
            }else if(checkCell(cell, haveTile, emptyCell)=='current'){
                availableCells.push(board.cells[i][j]);
                haveTile = false;
                emptyCell = true;
            }
        }
    }
    for(var j=0;j<VERTICAL_MAXSIZE;j++){
        for(var i=0;i<HORIZONTAL_MAXSIZE;i++){
            cell = board.cells[i][j];
            if(checkCell(cell, haveTile, emptyCell)=='previous'){
                availableCells.push(board.cells[i-1][j]);
                haveTile = true;
                emptyCell = false;
            }else if(checkCell(cell, haveTile, emptyCell)=='current'){
                availableCells.push(board.cells[i][j]);
                haveTile = false;
                emptyCell = true;
            }
        }
    }
    return availableCells;
}

// this function returns the cell if
// we may have a posibility
// to put on it a tile in
// otherwise returns null
var checkCell = function(cell, haveTile, emptyCell){
    if(cell.tile){
        if(emptyCell){
            // insert the previous cell
            return 'previous';
        }
    }else if(!cell.tile){
        if(haveTile){
            // insert the current cell
            return 'current';
        }
    }

    return null;
}

// this function returns true if a given tile,
// with the current orientation,
// can fit in a cell on the given board by
// checking the coordinates
// coor: [xx,yy] --> e.g [4,52]
var itFits = function(board, tile, coor){
    var fits = false;
    // this array contains the cells with which
    // we are going to check if the tile fits
    // testableCells = [northCell, eastCell, southCell, westCell]
    var testableCells = getTestableCells(board, coor);
    // console.log("testableCells:");
    // console.log(testableCells);
    // Now we walk the array checking if the tile
    // fits or not
    testableCells.forEach(function(elem, index){
        // the elem is a cell object
        if(elem.tile){
            // this array contains the two zones we have to compare
            // zones[0] -> zone of the current tile
            // zone[1] -> zone of the board tile
            var zones = getZones(tile, elem, index);
            if(zones[0]==zones[1]){
                fits = true;
            }else{
                fits = false;
                return false;
            }
        }
    });
    return fits;
}


// this function returns an array containing
// the cells with which we have to check if
// a tile fits
// testableCells = [northCell, eastCell, southCell, westCell]
var getTestableCells = function(board, coor){
    var testableCells = [];

    var northCell = board.cells[coor[0]][coor[1]-1];
    testableCells.push(northCell);
    var eastCell = board.cells[coor[0]+1][coor[1]];
    testableCells.push(eastCell);
    var southCell = board.cells[coor[0]][coor[1]+1];
    testableCells.push(southCell);
    var westCell = board.cells[coor[0]-1][coor[1]];
    testableCells.push(westCell);

    return testableCells;
}

// this function returns an array containing
// the two zones we have to compare
var getZones = function(tile, elem, index){
    // testableCells = [northCell, eastCell, southCell, westCell]
    // for index=0 -> we have to compare tile.positions.n->elem.tile.positions.s
    // for index=1 -> we have to compare tile.positions.e->elem.tile.positions.w
    // ...
    switch (index) {
      case 0:
        var zone1 = tile.positions.n;
        var zone2 = elem.tile.positions.s;
        break;
      case 1:
        var zone1 = tile.positions.e;
        var zone2 = elem.tile.positions.w;
        break;
      case 2:
        var zone1 = tile.positions.s;
        var zone2 = elem.tile.positions.n;
        break;
      default:
        var zone1 = tile.positions.w;
        var zone2 = elem.tile.positions.e;
        break;
    }
    return [zone1, zone2];
}

/////////////////////////////////////
// DUMMY POSITIONS SET OF FUNCTIONS//
/////////////////////////////////////

var getType = function (zone, tile) {
    switch (zone) {
        case 'n':
            var type = tile.positions.n;
            break;
        case 'nw':
            var type = tile.positions.nw;
            break;
        case 'w':
            var type = tile.positions.w;
            break;
        case 'sw':
            var type = tile.positions.sw;
            break;
        case 's':
            var type = tile.positions.s;
            break;
        case 'se':
            var type = tile.positions.se;
            break;
        case 'e':
            var type = tile.positions.e;
            break;
        case 'ne':
            var type = tile.positions.ne;
            break;
        default:
            throw "Tree type not found";
    }
    return type;
}

//Get trees surrounding the given tile in the given coord.

var getAllTrees = function (treesCollection, tile, coord) {
    var trees = [];
    var zones = ['n', 'nw', 'w', 'sw', 's', 'se', 'e', 'ne'];
    for (var zone in zones) {
        var childCoord, childZone = getCoordAndZoneChild(coord, zone);
        var treeType = getType(zone, tile);
        var auxTrees = treesCollection.getTrees([treeType], childCoord);
        if (auxTrees.length !== 0) trees.push({zone: zone, trees: auxTrees});
    }
    return trees;
}

//Get free trees and their corresponding zones.
//Where a free tree is one that doesn't have any
//dummy in it.

var getFreeZones = function (trees) {
    var freeZones = [];
    for (var tree in trees) {
        if (tree.trees.dummies.length === 0) {
            freeTrees.push(zoneTree.zone);
        }
    }
    return freeZones;
}

//For every orientation ('group'), it access
//every possible cell to add the possible dummy locations.
//Format: [[{cell: Cell1 for Rot0, dummyPos: DummyPos},
//          {cell: Cell2 for Rot0, dummyPos: DummyPos}, ...],
//        [{cell: Cell1 for Rot1, dummyPos: DummyPos},
//          {cell: Cell2 for Rot1, dummyPos: DummyPos}, ...],
//        [{cell: Cell1 for Rot2, dummyPos: DummyPos},
//          {cell: Cell2 for Rot2, dummyPos: DummyPos}, ...],
//        [{cell: Cell1 for Rot3, dummyPos: DummyPos},
//          {cell: Cell2 for Rot3, dummyPos: DummyPos}, ...]]
//  Coords will be in format [x, y]
//  DummyPos will be in format ['n', 'nw', 's', ...]

Board.prototype.getDummyPositions = function (tile) {
    var cells = this._getAllMatchingCells(tile);
    var newArray = [];
    for (var group in cells) {
        var newGroup = [];
        for (var cell in group) {
            var coord = {x: cell.x, y: cell.y};
            var trees = getAllTrees(this.treesCollection, tile ,coord);
            var freeZones = getFreeZones(trees);
            newGroup.push({cell: cell, dummyPos: freeZones});
        }
        newArray.push(newGroup);
    }
    return newArray;
}


/*var b = new Board();

t = new Tile(2, 0);
b.insertTile(t, [49,50]);

t = new Tile(14, 0);
b.insertTile(t, [49,51]);

console.log("\navailableCells:");
console.log(b.availableCells);

t = new Tile(19, 0);
console.log("\nmatchingCells:");

b.getDummyPositions(t)*/
