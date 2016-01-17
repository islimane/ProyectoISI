describe('Players', function() { 

	it( 'should create and init players with given ids' , function() {
		users = Meteor.users.find().fetch();
		ids = [users[0]._id , users[1]._id , users[2]._id , users[3]._id] ;
		players = new Players(ids) ;
		correct_names = ["pepe" , "pepito" , "me" , "user"] ;
		names = players.names() ;

		expect(names).toEqual(correct_names) ;
  	} );

} );

