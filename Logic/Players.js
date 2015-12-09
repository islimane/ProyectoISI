/////////////////////////////
//    PLAYERS OBJECT     //
/////////////////////////////

Players = function()  {

	this.players = this.init(arguments[0], arguments[1], arguments[2], arguments[3]) ;
	this.n = 0 ;				 // Current player's index in players[]
	this.currentPlayer = this.players[0];    // Current player
	  			        
}

Players.prototype.init = function(){
	var Max_Players = 4 ;			
  	var arry = [] ;
    	for ( i = 0 ; i < Max_Players ; i++){
        	arry[i] = new Player(arguments[i]) ;
   	}
  	return arry ;
}

Players.prototype.names = function() {
	var arry=[] ;
	for ( i = 0 ; i < 4 ; i++ ){
		arry[i] = this.CurrentPlayer.name ;
		this.next() ;
	}	
	return arry ;
}

Players.prototype.next = function() {
   	this.n++ ;
   	this.n = this.n % 4 ;
   	this.currentPlayer = this.players[this.n] ;
}


//////////////////////////
//    PLAYER OBJECT     //
//////////////////////////  

Player = function(name)  {
	this.name = name;
	this.score = 0 ;
	dummies = [] ;
}

Player.prototype.incScoreBy = function (n){
	this.score = this.score + n ;
}
