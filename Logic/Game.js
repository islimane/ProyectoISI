/////////////////////
//   GAME OBJECT   //
////////////////////

// args:
// players: array of all the players names
// id: ID of the current game
Game = function(players, id){
    this.id = id;
    this.players = new Players (players);
    this.tiles = new Tiles();
    this.tiles.initTiles();
    this.board = new Board();
}

Game.prototype.start = function() {
    while (this.tiles.queue.length > 0){
        try {
            tile = this.tiles.popTile();
            //Function that will return the position where the player
            //put the current tile
            position = play();
            this.board.insertTile(tile.type, tile.orientation, position);
            this.players.next();
        }catch (err) {
            return "Abort: " + err;
        }
    }
    return "";
};