Friends = new Meteor.Collection('friends')

if (Meteor.isClient) {
	Template.UserPage.helpers({
		'infoUser':function(){
			return Users.findOne({_id:this._id});
		}
	})
}

if (Meteor.isServer) {

}

Router.route('/', {
  name: 'home',
  template: 'home'
});

Router.route('/user/:_id', {
    template:"UserPage",    
    name:"UserPage", 
    data: function(){
      var userID = this.params._id;
      return Users.findOne({_id:userID});
    },
    onBeforeAction: function(){
      var currentUser = Meteor.userId();
      if(currentUser){
        // logged-in
        this.next();  //hace que la ruta se comporte de forma normal
      } else {
        // not logged-in
        this.render("login"); //rediriges a login
      }
    }
});