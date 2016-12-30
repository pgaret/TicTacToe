//Board that keeps track of current token (for use in Ai getMove)
class AiBoard extends Board {
  constructor(currentToken){
    super(currentToken)
    currentToken === "X" ? this.token = "O" : this.token = "X"
  }
}
