// Interaction Methods between IA(server) and UI(client)


Meteor.methods({

	// Return the 4 Players names to UI
	getNames : function (gameId) {
		var game = findGameByID(gameId) ;

		if (!game){
			return null ;
		}

		if (game.turns != 71 ){
			return null ;
		}

		var names = game.players.names() ;
		return names ;
	},

	// Returns the current tile's id and the arry of the 4 rotations coords 
	getCoords : function(gameId){
		var game = findGameByID(gameId);
		if (!game){
			return null ;
		}

		if(!( Meteor.userId() == game.players.currentPlayer.id )){
			return null ;
		}

		var data = {
			tileId:  0,
			coords: []
		};

		data.tileId = game.tiles.currentTile.type ;
		data.coords = game.board.getDummyPositions(game.tiles.currentTile) ;

		return data ;
	},

	// Set the tile's position and rotation and the dummy's position in it.
	// returns the updated info.
	setTile : function (gameId, x, y, rot, arry) {
		var game = findGameByID(gameId);
		if (!game){
			return null ;
		}

		if(!( Meteor.userId() == game.players.currentPlayer.id )){
			return null ;
		}

		game.tiles.currentTile.orientation = rot ;
		var coor = [x , y] ;

		// TODO
		// check if is valid the position for the tile.
		// add dummy ( in or with the tile?)


		// updates the players scores
		var res = game.board.insertTile(game.tiles.currentTile , coor) ;
		res.playersPoints.forEach( function(i){
			var player = game.players.getPlayerById(i[0]) ;
			if (!player) { 
				throw new Error("No player for given id") ; 
				return null ;
			}
			player.incScoreBy(i[1]) ;
		});

		var removedDummies = new Array() ; 

		res.dummies.forEach(function(i) {
			removedDummies.push(i.coord) ;
			i.return() ;
		});

		var data = {
			remDums: [],
			scores: []
		};

		data.remDums = removedDummies ;
		data.scores = game.players.scores() ;

		game.nextTurn() ;
		return data ;
	},

	// Return the Automatic Players movement.
	getIA : function (gameId) {
		var game = findGameByID(gameId);
		if (!game){
			return null ;
		}

		if(!game.players.currentPlayer.isIA() ){
			return null ;
		}

		// TODO call  move = currentPlayer.playTile(game)
		// insert the tile in the coord and repeat the same as i setTile (above)

		var data = {
			tileId : 0 ,
			tileCoord : [] ,
			tileRot : 0 , 
			dummyPos : [] ,          		
			remDums: [] , 		
			scores : []
		}

		data.tileId = game.tiles.currentTile.type ;
		// data.Coord   where the tile is placed
		data.tileRot = game.tiles.currentTile.orientation ;
		// data.dummyPos 
		// data.remDums 
		data.scores = game.players.scores() ;

		game.nextTurn() ;
		return data ;
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
		score : [score1, score2, score3, score4] , 	// new scores for the players
	}

	IA info 
	·idTile
	·tileCoord
	·tileRot
	·dummyPos           		if set, null otherwise
	·coord: [[x, y], ...]  		coords of the removed dummies
	·score: [score1, score2, score3, score4]	the new players score
}
*/