/////////////////////////////
//   GAME OBJECT   //
/////////////////////////////

// args:
// players: array of all the players names
function Game (playersNames){
    this.players = new Players (playersNames);
    this. tiles = new Tiles();
    this.board = new Board();
}

Game.prototype.startGame = function() {
    while (tiles.length > 0){
        Players.nextPlayer();
        Tiles.nextTile();
    }
};

/////////////////////////////
//    TILES OBJECT     //
/////////////////////////////

function Tiles () {
    this.queue = [];
    this.currentTile = null;
}

Tiles.prototype.initTiles = function() {
    // body...
}

Tiles.prototype.popTile = function() {
    if(this.queue.length > 0){
        return this.queue.pop();
    }else{
        return null;
    }
};

/////////////////////////////
//    TILE OBJECT     //
/////////////////////////////

// args:
// positions: {n: "", nw: "", w: "", sw: "", s: "", se: "", e: "", ne: ""}
function Tile (positions){
    this.n = positions.n || "";
    this.nw = positions.nw || "";
    this.w = positions.w || "";
    this.sw = positions.sw || "";
    this.s = positions.s || "";
    this.se = positions.se || "";
    this.e = positions.e || "";
    this.ne = positions.ne || "";
}


// Turns 90 degrees clockwise
Tile.prototype.turnTile = function(){
    this.n = this.w;
    this.nw = this.sw;
    this.w = this.s;
    this.sw = this.se;
    this.s = this.e;
    this.se = this.ne;
    this.e = this.n;
    this.ne = this.nw;
}