//Board does two things:
//  1. Retrieves the current layout of the board and modifies it as necessary
//  2. Provides functions to check if the game is in progress, won, or draw
class Board {
  constructor(){
    //Board starts out empty
    this.layout = ['', '', '', '', '', '', '', '', '']
  }

  //Check if the board is over, whether through winning or draw
  check_for_game_over(){
    return this.check_for_victory() || this.check_for_draw()
  }

  //Check if the board has a winner
  check_for_victory(){
    if (//Check the rows
       (this.layout[0] !== '' && this.layout[0] == this.layout[1] && this.layout[1] == this.layout[2])
    || (this.layout[3] !== '' && this.layout[3] == this.layout[4] && this.layout[4] == this.layout[5])
    || (this.layout[6] !== '' && this.layout[6] == this.layout[7] && this.layout[7] == this.layout[8])
        //Check the columns
    || (this.layout[0] !== '' && this.layout[0] == this.layout[3] && this.layout[3] == this.layout[6])
    || (this.layout[1] !== '' && this.layout[1] == this.layout[4] && this.layout[4] == this.layout[7])
    || (this.layout[2] !== '' && this.layout[2] == this.layout[5] && this.layout[5] == this.layout[8])
        //Check the diagonals
    || (this.layout[0] !== '' && this.layout[0] == this.layout[4] && this.layout[4] == this.layout[8])
    || (this.layout[2] !== '' && this.layout[2] == this.layout[4] && this.layout[4] == this.layout[6]))
    {
      return true
    }
    else {
      return false
    }
  }

  //If the board's full and there's no winner, must be a draw
  check_for_draw(){
    if (this.check_for_victory() === false &&
        this.layout.filter(coordinate=>{return coordinate === ''}).length === 0) {
      return true
    }
    else {
      return false
    }
  }

  //Ids can't be numerical so we have these lovely strings for them instead
  //Takes the place for the current player
  set_space(space, token){
    let ids = ["#first", "#second", "#third", "#fourth", "#fifth", "#sixth", "#seventh", "#eighth", "#ninth"]
    this.layout[space] = token
    $(ids[space])[0].disabled = true
    $(ids[space])[0].innerHTML = token
  }
}
