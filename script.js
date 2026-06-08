let randomNumber = Number.parseInt(Math.random() * 100 + 1);

const submitButton = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.result');

const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;
let playGame = true;

if (playGame) {
  submitButton.addEventListener('click', function (e) {
    e.preventDefault();
    const guess = Number.parseInt(userInput.value);
    validateGuess(guess);
  });

  // ENTER KEY SUPPORT
  userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      const guess = Number.parseInt(userInput.value);
      validateGuess(guess);
    }
  });
}

function validateGuess(guess) {
  if (Number.isNaN(guess)) {
    alert('Please enter a valid number');
  } else if (guess < 1) {
    alert('Please enter number more than 1');
  } else if (guess > 100) {
    alert('Please enter number less than 100');
  } else {
    prevGuess.push(guess);
    if (numGuess === 10) {
      displayGuess(guess);
      displayMessage(` Game Over! Random number was ${randomNumber}`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}
function checkGuess(guess) {
  console.log("Random:", randomNumber);
  console.log("Guess:", guess);
  if (guess === randomNumber) {
    displayMessage('🎉 Correct Guess');
    endGame();
  } else if (guess > randomNumber) {
    displayMessage(' Number is TOO HIGH');
  } else {
    displayMessage(' Number is TOO LOW');
  }
}

function displayGuess(guess) {
  userInput.value = '';
  guessSlot.innerHTML += `${guess} `;
  numGuess++;
  remaining.innerHTML = `${10 - numGuess + 1}`;
}

function displayMessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
  userInput.value = '';
  userInput.setAttribute('disabled', '');
  p.classList.add('button');
  p.innerHTML = `<h2 id="newGame">Start New Game</h2>`;
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  const newGameButton = document.querySelector('#newGame');
  newGameButton.addEventListener('click', function () {
    randomNumber = Number.parseInt(Math.random() * 100 + 1);
    prevGuess = [];
    numGuess = 1;
    guessSlot.innerHTML = '';
    remaining.innerHTML = '10';
    lowOrHi.innerHTML = '';
    userInput.removeAttribute('disabled');
    p.remove();
    playGame = true;
  });
}