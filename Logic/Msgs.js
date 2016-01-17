// Interaction Methods between IA(server) and UI(client)


Meteor.methods({

	// Return the 4 Players names to UI
	getNames : function (gameId) {
		game = findGameByID(gameId) ;
   
		if(!( Meteor.userId() == game.players.currentPlayer.id )){
			return null ;
		}

		names = game.players.names() ;
		return names ;
	},

	// Returns the current tile's id and the arry of the 4 rotations coords 
	getCoords : function(gameId){
		game = Games.findOne({_id:gameId});

		if(!( Meteor.userId() == game.players.currentPlayer.id )){
			return null ;
		}

		var data = {
			tileId:  0,
			coords: []
		};

		data.tileId = game.tiles.currentTile.type ;
		data.coords = game.getDummyPositions() ;

		return data ;
	},

	// Set the positions when the tile is placed on the board and its rotation
	setPos : function (gameId, x, y, rot) {
		// TODO 
	},

	// Sets the position when dummy is placed in the tile.
	setDummy : function (gameId, arry) {
		// TODO 
	},

	// Returns the updated info for UI, the new players score and the dummies
	// coords to be removed.
	getUpdatedInfo : function (gameId) {
		// TODO 
	},

	// Return the Automatic Players movement.
	getIA : function (gameId) {
		// TODO 
		// call currentPlayer.playTile and return its decision.
	}
});





/*
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
*/