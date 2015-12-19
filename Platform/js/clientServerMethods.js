/*
 * Out of server/methods.js only for debug. When logic is ready this mustbe placed 
 * again inside methods and this file deleted.
 */
endGame = function(scores, gameId){
    /* 
     * scores is an array of objects with 2 fields:
     *   - id: the player id
     *   - score: the score of this player
     * gameId is the id of the game that have ended
     */
    var winner =  {
        id: "",
        score: 0
    };
    for(var i=0; i<scores.length; i++){
        if(scores[i].score > winner.score){
            winner.score = scores[i].score;
            winner.id = scores[i].id;
        }
        var user = Meteor.users.findOne({_id: scores[i].id});
        //Check if you can update a nonexisting element
        if(user.profile.maxScore < scores[i].score){
            user.profile.maxScore = scores[i].score
            Meteor.users.update({_id: scores[i].id}, {$set: {profile: user.profile}});
        }
    }
    user = Meteor.users.findOne({_id: winner.id});
    user.profile.nWins++;
    Meteor.users.update({_id: user._id}, {$set: {profile: user.profile}});

    Games.remove({_id: gameId});
    Router.go("/");
    //Should route or something

};

suspendGame = function(game){
    /*
     *  game is the game object and MUST have a gameId field
     */
    console.log("Game suspended");
    SuspendedGames.insert(game);
    //Should route or something
};