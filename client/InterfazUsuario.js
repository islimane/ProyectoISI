
if (Meteor.isClient) {
var gameID;  //Identificador de partida necesaria para la parte lógica del juego
posRot = 0;
var tileID;
var rotInfo;
var currentPlayer = 0;
var n = 100;
var Players = new Array();
	//Sesiones para botones
	Session.setDefault('showRotateTile', false);
	Session.setDefault('showFollowers', false);
	Session.setDefault('showPickTile', false);
	Session.setDefault('showPlayers', false);

	//Sesiones estado del turno
	Session.setDefault('pickTileOK', false);
	Session.setDefault('fixedToken', false);
	Session.setDefault('playersUpdate', undefined);
	Session.setDefault('counter', 0);


	var createPlayers = function(players){
		var auxPlayer = players;
		var iterator;
		for(iterator=0; iterator<=3; iterator++)
		{
			Players[iterator] = new Object();
			Players[iterator] = {name: auxPlayer[iterator].name,
								   id: auxPlayer[iterator].id,
							     score: 0,
							     followers: 7,
							     turn: false};
		};
		Players[0].turn = true;
		//currentPlayer = 0;
	}

	var updateScores = function(scores){
		var iterator;
		for(iterator=0; iterator<=3; iterator++)
		{
			Players[iterator].score = scores[iterator];
		}
		Session.set('playersUpdate', Players);
	}

	var updateFollowers = function(followers){
		var iterator;
		for(iterator=0; iterator<=3; iterator++)
		{
			Players[iterator].followers = followers[iterator];
		}
		Session.set('playersUpdate', Players);
	}

	var changeTurn = function(){
		currentPlayer +=1;
		n +=100;
		if(currentPlayer > 3){
			currentPlayer = 0;
		}
		if(n > 400){
			n = 100;
		}
	}


	Tracker.autorun(function(){
		if(Session.get('counter') == 2){
			initGame(tileID, rotInfo);
			Session.set('playersUpdate', Players);
			Session.set('showPlayers', true);
			if(Players[currentPlayer].id == n){
				Session.set('showRotateTile', true);
			}
			var m = "Ha sacado ficha";
			PlayerMoves.insert({
				move: m
			});
			var id = PlayerMoves.find().fetch();
			Session.set('movesP', id[0]._id);
			Session.set('counter', 0);
		}
	});

	Tracker.autorun(function(){
		var acts = PlayerMoves.find({}, {fields: {'move': 1}});
		acts.forEach(function(it){
			console.log("CAMBIO");
			if(it.move === "Ha terminado el turno"){
				//console.log("ha terminado el turno")
				changeTurn();
				//console.log("turno cambiado")
				//checkTurn();
					//console.log("es mi turno")
				if(Players[currentPlayer].id == n){
					StartTurn();
				}
			}else if(it.move === "Ha sacado ficha"){
				console.log("EL jugador ha sacado ficha")
				Game.setBoard(3, new CurrentToken(0,0,tileID));
			}
		});

	});
	//Funcion a la que llama Plataforma para comenzar una partida
	//Realiza las llamadas a lógica para coger la información de la partida
	StartGameIU = function(g_id){
		gameID = g_id;
		Meteor.call('getCoords',gameID, function(err, tileInfo){
			tileID = tileInfo.tileId;
			rotInfo = tileInfo.coords;
			var counter = Session.get('counter');
			counter++;
			Session.set('counter', counter);
		});
		Meteor.call('getNames', gameID, function(err, players){
			createPlayers(players);
			console.log("IU-> START GAME METEOR CALL" + gameID + " "+ Players[currentPlayer].name)
			var counter = Session.get('counter');
			counter++;
			Session.set('counter', counter);
		});
	}

	//Nuevo turno
	var StartTurn= function(){

		if(Players[currentPlayer].name == "IA"){
			Meteor.call('getIA',gameID, function(err, info){
				var infoIA = new Object();
				infoIA.tileId = 16;
				infoIA.x = (1-1)*boxSize;
				infoIA.y = (2-1)*boxSize;
				infoIA.tileRot = 2;
				infoIA.remDums = null;
				infoIA.scores = [100, 16, 22, 88];
				var currentMinCoorIA = {x: Game.minCoor[0], y: Game.minCoor[1]};
				boards[1].setToken(new Token(infoIA.x, infoIA.y, infoIA.tileRot, infoIA.tileID,[47,47],[currentMinCoorIA.x,currentMinCoorIA.y]));
				//posRot = infoIA.tileRot;
				updateScores(infoIA.scores);
				EndOfTurn();
			});
		}else{
			Meteor.call('getCoords',gameID, function(err, tileInfo){
				//	console.log("IU-> METEOR CALL: getCoords")
					tileID = tileInfo.tileId;
					rotInfo = tileInfo.coords;
					Session.set('showPickTile', true);
			});
		}
	}

	//Fin de turno
	var EndOfTurn = function(){
		if(Players[currentPlayer].name != "IA"){
			var pos = (boards[1].num_token())-1;
			Meteor.call('setTile',
						gameID,
						boards[1].tokens[pos].logicCoord[0],
						boards[1].tokens[pos].logicCoord[1],
						posRot,
						boards[1].tokens[pos].pos,
						function(err, updateInfo){
				//console.log("********SET TILE ACABADO************")
				updateScores(updateInfo.scores.scores);
				updateFollowers(updateInfo.scores.dums);
				PlayerMoves.remove(Session.get('movesP'));
				PlayerMoves.insert({
					move: "Ha terminado el turno"
				});
				var id = PlayerMoves.find().fetch();
				Session.set('movesP', id[0]._id);
			});
		}
		//Reiniciamos Sesiones
		Session.set('pickTileOK', false);
		Session.set('showFollowers', false);
		Session.set('fixedToken', false);
		posRot = 0;

	}

	Template.game.helpers({
		playerTurn: function () {
			if(Session.get('showPlayers')){
				return Players[currentPlayer].name;
			}
		},
		players: function(){
			if(Session.get('showPlayers')){
				return Session.get('playersUpdate');
			}
		},
		pickTile: function () {
			return Session.get('showPickTile');
		},
		rotateTile: function () {
			return Session.get('showRotateTile');
		},
		existFollowers: function () {
			return Session.get('showFollowers');
		}
	});

	Template.game.events({

		//Boton que simula la llamda a StartTurn que hara la Plataforma
		'click button#StartGame': function () {
			StartGame(1);
		},

		//DAME FICHA
		'click button#PickTile': function () {
			//console.log("IU-> PickTile-> ID: " + tileID)
			var currentMinCoor = {x: Game.minCoor[0], y: Game.minCoor[1]};
			Game.setBoard(2,new PossiblePositions([currentMinCoor.x,currentMinCoor.y],"valid"));//creo objeto rotaciones
			boards[2].addInfo(rotInfo);
			Game.setBoard(3,new CurrentToken(0,0,tileID));
		/*	var idMove = Session.get('movesP');
			PlayerMoves.update(idMove, {$set:{move: "El jugador " + Session.get('currentPlayer') + " pide una ficha"}});*/
			Session.set('showPickTile', false);
			Session.set('showRotateTile', true);
		},

		//ROTAR FICHA
		'click button#RotateTile': function () {
			posRot += 1;
			if(posRot > 3)
			{
				posRot = 0;
			}
			/*var idMove = Session.get('movesP');
			PlayerMoves.update(idMove, {$set:{move: "El jugador " + Session.get('currentPlayer') + " ha rotado ficha a " + posRot}});*/
		},

		//ROTACION ELEGIDA
		'click button#Ok': function () {
			if (rotInfo[posRot].length > 0){
				console.log("COLOCO FICHA")
				Session.set('pickTileOK', true);
				Session.set('showRotateTile', false);
			}else{
				alert("Confirmar una rotacion con posible colocacion");
			}
		},

		//TERMINAR TURNO
		'click button#Terminar': function () {
			$('button#Terminar').hide();
			EndOfTurn();
		},

  });
}
