describe('Tile', function() {

  it('should turn the Tile', function() {
    var tile = new Tile(0, 1);
    var tileTurned = new Tile (0, 2);
    tile.turnTile();
    expect(tile).toEqual(tileTurned);
  });
});