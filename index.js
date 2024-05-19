const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  attempts++;

  hideAllMessages();

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.textContent = `You made ${attempts} guesses`;

    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;

  } else {
    if (guess < targetNumber) {         //Bug 1: inncorrect if else
      tooLowMessage.style.display = ''; // Bug 2: Incorrect message display for too low guess
    } else {
      //changed to High
      tooHighMessage.style.display = '';// Bug 3: Incorrect message display for too high guess
    }  
  
    const remainingAttempts = maxNumberOfAttempts - attempts;

    //Numbers displaying
    numberOfGuessesMessage.style.display = '';
    //Bug 4:  deleted <br> // Changed to textContent
    numberOfGuessesMessage.textContent = `You guessed ${guess}. ${remainingAttempts} guesses remaining`;
  }

  //Disable the submit button
  if (attempts === maxNumberOfAttempts) { //Bug 5: extra equal mark
    submitButton.disabled = true;
    guessInput.disabled = true;
    //added message
    maxGuessesMessage.style.display = '';// Bug 6: Max guesses message not displayed
  }

  guessInput.value = '';

  resetButton.style.display = '';
}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  attempts = 0;
  // Reset number of attempts
  //maxNumberOfAttempts = 5;  //Bug 7: reassigning the const variable 

  // Enable the input and submit button
  submitButton.disabled = false; //Bug 8:  Corrected spelling of disabled
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';

  // Reset the form to its initial state
  //guessInput.value = ''; // Clear the input field

}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();
