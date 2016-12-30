//The game's controller
class Game {
  constructor(type){
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
    else {
      //AI vs AI - we need to disable all the game buttons and enable pausing
      this.player1 = new Ai("X")
      this.player2 = new Ai("O")
      let buttons = $(".game_grid")[0].children
      for (let i = 0; i < buttons.length; i++){buttons[i].disabled = true}
      $("#pause_button").css("display", "block")
    }

    this.current_player = this.player1
    //Let's start this game!
    if (this.player1.type === "A"){
      setTimeout(()=>{this.takeTurn(this.current_player.getMove(this.board)), 1})
    }
  }

  takeTurn(space){
    //Check if we're paused, if so take a moment and check again
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
      this.takeTurn(this.current_player.getMove(this.board))
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

}
