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
            var tile = this.tiles.popTile();
            var currentPlayer = this.players.currentPlayer;
            if(currentPlayer.id == 0) {
                //If the player is automatic, we call its playTile method.
                currentPlayer.playTile(tile, this.board);
                
            }else{
                //If the player is human, we wait for him to play the tile.
            }
            this.players.next();
        }catch (err) {
            return "Abort: " + err;
        }
    }
    return "";
};