if (Meteor.isClient) {
	Template.startGame.helpers({
		'infoGame':function(){
			return Games.findOne({_id:this._id});
		},
		'players':function(){
			return Games.findOne({_id:this._id}).players;
		},
		'ImInTheGame':function(){
			var players = Games.findOne({_id:this._id}).players
			for(i = 0; i < players.length;i++){
				if(players[i].id == Meteor.userId()){
					return true
				}
			}
			return false
		},
		'ImtheCreator':function(){
			return Games.findOne({_id:this._id}).creator == Meteor.userId()
		},
		'playersComplete':function(){
			return Games.findOne({_id:this._id}).players.length == Games.findOne({_id:this._id}).numPlayerHuman
		},
		'selectedClass': function(){
	      	var playerId = this.id;
	      	var selectedPlayer = Session.get('selectedPlayer');
	     	 if(playerId == selectedPlayer){
	        	return "selected"
	      	}
		},
	    'showSelectedPlayer': function(){
	      var selectedPlayer = Session.get('selectedPlayer');
	      return Games.findOne(selectedPlayer)
	    }

	});

	Template.startGame.events({
    	'click .exitGame':function(event){
    		event.preventDefault();
    		var players = Games.findOne({_id:this._id}).players
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
			Games.update({_id:this._id},{$set:{players:newArr}})
    	},
    	'click .accessGame':function(){

    		if(Games.findOne({_id:this._id}).password == ""){
    			var players = Games.findOne({_id:this._id}).players
    			var data = {
					id:Meteor.userId(),
					name : Meteor.users.findOne({_id:Meteor.userId()}).profile.user
				}
				players.push(data)
				Games.update({_id:this._id},{$set:{players:players}})
    		}else{
    			$('div .formpass').show();
    		}
    		
    	},
    	'submit form' : function(event){
			event.preventDefault();
			var password = event.target.password.value;
			if(Games.findOne({_id:this._id}).password == password){
				var players = Games.findOne({_id:this._id}).players
    			var data = {
					id:Meteor.userId(),
					name : Meteor.users.findOne({_id:Meteor.userId()}).profile.user
				}
				players.push(data)
				Games.update({_id:this._id},{$set:{players:players}})
			}
		},
		'click .changeGame':function(){
			$('div .paramGame').show();
		},
		'click .saveChanges':function(){
			if($('[name=nameGame]').val() == ""){
				var nameGame = Games.findOne({_id:this._id}).nameGame
			}else{
				var nameGame = $('[name=nameGame]').val();
			}

			if($('[name=humanPlayer]').val() == ""){
				var numPlayerHuman = Games.findOne({_id:this._id}).numPlayerHuman
			}else{
				var numPlayerHuman = $('[name=humanPlayer]').val();
			}

			if($('[name=IAPlayer]').val() == ""){
				var numPlayerIA = Games.findOne({_id:this._id}).numPlayerIA
			}else{
				var numPlayerIA = $('[name=IAPlayer]').val();
			}

			if($('[name=password]').val() == ""){
				var password = Games.findOne({_id:this._id}).password
			}else{
				var password = $('[name=password]').val();
				$('#password').hide();
			}

			if($('#publicGame').is(':checked')){
				var password = ""
			}

			Games.update({_id:this._id},{$set:{
				nameGame : nameGame,
				numPlayerHuman : numPlayerHuman,
				numPlayerIA : numPlayerIA,
				password:password
			}})
			$('[name=nameGame]').val("");
			$('[name=password]').val("");
			$('[name=IAPlayer]').val("");
			$('[name=humanPlayer]').val("")
			$('#privateGame').attr('checked',false)
			$('#publicGame').attr('checked',false)
			$('div .paramGame').hide();

		},
		'click .paramGame #privateGame': function(){
			if($('#privateGame').is(':checked')){
				$('#password').show();
				$('#publicGame').attr('checked',false)
			}else{
				$('[name="password"]').val("");
				$('#password').hide();
			}
		},
		'click .paramGame #publicGame': function(){
			$('#privateGame').attr('checked',false)
			$('[name="password"]').val("");
			$('#password').hide();
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
		
		'click .player': function(event){
			event.preventDefault();
        	var id = event.target.id;
        	Session.set('selectedPlayer', id);
      	},
      	'click .deleteplayer': function(){
      		console.log("estoy en remove");
      		var selectedPlayer = Session.get('selectedPlayer');
    		var players = Games.findOne({_id:this._id}).players
    		var newArr = []
    		console.log(this._id);
    		console.log(selectedPlayer);

    		for(i = 0; i < players.length;i++){
				if(players[i].id != selectedPlayer){
					var data = {
						id:players[i].id,
						name : Meteor.users.findOne({_id:players[i].id}).profile.user
					}
					newArr.push(data)
				}
			}
			Games.update({_id:this._id},{$set:{players:newArr}})
      		
    	},
    	'click .leaveGame' : function(event){
    		var players = Games.findOne({_id:this._id}).players;
    		var creator = Games.findOne({_id:this._id}).creator;
    		var newArr = [];
    		if (creator == Meteor.userId()){
    			creator = players[1].id;
    		}
    		for(i = 0; i < players.length;i++){
    			console.log("dentro del bucle");
				if(players[i].id != Meteor.userId()){
					var data = {
						id:players[i].id,
						name : Meteor.users.findOne({_id:players[i].id}).profile.user
					}
					newArr.push(data)
				}
			}
    		
			Games.update({_id:this._id},{$set:{players:newArr, creator : creator}})
    	},
    	'click .starGame': function(){
  			var gameId = this._id;
  			var players = Games.findOne({_id: gameId}).players;
    		console.log("starting " + gameId);

    		Meteor.call("startGame", players, gameId, function(err){
    			console.log(err);
    			if(!err){
    				console.log("no hay errores");
    				Games.update({_id: gameId}, {$set: {gameStart: true}});
    				Router.go("/partida/" + gameId);
    			}else{
    				console.log("ERROR: " + err);
    			}
    		});
    		
    	}
    })

}