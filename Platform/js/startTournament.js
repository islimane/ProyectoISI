if (Meteor.isClient){
		Template.startTournament.helpers({
		'players':function(){
			return Tournaments.findOne({_id:this._id}).players;
		},
		'ImInTheGame':function(){
			var players = Tournaments.findOne({_id:this._id}).players
			for(i = 0; i < players.length;i++){
				if(players[i].id == Meteor.userId()){
					return true
				}
			}
			return false
		},
		'selectedClass': function(){
	      	var playerId = this.id;
	      	var selectedPlayer = Session.get('selectedPlayer');
	     	 if(playerId == selectedPlayer){
	        	return "selected"
	      	}
		},

	})

	Template.startTournament.events({
    	'click .exitTournament':function(event){
    		event.preventDefault();
    		var players = Tournaments.findOne({_id:this._id}).players
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
			Tournaments.update({_id:this._id},{$set:{players:newArr}})
    	},
    	'click .accessTournament':function(){

    		if(Tournaments.findOne({_id:this._id}).password == ""){
    			var players = Tournaments.findOne({_id:this._id}).players
    			var data = {
					id:Meteor.userId(),
					name : Meteor.users.findOne({_id:Meteor.userId()}).profile.user
				}
				players.push(data)
				Tournaments.update({_id:this._id},{$set:{players:players}})
    		}else{
    			$('div .formpass').show();
    		}
    		if (Tournaments.findOne({_id:this._id}).players.length == 16){
    			var array_partida1 = [];
    			var array_partida2 = [];
    			var array_partida3 = [];
    			var array_partida4 = [];
    			var index = Math.floor(Math.random() * (players.length - 0)) + 0
				for (i = 0; i < 16; i++){
					var jugador = players.splice(index,1)
					if(i < 4 ){
						array_partida1.push(jugador)
					}else if( i < 8){
						array_partida2.push(jugador)
					}else if(i < 12){
						array_partida3.push(jugador)
					}else{
						array_partida4.push(jugador)
					}
					var index = Math.floor(Math.random() * (players.length - 0)) + 0
				}
    			
    			var id1 = Games.insert({
					creator : "torneo",
					nameGame : "Partida 1",
					numPlayerHuman : 4,
					numPlayerIA : 0,
					players : [],
					players_tournament : array_partida1,
					gameStart : false,
					gameTournament:true,
					password: Math.floor(Math.random() * (100000 - 10000)) + 10000
				});
				var id2 = Games.insert({
					creator : "torneo",
					nameGame : "Partida 2",
					numPlayerHuman : 4,
					numPlayerIA : 0,
					players : [],
					players_tournament : array_partida2,
					gameStart : false,
					gameTournament:true,
					password: Math.floor(Math.random() * (100000 - 10000)) + 10000
				});
				var id3 = Games.insert({
					creator : "torneo",
					nameGame : "Partida 3",
					numPlayerHuman : 4,
					numPlayerIA : 0,
					players : [],
					players_tournament : array_partida3,
					gameStart : false,
					gameTournament:true,
					password: Math.floor(Math.random() * (100000 - 10000)) + 10000
				});
				var id4 = Games.insert({
					creator : "torneo",
					nameGame : "Partida 4",
					numPlayerHuman : 4,
					numPlayerIA : 0,
					players : [],
					players_tournament : array_partida4,
					gameStart : false,
					gameTournament:true,
					password: Math.floor(Math.random() * (100000 - 10000)) + 10000
				})

				Tournaments.update({_id:this._id},{$set:{startTournament:true}})
				Router.go("/");

    		}
    		
    	},
    	'submit form' : function(event){
			event.preventDefault();
			var password = event.target.password.value;
			if(Tournaments.findOne({_id:this._id}).password == password){
				var players = Tournaments.findOne({_id:this._id}).players
    			var data = {
					id:Meteor.userId(),
					name : Meteor.users.findOne({_id:Meteor.userId()}).profile.user
				}
				players.push(data)
				Tournaments.update({_id:this._id},{$set:{players:players}})
			}
		},
    })
}
