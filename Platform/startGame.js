if (Meteor.isClient) {
	Template.startGame.helpers({
		'infoGame':function(){
			return Games.findOne({_id:this._id});
		},
		'players':function(){
			return Games.findOne({_id:this._id}).players;
		}

	})

}
