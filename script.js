let strikeButton = document.getElementById("strike");
let resetButton = document.getElementById("reset");

let scoreTeam1 = document.getElementById("score-team1");
let wicketsTeam1 = document.getElementById("wickets-team1");

let scoreTeam2 = document.getElementById("score-team2");
let wicketsTeam2 = document.getElementById("wickets-team2");

const strikeAudio = new Audio("http://bit.ly/so-ball-hit");
const gameOverAudio = new Audio("http://bit.ly/so-crowd-cheer");

let team1Score = 0;
let team2Score = 0;

let team1Wickets = 0;
let team2Wickets = 0;

let team1Ball = 0;
let team2Ball = 0;

let turn = 1;

let possibleOutcomes = [0, 1, 2, 3, 4, 6, "W"];

function updateScore() {
  scoreTeam1.textContent = team1Score;
  wicketsTeam1.textContent = team1Wickets;
  scoreTeam2.textContent = team2Score;
  wicketsTeam2.textContent = team2Wickets;
}

function gameOver() {
  gameOverAudio.play();
  if (team1Score > team2Score) alert("Team one won");
  if (team2Score > team1Score) alert("Team two won");
  if (team1Score == team2Score) alert("Draw match");
}

function resetGame() {
  window.location.reload();
}

resetButton.addEventListener("click", function () {
  resetGame();
});

function strikeButtonFunction() {
  strikeAudio.play();
  let randomElement =
    possibleOutcomes[Math.floor(Math.random() * possibleOutcomes.length)];

  if (turn === 1) {
    team1Ball++;

    document.querySelector(
      `#team1-superover div:nth-child(${team1Ball})`
    ).textContent = randomElement;

    if (randomElement === "W") {
      team1Wickets++;
    } else {
      team2Score += randomElement;
    }

    if (team2Ball === 6 || team2Wickets === 2) {
      turn = 2;
    }
  }

  if (turn === 2) {
    team2Ball++;
    document.querySelector(
      `#team2-superover div:nth-child(${team2Ball})`
    ).textContent = randomElement;

    if (randomElement == "W") {
      team2Wickets++;
    } else {
      team2Score += randomElement;
    }

    if (team2Ball === 6 || team2Wickets === 2 || team2Score > team1Score) {
      turn = 3;
      gameOver();
    }
  }
  updateScore();
}

strikeButton.addEventListener("click", function () {
  strikeButtonFunction();
});
