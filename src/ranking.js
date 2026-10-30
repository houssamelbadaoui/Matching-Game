const rankingBody = document.getElementById("rankingBody");

function formatTime(totalSeconds) {
  const m = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

// fucntion to get top 5 players
async function loadRanking() {
  try {
    const response = await fetch("api/scores.php");
    const players = await response.json();

    rankingBody.innerHTML = "";

    // if player list empty
    if (players.length === 0) {
      rankingBody.innerHTML =
        '<tr><td colspan="5">No players yet. Be the first!</td></tr>';
      return;
    }

    players.forEach((player, index) => {
      const row = document.createElement("tr");
      const values = [
        index + 1,
        player.username,
        player.total,
        player.moves,
        formatTime(player.time),
      ];

      values.forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
      });

      rankingBody.appendChild(row);
    });
  } catch (error) {
    rankingBody.innerHTML =
      '<tr><td colspan="5">Could not load the ranking.</td></tr>';
  }
}

loadRanking();