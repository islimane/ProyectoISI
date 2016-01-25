/*******************************************************************************
 *  Publish collections
 */



Meteor.publish("matches_current_game", function(current_game){
    var game_criteria;

    if (current_game == "none")
	game_criteria = {};
    else 
	game_criteria = {game_id: current_game};

    // publish every field of the latest 5 matches sorted by points in
    // descending order
    return Matches.find(game_criteria, 
			{limit:5, sort: {points:-1}});
    
});





Meteor.publish("all_games", function () {
    // publish every field of every game
    return Others_Games.find();
});



/*******************************************************************************
 *  Defines functions that can be invoked over the network by clients.
 *
 */
Meteor.methods({
    matchFinish: function (game, points) {
	// Don't insert in the Matches collection a match if the user
	// has not signed in
	if (this.userId)
	    Matches.insert ({user_id: this.userId, 
			     time_end: Date.now(),
			     points: points,
			     game_id: game
			    });
    }
});




/*******************************************************************************
 *  Definition of permissions for users trying to write directly to
 *  collections
 */




/*******************************************************************************
 *  Initialization at startup
 */
Meteor.startup(function() {
    // At startup, fill collection of games if it's empty
    if (Others_Games.find().count() == 0) {
	Others_Games.insert({name: "FrootWars"});
	Others_Games.insert({name: "AlienInvasion"});
    };

});
