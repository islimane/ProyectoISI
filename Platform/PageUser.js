if (Meteor.isClient) {
	Template.UserPage.helpers({
		'infoUser':function(){
			return Meteor.users.findOne({_id:this._id}).profile
		},
		'myfriends':function(){
			var idfriends = Meteor.users.findOne({_id:this._id}).profile.friends
			console.log(idfriends)
			var arrfriends = []
			for(i = 0; i < idfriends.length;i++){
				var data = {
					id:idfriends[i],
					name : Meteor.users.findOne({_id:idfriends[i]}).profile.user
				}
				arrfriends.push(data)
			}
			console.log(arrfriends)
			return arrfriends;
		},
		'Notmypage':function(){
			return this._id != Meteor.userId()
		},
		'isMyFriend':function(){
			var idfriends = Meteor.users.findOne({_id:Meteor.userId()}).profile.friends
			var id = this._id
			var encontrado = undefined
			for(i = 0; i < idfriends.length;i++){
				if(idfriends[i] == id){
					encontrado = true
				}
			}
			return encontrado
		}
	})
	Template.UserPage.events({
    	'click .AddFriend':function(event){
    		event.preventDefault();
    		var idfriend = this._id;
    		var profile = Meteor.users.findOne({_id:Meteor.userId()}).profile
    		var arrfriends = profile.friends
    		arrfriends.push(idfriend)
			var data = {
			    user: profile.user,
			    email: profile.email,
			    createdAt: profile.createdAt,
			    maxscore: profile.maxscore,
			    friends: arrfriends
			}
            Meteor.call('addFriend',data);
    	},
    	'click .deleteFriend':function(event){
    		event.preventDefault();
    		var idfriend = this._id;
    		var profile = Meteor.users.findOne({_id:Meteor.userId()}).profile
    		var idfriends = profile.friends
    		var newArr = []
    		for(i = 0; i < idfriends.length;i++){
				if(idfriends[i] != idfriend){
					newArr.push(idfriends[i])
				}
			}

			var data = {
			    user: profile.user,
			    email: profile.email,
			    createdAt: profile.createdAt,
			    maxscore: profile.maxscore,
			    friends: newArr
			}
            Meteor.call('addFriend',data);
    	}


    })
}

if (Meteor.isServer){
	  Meteor.methods({

        'addFriend': function(data){
        	console.log("methods")
            Meteor.users.update({_id:Meteor.userId()},{$set:{profile:data}});

        },
        'deleteFriend': function(data){
        	console.log("methods")
            Meteor.users.update({_id:Meteor.userId()},{$set:{profile:data}});

        }
    })
}




