/////////////////////////////
//    PLAYERS OBJECT     //
/////////////////////////////

Max_Players = 4 ;
Max_Dummies = 7 ;

Players = function(ids )  {

	this.players = this.init(ids) ;
	this.n = 0 ;				 // Current player's index in players[]
	this.currentPlayer = this.players[0];    // Current player, changes each turn.
}

Players.prototype.init = function(ids ){

  	var arry = [] ;
 
    	for ( i = 0 ; i < ids.length ; i++){
        	if (ids[i]) {
        		arry[i] = new Player(ids[i]) ;
        	}else {
        		arry[i] = new Player(i) ;
        	}
   	}
  	return arry ;
}

Players.prototype.names = function() {

	var arry = [] ;
	for ( i = 0 ; i < Max_Players ; i++ ){
		arry[i] = this.currentPlayer.name ;
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

// The id = 1..Max_Players means IA player.

IAid = function(id){
	if (id > -1 && id < Max_Players) {
		return true ;

	} else {
		return false ;
	}
}


Player = function(id)  {
	this.id = id;

	if ( !IAid(id)){
		this.name = Meteor.users.findOne({_id:id}).profile.user ;
		if (!this.name){			// check if user id is found
			throw new Error("For " + id + " name not found in Meteor.users");
		}
	}else {
		this.name =  "IA" ;
	}
	this.score = 0 ;
	dummies = this.initDummies() ;
}

Player.prototype.isIA = function(){
	if (IAid(this.id)){
		return true ;
	}
	return false ;
}

Player.prototype.initDummies = function() {
	var arry = [] ;
	for (i= 0; i < Max_Dummies ; i++) {
		arry[i] = new Dummy(this.id , i);
	}
	return arry ;
}

Player.prototype.getNewDummy = function () {
	for ( i = 0 ; i < Max_Dummies ; i++) {
		if ( this.dummies[i].coord == null ){
			return this.dummies[i] ;
		}
	}
	return null ;
}

Player.prototype.incScoreBy = function (n){
	this.score = this.score + n ;
}
