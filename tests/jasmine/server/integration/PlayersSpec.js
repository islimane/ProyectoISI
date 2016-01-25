describe('Players', function() { 

	it( 'should create and init players with given ids' , function() {
		var users = Meteor.users.find().fetch();
		var ids = [users[0]._id , users[1]._id , users[2]._id , users[3]._id] ;
		var players = new Players(ids) ;
		var correct_names = ["pepe" , "pepito" , "me" , "user"] ;
		var names = players.names() ;

		expect(names).toEqual(correct_names) ;
  	} );

} );

