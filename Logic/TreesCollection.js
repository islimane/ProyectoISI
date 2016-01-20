debug = false;


/////////////////////////////
// TreesCollection OBJECT  //
/////////////////////////////

// TreesCollection constructor
TreesCollection = function(){
	this.trees = {
        fieldTrees: [],
        cityTrees: [],
        roadTrees: [],
        cloisterTrees: []
    };

    // Poinst per tile
    this.points = {
        fieldTile: 1,
        cityTile: 2,
        roadTile: 1,
        cloisterTile: 1
    }
}

// This function inserts the tile in one
// or more than one tree, depending on
// the zones of the tile.
// Also, this function returns null if 
// no tree has completed, and returns the
// players with their additional points if 
// some tree has completed with the following
// coor: {x: 0, y: 4}
// object returned:
// {
//     playersPoints: [[Player1_ID, points],[Player2_ID, points],...],
//     dummies: [dummy1, dummy2,...]
// }
TreesCollection.prototype.insertTile = function(tile, coor, dummy){
    var data = {
        playersPoints: [],
        dummies: []
    };

    if(debug) console.log("insertTile({" + tile.type + ", " + tile.orientation + "}, [" + coor.x  + "," + coor.y + "]" + ")");
    var completedTrees = saveTileInTrees(coor, tile, this, dummy);
    if(checkCompletedTrees(completedTrees)){
        completedTrees = toArrayOfTrees(completedTrees);
        var playersPoints = computePoints(data, completedTrees);
        var dummies = getDummies(completedTrees);
        if(dummies.length>0){
            data.playersPoints = playersPoints;
            data.dummies = dummies;
            console.log("Data:");
            printPlayersPoints(data.playersPoints);
            printDummies(data.dummies);
            console.log("****************************");
        }else{
            return null;
        }
    }else{
        if(debug) console.log("There is no completed tree");
        return null;
    }


}


// This function returns all trees in wich
// a given coordenate exist and is placed.
// coord: {x:1, y:2}
// types: array of types -> format: 'f', 'ci', 'r'
TreesCollection.prototype.getTrees = function(types, coor){
    var trees = [];
    console.log('TYPES: ' + types);
    for (i in types){
        switch (types[i]) {
            case 'f':
                addFieldTrees(this, trees, coor);
                break;
            case 'ci':
                addCityTrees(this, trees, coor);
                break;
            // default -> 'r'
            default:
                addRoadTrees(this, trees, coor);
                break;
        }
    }

    return trees;
}


// This function returns true if the give coord is already placed
// in, at least, one tree
TreesCollection.prototype._isPlacedInColl = function(coord){
    for (var prop in this.trees){
      for(var i in this.trees[prop]){
        if(this.trees[prop][i].isPlaced(coord))
            return true;
      }
    }
    return false;
}


///////////////////////////////
//    FOR MANAGING TREES     //
///////////////////////////////
var computePoints = function(data, completedTrees){
    var playersPoints = [];
    for(i in completedTrees){
        var points = getPoints(completedTrees[i]);
        if(completedTrees[i].dummies!=undefined && completedTrees[i].dummies.length>0){
            // These are the players that are going
            // to increase their points
            var playersId = getPlayersId(completedTrees[i].dummies);
            //console.log("playersId: " + playersId);
            addPlayers(playersPoints, playersId);
            addPoints(playersPoints, playersId, points);
        }
        //console.log("Points: " + (points*10));
    }
    return playersPoints;
}

// For debug issues
var printPlayersPoints = function(playersPoints){
    console.log("playersPoints: ");
    for(i in playersPoints){
        console.log("\t[playerID: " + playersPoints[i][0] + ", points: " + playersPoints[i][1] + "]");
    }
}

var addPoints = function(playersPoints, playersId, points){
    for(i in playersId){
        for(j in playersPoints){
            if(playersPoints[j][0]==playersId[i])
                playersPoints[j][1] += points;
        }
    }
}

// This function add the playersId of the
// players that are not yet in the playersPoints
// array
var addPlayers = function(playersPoints, playersId){
    var playerAlreadyIn = false;
    for(i in playersId){
        for(j in playersPoints){
            if(playersPoints[j][0] == playersId[i]){
                playerAlreadyIn = true;
                break;
            }
        }
        if(!playerAlreadyIn)
            playersPoints.push([playersId[i],0]);
    }
}

