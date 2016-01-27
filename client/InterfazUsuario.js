
if (Meteor.isClient) {
var gameID;  //Identificador de partida necesaria para la parte lógica del juego
posRot = 0;
var tileID;
var rotInfo;
var Players = new Array();
	//Sesiones para botones
	Session.setDefault('showRotateTile', false);
	Session.setDefault('showFollowers', false);
	Session.setDefault('showPickTile', false);
	Session.setDefault('showPlayers', false);

	//Sesiones estado del turno
	Session.setDefault('pickTileOK', false);
	Session.setDefault('fixedToken', false);
	//Session.setDefault('currentPlayer', 0);
	Session.setDefault('isMyTurn', false);
	Session.setDefault('playersUpdate', undefined);
	Session.setDefault('counter', 0);
	Session.setDefault('counter2', 0);
	Session.setDefault('setTile', 0);

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
			//console.log("Creo el jugador -> [" + iterator + "] " + Players[iterator].turn);
		};
		Players[0].turn = true;
		Session.setDefault('currentPlayer', 0);
		//console.log("jugador -> [" + 1 + "] " + Players[1].turn);
	//	Session.set('playersUpdate', PlayerList.Player);
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

	var checkTurn = function(){
			//if(Players[Session.get('currentPlayer')].id == Meteor.userId()){
			if(Players[Session.get('currentPlayer')].id == 100){
				Session.set('isMyTurn', true);
			//	alert("es mi turno");
			}else{
				Session.set('isMyTurn', false);
			//	alert("NO es mi turno");
			}
	}

	var changeTurn = function(){
		// aumentar el turno del jugador
		var playerTurn = Session.get('currentPlayer');
		Players[Session.get('currentPlayer')].turn = false;
		playerTurn += 1;
		if(playerTurn > 3){
			playerTurn = 0;
		}
		Session.set('currentPlayer', playerTurn);
		Players[Session.get('currentPlayer')].turn = true;
	}

	var acts = null;
	Tracker.autorun(function(){
		acts = PlayerMoves.find();
		acts.forEach(function(acts){
			if(acts.move == "Ha terminado el turno"){
				//console.log("ha terminado el turno")
				changeTurn();
				//console.log("turno cambiado")
				checkTurn();
				if(Session.get('isMyTurn')){
					console.log("es mi turno ********************************")
					StartTurn();
				}
			/*}else if(acts.move == "Ha sacado ficha"){
				console.log("EL jugador ha sacado ficha")
				Game.setBoard(3, new CurrentToken(0,0,tileID));*/
			}
		});
	});

	Tracker.autorun(function(){
		if(Session.get('counter') == 2){
			initGame(tileID, rotInfo);
			$('button#StartGame').hide();
			Session.set('playersUpdate', Players);
			Session.set('showPlayers', true);
			checkTurn();
			if(Session.get('isMyTurn')){
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

	//Funcion a la que llama Plataforma para comenzar una partida
	//Realiza las llamadas a lógica para coger la información de la partida
	StartGameIU = function(g_id){
		console.log("StartGame IU")
		gameID = g_id;
		Meteor.call('getCoords',gameID, function(err, tileInfo){
			//console.log("IU-> START GAME METEOR CALL")
			tileID = tileInfo.tileId;
			rotInfo = tileInfo.coords;
			var counter = Session.get('counter');
			counter++;
			Session.set('counter', counter);
		});
		Meteor.call('getNames', gameID, function(err, players){
			createPlayers(players); 
			var counter = Session.get('counter');
			counter++;
			Session.set('counter', counter);
			//console.log(Session.get('counter'));
		});
		console.log("finaliza  StartGame")
	}

	//Nuevo turno
	var StartTurn= function(){
		// aqui falta el jugador IA
		console.log("###### start turn #########")
		if(Players[Session.get('currentPlayer')].name == "IA"){
			Meteor.call('getIA',gameID, function(err, info){
				var infoIA = new Object();
				infoIA.tileID = 16;
				infoIA.x = (1-1)*boxSize;
				infoIA.y = (2-1)*boxSize;
				infoIA.tileRot = 2;
				infoIA.followerPos = null;
				var scores = [100, 16, 22, 88];
				var currentMinCoorIA = {x: Game.minCoor[0], y: Game.minCoor[1]};
				boards[1].setToken(new Token(infoIA.x, infoIA.y, infoIA.tileRot, infoIA.tileID,[47,47],[currentMinCoorIA.x,currentMinCoorIA.y]));
				//posRot = infoIA.tileRot;
				updateScores(scores);
				EndOfTurn();
				StartTurn();
			});
		}else{

			var x = Session.get('setTile');
			alert("ya se cambio settile " + x)
			if(x != 0){
				Meteor.call('getCoords',gameID, function(err, tileInfo){
					  alert("tile Info " + tileInfo)
						//console.log("IU-> METEOR CALL: getCoords")
						tileID = tileInfo.tileId;
						rotInfo = tileInfo.coords;
						//console.log("IU-> Nos llega TileID: " + tileID + " RotInfo: " + rotInfo)
						Session.set('counter2', 1);
				});
			}
			//Session.set('settile', 0);

			//$('button#StartGame').hide();
			//console.log(Session.get('counter2'));
			if(Session.get('counter2') != 0){
				Session.set('showPickTile', true);
			}


		}
	}

	//Fin de turno
	var EndOfTurn = function(){
		if(Players[Session.get('currentPlayer')].name != "IA"){
			var pos = (boards[1].num_token())-1;
			//alert("IU-> METEORCALL End of turn ENviamos\n")
			console.log(gameID + " " + boards[1].tokens[pos].logicCoord[0]+ " " + boards[1].tokens[pos].logicCoord[1]+ " " + posRot + " " +	boards[2].pos)
			Meteor.call('setTile',
						gameID,
						boards[1].tokens[pos].logicCoord[0],
						boards[1].tokens[pos].logicCoord[1],
						posRot,
						boards[2].pos2,
						function(err, updateInfo){ //recibir array followers eliminados
				updateScores(updateInfo.score);
				updateFollowers(updateInfo.dums);
				Session.set('setTile', 1);
			});
		}
		//Reiniciamos Sesiones
		posRot = 0;

	}

	Template.game.helpers({
		playerTurn: function () {
			if(Session.get('showPlayers')){
				return Players[Session.get('currentPlayer')].name;
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
			console.log ("evento llamada Plataforma")


			// metodo de prueba


			StartGameIU(1);
		},

		//DAME FICHA
		'click button#PickTile': function () {

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
				Session.set('pickTileOK', true);
				//Session.set('showFollowers', true);//CAMBIARRRRR
				Session.set('showRotateTile', false);
			}else{
				alert("Confirmar una rotacion con posible colocacion");
			}
		},

		//TERMINAR TURNO
		'click button#Terminar': function () {

			EndOfTurn();
			var idMove = Session.get('movesP');
			PlayerMoves.update(idMove, {$set:{move:"Ha terminado el turno"}});
		},

  });
}
