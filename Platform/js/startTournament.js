if (Meteor.isClient){
		Template.startGame.helpers({
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
		}
	})

	Template.startGame.events({
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
