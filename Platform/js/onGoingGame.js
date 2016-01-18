if(Meteor.isClient){
	Template.onGoingGame.events({
		'click .endGame':function(){
			var fakeScores = [{id: Meteor.userId(), score: 10000}];
			endGame(fakeScores, this._id);
		},
		'click .suspendGame': function(){
			var fakeGame = {gameId: this._id}
			suspendGame(fakeGame)
		}
	});
}