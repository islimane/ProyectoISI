///////////////////////////////
//    FOR MANAGING TREES     //
///////////////////////////////

saveTileInTrees = function(coord, tile, fieldTrees, cityTrees, roadTrees){
    var areasOfAllTypes = getAreasTile(tile.type, tile.orientation); //{f: [['se'],['sw']], r: [['s']], ci: [['n','e','w']] }

    saveTileInTreesOfAType(areasOfAllTypes.f, fieldTrees, coord, 'f')
    saveTileInTreesOfAType(areasOfAllTypes.ci, cityTrees, coord, 'ci')
    saveTileInTreesOfAType(areasOfAllTypes.r, roadTrees, coord, 'r')
}

saveTileInTreesOfAType = function(areas, treesOfType, coord, type){
    areas.forEach(function(area){
        var trees = findTreesNeed(coord, area, treesOfType);
        if (trees.length == 0){
            var newTree = new Tree(type);
            newTree.placeNode(coord, area);
            treesOfType.push(newTree);
        } else if (trees.length == 1){
            trees[0].placeNode(coord, area);
        } else {
            for (var i = 1; i< (trees.length -1); i++){
                trees[0].mergeWith(trees[i], coord, area);
                var delTree = treesOfType.indexOf(trees[i]);
                treesOfType.splice(delTree, 1);
            }
            trees[0].placeNode(coord, area);
        }
    });
}

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
// areas in the tile of city, road and field.                                 //TODO: Copy somewhere
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
