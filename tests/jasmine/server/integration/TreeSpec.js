

/*describe('Tree general', function() {
    it('should difference the trees', function() {
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
});*/



describe('Tree specific', function(){
    var t1;

    beforeAll(function(){
        var NUM = 3;
        var tileTypes = [19, 8, 15];
        var coords = [{x:49, y:49}, {x:49, y:50}, {x:48, y:50}];
        var rots = [2, 0, 1];
        t1 = new Tree('ci');
        for (var i = 0; i < NUM; i++){
            var areas = getAreasTile(tileTypes[i], rots[i]);
            t1.placeNode(coords[i], areas.ci[0], new Tile(tileTypes[i], rots[i]));
        }
    });


    it ('should get the number of tiles placed', function(){
        expect(t1.getNumOfTiles()).toBe(3);
    });


    it ('should say the remaining tiles', function(){
        expect(t1.getLeftChildren()).toBe(0);
    });


    it ('should say the number of banners', function(){
        expect(t1.getNumOfBanners()).toBe(1);
    });


    it ('should say the existence of a node (Placed or not)', function(){
        expect(t1.existsNode({x:49,y:50}, ['n'])).toBe(true);
    });


    it ('should say the existence of a node placed', function(){
        expect(t1.isPlaced({x:49,y:49})).toBe(true);
    });


});

