 Meteor.methods({

    'addFriend': function(friendId){
        var user = Meteor.users.findOne({_id: Meteor.userId()}).profile;
        var friends = user.friends;
        friends.push(friendId)
        var data = {
            user: user.user,
            email: user.email,
            createdAt: user.createdAt,
            maxscore: user.maxscore,
            friends: friends
        }
        Meteor.users.update({_id:Meteor.userId()},{$set:{profile:data}});
    },
    'deleteFriend': function(friendId){
        var user = Meteor.users.findOne({_id:Meteor.userId()}).profile;
        var friends = user.friends;

        Meteor.users.update({_id:Meteor.userId()},{$set:{profile:data}});
        var newArr = [];
        for(var i = 0; i< friends.length; i++){
            if(friendId != friends[i]){
                newArr.push(friends[i]);
            }else{
            }
        }

        var data = {
            user: user.user,
            email: user.email,
            createdAt: user.createdAt,
            maxscore: user.maxscore,
            friends: newArr
        }
        Meteor.users.update({_id:Meteor.userId()},{$set:{profile:data}});
    }
});