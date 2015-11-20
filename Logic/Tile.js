////////////////////////
//    TILE OBJECT     //
////////////////////////


// args:
// positions: {n, nw, w, sw, s, se, e, ne, c}
Tile = function (type, positions){
    this.type = type;
    this.positions = positions;
}


// Turns 90 degrees clockwise
Tile.prototype.turnTile = function(){
    var tmp_n = this.positions.n;
    var tmp_nw = this.positions.nw;
    this.positions.n = this.positions.w;
    this.positions.nw = this.positions.sw;
    this.positions.w = this.positions.s;
    this.positions.sw = this.positions.se;
    this.positions.s = this.positions.e;
    this.positions.se = this.positions.ne;
    this.positions.e = tmp_n;
    this.positions.ne = tmp_nw;
}

