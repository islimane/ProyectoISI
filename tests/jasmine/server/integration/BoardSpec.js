describe('Board', function() {

	it('should be a [HORIZONTAL_MAXSIZE]x[VERTICAL_MAXSIZE] array', function() {
		var board = new Board();
		expect(board.cells.length).toEqual(HORIZONTAL_MAXSIZE);
		for(var i=0;i<HORIZONTAL_MAXSIZE;i++){
		    expect(board.cells[i].length).toEqual(VERTICAL_MAXSIZE);
		}
	});

	it('should insert a tile on the board with type=19 and orientation=0', function() {
		var board = new Board();
		var t = new Tile(19, 0);
		board.cells[49][49].tile = t;
		expect(board.cells[49][49].tile.type).toEqual(19);
		expect(board.cells[49][49].tile.orientation).toEqual(0);
	});
});