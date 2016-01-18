/////////////////////////////
//    IA PLAYER OBJECT     //
/////////////////////////////

// IA Player inherits from Player class
// IAplayer is an abstract class



IAplayer = function () {
    Player.call(this, 0);

    if (this.constructor === IAplayer) {
        throw new Error("Can't instantiate abstract class");
    }
}

/*
    This function must return:
    {
        coord: [x, y]       where the tile is placed
        dummy : Dummy       the dummy placed, if it, else null.       
    }
 */

IAplayer.prototype.playTile = function() {
    throw new Error("Abstract method");
};

// IAplayer class extends Player
IAplayer.prototype = Object.create(Player.prototype);
IAplayer.prototype.constructor = IAplayer;


/////////////////////////////////
//    IA PLAYER FIRST MODE     //
/////////////////////////////////

// Constructor of the first IA Player mode
// Inherits from IAplayer abstract class
FirstMode = function () {
    IAplayer.call(this);
}

// FirstMode class extends IAplayer
FirstMode.prototype = Object.create(IAplayer.prototype);
FirstMode.prototype.constructor = FirstMode;

// Gets possible positions in the board and then it
// just assigns the tile to the first possition it finds
// (If for a given orientation there are no possible positions
// it tries with a new orientation of the tile)
FirstMode.prototype.playTile = function (game) {
    var cells = game.board.getDummyPositions(game.tiles.currentTile , game.players.currentPlayer.getDummy());
    for ( var i = 0 ; i < cells.length ; i++) {
        if (cells[i].length != 0) {
            game.board.insertTile(game.tiles.currentTile , cells[i][0].cell);
        }
        game.board.tiles.currentTile.turnTile() ;
    }
    
    var data = {
        coord : cells[i][0].cell,
        dummy : null 
    }

    return data ;
}


/////////////////////////////////
//    IA PLAYER SECOND MODE     //
/////////////////////////////////

/*
    If has dummies check the longest available zone and inserts the tile with the dummy.
    If has no dummies , inserts the tile to a zone with one of his dummies.

    Only checks the city and road zones, field zones dont give much points and its
    almost sure you wont recover the dummy placed there.
*/


SecondMode = function () {
    IAplayer.call(this);
}

SecondMode.prototype = Object.create(IAplayer.prototype);
SecondMode.prototype.constructor = SecondMode;

// game its the current game.
// Asumes that he is the current player.
SecondMode.prototype.playTile = function (game) {

    var me = game.players.currentPlayer ;

    if ( me.getDummy() ){
        playWithDummy(game) ;
    }else {
        // playWithoutDummy() ;
    }


}

var playWithDummy = function(game) {

    var zones = zoneTypes(game.tiles.currentTile) ;
    var trees = getMyTrees(zones) ;
    var coords = game.board.getDummyPositions(game.tiles.currentTile) ;

    var treeIndex = longestTree(trees);
    var tree = trees.splice(treeIndex,1)[0] ;

    var coords = tree.getLeftCoords() ;         // Coordenadas como objetos.

    // Chek the tile in all the coords 

}

// return the type of zones in a tile.
var zoneTypes = function(tile) {
    var c = false ;
    var r = false ;
    var f = false ;
    var zones = new Array() ;
    var poss = predefTiles[tile.type].positions ;
    for (var i = 0 ; i < poss.length ; i++){
        switch (predefTiles[tile.type].positions[i]){
            case 'ci':
                if ( c == false ) {
                    c = true ;
                    zones.push(poss[i]) ;
                }
                break ;
            case 'r':
                if ( r == false) {
                    r = true ;
                    zones.push(poss[i]) ;
                }
                break ;
            case 'f' :
                if ( f == false) {
                    f = true ;
                    zones.push(poss[i]) ;
                }
        }
    }
    return zones ;
}

// Returns the longest tree in given array of trees.
var longestTree = function(trees){
    var maxLength = 0 ;
    var tree = 0 ;
    for ( var i = 0 ; i < trees.length ; i++ ) {
        var l = trees.getNumOfTiles() 
        if ( l > maxLength){
            maxLength = l ;
            tree = i ;
        }
    }
    return tree ;
}

//returns the trees for given zones ( city or road, field and cloister are not )
var getMyFreeTrees = function (game, zones) {
    var trees = game.board.treesCollection.trees ;
    var outTrees = [] ;
    for ( var i = 0 ; i < zone.length ; i ++){
        if ( zones[i] === "r"){
            outTrees.concat(trees.roadTrees) ;
            continue ;
        }
        if ( zones[i] === "ci"){
            outTrees.concat(trees.cityTrees) ;
            continue ;
        }
    }

    for ( var i = 0 ; i < outTrees.length ; i++) {
        if (outTrees[i].dummies.length != 0) {
            outTrees.splice(i,1) ;
        }

    }

    return outTrees ;
}

// Returns the trees in wich i have a dummy
var getMyTrees = function(game , zones) {

    /*
    for all dummies 
        get dummy

        call getTrees()
        check in wich tree the dummy is ( tree.dummies[])
        add to the array.
    
    */

}

