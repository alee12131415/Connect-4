//test game until a ui is made

//two bots play against each other

function gameTurn(game, player1, player2) {
    //let run be used to get a move from a bot
    //returns the move to be played
    if (game.player_turn == 1) return player1.run(game);
    else return player2.run(game);
}

function printState(game) {
    for (y = game.state[0].length; y > 0; y--) {
        var t = "";
        for (var x = 0; x < game.state.length; x++) {
            t = t.concat(game.state[x][y - 1]);
        }
        console.log(t);
    }
}

var curr_game = new game();

var bot1 = new bot_random();
var bot2 = new bot_random();

while (curr_game.isTerminal() == 0) {
    curr_game.place(gameTurn(curr_game, bot1, bot2));
    curr_game.endTurn();
}

printState(curr_game);
visual(curr_game.state);

if (curr_game.isTerminal() == 4) {
    console.log("no winner");
} else {
    console.log("bot" + curr_game.isTerminal() + " won");
}