// This function returns the points
// for each type of tree (zone type)
var getPoints = function(completedTree){
    var numofTiles = completedTree.getNumOfTiles();
    var treeType = completedTree.type;
    var factor = 0;
    var points = 0;
    switch (treeType) {
        // A tricky way for multiple cases
        case 'f':
        case 'r':
        case 'cl':
            factor = 1;
            points += numofTiles*factor;
            break;
        // default -> 'ci'
        default:
            var numOfBanners = completedTree.getNumOfBanners();
            factor = 2;
            points = (numofTiles*factor) + (2*numOfBanners);
            break;
    }
    return points;
}

// This function returns an array of playesrID
// that represents all users that have a dummy
// on the given dummies array
var getPlayersId = function(dummies){
    var playersId = [];
    for(i in dummies){
        var playerAlreadyIn = contains.call(playersId, dummies[i].playerId);
        // If the player is not already in the array add it
        if(!playerAlreadyIn)
            playersId.push(dummies[i].playerId);
    }
    return playersId;
}

// This function returns all the dummies
// contained in the completedTrees
var getDummies = function(completedTrees){
    var dummies = [];
    for(i in completedTrees){
        for(j in completedTrees[i].dummies){
            if(!dummyAlreadyIn(dummies, completedTrees[i].dummies[j])){
                /*console.log("--------------------------------");
                completedTrees[i].printTree();
                console.log("********************************");*/
                dummies.push(completedTrees[i].dummies[j]);
            }
        }
    }
    return dummies;
}

// For debug issues
var printDummies = function(dummies){
    console.log("dummies: [");
    for(i in dummies){
        console.log("\tdummy(playerID: " + dummies[i].playerId + 
                    ", dummyID: " + dummies[i].dummyId + 
                    ", coor: [" + dummies[i].coord + "]" +
                    ", pos: '" + dummies[i].position + "'" +
                    ")");
    }
    console.log("]");
}

var dummyAlreadyIn = function(dummies, dummy){
    for(i in dummies){
        if(dummy.dummyId===dummies[i].dummyId && dummy.playerId===dummies[i].playerId)
            return true;
    }
    return false;
}

// This function determine whether an array contains a value
var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};

var addFieldTrees = function(collection, trees, coor){
    var currentTree = null;
    for (i in collection.trees.fieldTrees){
        currentTree = collection.trees.fieldTrees[i];
        if(currentTree.isPlaced(coor))
            trees.push(currentTree);
    }
}

var addCityTrees = function(collection, trees, coor){
    var currentTree = null;
    for (i in collection.trees.cityTrees){
        currentTree = collection.trees.cityTrees[i];
        if(currentTree.isPlaced(coor))
            trees.push(currentTree);
    }
}

var addRoadTrees = function(collection, trees, coor){
    var currentTree = null;
    for (i in collection.trees.roadTrees){
        currentTree = collection.trees.roadTrees[i];
        if(currentTree.isPlaced(coor))
            trees.push(currentTree);
    }
}

// this function check if there is at least
// a completed Tree in the completedTrees array
var checkCompletedTrees = function(completedTrees){
    for(i in completedTrees){
        if(completedTrees[i].length>0)
            return true;
    }
    return false;
}

// this function turns an array of arrays of trees
// into an array of trees, and it returns it
var toArrayOfTrees = function(arrayOfArrays){
    var arrayOfTrees = [];
    for(i in arrayOfArrays){
        if(arrayOfArrays[i].length>0){
            for(n in arrayOfArrays[i]){
                arrayOfTrees.push(arrayOfArrays[i][n]);
            }
        }
    }
    return arrayOfTrees;
}

