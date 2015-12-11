if(Meteor.isClient){
	Template.onGoingGame.events({
		'click .endGame':function(){
			console.log("terminando partida: " + this._id);
		},
		'click .suspendGame': function(){
			console.log("susendiendo partida: " + this._id);
		}
	});
}