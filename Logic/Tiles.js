/////////////////////////
//    TILES OBJECT     //
/////////////////////////

Tiles = function() {
    this.queue = [];
    this.currentTile = null;
}

//Returns random int between maximum(excluded)
//and minimum(included)
function getRandomArbitrary (max, min) {
    return Math.random() * (max - min) + min;
}

//Returns true if there are tiles left from
//each type, false if the contrary
function filterByTotal (obj) {
    if(obj.total > 0){
        return true;
    }else{
        return false;
    }
}

Tiles.prototype.initTiles = function() {
    while(queue.length < 72){
        var remainingTiles = predefTiles.filter(filterByTotal);
        var Type = getRandomArbitrary(remainingTiles.length,0);
        --predefTiles[Type].total;

        var Tile = {
            type: predefTiles[Type].type,
            positions: predefTiles[Type].positions
        };
        this.queue.push(Tile);
    }
};

Tiles.prototype.popTile = function() {
    if(this.queue.length > 0){
        this.currentTile = this.queue.pop();
    }
};