// this function returns an array of completed Trees by type of zone
// completedTrees = [[completed fTrees],[completed ciTrees],[completed rTrees]];
saveTileInTrees = function(coord, tile, coll, dummy){

    var areasOfAllTypes = getAreasTile(tile.type, tile.orientation); //{f: [['se'],['sw']], r: [['s']], ci: [['n','e','w']] , cl: true/false}
    if(debug) console.log(areasOfAllTypes);
    var completedTrees = [];
    var fTrees = saveTileInTreesOfAType(areasOfAllTypes.f, true, coll.trees.fieldTrees, coord, 'f', tile.type, dummy);
    var ciTrees = saveTileInTreesOfAType(areasOfAllTypes.ci, true, coll.trees.cityTrees, coord, 'ci', tile.type, dummy);
    var rTrees = saveTileInTreesOfAType(areasOfAllTypes.r, true, coll.trees.roadTrees, coord, 'r', tile.type, dummy);
    var clTrees = saveTileInTreesOfAType(areasOfAllTypes.cl, false, coll.trees.cloisterTrees, coord, 'cl', tile.type, dummy);
    if(areasOfAllTypes.cl){
        var clTree = saveClTree(coord, dummy, tile.type, coll);
        // If clTree!=null is beacause a single tile has completed
        // the cloister Tree
        if(clTree)
            clTrees.push(clTree);
    }
    completedTrees.push(fTrees, ciTrees, rTrees, clTrees);
    
    return completedTrees;
}

// areas: eg. areasOfAllTypes.f
// treesOfType: eg. the array of field Trees
// coord: {x: 0, y: 4}
// type: 'r', 'f' or 'r'
// normalType: true/false ---> fieldTree, cityTree, roadTrees
// this function returns an array of completed Trees
saveTileInTreesOfAType = function(areas, normalType, treesOfType, coord, type, tileType, dummy){
    var completedTrees = null;
    if(normalType){
        completedTrees = saveTileOfNormalType(areas, treesOfType, coord, type, tileType, dummy);
    }else{
        //specialType
        completedTrees = saveTileOfSpecialType(treesOfType, coord, type);
    }

    return completedTrees;
}

// This function checks if a tree of a special type
// (e.g. "cloisterTree") needs the given coord and, 
// in that case, inserts the given coord.
// coord: {x: 0, y: 4}
// type: 'cl'
// this function returns an array of completed Trees
saveTileOfSpecialType = function(treesOfType, coord, type){
    // For now we just have one specialType -> cloisterTree
    var completedTrees = [];
    // In this case, we dont wark with treesNeed
    // because the function placeClTile() handle
    // the exception when a tree does not need the
    // coord
    for(i in treesOfType){
        treesOfType[i].placeClTile(coord);
        if(treesOfType[i].getLeftChildren()==0){
            treesOfType[i].printTree();
            completedTrees.push(treesOfType[i]);
        }
    }
    return completedTrees;
}


// This function save a new cloister Tree on cloisterTrees
saveClTree = function(coord, dummy, tileType, coll){
    var tree = new Tree('cl', coord, 'c', tileType, dummy);
    // Now we have to place each coord, that has a tile
    // in it, around the cloister tile
    var borderingCoords = getBorderingCoords(coord);
    for(var i in borderingCoords){
        if(coll._isPlacedInColl(borderingCoords[i])){
            tree.placeClTile(borderingCoords[i]);
        }
    }
    coll.trees.cloisterTrees.push(tree);
    // If the cloister tree is completed we have to notify it
    // by returning the current completed tree
    if(tree.getLeftChildren()==0)
        return tree;

    return null;
}

// This function, for a given coord, returns all coords
// (8 coords) arraound it
getBorderingCoords = function(coord){
    var borderingCoords = [];
    for(var x=(coord.x-1); x<(coord.x+2); x++){
        for(var y=(coord.y-1); y<(coord.y+2); y++){
            if(coord.x!=x || coord.y!=y){
                borderingCoords.push({x: x, y: y});
            }
        }
    }
    return borderingCoords;
}


