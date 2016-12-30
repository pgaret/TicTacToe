//Handles AI decision making
class Ai {
  constructor(token){
    //Is the player X or O. Also, indicate this is an AI for the game's reference
    this.token = token
    this.type = "A"
  }

  //Game calls this to initiate the 'find the right move' action
  getMove(board, sum){
    //Checks for required opportunities (situations where there are adjacent same tokens)
    let forced_move = this.checkOpportunities(board.layout)
    if (forced_move){
      return forced_move
    }
    //Otherwise, prep for the recursive Minmax algorithm
    let results = []
    //This is similar to how the algorithm handles things, so more down there
    for (let i = 0; i < board.layout.length; i++){
      if (board.layout[i] === ""){
        //We create a new test board with the same layout, then make our move
        let temp_board = this.token === "X" ? new AiBoard("O") : new AiBoard("X")
        temp_board.layout = $.extend([], board.layout)
        temp_board.layout[i] = temp_board.token
        results.push(this.rootScan(temp_board, 0, 0))
      }
      else {
        //Makes sure that the index of the result number matches the index of the game board
        results.push(-1000000)
      }
    }
    //Often there is more than one equally good answer - randomly picking one
    //makes things a little more interesting
    let max_index = Math.max.apply(null, results)
    let options = []
    for (let i = 0; i < results.length; i++){
      if (results[i] === max_index) {options.push(i)}
    }
    return options[Math.floor(Math.random()*options.length)]
  }

  //Recursive algorithm that returns a value for the given move based on its potential results
  //Called rootScan since it's scanning for the quality of the root options of each move
  rootScan(board, sum, depth){
    //Base case is if the game is over
    if (board.check_for_game_over()){
      if (board.check_for_draw()){
        return 0
      }
      else if (board.check_for_victory() && this.token === board.token){
        //Depth is used to reduce the impact of actions further down the tree on the results
        //This prevents the AI from giving up, so it fights rather than loses outright
        //Would be more useful if the game took partial scenarios
        return 10 - depth
      }
      else {
        return depth - 10
      }
    }
    //Otherwise, we need to keep going deeper
    //For each empty spot, we have a potential move
    else {
      for (let i = 0; i < board.layout.length; i++){
        if (board.layout[i] === ""){
          //We create a new experiment board for each possible move from each player
          let temp_board = new AiBoard(board.token)
          //We use $.extend to clone the layout
          //This prevents changes to the clone from impacting the original
          temp_board.layout = $.extend([], board.layout)
          temp_board.layout[i] = temp_board.token
          //We add the results of each level of scan
          sum += this.rootScan(temp_board, 0, depth+1)
        }
      }
      return sum
    }
  }

  //This allows me to override the scenario when actions need to be forced
  //In situations where there are adjacent same tokens, I already know action needs to be taken
  //This makes sure I win or don't lose -before- I strategize further
  checkOpportunities(board){
    for (let i = 1; i < board.length - 1; i++){
      //Horizontals
      if (i % 3 === 1){
        if (board[i] && board[i] === board[i-1] && !board[i+1]){return i+1}
        if (board[i] && board[i] === board[i+1] && !board[i-1]){return i-1}
      }
      //Verticals
      if (i > 2 && i < 6){
        if (board[i] && board[i] === board[i-3] && !board[i+3]){return i+3}
        if (board[i] && board[i] === board[i+3] && !board[i-3]){return i-3}
      }

    }
    //Diagonals
    if (board[4] !== ''){
      if (board[4] && board[4] === board[0] && !board[8]){return 8}
      if (board[4] && board[4] === board[2] && !board[6]){return 6}
      if (board[4] && board[4] === board[6] && !board[2]){return 2}
      if (board[4] && board[4] === board[8] && !board[0]){return 0}
      if (board[0] && board[8] && !board[4]){return 4}
      if (board[2] && board[6] && !board[4]){return 4}
    }
    return false
  }
}
