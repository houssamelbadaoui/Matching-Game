const grid = document.getElementById("grid");
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

  // prevent clicking same card
  if (card === firstCard) return;
  card.classList.add("flipped"); // add class to the card
  // if first card not selected yet
  if (firstCard === null) {
    firstCard = card;
  } else {
    secondCard = card;

    // after 3s remove the flipped class
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");

      // reset cards
      firstCard = null;
      secondCard = null;
    }, 2000);
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

insertCards();
