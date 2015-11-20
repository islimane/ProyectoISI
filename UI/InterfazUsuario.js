if (Meteor.isClient) {

  var TileList = new Object();
  TileList.Tile = new Array();
  var numTile = 72;
  var tileID;
  
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
    },
    'click button#PlaceTile': function () {
		return null;
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
		return null;
    },
    'click #Followers .Thief': function () {
		TileList.Tile[tileID].Follower = "Thief";
		console.log(TileList.Tile[tileID].Follower);
		//Fin de turno
    },
    'click #Followers .Knigth': function () {
		TileList.Tile[tileID].Follower = "Knigth";
		console.log(TileList.Tile[tileID].Follower);
		//Fin de turno
    },
    'click #Followers .Monk': function () {
		TileList.Tile[tileID].Follower = "Monk";
		console.log(TileList.Tile[tileID].Follower);
		//Fin de turno
    },
    'click #Followers .Farmer': function () {
		TileList.Tile[tileID].Follower = "Farmer";
		console.log(TileList.Tile[tileID].Follower);
		//Fin de turno
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });
}
