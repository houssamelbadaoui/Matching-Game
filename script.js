const grid = document.getElementById("grid");

// two variables to store clicked cards
let firstCard = null;
let secondCard = null;

// function that insert cards inbside grid container
function insertCards() {
  let cardsHTML = "";
  const card = `<div class="col"> 
                        <div  class="card p-1 shadow-sm bg-green ratio ratio-1x1"></div>
                </div>`;

  for (let i = 0; i < 30; i++) {
    cardsHTML += card;
  }
  grid.innerHTML = cardsHTML;
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

insertCards();
