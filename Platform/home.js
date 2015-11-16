if(Meteor.isCLient){
	Template.home.helpers({
		'otherPlayers': function(){
			return null;
		},
		'waitingGames': function(){
			return null;
		},
		'onGoingGames': function(){
			return null;
		}
	});
}
