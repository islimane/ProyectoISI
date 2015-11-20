////////////////////////
//    TILE OBJECT     //
////////////////////////

// args:
// positions: {n, nw, w, sw, s, se, e, ne, c}
Tile = function (positions){
    this.n = positions.n || "";
    this.nw = positions.nw || "";
    this.w = positions.w || "";
    this.sw = positions.sw || "";
    this.s = positions.s || "";
    this.se = positions.se || "";
    this.e = positions.e || "";
    this.ne = positions.ne || "";
    this.c = positions.c || "";
}


// Turns 90 degrees clockwise
Tile.prototype.turnTile = function(){
    var tmp_n = this.n;
    var tmp_nw = this.nw;
    this.n = this.w;
    this.nw = this.sw;
    this.w = this.s;
    this.sw = this.se;
    this.s = this.e;
    this.se = this.ne;
    this.e = tmp_n;
    this.ne = tmp_nw;
}