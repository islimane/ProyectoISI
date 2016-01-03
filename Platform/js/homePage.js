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
		},
		"suspendedGames": function(){
			return  SuspendedGames.find().fetch().slice(0,20);
		}
	});

	Template.homePage.events({
		'click .addFriend': function(event){
			event.preventDefault();
			Meteor.call('addFriend', this._id);
		},
		'click .deleteFriend': function(event){
			event.preventDefault();
			Meteor.call('deleteFriend', this._id);
		}
	});

	Template.allUsers.helpers({
		'users': function(){
			return Meteor.users.find().fetch();
		}
	});

	Template.allUsers.events({
		'submit form': function(event){
			event.preventDefault();
			var name = event.target.userName.value;
			if(name != ""){
				$(".player li").hide();
				var player = $("[user=" + name + "]");
				if (player.html()){
					player.show();
					$(".usersForm .userNameInput").val("");
				}
			}else{
				$(".player li").show();
			}
			
		}
	});

	Template.allCreatedGames.helpers({
		'createdGames': function(){
			return Games.find({gameStart: false}).fetch();
		}
	});

	Template.allSuspendedGames.helpers({
		'suspendedGames': function(){
			return SuspendedGames.find().fetch();
		}
	})

	var filterGames = function(event){
		event.preventDefault();
		var name = event.target.gameName.value;
		var creator = event.target.creator.value;
		var nPlayers = event.target.players.value;

		if(!name && !creator && !nPlayers){
			$(".game li").show();
		}else{
			var filter = "";
			if(name){
				filter += "[name=" + name + "]";
				$(".gamesForm .nameInput").val("");
			}
			if(creator){
				filter += "[creator=" + creator + "]";
				$(".gamesForm .creatorInput").val("");
			}
			if(nPlayers){
				filter += "[players=" + nPlayers + "]";
				$(".gamesForm .playersInput").val("");
			}
			$(".game li").hide();
			$(filter).show();
		}
	};

	Template.allCreatedGames.events({
		'submit form':function(event){
			filterGames(event);
		}
	});

	Template.allOngoingGames.helpers({
		'ongoingGames': function(){
			return Games.find({gameStart: true}).fetch();
		}
	});

	Template.allOngoingGames.events({
		'submit form': function(event){
			filterGames(event);
		}
	});

	Template.player.helpers({
		'isFriend': function(){
			var friendsId = Meteor.users.findOne({_id: Meteor.userId()});
			if (friendsId !=undefined){
				friendsId = friendsId.profile.friends;
			}
			for (var i = 0; i < friendsId.length; i++){
				if(friendsId[i] == this._id){
					return true;
				}
			}
			return false;
		},
		'notMe':function(){
			return this._id != Meteor.userId();
		}
	});

	Template.gameTemplate.helpers({
		'createdBy': function(){
			var creator = Games.findOne({_id: this._id});
			if(creator){
				var user = Meteor.users.findOne({_id: creator.creator});
				if(user){
					return user.profile.user;
				}
			}
		},
		'numberPlayers':function(){
			if(this.numPlayerHuman == ""){
				var nHumans = 0;
			}else{
				var nHumans = parseInt(this.numPlayerHuman);
			}
			if(this.numPlayerIA == ""){
				var nIA = 0;
			}else{
				var nIA = parseInt(this.numPlayerIA);
			}
			return nHumans + nIA;
		}
	});

	Template.gameTemplate.events({
		'click .watchGame': function(){
			Router.go("/partida/" + this._id);
		},
		'click .joinGame': function(){
			Router.go("/comenzarPartida/" + this._id);
		}
	});
}