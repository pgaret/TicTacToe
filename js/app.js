//Creates and runs the game based on user input

var game

function setupGame(gameType){
  game = new Game(gameType)
  $("#main_menu").css("display", "none")
  $("#game_page").css("display", "block")
}

function playMove(space){
  game.takeTurn(space)
}

function playAgain(){
  resetBoard()
  game = new Game(game.game_type)
  $("#results_page").css("display", "none")
  $("#game_page").css("display", "block")
}

function resetBoard(){
  for (let i = 0; i < 9; i++){
    $("."+i)[0].disabled = false
    $("."+i)[0].innerHTML = '&nbsp'
  }
}

function mainMenu(){
  $("#main_menu").css("display", "block")
  $("#game_page").css("display", "none")
  $("#results_page").css("display", "none")
  resetBoard()
}
