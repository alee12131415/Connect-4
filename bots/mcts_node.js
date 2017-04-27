var mcts_node = function(parent = null, parent_action = null, moves = []) {
    this.parent = parent;
    this.parent_action = parent_action;
    this.moves = moves;
    
    this.wins = 0;
    this.visits = 0;
}