/////////////////////
//   GAME OBJECT   //
////////////////////
var turns = 72;
// args:
// players: array of all the players names
// id: ID of the current game
Game = function(players, id){
    this.id = id;
    this.turns = turns - 1;
    this.players = new Players (players);
    this.tiles = new Tiles();
    this.board = new Board();
    this.trees = new TreesCollection();
}

Game.prototype.getStatus = function () {
    return {
        player: this.players.currentPlayer,
        tile: this.tiles.currentTile
    };
};

Game.prototype.nextTurn = function() {
    try {
        this.tiles.popTile();
        this.players.next();
        ++this.turn;
    }catch (err) {
        return "Abort: " + err;
    }
    return "";
};
