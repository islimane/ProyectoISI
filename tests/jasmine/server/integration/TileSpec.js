describe('Tile', function() {

  it('should turn the Tile', function() {
    var tile = new Tile({n: "n", nw: "nw", w: "w", sw: "sw", s: "s", se: "se", e: "e", ne: "ne", c:"c"});
    var tileTurned = new Tile ({ n: 'w', nw: 'sw', w: 's', sw: 'se', s: 'e', se: 'ne', e: 'n', ne: 'nw', c: 'c' });
    tile.turnTile();
    expect(tile).toEqual(tileTurned);
  });
});