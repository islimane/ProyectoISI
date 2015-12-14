if (Meteor.isClient) {

	var fichasActivas = [];
	var rot0 = [];
	var rot1 = [];
	var rot2 = [];
	var rot3 = [];
	var fichasValidas = [rot0,rot1,rot2,rot3];
	var jugadores = [];

	function jugador(posicion, puntos, nombre,idPlayer){
		this.pos=posicion;
		this.puntos=puntos;
		this.nombre=nombre;
		this.idPlayer=idPlayer;
	}

	function creadummie(pos){
		for (i = 0; i < 10 ; i++) {
			if (i == pos) {
				dummies[i] =true;
			}else{
				dummies[i]=false;
			}
		} 
		return dummies;
	}

	function ficha(num, coordx, coordy, rot, token) {
	    this.num = num;
	    this.coord = [coordx,coordy];
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
	    var idPlayer = event.target.idPlayer.value;
	    jugadores[pos] = new jugador(pos,puntos,nombre,idPlayer);
	}
});
Template.meterfichaActiva.events({
	'submit form': function(event){
	    event.preventDefault();
	    var num = event.target.num.value;
	    var coordx = event.target.coordx.value;
	    var coordy = event.target.coordy.value;
	    var rot = event.target.rot.value;
	    var token= creadummie(event.target.token.value);
	    var ficha= new ficha(num,coordx,coordy,rot,token);
	    fichasActivas.push(ficha);
	}

});

Template.meterfichaValida.events({
	'submit form': function(event){
	    event.preventDefault();
	    var coordx = event.target.coordx.value;
	    var coordy = event.target.coordy.value;
	    var rot = event.target.rot.value;
	    var info= [];
	    var n = event.target.n.value
	    if (n==1){
	    	info[0]=true;
	    }else{
	    	info[0]=false;
	    }
	     var nw = event.target.nw.value
	    if (nw==1){
	    	info[1]=true;
	    }else{
	    	info[1]=false;
	    }
	     var w = event.target.w.value
	    if (w==1){
	    	info[2]=true;
	    }else{
	    	info[2]=false;
	    }
	     var sw = event.target.sw.value
	    if (n==1){
	    	info[3]=true;
	    }else{
	    	info[3]=false;
	    }
	     var s = event.target.s.value
	    if (s==1){
	    	info[4]=true;
	    }else{
	    	info[4]=false;
	    }
	    var se = event.target.se.value
	    if (se==1){
	    	info[5]=true;
	    }else{
	    	info[5]=false;
	    }
	    var e = event.target.e.value
	    if (e==1){
	    	info[6]=true;
	    }else{
	    	info[6]=false;
	    }
	    var ne = event.target.ne.value
	    if (ne==1){
	    	info[7]=true;
	    }else{
	    	info[7]=false;
	    }
	    var c = event.target.c.value
	    if (c==1){
	    	info[8]=true;
	    }else{
	    	info[8]=false;
	    }
	   
	    fichasValidas[rot].push([coordx,coordy],info);
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
