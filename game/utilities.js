function copyGame(game) {
    //because = gives variables same identity in js
    
    //used to create a copy of the game that isnt the game... if that makes sense
    var t = new game();
    t.state = game.state;
    t.player_turn = game.player_turn;
    t.possible_moves = game.possible_moves;
    return t;
}