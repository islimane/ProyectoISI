describe('Tiles', function() {
    describe('Method initTiles', function() {
        it('should initialize queue of tiles', function() {
            var tiles = new Tiles();
            expect(tiles.currentTile).toBeTruthy();
            expect(tiles.queue.length).toEqual(71);
        });
    });

    describe('Method popTile', function() {
        it('should get next tile from the queue', function() {
            var tiles = new Tiles();
            var nextTile = tiles.queue[tiles.queue.length-1];
            tiles.popTile();
            expect(tiles.currentTile).toEqual(nextTile);
        });
    });
})
