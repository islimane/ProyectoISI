describe('Board', function() {

  it('should be a [HORIZONTAL_MAXSIZE]x[VERTICAL_MAXSIZE] array', function() {
  	var board = new Board();
  	expect(board.length).toEqual(HORIZONTAL_MAXSIZE);
  	for(var i=0;i<HORIZONTAL_MAXSIZE;i++){
        expect(board[i].length).toEqual(VERTICAL_MAXSIZE);
    }
    var tile = new Tile(0, 1);
    var tileTurned = new Tile (0, 2);
    tile.turnTile();
    expect(tile).toEqual(tileTurned);
  });
});