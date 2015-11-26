//Collections
Games = new Meteor.Collection('games');
//Scores = new Meteor.Collection('scores');
Messages = new Meteor.Collection('messages');
MessagesRoom = new Meteor.Collection('messagesRoom');
PrivateMsgs = new Meteor.Collection('privateMsgs');

//Routes
Router.configure({
	layoutTemplate: 'main',
	name: 'main'
});
Router.route('/', {
  name: 'homePage',
  template: 'homePage'
});
Router.route('/user/:_id', {
    template:"UserPage",    
    name:"UserPage", 
    data: function(){
      var userID = this.params._id;
      return Meteor.users.findOne({_id:userID});
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
Router.route('/configGame', {
  name: 'configGame',
  template: 'configGame'
});
Router.route('/comenzarPartida/:_id', {
    template:"startGame",    
    name:"startGame", 
    data: function(){
      var gameID = this.params._id;
      return Games.findOne({_id:gameID});
    }
});
Router.route('/register');
Router.route('/login');
Router.route('/usuarios', {
  template: "allUsers",
  name: "allUsers"
});
Router.route('/partidascreadas', {
  template: "allCreatedGames",
  name: "allCreatedGames"
});
Router.route('/partidasjugandose', {
  template: "allOngoingGames",
  name: "allOngoingGames"
});
Router.route('/mensajesPrivados/:_id', {
	template: 'privateMsgs',
	name: "privateMsgs"
});
Router.route('/partida/:_id', {
	template: "onGoingGame",
	name: "onGoingGame"
});

Router.route('pruebaUI', {
	template: "pruebaUI",
	name: "pruebaUI"
});


if (Meteor.isClient) {

    Session.setDefault("roomname", "public");

  Template.messages.helpers({
    
    'messages':function () {

      var messagesColl =  Messages.find({room: Session.get("roomname")}, { sort: { time: -1 }});
      var messages = [];

      messagesColl.forEach(function(m){
        var userName = Accounts.users.findOne(m.user_id).profile.user;

//////////////ARREGLAR PARA QUE MUESTRE LA HORA BIEN/////////////////
       
        var f = m.time;
        var date =(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear() +
              "-"+f.getHours() + ":" + (f.getMinutes() +1) + ":" + f.getSeconds());
        messages.push({name: userName , message: m.message,date:date});
      });
      return messages;
    }
  });

  Template.input.events ({
    'keydown input#message' : function (event) {
      if (event.which == 13) {
            
        var user_id = Meteor.userId();
        var message = $('#message');
          if (message.value != '') {
            Messages.insert({
              user_id: user_id,
              message: message.val(),
              time: new Date(),
              room: Session.get("roomname")
            });
            message.val('')
          }
      }
    } 
  });

    Template.rooms.helpers({

        'friends':function(){
            if (this._id == undefined) return null;
            var idfriends = Meteor.users.findOne({_id:this._id}).profile.friends
            var arrfriends = []
            for(i = 0; i < idfriends.length;i++){
                var data = {
                    id:idfriends[i],
                    name : Meteor.users.findOne({_id:idfriends[i]}).profile.user
                }
                arrfriends.push(data)
            }
            return arrfriends;
        }
    });

    Template.rooms.events({
        'click li': function(e) {
            console.log("eeee",e.target.textContent);
            Session.set("roomname", e.target.textContent);
        }
    });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}