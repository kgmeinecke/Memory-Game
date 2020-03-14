const gameCards = document.querySelectorAll(".game-card");
let numCards = gameCards.length,
  currentScore = 0,
  cardsFlipped = 0;

let startBtn = document.querySelector("#start-button");
startBtn.addEventListener("click", startGame);

// ======================
//      functions
// ======================

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
  for (let gif of doubleGifsArray) {
    let path = `gifs/${gif}.gif`;
    console.log(path);
    // console.log(cards[i].children[1].children[0].src = path);
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
