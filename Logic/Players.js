/////////////////////////////
//    PLAYERS OBJECT     //
/////////////////////////////

Players = function(names)  {

    this.players = this.init(names) ;
    this.current = 0;

}

Players.prototype.init = function(names){
    var arry = [] ;
    for ( i = 0 ; i < 4 ; i++){
        arry[i] = new Player(names[i]) ;
    }
    return arry ;
}

Players.prototype.next = function() {
    this.current++ ;
    return players[this.current % 4];

}