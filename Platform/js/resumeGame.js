if (Meteor.isClient){
	Template.resumeGame.helpers({
		'infoGame':function(){
			return SuspendedGames.findOne({_id:this._id});
		},
		'imCreator': function(){
			var game = SuspendedGames.findOne({_id: this._id})
			if (game && game.creator == Meteor.userId()){
				return true
			}else{
				return false
			}
		},
		'playersComplete': function(){
			var game =SuspendedGames.findOne({_id:this._id})
			return (game.players.length == game.playersReady.length)
		},
		'imReady': function(){
			var game = SuspendedGames.findOne({_id:this._id})
			if (game){
				var players = game.playersReady
			}else{
				return false
			}
			for(i = 0; i < players.length; i++){
				if(players[i].id == Meteor.userId()){
					return true
				}
			}
			return false
		},
		'imInGame': function(){
			var game = SuspendedGames.findOne({_id:this._id})
			if (game){
				var players = game.players
			}else{
				return false
			}
			for(i = 0; i < players.length; i++){
				if(players[i].id == Meteor.userId()){
					return true
				}
			}
			return false
		}
	});

	Template.resumeGame.events({
		'click .startGame': function(event){
			var gameId = this._id;
			var game = SuspendedGames.findOne({_id: gameId});
  			SuspendedGames.remove({_id: gameId})
  			var id = Games.insert(game)
  			if (game.players.length > 1){
  				var idaux = Gamesaux.findOne({gameid:id})._id
  			}
  			Meteor.call("startGame", game.players, id, function(err){
    			if(!err){
    				Games.update({_id: id}, {$set: {gameStart: true}});
    				if (players.length > 1){
    					Gamesaux.update({_id: idaux}, {$set: {gameStart: true}});
    				}
    			}else{
    				console.log("ERROR: " + err);
    			}
    		});
    		console.log("meteor call")
    		Router.go("/partida/" + gameId);
      	},
      	'click .accessGame':function(event){
      		console.log("accesing game")
      		var gameId = this._id;
      		var playersReady = SuspendedGames.findOne({_id:this._id}).playersReady;
      		var player = {
      			id: Meteor.userId(),
      			name: Meteor.users.findOne({_id: Meteor.userId()}).profile.user
      		}
      		playersReady.push(player)
      		SuspendedGames.update({_id: this._id},{$set:{playersReady:playersReady}})
      		Gamesaux.insert({gameid:gameId,gameStart: false})
      		Tracker.autorun(function(){
      			var game = Gamesaux.findOne({gameid:gameId},{fields:{gameStart:1}})
      			if(game.gameStart){
      				var players = Games.findOne({_id:gameId}).playersReady
      				for(var i=0; i<players.length;i++){
      					Router.go("/partida/" + gameId);
      					Meteor.call("startGame", players, gameId, function(err){
				    			if(!err){
				    				Games.update({_id: gameId}, {$set: {gameStart: true}});
				    				if (players.length > 1){
				    					Gamesaux.update({_id: idaux}, {$set: {gameStart: true}});
				    				}
				    			}else{
				    				console.log("ERROR: " + err);
				    			}
				    		});
      				}
      			}
      		})
      	},
      	'click .exitGame': function(event){
      		var players = SuspendedGames.findOne({_id:this._id}).playersReady
    		var newArr = []
    		for(i = 0; i < players.length;i++){
				if(players[i].id != Meteor.userId()){
					var data = {
						id:players[i].id,
						name : Meteor.users.findOne({_id:players[i].id}).profile.user
					}
					newArr.push(data)
				}
			}
			SuspendedGames.update({_id:this._id},{$set:{playersReady:newArr}})
      	}
	});
}