

describe('Tree', function() {
    it('should get next tile from the queue', function() {
        var fieldTrees = [];
        var cityTrees = [];
        var roadTrees = [];


        var coord = {x: 49, y: 49};
        var tile = new Tile(19, 2);
        saveTileInTrees(coord, tile, fieldTrees, cityTrees, roadTrees);

        coord = {x: 49, y: 48};
        tile = new Tile(7, 1);
        saveTileInTrees(coord, tile, fieldTrees, cityTrees, roadTrees);

        coord = {x: 49, y: 50};
        tile = new Tile(15, 0);
        saveTileInTrees(coord, tile, fieldTrees, cityTrees, roadTrees);


        expect(fieldTrees.length).toBe(3);
        expect(roadTrees.length).toBe(1);
        expect(cityTrees.length).toBe(2);
    });
});