// This function save a tile of a normal type: fieldTree, cityTree, roadTrees
// areas: eg. areasOfAllTypes.f
// treesOfType: eg. the array of field Trees
// coord: {x: 0, y: 4}
// type: 'r', 'f' or 'r'
// this function returns an array of completed Trees
saveTileOfNormalType = function(areas, treesOfType, coord, type, tileType, dummy){
    var completedTrees = [];
    areas.forEach(function(area){
        var trees = findTreesNeed(coord, area, treesOfType);
        if (trees.length == 0){
            if(debug) console.log("NEW TREE: (" + type + ", [" + coord.x  + "," + coord.y + "],  " + area + ")");
            var newTree = new Tree(type, coord, area, tileType, dummy);
            treesOfType.push(newTree);
            if(debug){
                console.log("****************************************************");
                newTree.printTree();
                console.log("****************************************************\n");
            }
        } else if (trees.length == 1){
            if(debug) console.log("ONE TREE -> tileType: " + tileType);
            if(debug) console.log("trees[0].placeNode({" + coord.x + "," + coord.y + "}, [" + area + "], " + tileType + ", " + dummy + ")")
            trees[0].placeNode(coord, area, tileType, dummy);
            if(debug){
                console.log("****************************************************");
                trees[0].printTree();
                console.log("****************************************************\n");
            }
        } else {
            if(debug) console.log("MULTIPLE TREES");
            if(debug) console.log("trees[0].id: " + trees[0].id);
            for (var i = 1; i< (trees.length); i++){
                if(debug) console.log("trees[" + i + "].id: " + trees[i].id);
                trees[0].mergeWith(trees[i], coord, area);
                var delTree = treesOfType.indexOf(trees[i]);
                treesOfType.splice(delTree, 1);
            }
            trees[0].placeNode(coord, area, tileType, dummy);
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
                ci: [],
                cl: true
                }
        break;
    case 1:
        return {f:  [ [ zone[(0+turn)%12], zone[(3+turn)%12], zone[(9+turn)%12], zone[(7+turn)%12], zone[(5+turn)%12] ] ],
                r:  [ [ zone[(6+turn)%12] ] ],
                ci: [],
                cl: true
                }
        break;
    case 2:
        return {f:  [],
                r:  [],
                ci: [ [ zone[(0+turn)%12], zone[(3+turn)%12], zone[(6+turn)%12], zone[(9+turn)%12] ] ],
                cl: false
                }
        break;
    case 3:
        return {f:  [ [ zone[(6+turn)%12] ] ],
                r:  [],
                ci: [ [ zone[(0+turn)%12], zone[(3+turn)%12], zone[(9+turn)%12] ] ],
                cl: false
                }
        break;
    case 4://banner
        return {f:  [ [ zone[(6+turn)%12] ] ],
                r:  [],
                ci: [ [ zone[(0+turn)%12], zone[(3+turn)%12], zone[(9+turn)%12] ] ],
                cl: false 
                }
        break;
    case 5:
        return {f:  [ [ zone[(5+turn)%12] ], [ zone[(7+turn)%12] ] ],
                r:  [ [ zone[(6+turn)%12] ] ],
                ci: [ [ zone[(0+turn)%12], zone[(3+turn)%12], zone[(9+turn)%12] ] ],
                cl: false 
                }
        break;
    case 6://banner
        return {f:  [ [ zone[(5+turn)%12] ], [ zone[(7+turn)%12] ] ],
                r:  [ [ zone[(6+turn)%12] ] ],
                ci: [ [ zone[(0+turn)%12], zone[(3+turn)%12], zone[(9+turn)%12] ] ],
                cl: false 
                }
        break;
    case 7:
        return {f:  [ [ zone[(3+turn)%12], zone[(6+turn)%12] ] ],
                r:  [],
                ci: [ [ zone[(0+turn)%12], zone[(9+turn)%12] ] ],
                cl: false 
                }
        break;
    case 8: //banner
        return {f:  [ [ zone[(3+turn)%12], zone[(6+turn)%12] ] ],
                r:  [],
                ci: [ [ zone[(0+turn)%12], zone[(9+turn)%12] ] ],
                cl: false 
                }
        break;
    case 9:
        return {f:  [ [ zone[(2+turn)%12], zone[(7+turn)%12] ], [ zone[(4+turn)%12], zone[(5+turn)%12] ] ],
                r:  [ [ zone[(3+turn)%12], zone[(6+turn)%12] ] ],
                ci: [ [ zone[(0+turn)%12], zone[(9+turn)%12] ] ],
                cl: false 
                }
        break;
    case 10: //banner
        return {f:  [ [ zone[(2+turn)%12], zone[(7+turn)%12] ], [ zone[(4+turn)%12], zone[(5+turn)%12] ] ],
                r:  [ [ zone[(3+turn)%12], zone[(6+turn)%12] ] ],
                ci: [ [ zone[(0+turn)%12], zone[(9+turn)%12] ] ],
                cl: false 
                }
        break;
    case 11:
        return {f:  [ [ zone[(0+turn)%12] ], [ zone[(6+turn)%12] ] ],
                r:  [],
                ci: [ [ zone[(3+turn)%12], zone[(9+turn)%12] ] ],
                cl: false 
                }
        break;
    case 12: //banner
        return {f:  [ [ zone[(0+turn)%12] ], [ zone[(6+turn)%12] ] ],
                r:  [],
                ci: [ [ zone[(3+turn)%12], zone[(9+turn)%12] ] ],
                cl: false 
                }
        break;
    case 13:
        return {f:  [ [ zone[(3+turn)%12], zone[(6+turn)%12] ] ],
                r:  [],
                ci: [ [ zone[(0+turn)%12] ], [ zone[(9+turn)%12] ] ],
                cl: false 
                }
        break;
    case 14:
        return {f:  [ [ zone[(3+turn)%12], zone[(9+turn)%12] ] ],
                r:  [],
                ci: [ [ zone[(0+turn)%12] ], [ zone[(6+turn)%12] ] ],
                cl: false 
                }
        break;
    case 15:
        return {f:  [ [ zone[(3+turn)%12], zone[(6+turn)%12], zone[(9+turn)%12] ] ],
                r:  [],
                ci: [ [ zone[(0+turn)%12] ] ],
                cl: false 
                }
        break;
    case 16:
        return {f:  [ [ zone[(3+turn)%12], zone[(5+turn)%12], zone[(10+turn)%12] ], [ zone[(7+turn)%12], zone[(8+turn)%12] ] ],
                r:  [ [ zone[(6+turn)%12], zone[(9+turn)%12] ] ],
                ci: [ [ zone[(0+turn)%12] ] ],
                cl: false 
                }
        break;
    case 17:
        return {f:  [ [ zone[(2+turn)%12], zone[(7+turn)%12], zone[(9+turn)%12] ], [ zone[(4+turn)%12], zone[(5+turn)%12] ] ],
                r:  [ [ zone[(3+turn)%12], zone[(6+turn)%12] ] ],
                ci: [ [ zone[(0+turn)%12] ] ],
                cl: false 
                }
        break;
    case 18:
        return {f:  [ [ zone[(2+turn)%12], zone[(10+turn)%12] ], [ zone[(4+turn)%12], zone[(5+turn)%12] ], [ zone[(7+turn)%12], zone[(8+turn)%12] ] ],
                r:  [ [ zone[(3+turn)%12] ], [ zone[(6+turn)%12] ], [ zone[(9+turn)%12] ] ],
                ci: [ [ zone[(0+turn)%12] ] ],
                cl: false 
                }
        break;
    case 19:
        return {f:  [ [ zone[(4+turn)%12], zone[(6+turn)%12], zone[(8+turn)%12] ], [ zone[(2+turn)%12], zone[(10+turn)%12] ] ],
                r:  [ [ zone[(3+turn)%12], zone[(9+turn)%12] ] ],
                ci: [ [ zone[(0+turn)%12] ] ],
                cl: false 
                }
        break;
    case 20:
        return {f:  [ [ zone[(1+turn)%12], zone[(3+turn)%12], zone[(5+turn)%12] ], [ zone[(7+turn)%12], zone[(9+turn)%12], zone[(11+turn)%12] ] ],
                r:  [ [ zone[(0+turn)%12], zone[(6+turn)%12] ] ],
                ci: [],
                cl: false 
                }
        break;
    case 21:
        return {f:  [ [ zone[(0+turn)%12], zone[(3+turn)%12], zone[(5+turn)%12], zone[(10+turn)%12] ], [ zone[(7+turn)%12], zone[(8+turn)%12] ] ],
                r:  [ [ zone[(6+turn)%12], zone[(9+turn)%12] ] ],
                ci: [],
                cl: false 
                }
        break;
    case 22:
        return {f:  [ [ zone[(0+turn)%12], zone[(2+turn)%12], zone[(10+turn)%12] ], [ zone[(4+turn)%12], zone[(5+turn)%12] ], [ zone[(7+turn)%12], zone[(8+turn)%12] ] ],
                r:  [ [ zone[(3+turn)%12] ], [ zone[(6+turn)%12] ], [ zone[(9+turn)%12] ] ],
                ci: [],
                cl: false 
                }
        break;
    case 23:
        return {f:  [ [ zone[(1+turn)%12], zone[(2+turn)%12] ], [ zone[(4+turn)%12], zone[(5+turn)%12] ], [ zone[(7+turn)%12], zone[(8+turn)%12] ], [ zone[(10+turn)%12], zone[(11+turn)%12] ] ],
                r:  [ [ zone[(0+turn)%12] ], [ zone[(3+turn)%12] ], [ zone[(6+turn)%12] ], [ zone[(9+turn)%12] ] ],
                ci: [],
                cl: false 
                }
        break;
    default:
        console.error ("In TreeStructure getAreasTile: It's not a valid type: <" + typeTile + ">");
        return {f: [], r: [], ci: [], cl: false}
    }
}


/*c = new TreesCollection();


t = new Tile(19, 2);
c.insertTile(t, {x:49, y:49}, null);


d = new Dummy(1, 1);
d.place([49,50], 'n');
t = new Tile(15, 0);
c.insertTile(t, {x:49, y:50}, d);


d = new Dummy(2, 1);
d.place([48,49], 'e');
t = new Tile(20, 1);
c.insertTile(t, {x:48, y:49}, d);


d = new Dummy(2, 2);
d.place([48,50], 'w');
t = new Tile(7, 3);
c.insertTile(t, {x:48, y:50}, d);


d = new Dummy(1, 2);
d.place([50,49], 'e');
t = new Tile(6, 1);
c.insertTile(t, {x:50, y:49}, d);


d = new Dummy(1, 3);
d.place([51,49], 'e');
t = new Tile(14, 1);
c.insertTile(t, {x:51, y:49}, d);


d = new Dummy(2, 3);
d.place([47,49], 'ne');
t = new Tile(20, 1);
c.insertTile(t, {x:47, y:49}, d);


d = new Dummy(1, 4);
d.place([50,48], 'w');
t = new Tile(19, 2);
c.insertTile(t, {x:50, y:48}, d);


t = new Tile(20, 1);
c.insertTile(t, {x:46, y:49}, null);


t = new Tile(19, 3);
c.insertTile(t, {x:52, y:49}, null);


t = new Tile(21, 2);
c.insertTile(t, {x:45, y:49}, null);


d = new Dummy(1, 5);
d.place([52,50], 'e');
t = new Tile(18, 1);
c.insertTile(t, {x:52, y:50}, d);


t = new Tile(11, 0);
c.insertTile(t, {x:47, y:50}, null);


d = new Dummy(1, 6);
d.place([53,49], 'c');
t = new Tile(0, 0);
c.insertTile(t, {x:53, y:49}, d);


t = new Tile(8, 0);
c.insertTile(t, {x:48, y:51}, null);


t = new Tile(21, 0);
c.insertTile(t, {x:45, y:48}, null);


t = new Tile(23, 0);
c.insertTile(t, {x:44, y:48}, null);


t = new Tile(19, 1);
c.insertTile(t, {x:54, y:49}, null);


d = new Dummy(2, 4);
d.place([52,48], 's');
t = new Tile(21, 3);
c.insertTile(t, {x:52, y:48}, d);


d = new Dummy(1, 7);
d.place([51,50], 'e');
t = new Tile(21, 3);
c.insertTile(t, {x:51, y:50}, d);


d = new Dummy(2, 5);
d.place([55,49], 'w');
t = new Tile(9, 3);
c.insertTile(t, {x:55, y:49}, d);


d = new Dummy(1, 8);
d.place([54,50], 'e');
t = new Tile(19, 1);
c.insertTile(t, {x:54, y:50}, d);


d = new Dummy(2, 6);
d.place([46,48], 'c');
t = new Tile(0, 0);
c.insertTile(t, {x:46, y:48}, d);


t = new Tile(22, 2);
c.insertTile(t, {x:51, y:51}, null);


t = new Tile(7, 0);
c.insertTile(t, {x:55, y:50}, null);


t = new Tile(3, 0);
c.insertTile(t, {x:48, y:48}, null);


t = new Tile(21, 1);
c.insertTile(t, {x:46, y:47}, null);


t = new Tile(15, 0);
c.insertTile(t, {x:50, y:50}, null);


t = new Tile(14, 1);
c.insertTile(t, {x:46, y:50}, null);


d = new Dummy(1, 9);
d.place([45,50], 'e');
t = new Tile(12, 0);
c.insertTile(t, {x:45, y:50}, d);


t = new Tile(17, 1);
c.insertTile(t, {x:47, y:51}, null);


d = new Dummy(1, 10);
d.place([52,51], 'n');
t = new Tile(10, 2);
c.insertTile(t, {x:52, y:51}, d);*/









