class Ai {
  constructor(token, which_player){
    this.token = token
    this.token === "X" ? this.other_token = "O" : this.other_token = "X"
    this.current_token = token
    this.type = "A"
    this.which_player = which_player
  }

  getMove(board, sum){
    let forced_move = this.checkOpportunities(board.layout)
    if (forced_move){
      return forced_move
    }
    let results = []
    for (let i = 0; i < board.layout.length; i++){
      if (board.layout[i] === ""){
        let temp_board = new AiBoard(this.other_token)
        temp_board.layout = $.extend([], board.layout)
        temp_board.layout[i] = temp_board.token
        results.push(this.rootScan(temp_board, 0, 0))
      }
      else {
        results.push(-1000000)
      }
    }
    let min_index = Math.max.apply(null, results)
    let options = []
    for (let i = 0; i < results.length; i++){
      if (results[i] === min_index) {options.push(i)}
    }
    return options[Math.floor(Math.random()*options.length)]
  }

  rootScan(board, sum, depth){
    if (board.check_for_game_over()){
      if (board.check_for_draw()){
        // console.log("tie "+board.layout+" "+0)
        return 0
      }
      else if (board.check_for_victory() && this.token === board.token){
        // console.log("win "+board.layout+" "+(10-depth))
        return 10 - depth
      }
      else {
        // console.log("loss "+board.layout+" "+(depth-10))
        return depth - 10
      }
    }
    else {
      for (let i = 0; i < board.layout.length; i++){
        if (board.layout[i] === ""){
          let temp_board = new AiBoard(board.token)
          temp_board.layout = $.extend([], board.layout)
          temp_board.layout[i] = temp_board.token
          sum += this.rootScan(temp_board, 0, depth+1)
        }
      }
      return sum
    }
  }

  checkOpportunities(board){
    for (let i = 1; i < board.length - 1; i++){
      if (i % 3 === 1){
        if (board[i] && board[i] === board[i-1] && !board[i+1]){return i+1}
        if (board[i] && board[i] === board[i+1] && !board[i-1]){return i-1}
      }
      if (i > 2 && i < 6){
        if (board[i] && board[i] === board[i-3] && !board[i+3]){return i+3}
        if (board[i] && board[i] === board[i+3] && !board[i-3]){return i-3}
      }

    }
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
