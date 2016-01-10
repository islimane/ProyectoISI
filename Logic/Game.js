/////////////////////
//   GAME OBJECT   //
////////////////////
var turns = 72;
// args:
// players: array of all the players names
// id: ID of the current game
Game = function(playerIds, id){
    this.id = id;
    this.turns = turns - 1;
    this.players = new Players (playerIds);
    this.tiles = new Tiles();
    this.board = new Board();
    this.trees = new TreesCollection();
}

var getType = function (zone, tile) {
    switch (zone) {
        case 'n':
            var type = tile.positions.n;
            break;
        case 'nw':
            var type = tile.positions.nw;
            break;
        case 'w':
            var type = tile.positions.w;
            break;
        case 'sw':
            var type = tile.positions.sw;
            break;
        case 's':
            var type = tile.positions.s;
            break;
        case 'se':
            var type = tile.positions.se;
            break;
        case 'e':
            var type = tile.positions.e;
            break;
        case 'ne':
            var type = tile.positions.ne;
            break;
        default:
            throw "Tree type not found";
    }
    return type;
}

//Get trees surrounding the given tile in the given coord.

var getAllTrees = function (tile, coord) {
    var trees = [];
    var zones = ['n', 'nw', 'w', 'sw', 's', 'se', 'e', 'ne'];
    for (var zone in zones) {
        var childCoord, childZone = getCoordAndZoneChild(coord, zone);
        var treeType = getType(zone, tile);
        var auxTrees = getTrees([treeType], childCoord);
        if (auxTrees.length !== 0) trees.push({zone: zone, trees: auxTrees});
    }
    return trees;
}

//Get free trees and their corresponding zones.
//Where a free tree is one that doesn't have any
//dummy in it.

var getFreeZones = function (trees) {
    var freeZones = [];
    for (var tree in trees) {
        if (tree.trees.dummies.length === 0) {
            freeTrees.push(zoneTree.zone);
        }
    }
    return freeZones;
}

//For every orientation ('group'), it access
//every possible cell to add the possible dummy locations.
//Format: [[{cell: Cell1 for Rot0, dummyPos: DummyPos},
//          {cell: Cell2 for Rot0, dummyPos: DummyPos}, ...],
//        [{cell: Cell1 for Rot1, dummyPos: DummyPos},
//          {cell: Cell2 for Rot1, dummyPos: DummyPos}, ...],
//        [{cell: Cell1 for Rot2, dummyPos: DummyPos},
//          {cell: Cell2 for Rot2, dummyPos: DummyPos}, ...],
//        [{cell: Cell1 for Rot3, dummyPos: DummyPos},
//          {cell: Cell2 for Rot3, dummyPos: DummyPos}, ...]]
//  Coords will be in format [x, y]
//  DummyPos will be in format ['n', 'nw', 's', ...]

Game.prototype.getDummyPositions = function () {
    var cells = this.board.getAllMatchingCells(this.tiles.currentTile);
    var newArray = [];
    for (var group in cells) {
        var newGroup = [];
        for (var cell in group) {
            var coord = {x: cell.x, y: cell.y};
            var trees = getAllTrees(this.tiles.currentTile ,coord);
            var freeZones = getFreeZones(trees);
            newGroup.push({cell: cell, dummyPos: freeZones});
        }
        newArray.push(newGroup);
    }
    return newArray;
}

Game.prototype.getStatus = function () {
    return {
        player: this.players.currentPlayer,
        tile: this.tiles.currentTile
    };
};

Game.prototype.nextTurn = function() {
    try {
        this.tiles.popTile();
        this.players.next();
        ++this.turn;
    }catch (err) {
        return "Abort: " + err;
    }
    return "";
};
