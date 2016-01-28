Meteor.methods({
    'startGame': function(players, gameId){
        /* Players is an array of the players ids.
         * The number of players is the length of the array
         * It returns an array explaining the error or empty if everything is OK
         */

      console.log("game has been started llamamos a LOGICA");
      game = new Game(players, gameId);
      storeGame(game);
      return true
    },
    'resumeGame': function(game){
        console.log("game has been resumed");

        //The game is stored again in the 'active games' array
        game.suspended = false;
        storeGame(game);
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
