describe('Tile', function() {
	it('should instantiate a tile object', function() {
		var tile = new Tile(19, 0);
		expect(tile.type).toEqual(19);
		expect(tile.orientation).toEqual(0);
	});


  it('should turn the Tile', function() {
    var tile = new Tile(0, 1);
    var tileTurned = new Tile (0, 2);
    tile.turnTile();
    expect(tile).toEqual(tileTurned);
  });
});