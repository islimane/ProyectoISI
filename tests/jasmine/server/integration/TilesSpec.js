describe('Tiles', function() {
    describe('Method initTiles', function() {
        it('should initialize queue of tiles', function() {
            var tiles = new Tiles();
            tiles.initTiles();
            expect(tiles.queue.length).toEqual(72);
        });
    });

    describe('Method popTile', function() {
        it('should get next tile from the queue', function() {
            var tiles = new Tiles();
            tiles.initTiles();
            var nextTile = tiles.queue[0];
            tiles.popTile();
            expect(tiles.currentTile).toEqual(nextTile);
        });
    });
})