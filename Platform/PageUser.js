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
    	'click .addFriend':function(event){
    		event.preventDefault();
    		Meteor.call('addFriend', this._id);
    	},
    	'click .deleteFriend':function(event){
    		event.preventDefault();
    		Meteor.call('deleteFriend', this._id);
    	}
    })
}