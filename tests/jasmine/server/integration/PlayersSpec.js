describe('Players', function() {

	beforeEach(function() {
		players = new Players("A", "B" , "C", "D");
	});


	it('should initialize 4 players with names A, B, C, D ', function() {
		var names = "";
		for (i = 0 ; i < 4 ; i ++  ) {
			names = names + players.players[i].name ;
		}
		expect("ABCD").toEqual(names);
	});

	it('should give the next player each turn', function() {
		var p = ["A" , "B" , "C", "D" , "A", "B", "C", "D"] ;
		var out = true;
		var names = "" ;
		for (i = 0 ; i < p.length ; i++ ){
			names = names + players.currentPlayer.name ;
			players.next() ;
			if(p[i] != players.currentPlayer.name ) {
				out = false ;
			}
		}
		expect("ABCDABCD").toBe(names) ;
	});

	it('should increase each players score by 10' , function() {
		var totalScore = 0 ;
		for (i = 0; i < 4; i ++ ) {
			players.players[i].incScoreBy(10) ;
		}
		for ( i= 0; i < 4; i++ ) {
			totalScore = totalScore + players.players[i].score ;
		}
		expect(40).toEqual(totalScore);
	});

});