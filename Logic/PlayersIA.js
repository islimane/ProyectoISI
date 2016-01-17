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
FirstMode.prototype.playTile = function (tile, board) {
    var cells = [];
    while (cells.length == 0) {
        cells = board.getMatchingCells(tile);
        if (cells.length == 0) {
            tile.turnTile();
        }
    }

    board.insertTile(tile.type, tile.orientation, cells[0]);
}


/////////////////////////////////
//    IA PLAYER SECOND MODE     //
/////////////////////////////////

/*
    If has dummies check the longest available zone and inserts the tile with the dummy
    If has no dummies , inserts the tile to a zone with one of his dummies.
*/


SecondMode = function () {
    IAplayer.call(this);
}

SecondMode.prototype = Object.create(IAplayer.prototype);
SecondMode.prototype.constructor = SecondMode;

SecondMode.prototype.playTile = function (tile, board) {
    // TODO
}