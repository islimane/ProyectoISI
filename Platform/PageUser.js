if (Meteor.isClient) {
	Template.UserPage.helpers({
		'infoUser':function(){
			return Users.findOne({_id:this._id});
		},
    'ranking':function(){
      return Users.find().fetch()
    }
	})
}

if (Meteor.isServer) {

}