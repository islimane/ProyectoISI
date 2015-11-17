if (Meteor.isClient) {
	Template.UserPage.helpers({
		'infoUser':function(){
			return Users.findOne({_id:this._id});
		},
		'myfriends':function(){
			var idfriends = Users.findOne({_id:this._id}).friends
			var arrfriends = []
			for(i = 0; i < idfriends.length;i++){
				var data = {
					id:idfriends[i],
					name : Users.findOne({_id:idfriends[i]}).user
				}
				arrfriends.push(data)
			} 
			console.log(arrfriends)
			return arrfriends;
		}

	})
}

if (Meteor.isServer) {

}