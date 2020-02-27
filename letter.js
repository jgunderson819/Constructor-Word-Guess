// constructor for letters
let Letter = function (string) {
    this.string = string;
    this.boolean = false;
};

Letter.prototype.guessed = function () {
    if (this.boolean === true){
        return this.string;
    } else {
        return "_";
    }
};

Letter.prototype.takeCharacter = function(character) {
    if (character === this.string){
        this.boolean = true;
    }
}

module.exports = Letter;


  