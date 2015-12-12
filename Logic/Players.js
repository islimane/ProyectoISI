/////////////////////////////
//    PLAYERS OBJECT     //
/////////////////////////////

Max_Players = 4 ;

Players = function(ids)  {

	this.players = this.init(ids) ;

	if(this.players == null){		 // On error initiating players.
		return null ;
	}

	this.n = 0 ;				 // Current player's index in players[]
	this.currentPlayer = this.players[0];    // Current player
	  			        
}

Players.prototype.init = function(ids){
		
  	var arry = [] ;
    	for ( i = 0 ; i < ids.length ; i++){
        	arry[i] = new Player(ids[i]) ;
        	if (!arry[i]){
        		return null  ;
        	}
   	}
   	for ( ; i < Max_Players ; i++){
   		arry[i] = new Player(0) ;
   	}

  	return arry ;
}

Players.prototype.names = function() {
	
	var arry = [] ;
	for ( i = 0 ; i < Max_Players ; i++ ){
		arry[i] = this.CurrentPlayer.name ;
		this.next() ;
	}	
	return arry ;
}

Players.prototype.next = function() {
   	this.n++ ;
   	this.n = this.n % Max_Players ;
   	this.currentPlayer = this.players[this.n] ;
}


//////////////////////////
//    PLAYER OBJECT     //
//////////////////////////  

// The id = 0 means IA player.

Player = function(id)  {
	this.id = id;		

	if ( id != 0){
		this.name = Meteor.users.findOne({_id:id}).profile.user ;
		if (!this.name){			// check if user id is found
			return null  ;
		}
	}else {
		this.name =  "IA" ;
	}

	this.score = 0 ;
	dummies = [] ;
}

Player.prototype.incScoreBy = function (n){
	this.score = this.score + n ;
}
