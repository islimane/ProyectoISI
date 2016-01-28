
Meteor.subscribe("all_games");


Tracker.autorun(function(){
    var current_game = Session.get("current_game");
    Meteor.subscribe("matches_current_game", current_game);
});



Template.othersGames.onRendered(function () {

    Session.set("current_game", "none");
    $('#gamecontainer').hide();
    $('#container').hide();
    //inicializa alien y fruit
    $(function() {
        Game_.initialize("game_",sprites_,startGame_);  //alien
        game.init();  //fruit
    });
   
});


Template.choose_game.helpers({
    'games' : function (){
    return Others_Games.find();
    }
})

Template.choose_game.events = {
    'click #AlienInvasion': function () {
        $('#gamecontainer').hide();
        $('#container').show();
        var game = Others_Games.findOne({name:"AlienInvasion"});
        Session.set("current_game", game._id);
    },
    'click #FrootWars': function () {
        $('#container').hide();
        $('#gamecontainer').show();
        var game = Others_Games.findOne({name:"FrootWars"});
        Session.set("current_game", game._id);
    },
    'click #none': function () {
        $('#container').hide();
        $('#gamecontainer').hide();
        Session.set("current_game", "none");
    }
}


Template.best_players.helpers({
    'none' : function (){
    return Session.get("current_game") == "none";
    },
    'gameName' :  function (){
    var game_id = Session.get("current_game");
    if (game_id)
        var game_name = Others_Games.findOne({_id: game_id});
        if (game_name != undefined)
            game_name = game_name.name;
    return game_name;
    },
    'best_players' : function (){

    var gameid = Session.get("current_game");
    if (gameid != "none"){
        var matches =  Matches.find({game_id: gameid}, {limit:5, sort: {points:-1}});
    }else{
        var matches =  Matches.find({}, {limit:5, sort: {points:-1}});
    }
    var users_data = [];

    matches.forEach (function (m) {
        var user = Meteor.users.findOne({_id: m.user_id}).profile.user;
        if (user){

            var game = Others_Games.findOne({_id: m.game_id});
            users_data.push({name: user, game: game.name, points: m.points});
        }
    });

    return users_data;
    }


})




