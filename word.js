const Letter = require('./Letter')

let Word = function (guessWord) {
    this.guessWord = guessWord;
    this.array = [];
    for (let i = 0; i < guessWord.length; i++) {
        this.array.push(new Letter(guessWord[i]));
    }
}

Word.prototype.returnString = function () {
    let secondArray = [];
    for (let g = 0; g < this.array.length; g++) {
        secondArray.push(this.array[g].guessed());
    }
    console.log(secondArray.join(" "))
};

Word.prototype.checkLetter = function (any) {
    for (let h = 0; h < this.array.length; h++) {
        this.array[h].takeCharacter(any);
    }
}

module.exports = Word;