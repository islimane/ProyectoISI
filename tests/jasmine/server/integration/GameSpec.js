describe('Game', function() {
    describe('Start game', function() {
        it('should find new game in the array of games', function() {
            var user = Meteor.users.findOne({profile : {user : "pepe" } });
            var playersIds = [user._id];
            var game = new Game(playersIds, playersIds.length);
            storeGame(game);
            var storedGame = findGameByID(playersIds.length);
            expect(storedGame).toBe(game);
        });
    });
})
