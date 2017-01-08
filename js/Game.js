//The game's controller
class Game {
  constructor(type){
    // debugger
    //Basic setup - make a new board, we're not yet paused, and game type for future reference
    this.board = new Board()
    this.paused = false
    this.game_type = type
    //The future is now - need to create Humans or Ais based on game type
    if (type==="HvH"){
      this.player1 = new Human("X")
      this.player2 = new Human("O")
    }
    else if (type==="HvA"){
      //Radio buttons for the human being player 1 or player 2
      //Defaults to human being player 1
      if ($("input[name='player']:checked")[0].value === "player1"){
        this.player1 = new Human("X")
        this.player2 = new Ai("O")
      }
      else {
        this.player1 = new Ai("X")
        this.player2 = new Human("O")
      }
      $("#HVA").css("display", "block")
    }
    else if (type==="AvA") {
      //AI vs AI - we need to disable all the game buttons and enable pausing
      this.player1 = new Ai("X")
      this.player2 = new Ai("O")
      let buttons = $(".game_grid")[0].children
      for (let i = 0; i < buttons.length; i++){buttons[i].disabled = true}
      $("#pause_button").css("display", "block")
    }
    else {
      this.player1 = new Human("X")
      this.player2 = new Ai("O")
      let results = []
      this.current_player = this.player1
      this.testAIP1(this.board, results)
      console.log("AI (P1): "+results[1]+" Human: "+results[2]+" Draw: "+results[0])
      // console.log(results)
      results = []
      this.testAIP2(this.board, results)
      // console.log(results)
      console.log("AI (P2): "+results[2]+" Human: "+results[1]+" Draw: "+results[0])
    }

    this.current_player = this.player1
    //Let's start this game!
    if (this.player1.type === "A" && this.type !== "Test"){
      setTimeout(()=>{this.takeTurn(this.current_player.getMove(this.board, 0, this.current_player.token)[1]), 1})
    }
  }

  takeTurn(space){
    //Check if we're paused, if so take a moment and check again
    // debugger
    if (this.paused === true){
      setTimeout(()=>{this.takeTurn(space)}, 1)
    }
    //Otherwise, typical TTT - make move, check for game ending
    else {
      this.board.set_space(space, this.current_player.token)
      if (this.board.check_for_game_over()){
        this.handleEnding()
      }
      //If we're AI vs AI, slow things down a tad so the user can actually watch the moves happen
      else {
        this.game_type === "AvA" ? setTimeout(()=>{this.switchPlayer()}, 500) : this.switchPlayer()
      }
    }
  }

  switchPlayer(){
    // After a turn has been taken, switch the current_player
    if (this.current_player === this.player1) {
      this.current_player = this.player2
    }
    else {
      this.current_player = this.player1
    }
    if (this.current_player.type === 'A'){
      // debugger
      this.takeTurn(this.current_player.getMove(this.board, 0, this.current_player.token)[1])
    }
  }

  handleEnding(){
    //Mostly, show results and hide in-game options
    $("#results_page").css("display", "block")
    $("#pause_button").css("display", "none")
    $("#HVA").css("display", "none")
    //If there was a victor, congratulate them. Otherwise don't.
    if (this.board.check_for_victory()){
      $("#result").text(this.current_player.token+" wins!")
    }
    else {
      $("#result").text("Tie game!")
    }
  }

  testAIP1(board, results){
    if (board.check_for_game_over()){
      // Base case
    }
    else {
      let p1_temp_board = new Board()
      p1_temp_board.layout = $.extend([], board.layout)
      p1_temp_board.layout[this.player2.getMove(p1_temp_board, 0, "X")[1]] = "X"
      if (p1_temp_board.check_for_game_over()) {
        if (p1_temp_board.check_for_victory()){
          results[1] ? results[1]++ : results[1] = 1
        } else {
          results[0] ? results[0]++ : results[0] = 1
        }
      }
      else {
        for (let i = 0; i < p1_temp_board.layout.length; i++){
          if (p1_temp_board.layout[i] === ""){
            let p2_temp_board = new Board()
            p2_temp_board.layout = $.extend([], p1_temp_board.layout)
            p2_temp_board.layout[i] = "O"
            if (p2_temp_board.check_for_game_over()) {
              if (p2_temp_board.check_for_victory()){
                results[2] ? results[2]++ : results[2] = 1
              } else {
                results[0] ? results[0]++ : results[0] = 1
              }
            }
            else {
              this.testAIP1(p2_temp_board, results)
            }
          }
        }
      }
    }
  }

  testAIP2(board, results){
    if (board.check_for_game_over()){
      // Base case
    }
    else {
      for (let i = 0; i < this.board.layout.length; i++){
        if (board.layout[i] === ""){
          let temp_board = new Board()
          temp_board.layout = $.extend([], board.layout)
          temp_board.layout[i] = "X"
          if (temp_board.check_for_game_over()) {
            if (temp_board.check_for_victory()){
              results[1] ? results[1]++ : results[1] = 1
            } else {
              results[0] ? results[0]++ : results[0] = 1
            }
          }
          else {
            temp_board.layout[this.player2.getMove(temp_board, 0, "O")[1]] = "O"
            if (temp_board.check_for_game_over()) {
              if (temp_board.check_for_victory()){
                results[2] ? results[2]++ : results[2] = 1
              } else {
                results[0] ? results[0]++ : results[0] = 1
              }
            }
            else {
              this.testAIP2(temp_board, results)
            }
          }
        }
      }
    }
  }


}
