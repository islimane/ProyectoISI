/////////////////////////
//    TILES OBJECT     //
/////////////////////////

Tiles = function() {
    this.queue = [];
    this.currentTile = null;
}

Tiles.prototype.initTiles = function() {
    // body...
}

Tiles.prototype.popTile = function() {
    if(this.queue.length > 0){
        return this.queue.pop();
    }else{
        return null;
    }
};