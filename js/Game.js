class Game {
  constructor(type){
    this.board = new Board()
    this.game_type = type
    if (type==="HvH"){
      this.player1 = new Human("X", "Player 1")
      this.player2 = new Human("O", "Player 2")
    }
    else if (type==="HvA"){
      this.player1 = new Ai("X")
      this.player2 = new Human("O")
      this.player1.makeMove(this.board.layout)
    }
    else {
      this.player1 = new Ai("X")
      this.player2 = new Ai("O")
      this.player1.makeMove(this)
    }
    this.current_player = this.player1
  }

  takeTurn(space){
    if (this.board.is_space_valid(space)){
      this.board.set_space(space, this.current_player.token)
      if (this.board.check_for_game_over()){
        this.handleEnding()
      }
      else {
        this.switchPlayer()
      }
    }
  }

  switchPlayer(){
    if (this.current_player === this.player1) {
      this.current_player = this.player2
    }
    else {
      this.current_player = this.player1
    }
    if (this.current_player.type === 'A'){
      // this.current_player.makeMove(this)
    }
  }

  handleEnding(){
    $("#game_page").css("display", "none")
    $("#results_page").css("display", "block")
    if (this.board.check_for_victory()){
      $("#result").text(this.current_player.which_player+" wins!")
    }
    else {
      $("#result").text("Tie game!")
    }
  }

}
