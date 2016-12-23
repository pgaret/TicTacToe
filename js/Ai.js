class Ai {
  constructor(token, which_player){
    this.token = token
    this.token === "X" ? this.other_token = "O" : this.other_token = "X"
    this.current_token = token
    this.type = "A"
    this.which_player = which_player
  }

//  AI Steps
//  1. Identify a space that has not been taken
//  2. Try moving into that space
//  3. Pass board back to self
//  4. Repeat steps 1 - 3 until game over
//  5. Add or subtract 10 to score of this move

//  Notes
//  Need to collect all scores for a given root move

  makeMove(board){
    let results = []
    // debugger
    this.current_player = this
    let test_board = []
    for (let i = 0; i < board.length; i++){test_board.push(board[i])}
    // debugger
    for (let i = 0; i < test_board.length; i++){
      // debugger
      if (test_board[i] === ''){
        test_board[i] = this.current_token
        this.switchPlayer()
        console.log(this.rootScan(test_board, 0))
        // debugger
        results.push(this.rootScan(test_board, 0))
      }
    }
    console.log(results)
  }

  rootScan(board, sum){
    if (this.check_for_game_over(board)){
      // debugger
      console.log(board)
      if (this.check_for_draw(board)){
        console.log("+0")
        return sum
      }
      else if(this.check_for_victory(board)){
        if (this.current_player === this){
          console.log("+10")
          return sum + 10
        }
        else {
          console.log("-10")
          return sum - 10
        }
      }
    }
    else {
      let test_board = []
      for (let i = 0; i < board.length; i++){test_board.push(board)}
      for (let i = 0; i < test_board.length; i++){
        if (test_board[i] === ''){
          test_board[i] = this.current_token
          this.switchPlayer()
          sum += this.rootScan(test_board, sum)
        }
      }
      return sum
    }
  }

  switchPlayer(){
    // debugger
    this.current_player === this ? this.current_player = "nope" : this.current_player = this
    this.current_player === this ? this.current_token = this.token : this.current_token = this.other_token
    // debugger
  }

  //Check if the board is over, whether through winning or draw
  check_for_game_over(board){
    return this.check_for_victory(board) || this.check_for_draw(board)
  }

  //Check if the board has a winner
  check_for_victory(board){
    if (//Check the rows
       (board[0] !== '' && board[0] == board[1] && board[1] == board[2])
    || (board[3] !== '' && board[3] == board[4] && board[4] == board[5])
    || (board[6] !== '' && board[6] == board[7] && board[7] == board[8])
        //Check the columns
    || (board[0] !== '' && board[0] == board[3] && board[3] == board[6])
    || (board[1] !== '' && board[1] == board[4] && board[4] == board[7])
    || (board[2] !== '' && board[2] == board[5] && board[5] == board[8])
        //Check the diagonals
    || (board[0] !== '' && board[0] == board[4] && board[4] == board[8])
    || (board[2] !== '' && board[2] == board[4] && board[4] == board[6])){
      return true
    }
    else {
      return false
    }
  }
  check_for_draw(board){
    if (this.check_for_victory(board) === false &&
        board.filter(coordinate=>{return coordinate === ''}).length === 0) {
      return true
    }
    else {
      return false
    }
  }

}
