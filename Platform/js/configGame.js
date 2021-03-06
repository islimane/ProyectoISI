if(Meteor.isClient){

	Template.configGame.helpers({
		'maxHumanPlayer' : function(){
			return $('#players').val();
		}

	})
	Template.configGame.events({
		'click .paramGame #privateGame': function(){
			if($('#privateGame').is(':checked')){
				$('#password').show();
			}else{
				$('[name="password"]').val("");
				$('#password').hide();
			}
		},
		'change #players' : function(){
			$('#human').show();
			var value = $('#players').val();
			$('#humanPlayer').attr('max',value);
			if ($('#humanPlayer').val() != ''){
				if(($('#players').val()) > $('#humanPlayer').val()){
					$('#IA').show();
					var val = ($('#players').val() - $('#humanPlayer').val())
					$('[name="IAPlayer"]').val(val);
					$('#IAPlayer').attr('max',val);
					$('#IAPlayer').attr('min',val);
				}else{
					var val = ($('#players').val() - $('#humanPlayer').val())
					$('[name="IAPlayer"]').val(0);
					$('#IAPlayer').attr('max',val);
					$('#IAPlayer').attr('min',val);
					$('#IA').hide();

				}
			}		
		},
		'change #humanPlayer' :function(){
			if(($('#players').val()) > $('#humanPlayer').val()){
				$('#IA').show();
				var val = ($('#players').val() - $('#humanPlayer').val())
				$('[name="IAPlayer"]').val(val);
				$('#IAPlayer').attr('max',val);
				$('#IAPlayer').attr('min',val);
			}else{
				var val = ($('#players').val() - $('#humanPlayer').val())
				$('[name="IAPlayer"]').val(0);
				$('#IAPlayer').attr('max',val);
				$('#IAPlayer').attr('min',val);
				$('#IA').hide();
			}

		},
		'submit form' : function(event){
			event.preventDefault();
			var creator = Meteor.userId();
			var nameGame = event.target.nameGame.value;
			var numPlayerHuman = event.target.humanPlayer.value;
			var numPlayerIA = event.target.IAPlayer.value;
			var password = event.target.password.value;
			var arrPlayers = []
			var arrTournament=[]
			var data = {
					id:Meteor.userId(),
					name : Meteor.users.findOne({_id:Meteor.userId()}).profile.user
				}
			arrPlayers.push(data)
			var id = Games.insert({
				creator : creator,
				nameGame : nameGame,
				numPlayerHuman : numPlayerHuman,
				numPlayerIA : numPlayerIA,
				players : arrPlayers,
				players_tournament: arrTournament,
				gameStart : false,
				gameTournament:false,
				id_tournament:"",
				password: password
			})
			Router.go("startGame", {_id: id});
		}
	});
}

if(Meteor.isServer){
	
}