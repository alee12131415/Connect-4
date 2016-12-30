var bot_random = function() {
    this.run = function(game) {
        return game.possible_moves[Math.floor(Math.random() * game.possible_moves.length)];
    }
}