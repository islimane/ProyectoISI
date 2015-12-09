// This a collection to interact with UI, both ( UI and IA, server and client)
// by some methods (called by client) to check the collection stored in the server.

Msgs = new Mongo.Collection("msgs") ;

// Server Methods about the Msgs collection.

// Method to create the entry in Msgs shared between IA and UI
initMsg = function (idGame, Names) {
	var msg = new Msg (idGame) ;		// Msg declared at the bottom
	msg.allNames = Names ;
	return Msgs.insert(msg) ;
}

// Fills the Games msg with the new turns information ( Player, Tile, positions..)
newTurnMsg = function (Game, Player, Tile) {
	var msg = Msgs.findOne({idGame: Game});
	if (!msg) {
		return null ;
	}
	msg.idPlayer = Player ;
	msg.idTile = Tile ;
}
// Sets the plausible coords for the current tile.
setCoords = function (Game , rot0, rot1, rot2, rot3) {
	var msg = Msgs.findOne({idGame: Game});
	if (!msg) {
		return null ;
	}
	msg.coords.rot0 = rot0 ;
	msg.coords.rot1 = rot1 ;
	msg.coords.rot2 = rot2 ;
	msg.coords.rot3 = rot3 ;
}
// Returns the info from UI
getBackInfo = function (Game) {
	var msg = Msgs.findOne({idGame: Game});
	if (!msg) {
		return null ;
	}
}

// New info once checked backInfo from UI.
setUpdatedInfo = function (Game , coords , score) {
	var msg = Msgs.findOne({idGame: Game});
	if (!msg) {
		return null ;
	}
	msg.updatedInfo.coord = coords ;
	msg.updatedInfo.score = score ;
}
// Removes the Msg entry for the game
removeMsg = function (Game) {
	Msgs.remove({idGame: Game})
}


//==> Client Methods to allow access to the collection from the client.

Meteor.methods({

	// Return the 4 Players names
	getNames : function (Game) {
		var msg = Msgs.findOne({idGame: Game});
		if (!msg) {
			return null ;
		}	
		return msg.allNames ;
	}	

	// Returns the current Player
	getPlayer : function (Game) {
		var msg = Msgs.findOne({idGame: Game});
		if (!msg) {
			return null ;
		}
		return msg.idPlayer ;
	},

	getTile : function (Game) {
		var msg = Msgs.findOne({idGame: Game});
		if (!msg) {
			return null ;
		}
		return msg.idTile ;
	},

	// Returns the arry of the 4 rotations coords 
	getCoords : function(Game){
		var msg = Msgs.findOne({idGame: Game});
		if (!msg) {
			return null ;
		}
		return msg.coords ;
	} ,
	// Returns the updated info for UI, the new players score and the dummies
	// coords to be removed.
	getUpdatedInfo : function (Game) {
		var msg = Msgs.findOne({idGame: Game});
		if (!msg) {
			return null ;
		}
		return msg.updatedInfo ;
	},
	// Set the positions when the tile is placed on the board and its rotation
	setPos : function (Game, x, y, rot) {
		var msg = Msgs.findOne({idGame: Game});
		if (!msg) {
			return null ;
		}
		msg.backInfo.x = x ;
		msg.backInfo.y = y ;
		msg.backInfo.rotation = rot ;
	},
	// Sets the position when dummy is placed in the tile.
	setDummy : function (Game, arry) {
		var msg = Msgs.findOne({idGame: Game});
		if (!msg) {
			return null ;
		}
		msg.backInfo.dummy = arry ;
	},
});



// Fields of each collection entry
Msg = function (idGame) {
	this.idGame = idGame ;
	allNames = [] ;
	idPlayer = "" ;		
	idTile = -1 ;		// Tile type 0-23
	
	coords = {
		rot0 : [] ,  	// arrays of {
		rot1 : [] ,	// 		coord [x,y]
		rot2 : [] ,	// 		dummy positions [ n,  nw,   w,  sw,   s,  se,   e,  ne,   c  ]
		rot3 : [] ,
	}

	// Info from UI
	backInfo = {
		x ,		// where the tile is placed on the board
		y ,
		dummy : [] , 	// [ n,  nw,   w,  sw,   s,  se,   e,  ne,   c  ]
	 			// de 0 a 9 true y false donde vaya el dummy
		rotation ,	// choosen tiles rotation 0-3
	}

	// Checked info for UI
	updatedInfo = {
		coord  : []  , 	// removed dummies coords 
		score : 0 , 	// new score
	}
}
