if(Meteor.isClient){
	Template.onGoingGame.events({
		'click .endGame':function(){
			console.log("terminando partida: " + this._id);
			var fakeScores = [{id: Meteor.userId(), score: 10000}];
			endGame(fakeScores, this._id);
		},
		'click .suspendGame': function(){
			console.log("suspendiendo partida: " + this._id);
			var fakeGame = {gameId: this._id, name: "fakeGame"}
			suspendGame(fakeGame)
		}
	});
}