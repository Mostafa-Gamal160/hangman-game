let letters = "abcdefghijklmnopqrstuvwxyz";

// make array form letter

let letterArray = Array.from(letters);

// handle the letter container

let letterContainer = document.querySelector(".letters");

letterArray.forEach((letter) => {
  // create a span for letter

  let span = document.createElement("span");

  span.className = "letter-box";

  span.id = (`btn-${letter.toUpperCase()}`)

  let text = document.createTextNode(letter);

  span.appendChild(text);
  letterContainer.appendChild(span);
});

// object of words

let words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "mysql",
    "python",
  ],
  movies_serious: [
    "prestige",
    "inception",
    "parasite",
    "interstellar",
    "up",
    "harry potter",
    "godfather",
    "the lord of the rings",
    "game of thrones",
    "breaking bad",
  ],
  people: [
    "albert einstein",
    "alexander",
    "cleopatra",
    "ghandi",
    "mohamed salah",
    "ahmed ezz",
    "naguib sawiris",
  ],
  countries: [
    "syria",
    "palestine",
    "yemen",
    "egypt",
    "bahrain",
    "qatar",
    "KSA",
  ],
};

// random word

let allKeys = Object.keys(words);

let randomPropNum = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNum];
let randomPropValue = words[randomPropName];

let randomValueNum = Math.floor(Math.random() * randomPropValue.length);
let randomValueName = randomPropValue[randomValueNum];

// set category to game info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// access to letter-guess
let letterGuContainer = document.querySelector(".letter-guess");

// make array form the chosen word
let ArrayOfWord = Array.from(randomValueName);

// create a span for guess letters
ArrayOfWord.forEach((letter) => {
  let emptySpan = document.createElement("span");

  // if letter is space
  if (letter === " ") {
    emptySpan.className = "with-space";
  }

  // append span into letter guess container
  letterGuContainer.appendChild(emptySpan);
});

// get guess span
let guessSpans = document.querySelectorAll(".letter-guess span");

// set wrong Attempt
let wordAttempt = 0;

// set correct attempt
let correctAttempt = 0;

// access to the draw
let theDraw = document.querySelector(".hangman-draw");

// handle the clicked letters
document.addEventListener("click", (e) => {
  // define the status
  theStatus = false;

  if (e.target.className == "letter-box") {
    e.target.classList.add("clicked");

    // access to the click letter
    let clickLetter = e.target.innerHTML.toLowerCase();

    // access to the chosen word
    let theChosenWord = Array.from(randomValueName.toLowerCase());

    theChosenWord.forEach((wordLetter, wordIndex) => {
      if (clickLetter == wordLetter) {
        theStatus = true;
        // loop on guess spans
        guessSpans.forEach((span, spanIndex) => {
          if (spanIndex == wordIndex) {
            span.innerHTML = wordLetter.toUpperCase();
          }
        });
      }
    });

    // when clicked letter is wrong
    if (theStatus !== true) {
      wordAttempt++;
      // add class wrong to the hangman-draw
      theDraw.classList.add(`wrong-${wordAttempt}`);

      // add audio of fail
      document.getElementById("fail-button").play();

      if (wordAttempt === 8) {
        // function of popup
        gameOver();

        letterContainer.classList.add("finished");
      }
    } else {
      correctAttempt++;
      document.getElementById("success-button").play();

      if (
        correctAttempt === new Set(randomValueName.replaceAll(" ", "")).size
      ) {
        gameEnd();
      }
    }
  }
});

// set the game over
function gameOver() {
  let popup = document.createElement("div");
  let text = document.createTextNode(
    `Game Over, The Word Is ${randomValueName}`
  );

  popup.append(text);
  document.querySelector(".container").append(popup);

  popup.className = "popup";

  // play audio
  document.getElementById("fail").play();
}

// set the game end
function gameEnd() {
  let popup = document.createElement("div");
  let text = document.createTextNode(
    `Congratulation, You win with ${wordAttempt} Mistakes`
  );

  popup.append(text);
  document.querySelector(".container").append(popup);

  popup.className = "popup";

  // play audio
  document.getElementById("success").play();
}

// handle the keyboard

document.addEventListener("keydown", (eve) => {
  let key = eve.key.toUpperCase();

  let btn = document.getElementById(`btn-${key}`)

  if (btn) {
    btn.click()
  }
});

