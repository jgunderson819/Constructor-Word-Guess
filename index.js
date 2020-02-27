const wordGuess = function(array){ 
    const Word = require('./Word');
    const inquirer = require('inquirer');
    const chalk = require('chalk');
    const log = console.log;
    
    let wordBank = array;
    
    let remainingGuesses;
    let correctGuesses;
    let allGuesses;
    let remainingLetters;
    let currentWord;
    const invalidResponse = /[^a-z]/;
    
    function checkRound() {
        if (remainingLetters === 0) {
            for (let e = 0; e < correctGuesses.length; e++) {
                currentWord.checkLetter(correctGuesses[e]);
            };
            log("");
            currentWord.returnString();
            log("")
            wordBank.splice(wordBank.indexOf(currentWord.guessWord), 1);
            log(chalk.green.bold("\nWINNER! WINNER! WINNER! \nYou guessed the word!\n"));
            if (wordBank.length === 0) {
                return endGame();
            }
            startGame();
        } else if (remainingGuesses === 0) {
            log(chalk.red("\nToo many incorrect guesses ") + chalk.red.bold.inverse("GAME OVER!\n"));
            startGame();
        } else {
            playRound();
        }
    };
    
    function startGame() {
        inquirer.prompt([
            {
                name: "start",
                type: "list",
                message: "What would you like to do?",
                choices: ["New Game", "Exit"]
            }
        ])
            .then(answers => {
                if (answers.start === "New Game") {
                    newRound();
                } else {
                    process.exit();
                }
            });
    };
    
    function newRound() {
        currentWord = new Word(wordBank[Math.floor(Math.random() * wordBank.length)]);
        remainingGuesses = 10;
        correctGuesses = [];
        allGuesses = [];
        remainingLetters = currentWord.guessWord.length;
        playRound();
    };
    
    function playRound() {
        if (correctGuesses.length > 0) {
            for (let q = 0; q < correctGuesses.length; q++) {
                currentWord.checkLetter(correctGuesses[q]);
            };
        }
        log("")
        currentWord.returnString();
        log("")
        inquirer
            .prompt([
                {
                    name: "q1",
                    type: "input",
                    message: "Choose a letter",
                    validate: function (input) {
                        if (input.length > 0 && input.length < 2 && !input.match(invalidResponse)) {
                            return true;
                        } else {
                            log (chalk.yellow(" is not a valid response. Please enter one lower case letter"))
                        }
                    }
                }
            ])
            .then(answers => {
                if (!allGuesses.includes(answers.q1)) {
                    if (currentWord.guessWord.includes(answers.q1)) {
                        correctGuesses.push(answers.q1);
                        log(chalk.green("\nCorrect!", answers.q1, "is used to spell this word!\n"));
                        for (let n = 0; n < currentWord.guessWord.length; n++) {
                            if (answers.q1 === currentWord.guessWord[n]) {
                                remainingLetters--;
                            };
                        };
                    } else {
                        remainingGuesses--;
                        if (remainingGuesses > 0) {
                            log(chalk.red("\nIncorrect guess!", answers.q1, "is not used to spell this word. Try again! Remaining Guesses:", remainingGuesses));
                        }
                    }
                    allGuesses.push(answers.q1);
                } else {
                    log(chalk.blue("\nYou already guessed that letter. Guess another letter.\n"));
                }
                checkRound();
            });
    };
    
    function endGame() {
        log(chalk.green.bold.inverse("\nCongratulations! You have correcly guessed all the words!\n"))
    }
    
    log(chalk.blueBright.bold("\n Welcome to Word Guess!\n"));
    startGame();
    } 
    module.exports=wordGuess;
  © 2020 GitHub, Inc.