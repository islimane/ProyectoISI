/////////////////////////////
//    PLAYERS OBJECT     //
/////////////////////////////

Max_Players = 4 ;
Max_Dummies = 7 ;

Players = function(ids)  {
	this.players = this.init(ids) ;
	this.n = 0 ;				 // Current player's index in players[]
	this.currentPlayer = this.players[0];    // Current player, changes each turn.
}

Players.prototype.init = function(ids){
		
  	var arry = [] ;
    	for ( i = 0 ; i < Max_Players ; i++){
        	if (ids[i]) {
        		arry[i] = new Player(ids[i]) ;
        	}else {
        		arry[i] = new Player(0) ;
        	}
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

Players.prototype.getPlayerById = function(id) {

	if (!this.players.length) {
		throw new Error(" Empty players array") ;
	}

	for (i = 0 ; i < Max_Players ; i++) {
		if (this.players[i].id == id){
			return this.players[i] ;
		}
	}
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
			throw new Error("For " + id + " name not found in Meteor.users");
		}
	}else {
		this.name =  "IA" ;
	}

	this.score = 0 ;
	dummies = [] ;
}

Player.prototype.hasDummies = function() {
	return Max_Dummies - this.dummies.length ;
}

Player.prototype.addDummy = function(dum) {
	if ( this.dummies.length < Max_Dummies ) {
		this.dummies.push(dum) ;
	}else  {
		throw new Error("No more available dummies");
	}
}

// Returns true on found and deleted dummy otherwise returns false.

Player.prototype.delDummy = function (attr, val) {
	var i = this.dummies.length ;

	if (!i) {
		throw new Error(" Empty dummies array") ;
	}

	while (i--) {
		if ( this.dummies[i] && this.dummies[i][attr] === value ) {
			this.dummies.splice(i , 1) ;
			return true ;
		} 
	}

	return false ;
}

Player.prototype.incScoreBy = function (n){
	this.score = this.score + n ;
}
