//Handles AI decision making
class Ai {
  constructor(token){
    //Is the player X or O. Also, indicate this is an AI for the game's reference
    this.token = token
    this.type = "A"
    this.numNodes = 0
  }

  //Game calls this to initiate the 'find the right move' action
  getMove(board, depth, current_token){
    // debugger
    let other_token = current_token === "X" ? "O" : "X"
    this.numNodes += 1
    //Base case is if the game is over
    if (board.check_for_game_over()){
      // debugger
      if (board.check_for_draw()){
        return [0, "draw"]
      }
      else if (board.check_for_victory() && this.token === other_token){
        return [10, "win"]
      }
      else {
        return [-10, "loss"]
      }
    }
    let nextVal = null
    let nextIndex = null
    for (let i = 0; i < board.layout.length; i++){
      if (board.layout[i] === ""){
        //We create a new test board with the same layout, then make our move
        let temp_board = new Board()
        temp_board.layout = $.extend([], board.layout)
        temp_board.layout[i] = current_token
        let value = this.getMove(temp_board, depth+1, other_token)[0]
        if ((this.token === current_token && (nextVal === null || value > nextVal)) ||
              (this.token !== current_token && (nextVal === null || value < nextVal))){
                nextIndex = i
                nextVal = value
              }
      }
    }
    return [nextVal, nextIndex]
  }
}
