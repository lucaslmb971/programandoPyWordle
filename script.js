let attempts = 6;
let dictionary = ['APPLE', 'HURLS', 'WINGS', 'YOUTH'];
let word = getRandomWord();

let guessedWords = [];

window.addEventListener('load', initialize);

function initialize() {
    const button = document.getElementById("guess-button");
    button.addEventListener("click", guess);

    const input = document.getElementById("guess-input");
    input.addEventListener("keydown", function(event) {
        if (event.keyCode === 13) {
            guess();
        }
    });

    updateAttempts();
}

function getRandomWord() {
    return dictionary[Math.floor(Math.random() * dictionary.length)];
}

function guess() {
    const guess = getGuess();
    if (!guess) {
        return;
    }

    if (guessedWords.includes(guess)) {
        showMessage("You already guessed this word, try another one.");
        return;
    }

    guessedWords.push(guess);
    showMessage("");

    if (guess === word) {
        endGame(`<h2>YOU WIN!😀</h2><p>The correct word is: ${word}</p>`);
        return;
    }

    const grid = document.getElementById("grid");
    const row = document.createElement('div');
    row.className = 'row';

    for (let i = 0; i < word.length; i++) {
        const span = document.createElement('span');
        span.className = 'letter';
        if (guess[i] === word[i]) {
            span.innerHTML = guess[i];
            span.style.backgroundColor = '#79b851'; // Green
        } else if (word.includes(guess[i])) {
            span.innerHTML = guess[i];
            span.style.backgroundColor = '#f3c237'; // Yellow
        } else {
            span.innerHTML = guess[i];
            span.style.backgroundColor = '#a4aec4'; // Gray
        }
        row.appendChild(span);
    }

    grid.appendChild(row);
    attempts--;
    updateAttempts();

    if (attempts == 0) {
        endGame(`<h2>GAME OVER!😖</h2><p>The correct word was: ${word}</p>`);
    }
}

function getGuess() {
    let guess = document.getElementById("guess-input").value.toUpperCase();
    if (guess.length !== 5) {
        alert("Please enter a 5-letter word.");
        return "";
    }
    return guess;
}

function updateAttempts() {
    document.getElementById("attempts").innerText = `Attempts Left: ${attempts}`;
}

function endGame(message) {
    const input = document.getElementById("guess-input");
    const button = document.getElementById("guess-button");
    input.disabled = true;
    button.disabled = true;
    let container = document.getElementById('guesses');
    container.innerHTML = message;
}

function showMessage(message) {
    document.getElementById("message").innerText = message;
}
