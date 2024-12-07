class BingoGame {
  constructor(numbers = 90) {
    this.maxNumber = numbers;
    this.calledNumbers = new Set();
  }

  callNumber() {
    if (this.calledNumbers.size >= this.maxNumber) {
      console.error("All numbers have been called.");
      return;
    }

    let number;
    do {
      number = Math.floor(Math.random() * this.maxNumber) + 1;
    } while (this.calledNumbers.has(number));

    this.calledNumbers.add(number);

    return number;
  }

  reset() {
    this.calledNumbers = new Set();
  }

  hasEnded() {
    return this.calledNumbers.size === this.maxNumber;
  }

  boardHasRow(board) {
    for (let row of board) {
      if (row.every((cell) => this.calledNumbers.has(cell) || cell === "")) {
        return true;
      }
    }
    return false;
  }

  boardHasBingo(board) {
    for (let row of board) {
      for (let cell of row) {
        if (cell !== "" && !this.calledNumbers.has(cell)) {
          return false;
        }
      }
    }
    return true;
  }

  getLastCalledNumber() {
    let value;
    for (value of this.calledNumbers);
    return value;
  }

  toSerializable() {
    return {
      maxNumber: this.maxNumber,
      calledNumbers: Array.from(this.calledNumbers),
    };
  }

  static fromSerializable(serializedData) {
    const game = new BingoGame(serializedData.maxNumber);
    game.calledNumbers = new Set(serializedData.calledNumbers);
    return game;
  }
}

export default BingoGame;
