# Matching Game

A memory card game with a ranking. The player enters a username, matches all 15 pairs, and the result is saved in a database. The 5 best players are shown on the welcome page.

Built with HTML, CSS, JavaScript (Bootstrap), PHP and MongoDB. PHP and MongoDB run in Docker.

## How the game works

- 30 cards (15 letter pairs) are shuffled on a grid.
- The player flips two cards at a time. If they match, they stay open and the score goes up by 1.
- Every pair of flipped cards counts as 1 move.
- A timer runs from the moment the player clicks Start.
- When all pairs are found, the game stops and the result is saved.

**Total score** = `score * 100 - moves * 10`
If two players have the same total, the faster one ranks higher.

## Flow

1. `index.html` shows the top 5 and a Play button.
2. `game.html` asks for a username, then the player plays.
3. At the end, `script.js` sends the username, score, moves and time to PHP.
4. PHP calculates the total and saves it in MongoDB.
5. Back on the welcome page, `ranking.js` loads the top 5 from PHP.

## Project files

```
Matching-Game/
├── Dockerfile
├── compose.yml
├── composer.json
└── src/
    ├── index.html
    ├── game.html
    ├── style.css
    ├── script.js
    ├── ranking.js
    └── api/
        ├── db.php
        ├── scores.php
```

### Docker and dependencies

| File            | What it does                                                                                                                                                      |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Dockerfile`    | Builds the web image: PHP 8.3 with Apache, the MongoDB PHP extension and Composer. It also installs the MongoDB library.                                          |
| `compose.yml`   | Runs two containers: `web` (PHP/Apache on port 8080) and `mongo` (the database). It mounts `src/` into the web container and creates a volume to keep the scores. |
| `composer.json` | Lists the PHP library we need (`mongodb/mongodb`).                                                                                                                |

### Front end (`src/`)

| File         | What it does                                                                                                                     |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `index.html` | Welcome page with the top 5 table and the Play button.                                                                           |
| `game.html`  | The game page: stats, grid, username input, start and end screens.                                                               |
| `style.css`  | Styles for both pages.                                                                                                           |
| `script.js`  | Game logic: creates and shuffles cards, flips and matches them, counts moves, runs the timer, and sends the final result to PHP. |
| `ranking.js` | Fetches the top 5 from PHP and fills the table on the welcome page.                                                              |

### Back end (`src/api/`)

| File         | What it does                                                                                                                                                                                                |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db.php`     | Connects to MongoDB (database `memorygame`, collection `scores`). The other PHP files include it.                                                                                                           |
| `scores.php` | Reads the 5 best scores from MongoDB and sends them to JavaScript as JSON and receives the result from JavaScript, checks the username, calculates the total, saves it in MongoDB and sends the total back. |

## Run the project

You only need Docker installed.

```bash
git clone <your-repo-url>
cd Matching-Game
docker compose up --build
```

Then open http://localhost:8080
