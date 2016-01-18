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
    var cells = game.board.getDummyPositions(game.tiles.currentTile);
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
    var coords = game.board.getDummyPositions(game.tiles.currentTile) ;

    if ( me.getDummy ){

    }


}

var playWithDummy = function() {


}

var zoneTypes = function(tile) {
    var c = false ;
    var r = false ;
    var f = false ;
    var zones = new Array() ;
    for (var i = 0 ; i < tile.tmpTile.length ; i++){
        switch (tile.tmpTile[i]){
            case 'ci':
                if ( c == false ) {
                    c = true ;
                    zones.push(tile.tmpTile[i]) ;
                }
                break ;
            case 'r':
                if ( r == false) {
                    r = true ;
                    zones.push(tile.tmpTile[i]) ;
                }
                break ;
            case 'f' :
                if ( f == false) {
                    f = true ;
                    zones.push(tile.tmpTile[i]) ;
                }
        }
    }
    return zones ;
}