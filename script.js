const grid = document.getElementById("grid");

const startOverlay = document.getElementById("startOverlay");
const startButton = document.getElementById("startButton");

// variables score and moves
let score = document.getElementById("score");
let moves = document.getElementById("moves");

// select timer
const timerDisplay = document.getElementById("timer");
let secondsElapsed = 0;
let timerInterval = null;
// array of letters
const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
];

// two variables to store clicked cards
let firstCard = null;
let secondCard = null;

document.body.style.overflow = "hidden";
startButton.addEventListener("click", () => {
  startOverlay.style.display = "none";
  document.body.style.overflow = "";

  startTimer();
});
// function that insert cards inbside grid container
function insertCards() {
  let cardsHTML = "";
  const card = ` <div class="col">
      <div class="card ratio ratio-1x1 bg-green">
        <div class="card-body d-flex align-items-center justify-content-center">
          
        </div>
      </div>
    </div>`;

  for (let i = 0; i < 30; i++) {
    cardsHTML += card;
  }
  grid.innerHTML = cardsHTML;

  const cards = shuffleArray(letters);
  const cardElements = grid.querySelectorAll(".card-body");
  cardElements.forEach((card, index) => {
    card.textContent = cards[index];
  });
}

// function that flips a card when clicked
grid.addEventListener("click", (event) => {
  const card = event.target.closest(".card"); // select clicked card

  // validate
  if (!card || !grid.contains(card)) return;

  // check if second card already clicked to not click more
  if (secondCard) return;
  if (card.classList.contains("froze")) return;
  // prevent clicking same card
  if (card === firstCard) return;

  card.classList.add("flipped"); // add class to the card
  // if first card not selected yet
  if (firstCard === null) {
    firstCard = card;
  } else {
    secondCard = card;
    moves.textContent++; // increase moves

    // check if first card and second are same
    if (firstCard.textContent === secondCard.textContent) {
      // add a class
      firstCard.classList.add("froze");
      secondCard.classList.add("froze");

      // keep them flipped
      firstCard = null;
      secondCard = null;
      score.textContent++; // increase score
    }
    // after 3s remove the flipped class
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");

      // reset cards
      firstCard = null;
      secondCard = null;
    }, 1000);
  }
});

/**
 * function that takes the array, duplicate it
 * shuffle it and return new array
 */

function shuffleArray(array) {
  const duplicated = [...array, ...array]; // duplicate the array in new array

  // initialize variables
  let i = duplicated.length,
    j,
    temp;

  while (--i > 0) {
    j = Math.floor(Math.random() * (i + 1));

    temp = duplicated[j];

    duplicated[j] = duplicated[i];

    duplicated[i] = temp;
  }
  return duplicated;
}

function updateTimer() {
  secondsElapsed++;

  const minutes = Math.floor(secondsElapsed / 60);
  const seconds = secondsElapsed % 60;

  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
function startTimer() {
  if (timerInterval !== null) return;

  timerInterval = setInterval(updateTimer, 1000);
}

insertCards();
