/////////////////////
//   GAME OBJECT   //
////////////////////

// args:
// players: array of all the players names
Game = function(playersNames){
    this.players = new Players (playersNames);
    this.tiles = new Tiles();
    this.board = new Board();
}

Game.prototype.startGame = function() {
    while (tiles.length > 0){
        Players.nextPlayer();
        Tiles.nextTile();
    }
};