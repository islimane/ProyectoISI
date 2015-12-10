endGame = function(scores, gameId){
    /* 
     * scores is an array of objects with 2 fields:
     *   - id: the player id
     *   - score: the score of this player
     * gameId is the id of the game that have ended
     */

    console.log("Game ended");
    var winner =  {
        id: "",
        score: 0
    };
    for(var i=0; i<scores.length(); i++){
        if(scores[i].score > winner.score){
            winner.score = scores[i].score;
            winner.id = scores[i].id;
        }
        var user = Meteor.users.findOne({userId: scores[i].id});
        //Check if you can update a nonexisting element
        if(user.maxScore < scores[i].score){
            user.profile.maxScore = scores[i].score
            Meteor.users.update({_id: scores[i].id}, {$set: {profile: user.profile}});
        }
    }
    user = Meteor.users.findOne({_id: winner.id});
    user.profile.nWins++;
    Meteor.users.update({_id: user._id}, {$set: {profile: user.profile}});
    SuspendedGames.remove({gameId: gameId});
    //Should route or something
};

suspendGame = function(game){
    /*
     *  game is the game object and MUST have a gameId field
     */
    console.log("Game suspended");
    var updated = SuspendedGames.update({gameId: game.gameId}, {$set: {game}});
    if (!updated){
        SuspendedGames.insert(game);
    }
    //Should route or something
}

Meteor.methods({
    'startGame': function(players, gameId){
        /* Players is an array of the players ids.
         * The number of players is the length of the array
         * It returns an array explaining the error or empty if everything is OK
         */

         console.log("game has been started");
         //ADD LOGIC FUNCTIONALITY
         return "";
    },
    'addFriend': function(friendId){
        var user = Meteor.users.findOne({_id: Meteor.userId()}).profile;
        var friends = user.friends;
        friends.push(friendId)
        var data = {
            user: user.user,
            email: user.email,
            profileimg: user.img,
            createdAt: user.createdAt,
            maxscore: user.maxscore,
            friends: friends
        }
        Meteor.users.update({_id:Meteor.userId()},{$set:{profile:data}});
    },
    'deleteUser':function(myid){
        Meteor.users.remove({_id:myid});
        Router.go("/");
    },
    'deleteFriend': function(friendId){
        var user = Meteor.users.findOne({_id:Meteor.userId()}).profile;
        var friends = user.friends;

        var newArr = [];
        for(var i = 0; i< friends.length; i++){
            if(friendId != friends[i]){
                newArr.push(friends[i]);
            }
        }

        var data = {
            user: user.user,
            email: user.email,
            profileimg: user.img,
            createdAt: user.createdAt,
            maxscore: user.maxscore,
            friends: newArr
        }
        Meteor.users.update({_id:Meteor.userId()},{$set:{profile:data}});
    },
    'add': function(data){
        Meteor.users.update({_id:Meteor.userId()},{$set:{profile:data}});
    },
    'changeprofileimg':function(img){
        var user = Meteor.users.findOne({_id:Meteor.userId()}).profile;

        var data = {
            user: user.user,
            email: user.email,
            profileimg: img,
            createdAt: user.createdAt,
            maxscore: user.maxscore,
            friends: user.friends
        }
        Meteor.users.update({_id:Meteor.userId()},{$set:{profile:data}});
    }
});