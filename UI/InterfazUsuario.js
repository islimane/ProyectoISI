if (Meteor.isClient) {

	var fichasActivas=[];
	var fichasValidas=[];
	var jugadores=[];

	function jugador(posicion, puntos, nombre){
		this.pos=posicion;
		this.puntos=puntos;
		this.nombre=nombre;
	}

	function ficha(num, coordx, coordy, rot, token) {
	    this.num = num;
	    this.coordx = coordx;
	    this.coordy = coordy;
	    this.rot = rot;
	    this.token=token;
	}
	//////////////////////PARCHEADO/////////////////
	Template.meterJugadores.events({
		'submit form': function(event){
		    event.preventDefault();
		    var pos = event.target.pos.value;
		    var puntos = event.target.puntos.value;
		    var nombre = event.target.nombre.value;

		    jugadores[pos] = new jugador(pos,puntos,nombre);
		}
	});
	Template.meterfichaActiva.events({
		'submit form': function(event){
		    event.preventDefault();
		    console.log("entra a meterfichaActiva");
		    var num = event.target.num.value;
		    console.log("sacamos num");
		    console.log(num);
		    var coordx = event.target.coordx.value;
		    console.log("sacamos coordx");
		    console.log(coordx);
		    var coordy = event.target.coordy.value;
		    console.log("sacamos coordy");
		    console.log(coordy);
		    var rot = event.target.rot.value;
		    console.log("sacamos rot");
		    console.log(rot);
		    var token= event.target.token.value;
		    console.log("sacamos token");
		    console.log(token);
		    var fichanew = new ficha(num,coordx,coordy,rot,token);
		    fichasActivas.push(fichanew);

		    var arrayLength = fichasActivas.length;
		    console.log("longitud array");
		    console.log(arrayLength);
			for (var i = 0; i < arrayLength; i++) {
			     console.log(fichasActivas[i].num)
			}
		
		}

	});

	Template.meterfichaValida.events({
		'submit form': function(event){
		    event.preventDefault();
		    var num = event.target.num.value;
		    var coordx = event.target.coordx.value;
		    var coordy = event.target.coordy.value;
		    var rot = event.target.rot.value;
		    var token= event.target.token.value;
		    var fichanew= new ficha(num,coordx,coordy,rot,token);
		    fichasValidas.push(fichanew);
		}

	});

	Template.puntosAjugadores.events({
		'submit form': function(event){
			event.preventDefault();
			var j1= event.target.jugador1.value;
			var j2= event.target.jugador2.value;
			var j3= event.target.jugador3.value;
			var j4= event.target.jugador4.value;
			if (j1){
				jugadores[0].puntos = jugadores[0].puntos +j1;
			}
			if (j2){
				jugadores[1].puntos = jugadores[1].puntos +j2;
			}
			if (j3){
				jugadores[2].puntos = jugadores[2].puntos +j3;
			}
			if (j4){
				jugadores[3].puntos = jugadores[3].puntos +j4;
			}

		}
	})

	///////////////////////FIN DEL PARCHEADO///////////////////

  var TileList = new Object();
  TileList.Tile = new Array();
  var numTile = 72;
  var tileID;

  Session.set('showPlaceTile', false);
  Session.set('showRotateTile', false);
  Session.set('showFollowers', false);
  
  var iterator;
  for(iterator=1; iterator<=numTile; iterator++)
  {
	TileList.Tile[iterator] = new Object();
	TileList.Tile[iterator].Id = iterator;
	TileList.Tile[iterator].Sprite = iterator;
	TileList.Tile[iterator].RotationPos = 1;
	TileList.Tile[iterator].TablePos = undefined;
	TileList.Tile[iterator].Follower = undefined;
  };
  
  Template.game.generateTile = function(){

  	var idRandom = Math.random()*71 + 1;
  	return idRandom;
  }, 
  
  Template.game.endOfTurn = function(){
	Session.set('showPlaceTile', false);
	Session.set('showRotateTile', false);
	Session.set('showFollowers', false);
	//Pasar info a logica
	
  }, 

  Template.game.lookForTileSprite = function (id) {
	var iterator;
	var found = false;
	for(iterator=1; iterator<=numTile; iterator++)
	{
		if(TileList.Tile[iterator].Id == id)
		{
			break;
		}
	};
	return TileList.Tile[iterator].Sprite;
  },

  Template.game.helpers({
    pickTile: function () {
		return Session.get('showPickTile');
	},
	placeTile: function () {
		return Session.get('showPlaceTile');
	},
	rotateTile: function () {
		return Session.get('showRotateTile');
	},
	followers: function () {
		return Session.get('showFollowers');
	}
	
  });

  Template.game.events({
	  
    'click button#PickTile': function () {
		//tileID = RequestTile
		//RequestActiveBox
		var idRandom = Template.game.generateTile();
		var sprite = Template.game.lookForTileSprite(parseInt(idRandom));
		tileID = sprite;
		console.log(sprite);
		//PrintActiveBox
		//BlockingActiveBox
		//PrintSprite
		Session.set('showPlaceTile', true);
		
    },
    'click button#PlaceTile': function () {
		Session.set('showRotateTile', true);
    },
    'click button#RotateTile': function () {
		var pos = TileList.Tile[tileID].RotationPos;
		console.log("Inicio: " + pos)
		pos += 1;
		if(pos > 4)
		{
			pos = 1;
		}
		TileList.Tile[tileID].RotationPos = pos;
		console.log(pos);
    },
    'click button#Finish': function () {
		Session.set('showFollowers', true);
    },
    'click #Followers .Thief': function () {
		TileList.Tile[tileID].Follower = "Thief";
		console.log(TileList.Tile[tileID].Follower);
		Template.game.endOfTurn();
    },
    'click #Followers .Knigth': function () {
		TileList.Tile[tileID].Follower = "Knigth";
		console.log(TileList.Tile[tileID].Follower);
		Template.game.endOfTurn();
    },
    'click #Followers .Monk': function () {
		TileList.Tile[tileID].Follower = "Monk";
		console.log(TileList.Tile[tileID].Follower);
		Template.game.endOfTurn();
    },
    'click #Followers .Farmer': function () {
		TileList.Tile[tileID].Follower = "Farmer";
		console.log(TileList.Tile[tileID].Follower);
		Template.game.endOfTurn();
    }
    
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });
}
