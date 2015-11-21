/////////////////////////////
//      BOARD OBJECT       //
/////////////////////////////

var HORIZONTAL_MAXSIZE = 100;
var VERTICAL_MAXSIZE = 100;

Board = function(){
    this.cells = initializeBoard();
    // this field is an array of cells
    // in wich we may have a posibility
    // to put a tile if it matches
    this.avalibleCells = [];
}

// this function returns an array
// of cells in wich we can put
// the given tile
Board.prototype.getAvalibleCell = function(tile){
    //body
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
Cell = function(){
    this.tile = null;
}