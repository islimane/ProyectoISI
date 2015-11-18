
if(Meteor.isCLient){
	Template.home.helpers({
		"otherPlayers": function(){
			var players = Users.find().fetch();
			return players.slice(0,15);
		},
		"waitingGames": function(){
			return Games.find({gameStart: false}).fetch();
		},
		"onGoingGames": function(){
			return Games.find({gameStart: true}).fetch();
		},
		"prueba": function(){
			return "TEXTO DE PRUEBA";
		}
	});
}