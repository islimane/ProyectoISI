//Collections
Users = new Meteor.Collection('user_s');
Games = new Meteor.Collection('games_s');
Scores = new Meteor.Collection('scores_s');
Friends = new Meteor.Collection('friends_s');


//Routes
Router.configure({
	layoutTemplate: 'main',
	name: 'main'
});
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
Router.route('/comenzarPartida/:_id', {
    template:"configGame",    
    name:"configGame", 
    data: function(){
      var userID = this.params._id;
      return Users.findOne({_id:userID});
    }
});
Router.route('/register');
Router.route('/login');




if (Meteor.isClient) {

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}