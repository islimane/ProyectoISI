if(Meteor.isClient){

	Template.configTournament.events({
		'click .paramTournament #privateTournament': function(){
			if($('#privateTournament').is(':checked')){
				$('#password').show();
			}else{
				$('[name="password"]').val("");
				$('#password').hide();
			}
		},
		'submit form' : function(event){
			event.preventDefault();
			var creator = Meteor.userId();
			var nameTournament = event.target.nameTournament.value;
			var numPlayer = event.target.numPlayer.value;
			var password = event.target.password.value;
			var arrayPlayers = []
			var data = {
					id:Meteor.userId(),
					name : Meteor.users.findOne({_id:Meteor.userId()}).profile.user
				}

			arrayPlayers.push(data)
			var id = Tournaments.insert({
				creator : creator,
				nameTournament : nameTournament,
				numPlayer : 16,
				players : arrayPlayers,
				tournamentStart : false,
				password: password
			})
			Router.go("startTournament", {_id: id});
		}
	});

}

if(Meteor.isServer){
	
}