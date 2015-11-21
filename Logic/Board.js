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
Board.prototype.getMatchingbleCells = function(tile){
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

// this this function returns an array of cells
// in wich we may have a posibility
// to put a tile if it matches
var getAvailableCells = function(board){
    var availableCells = [];
    var haveTile = false;
    var emptyCell = true;
    var cell = null;
    var availableCell = null;
    for(var i=0;i<HORIZONTAL_MAXSIZE;i++){
        for(var j=0;j<VERTICAL_MAXSIZE;j++){
            cell = board.cells[i][j];
            if(checkCell(cell, haveTile, emptyCell)=='previous'){
                availableCells.push(board.cells[i][j-1]);
                haveTile = true;
                emptyCell = false;
            }else if(checkCell(cell, haveTile, emptyCell)=='current'){
                availableCells.push(board.cells[i][j]);
                haveTile = false;
                emptyCell = true;
            }
        }
    }
    for(var j=0;j<VERTICAL_MAXSIZE;j++){
        for(var i=0;i<HORIZONTAL_MAXSIZE;i++){
            cell = board.cells[i][j];
            if(checkCell(cell, haveTile, emptyCell)=='previous'){
                availableCells.push(board.cells[i-1][j]);
                haveTile = true;
                emptyCell = false;
            }else if(checkCell(cell, haveTile, emptyCell)=='current'){
                availableCells.push(board.cells[i][j]);
                haveTile = false;
                emptyCell = true;
            }
        }
    }
    return availableCells;
}

// this function returns the cell if
// we may have a posibility
// to put on it a tile in
// otherwise returns null
var checkCell = function(cell, haveTile, emptyCell){
    if(cell.tile){
        if(emptyCell){
            // insert the previous cell
            return 'previous';
        }
    }else if(!cell.tile){
        if(haveTile){
            // insert the current cell
            return 'current';
        }
    }

    return null;
}

/*var b = new Board();
b.insertTile(19,0,[49,49]);
b.insertTile(0,0,[49,50]);
b.insertTile(20,0,[50,50]);

console.log(getAvailableCells(b));*/