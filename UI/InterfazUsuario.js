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
		var sprite = Template.game.lookForTileSprite(50);
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
    'click #Followers': function () {
		var follower = $(this).val();
		console.log(follower);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });
}