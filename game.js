/*
Connect 4 game class.

shows game state and handles winning and placing markers.

check if game has ended
*/

var game = function() {
    //col# = left->right; Bottom = first
    this.state = [[0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]];

    //start at player 1
    this.player_turn = 1; // 1 = player 1, 2 = player 2
    this.possible_moves = [0, 1, 2, 3, 4, 5, 6]; //col that are not filled (left to right)
}

game.prototype.place = function(col) {
    /*
    core game method - does NOT end turn
    
    game logic for winning and losing should be handled in core game loop, not method
    */
    
    //places current player turn at column col
    for (var i = 0; i < this.state[col].length; i++) {
        if (this.state[col][i] == 0) {
            this.state[col][i] = this.player_turn;
            break; //do not replace all 0s
        }
    }
    
    //remove col from possible moves if filled
    if (this.state[col][this.state.length - 1] != 0){
        //find a better way to do this
        for (var j = 0; j < this.possible_moves.length; j++) {
            if (this.possible_moves[j] == col) {
                this.possible_moves.splice(j, 1);
                break;
            }
        }
    }
}

game.prototype.endTurn = function() {
    /*
    switches between player 1 and 2
    */
    if (this.player_turn == 1) this.player_turn = 2;
    else this.player_turn = 1;
}

game.prototype.checkCol = function() {
    /*
    checks for a win in a column, returns player that won. return 0 if none are found
    */
    for (var i = 0; i < this.state.length; i++) {
        var t = this.state[i];
        if (t[2] == t[3] && t[2] != 0) {
            //bottom 4 - middle 4 - top 4
            if (t[2] == t[0] && t[2] == t[1]) return t[2];
            if (t[2] == t[1] && t[2] == t[4]) return t[2];
            if (t[2] == t[4] && t[2] == t[5]) return t[2];
        }
    }
}

game.prototype.checkRow = function() {
    /*
    checks for a win in a row, returns player that won. return 0 if none are found
    */
    for (var i = 0; i < this.state[3].length; i++) {
        if (this.state[3][i] == 0) break;
        var t = this.state[3][i]
        var count = 1;
        var step = 4
        while (step < this.state.length) {
            if (this.state[step][i] == t) {
                count++;
                step++;
            }
            else {
                break;
            }
        }
        step = 2;
        while (step >= 0) {
            if (this.state[step][i] == t) {
                count++;
                step--;
            }
            else {
                break;
            }
        }
        if (count >= 4) return t;
    }
}

game.prototype.checkDiagAsc = function() {
    /*
    checks for a winner in an ascending diagonal
       *
      *
     *
    *
    if no winner is founds, return 0
    
    this is a brute force, so it should work on any board size
    */
    for(var i = 0; i < this.state.length - 3; i++) {
        inner:
        for (var j = 0; j < this.state[i].length - 3; j++) {
            var t = this.state;
            if (t[i][j] == 0) break;
            for (var k = 1; k < 4; k++) {
                if (t[i][j] == t[i + k][j + k]) {
                    continue;
                } else {
                    continue inner;
                }
            }
            console.log(i + "," + j);
            return t[i][j];
        }
    }
}

game.prototype.checkDiagDes = function() {
    /*
    checks for a winner in a descending diagonal
    *
     *
      *
       *
    if no winner is founds, return 0
    
    this is a brute force, so it should work on any board size
    */
    for(var i = 0; i < this.state.length - 3; i++) {
        inner:
        for (var j = 3; j < this.state[i].length; j++) {
            var t = this.state;
            if (t[i][j] == 0) break;
            for (var k = 1; k < 4; k++) {
                if (t[i][j] == t[i + k][j - k]) {
                    continue;
                } else {
                    continue inner;
                }
            }
            console.log(i + "," + j);
            return t[i][j];
        }
    }
}

game.prototype.isTerminal = function() {
    /*
    will check if the game is over (winner or tie)
    
    return 0 if not terminal
    return 1, 2 if player wins (1 for player 1 '')
    return 4 if filled and no winner (tie)
    */
    
    //check for a winner - specific for a 7x6 board
    if (this.checkCol() != 0) return this.checkCol();
    if (this.checkRow() != 0) return this.checkRow();
    if (this.checkDiagAsc != 0) return this.checkDiagAsc();
    if (this.checkDiagDes != 0) return this.checkDiagDes();
    
    //check for empty space, if found, game is not terminal
    if (this.possible_moves.length > 0) return 0;
    else return 4;
}