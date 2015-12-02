
// This a collection to interact with UI, both ( UI and IA, server and client)
// have acces to the collection and an event will take place if a modification
// is realiced.

Msgs = new Mongo.Collection("msgs") ;

msg {
	idGame = "" ;
	idPlayer = "" ;		
	idTile = "" ;		// Tile 0-23
	
	rotations = {
		rot0: info[] ;
		rot1: info[] ;
		rot2: info[] ;
		rot3: info[] ;
	}

	backInfo ;
	playerUpdate ;
	
}
// Info to be filled by IA
info {
	cordX ;
	cordY ;
	dummies: [];	// [ n,  nw,   w,  sw,   s,  se,   e,  ne,   c  ]
	 		// de 0 a 9 true y false donde vaya el dummy
}
// Info to be filled by UI
backInfo {
	coordX;
	coordY;
	dummies: [] ; 	// [ n,  nw,   w,  sw,   s,  se,   e,  ne,   c  ]
	 		// de 0 a 9 true y false donde vaya el dummy
	rotation ;	// choosen tiles rotation 0-3
}


playerUpdate {
	coord ; 	// Coord of removed dummies
	incScore = 0;
}



