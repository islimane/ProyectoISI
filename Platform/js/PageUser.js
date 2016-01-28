if (Meteor.isClient) {

	/* se pone "if (this._id == undefined) return null;" porque
	aveces se carga dos veces la pagina y una de la sveces no hay id*/

	Template.UserPage.helpers({
		'infoUser':function(){
			if (this._id == undefined) return null;
			var user =  Meteor.users.findOne({_id:this._id})
			if (user !=undefined){
				user = user.profile;
			}
			return user
		},

		'showPassword':function(){
			var games = Games.find().fetch()
			if (games == undefined){
				return false
			}
			for ( i = 0;i < games.length; i++) {
				var id = games[i]._id
				var players_tournament = games[i].players_tournament
				for(j = 0; j < players_tournament.length;j++){
					if(players_tournament[j].id == Meteor.userId()){
						return Games.findOne({_id:id})
					}
				}
			}
			return false
		},
		'myfriends':function(){
			var arrfriends = []
			if (this._id == undefined) return null;////
			var idfriends = Meteor.users.findOne({_id:this._id});
			if (idfriends == undefined || idfriends.profile == null){

                return arrfriends;
            }
            idfriends = idfriends.profile.friends;

			for(i = 0; i < idfriends.length;i++){
				var data = {
					id:idfriends[i],
					name : Meteor.users.findOne({_id:idfriends[i]}).profile.user
				}
				arrfriends.push(data)
			}
			return arrfriends;
		},
		'Notmypage':function(){
			if (this._id == undefined) return null;
			return this._id != Meteor.userId()
		},
		'ismypage':function(){
			if (this._id == undefined) return null;
			return this._id == Meteor.userId()
		},
		'isMyFriend':function(){
			if (this._id == undefined) return null;
			var idfriends = Meteor.users.findOne({_id:Meteor.userId()}).profile.friends
			var id = this._id
			var encontrado = undefined
			for(i = 0; i < idfriends.length;i++){
				if(idfriends[i] == id){
					encontrado = true
				}
			}
			return encontrado
		},
		'profileimg':function(){

			var img = Meteor.users.findOne({_id:this._id});
			if (img!=undefined){
				if (img.profile!=null){
					img = img.profile.profileimg;
				}
			}
			return img

		}
	})

	Template.UserPage.events({
    	'click .addFriend':function(event){
    		event.preventDefault();
    		Meteor.call('addFriend', this._id);
    	},
    	'click .deleteFriend':function(event){
    		event.preventDefault();
    		Meteor.call('deleteFriend', this._id);
    	},
    	'click .deleteCount':function(event){
    		event.preventDefault();
    		Meteor.call('deleteUser', Meteor.userId());
    		Router.go("/");
    	},
    	'submit form' : function(event){
    		event.preventDefault();
				var img = event.target.imagen.value;
				$('[name="imagen"]').val("");
				console.log("valor de la imagen " + img)
    		Meteor.call('changeprofileimg', img);

    	}


    })
}
