// args:
// players: array of all the players names
function Game (playersNames){
    this.players = new Players (playersNames);
    this. tiles = new Tiles();
    this.board = new Board();
}

