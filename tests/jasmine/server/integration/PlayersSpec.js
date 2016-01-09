describe('Players', function() { 

	it( 'should create and init players with given ids' , function() {
		users = Meteor.users.find().fetch();
		ids = [users[0]._id , users[1]._id , users[2]._id , users[3]._id] ;
		players = new Players(ids) ;
		//console.log(players)
		for ( i = 0 ; i < ids.length ; i++){
			console.log("IN PLAYERSPEC")
			console.log(players.players);
			console.log(players.players[i]) ;
			console.log("___________________")
		}
		
        } );


} );

