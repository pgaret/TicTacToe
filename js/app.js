//Creates and runs the game based on user input

var game

function setupGame(gameType){
  game = new Game(gameType)
  $("#main_menu").css("display", "none")
  if (gameType !== "Test"){
    $("#game_page").css("display", "block")
    $("#results_page").css("display", "none")
    $("#testResults").css("display", "none")
  } else {
    $("#testResults").css("display", "block")
  }
  if (gameType !== "AvA") {$("#pause_button").css("display", "none")}
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
  $("#pause_button").visibility = "hidden"
  $("#HVA").css("display", "none")
}

function mainMenu(){
  $("#main_menu").css("display", "block")
  $("#game_page").css("display", "none")
  $("#results_page").css("display", "none")
  $("#testResults").empty().css("display", "none").append("<button onClick='mainMenu()'>Main Menu</button>")
  resetBoard()
}

function pauseGame(){
  game.paused = !game.paused
}

function switchMode(event){
  playAgain()
}
