class AiBoard extends Board {
  constructor(currentToken){
    super(currentToken)
    currentToken === "X" ? this.token = "O" : this.token = "X"
  }
}
