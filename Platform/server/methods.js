endGame = function(scores){
    //scores es un array de pares id, socer (un diccionario)
    //Puntuación máxisma
    //Partidas ganadas
    console.log("Juego terminado");
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

}

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
    'deleteUser':function(myid){
        Meteor.users.remove({_id:myid});
        Router.go("/");
    },
    'deleteFriend': function(friendId){
        var user = Meteor.users.findOne({_id:Meteor.userId()}).profile;
        var friends = user.friends;

        Meteor.users.update({_id:Meteor.userId()},{$set:{profile:data}});
        var newArr = [];
        for(var i = 0; i< friends.length; i++){
            if(friendId != friends[i]){
                newArr.push(friends[i]);
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
    },
    'add': function(data){
        Meteor.users.update({_id:Meteor.userId()},{$set:{profile:data}});
    }
});