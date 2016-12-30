class Ai {
  constructor(token, which_player){
    this.token = token
    this.token === "X" ? this.other_token = "O" : this.other_token = "X"
    this.current_token = token
    this.type = "A"
    this.which_player = which_player
  }

  getMove(board, sum){
    let results = []
    for (let i = 0; i < board.layout.length; i++){
      if (board.layout[i] === ""){
        let temp_board = new AiBoard(this.other_token)
        temp_board.layout = $.extend([], board.layout)
        temp_board.layout[i] = temp_board.token
        results.push(this.rootScan(temp_board, 0))
      }
      else {
        results.push(-1000000)
      }
    }
    // debugger
    let move = results.indexOf(Math.max.apply(null, results))
    console.log(move+" "+results)
    return move
  }

  rootScan(board, sum){
    if (board.check_for_game_over()){
      if (board.check_for_draw()){
        return 0
      }
      else if (board.check_for_victory() && this.token === board.token){
        return 10
      }
      else {
        return -10
      }
    }
    else {
      for (let i = 0; i < board.layout.length; i++){
        if (board.layout[i] === ""){
          let temp_board = new AiBoard(board.token)
          temp_board.layout = $.extend([], board.layout)
          temp_board.layout[i] = temp_board.token
          sum += this.rootScan(temp_board, 0)
        }
      }
      return sum
    }
  }
}
