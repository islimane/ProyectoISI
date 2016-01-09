describe('Game', function() {
    describe('Start game', function() {
        it('should find new game in the array of games', function() {
            var user = Accounts.findUserByEmail('pepe@gmail.com');
            var players = [new Player(user._id)];
            var game = new Game(players, 1);
            storeGame(game);
            var storedGame = findGameByID(1);
            expect(storedGame).toBe(game);
        });
    });
})
