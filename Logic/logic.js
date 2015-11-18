/////////////////////////////
//   GAME OBJECT   //
/////////////////////////////

// args:
// players: array of all the players names
function Game (playersNames){
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
    var tmp_n = this.n;
    var tmp_nw = this.nw;
    this.n = this.w;
    this.nw = this.sw;
    this.w = this.s;
    this.sw = this.se;
    this.s = this.e;
    this.se = this.ne;
    this.e = tmp_n;
    this.ne = tmp_nw;
}

/////////////////////////////
//      BOARD OBJECT       //
/////////////////////////////

var HORIZONTAL_MAXSIZE = 100;
var VERTICAL_MAXSIZE = 100;

function board(){
    this.cells = initializeBoard();

}

function initializeBoard(){
    var cells = [];
    for(var i=0;i<HORIZONTAL_MAXSIZE;i++){
        var column = [];
        for(var j=0;j<VERTICAL_MAXSIZE;j++){
            column.push(new cell());
        }
        cells.push(column);
        column = [];
    }
    return cells;
}

/////////////////////////////
//      CELL OBJECT        //
/////////////////////////////

// cell constructor, the cell is initialized without tile
function cell(){
    this.tile = null;
}

/////////////////////////////
//    PLAYERS OBJECT     //
/////////////////////////////

function Players (names)  {

    this.players = this.init(names) ;
    this.current = 0;

}

Players.prototype.init = function(names){
    var arry = [] ;
    for ( i = 0 ; i < 4 ; i++){
        arry[i] = new Player(names[i]) ;
    }
    return arry ;
}

Players.prototype.next = function() {

    current++ ;
    return players(current % 4);

}

/////////////////////////////
//    PLAYER OBJECT     //
/////////////////////////////

function Player (name)  {

    this.name = name ;
    this.score = 0 ;
    this.dummies = [] ;

}