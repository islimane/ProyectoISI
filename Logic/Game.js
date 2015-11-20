/////////////////////
//   GAME OBJECT   //
////////////////////

// args:
// players: array of all the players names
Game = function(playersNames){
    this.players = new Players (playersNames);
    this.tiles = new Tiles();
    this.tile.initTiles();
    this.board = new Board();
}

Game.prototype.startGame = function() {
    while (tiles.queue.length > 0){
        Players.nextPlayer();
        Tiles.popTile();
    }
};