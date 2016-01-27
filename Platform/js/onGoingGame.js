if(Meteor.isClient){
	Template.onGoingGame.onRendered(function(){
		$(function(){
			var path = Iron.Location.get().path
			var id = path.split("/partida/")[1]
			console.log("LLAMAMOS A IU CON ESTE ID " + id)
			StartGameIU(id)
		})
	})

	Template.onGoingGame.events({
		'click .endGame':function(){
			// Se hace asi hasta que logica nos pase el id correcto
			// de momento el que le da finalizar partida es el ganador
			var idgame = this._id
			console.log(" partida terminada " + idgame)
			var id_Ganador = Meteor.userId()
			var game = Games.findOne({_id:idgame})
			if (game.gameTournament){
				var id_tournament = game.id_tournament
				var Tournament = Tournaments.findOne({_id:id_tournament})
				if(Tournament.idGames.length == 5 ){
					console.log("ya ha terminado algun jugador")
					var idFinalGame = Tournament.idGames[4]
					console.log("ID FAINAL " + idFinalGame)
					var players = Games.findOne({_id:idFinalGame}).players_tournament
					console.log("players" + players)
    				var data = {
						id:id_Ganador,
						name : Meteor.users.findOne({_id:id_Ganador}).profile.user
					}
					players.push(data)
					Games.update({_id:idFinalGame},{$set:{players_tournament:players}})
				}else{	

					console.log("primer  jugador en acabar")
					var players = []
					var data = {
							id:id_Ganador,
							name : Meteor.users.findOne({_id:id_Ganador}).profile.user
						}
					players.push(data)
					var idfinal = Games.insert({
						creator : "torneo",
						nameGame : "Torneo ~ Partida final",
						numPlayerHuman : 4,
						numPlayerIA : 0,
						players : [],
						players_tournament : players,
						gameStart : false,
						gameTournament:true,
						id_tournament:id_tournament,
						password: Math.floor(Math.random() * (100000 - 10000)) + 10000
					});
					var idGames = Tournaments.findOne({_id:id_tournament}).idGames
					idGames.push(idfinal)
					Tournaments.update({_id:id_tournament},{$set:{idGames:idGames}})
				}
			}


			var fakeScores = [{id: Meteor.userId(), score: 10000}];
			endGame(fakeScores, this._id);
		},
		'click .suspendGame': function(){
			var fakeGame = {gameId: this._id}
			suspendGame(fakeGame)
		}
	});
}