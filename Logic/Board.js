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
    // in which we may have a posibility
    // to put a tile if it matches
    this.availableCells = getAvailableCells(this);
}

// This function inserts a tile on the
// given coordinates with a given orientation
// coor: [xx,yy] --> e.g [4,52]
Board.prototype.insertTile = function(tile, coor){
    this.cells[coor[0]][coor[1]].tile = tile;
    // Update availableCells
    this.availableCells = getAvailableCells(this);
}

// this function returns an array
// of cells in which, the given tile,
// fits
Board.prototype.getMatchingCells = function(tile){
    var matchingCells = [];
    var that = this;
    this.availableCells.forEach(function(elem, index){
        var coor = [elem.x, elem.y];
        if(itFits(that, tile, coor)){
            if(!isInArray(elem, matchingCells))
                matchingCells.push(elem);
        }
    });
    return matchingCells;
}

var isInArray = function(value, array){
  return array.indexOf(value) > -1;
}

var initializeBoard = function(){
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
// in which we may have a posibility
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

// this function returns true if a given tile,
// with the current orientation,
// can fit in a cell on the given board by
// checking the coordinates
// coor: [xx,yy] --> e.g [4,52]
var itFits = function(board, tile, coor){
    var fits = false;
    // this array contains the cells with which
    // we are going to check if the tile fits
    // testableCells = [northCell, eastCell, southCell, westCell]
    var testableCells = getTestableCells(board, coor);
    // console.log("testableCells:");
    // console.log(testableCells);
    // Now we walk the array checking if the tile
    // fits or not
    testableCells.forEach(function(elem, index){
        // the elem is a cell object
        if(elem.tile){
            // this array contains the two zones we have to compare
            // zones[0] -> zone of the current tile
            // zone[1] -> zone of the board tile
            var zones = getZones(tile, elem, index);
            if(zones[0]==zones[1]){
                fits = true;
            }else{
                fits = false;
                return false;
            }
        }
    });
    return fits;
}


// this function returns an array containing
// the cells with which we have to check if 
// a tile fits
// testableCells = [northCell, eastCell, southCell, westCell]
var getTestableCells = function(board, coor){
    var testableCells = [];

    var northCell = board.cells[coor[0]][coor[1]-1];
    testableCells.push(northCell);
    var eastCell = board.cells[coor[0]+1][coor[1]];
    testableCells.push(eastCell);
    var southCell = board.cells[coor[0]][coor[1]+1];
    testableCells.push(southCell);
    var westCell = board.cells[coor[0]-1][coor[1]];
    testableCells.push(westCell);

    return testableCells;
}

// this function returns an array containing
// the two zones we have to compare
var getZones = function(tile, elem, index){
    // testableCells = [northCell, eastCell, southCell, westCell]
    // for index=0 -> we have to compare tile.positions.n->elem.tile.positions.s
    // for index=1 -> we have to compare tile.positions.e->elem.tile.positions.w
    // ...
    switch (index) {
      case 0:
        var zone1 = tile.positions.n;
        var zone2 = elem.tile.positions.s;
        break;
      case 1:
        var zone1 = tile.positions.e;
        var zone2 = elem.tile.positions.w;
        break;
      case 2:
        var zone1 = tile.positions.s;
        var zone2 = elem.tile.positions.n;
        break;
      default:
        var zone1 = tile.positions.w;
        var zone2 = elem.tile.positions.e;
        break;
    }
    return [zone1, zone2];
}

/*var b = new Board();
b.insertTile(19,0,[49,49]);
b.insertTile(0,0,[49,50]);
b.insertTile(20,0,[50,50]);
b.insertTile(0,0,[51,50]);
b.insertTile(15,0,[51,49]);

console.log("availableCells:");
console.log(b.availableCells);

var t = new Tile(21, 0);

console.log("matchingCells:");
console.log(b.getMatchingCells(t));
*/




