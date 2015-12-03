//Collections
Games = new Meteor.Collection('games');
Messages = new Meteor.Collection('messages');
MessagesRoom = new Meteor.Collection('messagesRoom');
PrivateMsgs = new Meteor.Collection('privateMsgs');
Tournaments = new Meteor.Collection('tournaments');

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
Router.route('/configTournament', {
  name: 'configTournament',
  template: 'configTournament'
});
Router.route('/pagTournament/:_id', {
    template:"startTournament",    
    name:"startTournament", 
    data: function(){
      var tournamentID = this.params._id;
      return Tournaments.findOne({_id:tournamentID});
    }
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
            var messages = [];
            if (Meteor.userId() == undefined) return messages;

            var messagesColl;

            var games =  Games.findOne({_id: Session.get("roomname")});

            if (Session.get("roomname")=="public" || games != undefined){ //hablan todos los que quieran

                messagesColl =  Messages.find({to: Session.get("roomname")}, { sort: { time: -1 }});

            }else{  //chat privado entre amigos

                messagesColl =  Messages.find({user_id : Meteor.userId(), to: Session.get("roomname")}, { sort: { time: -1 }}).fetch();
                var messagesColl2 =  Messages.find({user_id : Session.get("roomname"), to: Meteor.userId()}, { sort: { time: -1 }}).fetch();
                messagesColl2.forEach(function(n){

                    messagesColl.push(n);

                });
                messagesColl.sort(function(a,b){
                    if(a.time < b.time)return 1;
                    if(a.time > b.time)return -1;
                    return 0;
                });
            }
           
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
              to: Session.get("roomname"),
            });
            message.val('')
          }
      }
    } 
  });

    Template.rooms.helpers({

        'friends':function(){
            var arrfriends = []
            if (Meteor.userId() == undefined) return arrfriends;
            var idfriends = Meteor.users.findOne({_id:Meteor.userId()}).profile.friends
            
            for(i = 0; i < idfriends.length;i++){
                var data = {
                    id:idfriends[i],
                    name : Meteor.users.findOne({_id:idfriends[i]}).profile.user
                }
                arrfriends.push(data)
            }
            return arrfriends;
        },
        'nofriends':function(){

            var arrnofriends = [];
            if (Meteor.userId() == undefined) return arrnofriends;
            var idfriends = Meteor.users.findOne({_id:Meteor.userId()}).profile.friends;
            var allusers = Meteor.users.find();
            
            var push;
            
            allusers.forEach(function(user){
                
                push = true;
                if (user == undefined){
                    push = false;
                }
                if (user._id == Meteor.userId()){
                    push=false;
 
                }
                for(i = 0; i < idfriends.length;i++){
                    if (push == false){
                        break;
                    }
                    if (idfriends[i]==user._id){
                        push=false;
                    }
                }
                if (push){
                    var data = {
                        id:user._id,
                        name : user.profile.user
                    }
                    arrnofriends.push(data);
                }   
            });
            return arrnofriends;
        },
        'games':function(){

            var arrgames = [];
            if (Meteor.userId() == undefined) return arrgames;
            var games = Games.find();
            var playersgame;
            var push;
            
            games.forEach(function(game){
                playersgame = game.players;
                push=false;

                for(i = 0; i < playersgame.length;i++){
                    if (playersgame[i].id==Meteor.userId()){
                        push=true;
                        break;
                    }
                }
                if (push){
                    var data = {
                        id:game._id,
                        name : game.nameGame
                    }
                    arrgames.push(data);
                }   

            });
            return arrgames;
        }
    });

    Template.rooms.events({
        'change': function(e) {
            //el value de public sera "public", las demás las de cada usuario
            Session.set("roomname", e.target.value);
        }
    });

    Template.chat.helpers({
        'namechat': function(){
            var room = Session.get("roomname");
            var name = Meteor.users.findOne({_id: room});
            if (name != undefined){

                return name.profile.user;
            }
            var game = Games.findOne({_id: room});
            if (game != undefined){

                return game.nameGame;
            }
            return room;   
        }
    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
