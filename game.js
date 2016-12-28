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

    this.player_turn = 1; // 1 = player 1, 2 = player 2
    this.possible_moves = [0, 1, 2, 3, 4, 5, 6]; //col that are not filled
}

game.prototype.place = function(col) {
    /*
    places a piece at column.
    */
    for (var i = 0; i < this.state[col].length; i++) {
        if (this.state[col][i] == 0) {
            this.state[col][i] = this.player_turn;
            break; //do not replace all 0s
        }
    }
    //remove col from possible moves if filled
    if (this.state[col][this.state.length - 1] != 0) this.possible_moves.splice(col, 1);
    
    //should integrate into placing?
    this.endTurn();
}

game.prototype.endTurn = function() {
    if (this.player_turn == 1) this.player_turn = 2;
    else this.player_turn = 1;
}

game.prototype.isTerminal = function() {
    /*
    will check if the game is over (winner or tie)
    
    return 0 if not terminal
    return 1, 2 if player wins (1 for player 1 '')
    return 4 if filled and no winner (tie)
    */
    
    //check for a winner - specific for a 7x6 board

    //check col
    for (var i = 0; i < this.state.length; i++) {
        var t = this.state[i];
        if (t[2] == t[3] && t[2] != 0) {
            //bottom 4 - middle 4 - top 4
            if (t[2] == t[0] && t[2] == t[1]) return t[2];
            if (t[2] == t[1] && t[2] == t[4]) return t[2];
            if (t[2] == t[4] && t[2] == t[5]) return t[2];
        }
    }

    //check row
    for (var j = 0; j < this.state[3].length; j++) {
        if (this.state[3][j] == 0) break;
        var t = this.state[3][j]
        var count = 1;
        var step = 4
        while (step < this.state.length) {
            if (this.state[step][j] == t) {
                count++;
                step++;
            }
            else {
                break;
            }
        }
        step = 2;
        while (step >= 0) {
            if (this.state[step][j] == t) {
                count++;
                step--;
            }
            else {
                break;
            }
        }
        if (count >= 4) return t;
    }

    //check diag slope = 1 (ascending)
    //should work on any board size - brute force
    for(var ii = 0; ii < this.state.length - 3; ii++) {
        inner:
        for (var jj = 0; jj < this.state[ii].length - 3; jj++) {
            var t = this.state;
            if (t[ii][jj] == 0) break;
            for (var kk = 1; kk < 4; kk++) {
                if (t[ii][jj] == t[ii + kk][jj + kk]) {
                    continue;
                } else {
                    continue inner;
                }
            }
            console.log(ii + "," + jj);
            return t[ii][jj];
        }
    }

    //check diag clope = -1 (descending)
    //should work on any board size - brute force
    for(var xx = 0; xx < this.state.length - 3; xx++) {
        inner:
        for (var yy = 3; yy < this.state[xx].length; yy++) {
            var t = this.state;
            if (t[xx][yy] == 0) break;
            for (var kk = 1; kk < 4; kk++) {
                if (t[xx][yy] == t[xx + kk][yy - kk]) {
                    continue;
                } else {
                    continue inner;
                }
            }
            console.log(xx + "," + yy);
            return t[xx][yy];
        }
    }
    
    //check for empty space, if found, game is not terminal
    if (this.possible_moves.length > 0) return 0;
    else return 4;

}
