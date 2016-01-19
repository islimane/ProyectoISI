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
IAplayer.prototype = Object.create(IAplayer.prototype);
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
        playWithoutDummy() ;
    }


}

var playWithoutDummy = function(game) {
        var zones = zoneTypes(game.tiles.currentTile) ;
        var trees = getMyTrees(zones) ;
        var allCoords = game.board.getDummyPositions(game.tiles.currentTile) ;



}


var playWithDummy = function(game) {

    var zones = zoneTypes(game.tiles.currentTile) ;
    var trees = getFreeTrees(zones) ;
    var allCoords = game.board.getDummyPositions(game.tiles.currentTile) ;

    while(1){
            var treeIndex = longestTree(trees);
            var tree = trees.splice(treeIndex,1)[0] ;   // Pops from the array treeIndex

            var treeCoords = tree.getLeftCoords() ;     // Coordenadas como objetos.

            for ( var i = 0 ; i < treeCoords.length ; i++){
                    var coord = Object.keys(treeCoords[i]).map(function (key) {return treeCoords[i][key]});
                    // Buscar la posicion del dummy
                    // validMove hay que retocarla para pasarle una pos del dummy
            }
    }
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

// Returns the index in the array of the longest tree in given array of trees.
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

//returns the free trees ( with no dummy) for given zones ( city or road, field
// and cloister are not given )
var getFreeTrees = function (game, zones) {
    var trees = game.board.treesCollection.trees ;
    var outTrees = new Array() ;
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

        var myDummies = game.players.currentPlayer.dummies ;
        var trees = game.board.treesCollection ;
        var myTrees = new Array();

        for (var i = 0 ; i < myDummies.length ; i++){
                var coord = myDummies[i].coord ;
                for ( var j = 0 ; j < zones.length ; j++ ){
                        var allTrees = trees.getTrees(zones[j] , coord) ;
                        var tree = treesWithDum( allTrees , myDummies[i] )
                        myTrees.push(tree);
                }
        }
        return myTrees ;
}

// Returns the trees wich contains the given dummy
 var treesWithDum = function(trees, dum){

         for ( var i = 0 ; i < trees.length ; i++){
                 for ( var j = 0 ; j < trees.dummies.length ; j++ ) {
                        if ( dum == trees.dummies[j]){
                                return trees[i];
                        }
                 }
         }
 }


/*
        check if move is in plausibles, returns true or false

         move = {
                coord: [x,y]
                dummyPoss = [8 true or false]coord
        plausibles =
                        [[{coord: Cell1 for Rot0, dummyPos: DummyPos},
                          {coord: Cell2 for Rot0, dummyPos: DummyPos}, ...],
                        [{coord: Cell1 for Rot1, dummyPos: DummyPos},
                          {coord: Cell2 for Rot1, dummyPos: DummyPos}, ...],
                        [{coord: Cell1 for Rot2, dummyPos: DummyPos},
                          {coord: Cell2 for Rot2, dummyPos: DummyPos}, ...],
                        [{coord: Cell1 for Rot3, dummyPos: DummyPos},
                          {coord: Cell2 for Rot3, dummyPos: DummyPos}, ...]]
 */
var validMove = function(move, pluasibles) {
        for (var i = 0 ; i < plausibles.length; i++){
                for(var j = 0 ; j < plausibles[i].length ; j++){
                        if( equalsMoves(move , plausibles[i][j]) )
                                return true ;
                }
        }
        return false ;
}

/*        move = {
               coord: [x,y]
               dummyPoss = [8 true or false]coord
       } */
var equalsMoves = function ( move1, move2){
        var coord1 ;
        var coord2 ;
        var dum1 ;
        var dum2 ;
        var k = 0 ;
        for ( var i in move1){
                if ( k == 0){
                        coord1 = move1[i];
                        k++ ;
                        continue ;
                }
                if ( k == 1){
                        dum1 = move1[i];
                        k++ ;
                }
        }

        k = 0 ;
        for ( var i in move2){
                if ( k == 0){
                        coord2 = move2[i];
                        k++ ;
                        continue ;
                }
                if ( k == 1){
                        dum2 = move2[i];
                        k++ ;
                }
        }

        if ( (coord1[0] != coord2[0]) || (coord1[1] != coord2[1]) ){
                return false ;
        }

        if (dum1.length != dum2.length)
                return false ;


        for (var i = 0 ; i < dum1.length ; i++){
                if ( dum1[i] != dum2[i]){
                        return false ;
                }
        }
        return true ;
}


/*
var move11 = { coord: [1,1] , dum : [ true, false, false, false, true, true, false, false, false, true]}
var move22 = { coord: [1,1] , dum : [ true, false, false, false, true, true, false, false, false, true]}
var move33 = { coord: [1,1] , dum : [ true, false, true, false, true, true, false, false, false, true]}
var move44 = { coord: [2,1] , dum : [ true, false, false, false, true, true, false, false, false, true]}


if (equalsMoves(move11 , move22)){
        console.log("11 y 22 son iguales") ;
}

if (!equalsMoves(move22 , move33)){
        console.log("22 y 33 NO son iguales") ;
}
*/
