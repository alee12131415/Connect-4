var bot_mcts_vanilla = function() {    
    var num_nodes = 1000; //number of simulations to run
    var explore_faction = 2; //ideally 2 -- more to explore, less to exploit.. i think
    
    this.run = function(game) {
        var identity = game.player_turn;
        var root = new mcts_node(null, null, game.possible_moves);
        
        for (var i = 0; i < this.num_nodes; i++) {
            //copy game
            var temp_game = copyGame(game);
            
            //start at root
            var node = root;
            
            //mcts
            //selection
            node = this.traverse(node, temp_game, identity);
            //expansion
            
            
        }
    }
    
}