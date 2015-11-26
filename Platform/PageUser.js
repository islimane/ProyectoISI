if (Meteor.isClient) {
	Template.UserPage.helpers({
		'infoUser':function(){
			return Meteor.users.findOne({_id:Meteor.userId()}).profile
		},
		'myfriends':function(){
			var idfriends = Meteor.users.findOne({_id:Meteor.userId()}).profile.friends
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
    	'click .addFriend':function(event){
    		event.preventDefault();
    		Meteor.call('addFriend', Meteor.userId());
    	},
    	'click .deleteFriend':function(event){
    		event.preventDefault();
    		Meteor.call('deleteFriend', Meteor.userId());
    	}
    })
}