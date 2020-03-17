const gameCards = document.querySelectorAll(".game-card");
let numCards = gameCards.length,
  currentScore = 0,
  cardsFlipped = 0,
  card1 = null,
  card2 = null,
  lowScore = localStorage.getItem("low-score");

if (lowScore) {
  document.getElementById("best-score").innerText = lowScore;
}

// ===========================
//  Add listener to each Card
// ===========================
for (let card of gameCards) {
  card.addEventListener("click", clickCard);
}

// ======================
//     Start Game
// ======================

let startBtn = document.querySelector("#start-button");
startBtn.addEventListener("click", startGame);

// ======================
//      functions
// ======================

function clickCard(e) {
  if (!e.target.classList.contains("front")) return;

  let currentCard = e.target.parentElement;

  if (!card1 || !card2) {
    if (!currentCard.classList.contains("flipped")) {
      setScore(currentScore + 1);
    }
    currentCard.classList.add("flipped");
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }

  if (card1 && card2) {
    let gif1 = card1.children[1].children[0].src;
    let gif2 = card2.children[1].children[0].src;

    if (gif1 === gif2) {
      cardsFlipped += 2;
      card1.removeEventListener("click", clickCard);
      card2.removeEventListener("click", clickCard);
      card1 = null;
      card2 = null;
    } else {
      setTimeout(function() {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
      }, 1000);
    }
  }
  if (cardsFlipped === numCards) endGame();
}

function startGame() {
  start.classList.add("playing");
  let gifsArray = [];
  // push numbers to gifsArray
  for (let i = 1; i <= numCards / 2; i++) {
    gifsArray.push(i.toString());
  }
  // concatenate 2 gifsArrays and shuffle them
  let doubleGifsArray = shuffle(gifsArray.concat(gifsArray));
  // create path for each gif
  for (let i = 0; i < gameCards.length; i++) {
    let path = `gifs/${doubleGifsArray[i]}.gif`;
    gameCards[i].children[1].children[0].src = path;
  }
}

// Fisher-Yates Shuffle Algorithm
function shuffle(array) {
  let newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = temp;
  }
  return newArray;
}

// Set Score
function setScore(newScore) {
  currentScore = newScore;
  document.querySelector("#current-score").innerText = currentScore;
}

// End Game
function endGame() {
  let end = document.querySelector("#end");
  let scoreHeader = end.children[1];
  scoreHeader.innerText = "Your score: " + currentScore;
  let lowScore = +localStorage.getItem("low-score") || Infinity;
  if (currentScore < lowScore) {
    scoreHeader.innerText += " - NEW BEST SCORE!!";
    localStorage.setItem("low-score", currentScore);
  }
  document.getElementById("end").classList.add("game-over");
}
