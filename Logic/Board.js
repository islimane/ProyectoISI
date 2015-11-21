/////////////////////////////
//      CELL OBJECT        //
/////////////////////////////

// cell constructor, the cell is initialized without tile
Cell = function(x, y){
    this.tile = null;
    this.x = x;
    this.y = y;
}

/////////////////////////////
//      BOARD OBJECT       //
/////////////////////////////

HORIZONTAL_MAXSIZE = 100;
VERTICAL_MAXSIZE = 100;

Board = function(){
    this.cells = initializeBoard();
    // this field is an array of cells
    // in wich we may have a posibility
    // to put a tile if it matches
    this.availableCells = [];
}

// this function returns an array
// of cells in wich we can put
// the given tile
Board.prototype.getAvailableCell = function(tile){
    //body
}

// This function inserts a tile on the
// given coordinates with a given orientation
// coordinates: [xx,yy] --> e.g [4,52]
Board.prototype.insertTile = function(tileType, orientation, coor){
    var t = new Tile(tileType, orientation);
    this.cells[coor[0]][coor[1]].tile = t;
}

function initializeBoard(){
    var cells = [];
    for(var i=0;i<HORIZONTAL_MAXSIZE;i++){
        var column = [];
        for(var j=0;j<VERTICAL_MAXSIZE;j++){
            column.push(new Cell(i, j));
        }
        cells.push(column);
        column = [];
    }
    // Insert the initial tile on the board
    var t = new Tile(19, 0);
    cells[49][49].tile = t;
    return cells;
}

/*var b = new Board();
console.log(b.cells[49][49]);
b.insertTile();
console.log(b.cells[49][50]);*/