/////////////////////
//   GAME OBJECT   //
////////////////////
var turns = 72;
// args:
// players: array of all the players names
// id: ID of the current game
Game = function(playerIds, id){
    this.id = id;
    this.turns = turns - 1;
    this.suspended = false;
    this.players = new Players (playerIds);
    this.tiles = new Tiles();
    this.board = new Board();
}

Game.prototype.suspend = function () {
    this.suspended = true;
    removeGame(this.id);
}

Game.prototype.getStatus = function () {
    return {
        player: this.players.currentPlayer,
        tile: this.tiles.currentTile
    };
};

Game.prototype.nextTurn = function() {
    if (!this.suspended) {
        if (this.turns > 0) {
            try {
                this.tiles.popTile();
                this.players.next();
                --this.turns;
            }catch (err) {
                return "Abort: " + err;
            }
            return "";
        } else {
            return "Game finished";
        }
    }
};
