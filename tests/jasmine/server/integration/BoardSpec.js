describe('Board', function() {

	it('should be a [HORIZONTAL_MAXSIZE]x[VERTICAL_MAXSIZE] array', function() {
		var board = new Board();
		expect(board.cells.length).toEqual(HORIZONTAL_MAXSIZE);
		for(var i=0;i<HORIZONTAL_MAXSIZE;i++){
		    expect(board.cells[i].length).toEqual(VERTICAL_MAXSIZE);
		}
	});

	it('should insert a tile on the board with type=15 and orientation=1', function() {
		var board = new Board();
		var tile = new Tile(15, 1);
		board.insertTile(tile, [49,49]);
		expect(board.cells[49][49].tile.type).toEqual(15);
		expect(board.cells[49][49].tile.orientation).toEqual(1);
	});
});