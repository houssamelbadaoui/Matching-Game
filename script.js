const grid = document.getElementById("grid");

// function that insert cards inbside grid container
function insertCards() {
  let cardsHTML = "";
  const card = `<div class="col"> 
                        <div class="card p-1 shadow-sm bg-green ratio ratio-1x1"></div>
                </div>`;

  for (let i = 0; i < 30; i++) {
    cardsHTML += card;
  }
  grid.innerHTML = cardsHTML;
}

insertCards();
