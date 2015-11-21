if(Meteor.isClient){
	Template.homePage.helpers({
		"otherPlayers": function(){
			var players = Meteor.users.find().fetch()
			return players.slice(0,15);
		},
		"waitingGames": function(){
			return Games.find({gameStart: false}).fetch().slice(0,20);
		},
		"onGoingGames": function(){
			return Games.find({gameStart: true}).fetch().slice(0,20);
		}
	});

	Template.allUsers.helpers({
		'users': function(){
			return Meteor.users.find().fetch();
		}
	});

	Template.allCreatedGames.helpers({
		'createdGames': function(){
			return Games.find({gameStart: false}).fetch();
		}
	});

	Template.allOngoingGames.helpers({
		'ongoingGames': function(){
			return Games.find({gameStart: true}).fetch();
		}
	});
}