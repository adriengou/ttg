function createMatch(player1 = "", player2 = "") {
  let match = {
    player1: player1,
    player2: player2,
    winner: "",
  };

  return match;
}

function randomSort(array) {
  let length = array.length;
  let oldArray = [...array];
  let newArray = [];
  for (let i = 0; i < length; i++) {
    let n = Math.floor(Math.random() * oldArray.length);
    newArray.push(oldArray[n]);
    oldArray.splice(n, 1);
  }

  return newArray;
}

function createRandomMatches(list) {
  list = randomSort(list);

  let matchList = [];

  for (let index = 0; index < list.length; index = index + 2) {
    let match = createMatch(list[index], list[index + 1]);
    matchList.push(match);
  }

  return matchList;
}

function createEmptyMatches(n) {
  let matchList = [];

  for (let index = 0; index < n; index++) {
    let match = createMatch();
    matchList.push(match);
  }

  return matchList;
}

function numberOfHalvings(n) {
  let count = 0;
  while (Number.isInteger(n) && n > 1) {
    n = n / 2;
    count = count + 1;
  }
  //
  return count;
}

function createTournament(list) {
  let tournament = [];

  let numberOfLevels = numberOfHalvings(list.length);
  let numberOfMatches = list.length / 4;

  //create first level
  let level = createRandomMatches(list);
  tournament[0] = level;

  //create empty levels
  for (let levelIndex = 1; levelIndex < numberOfLevels; levelIndex++) {
    tournament.push([]);
    tournament[levelIndex] = createEmptyMatches(numberOfMatches);
    numberOfMatches = numberOfMatches / 2;
  }

  return tournament;
}

function setWinner(tournament, matchLevel, matchIndex, player) {
  //set the winner in the match

  if (
    tournament[matchLevel][matchIndex].winner ||
    !tournament[matchLevel][matchIndex].player1 ||
    !tournament[matchLevel][matchIndex].player2
  ) {
    return false;
  }

  switch (player) {
    case 1:
      tournament[matchLevel][matchIndex].winner =
        tournament[matchLevel][matchIndex].player1;
      break;

    case 2:
      tournament[matchLevel][matchIndex].winner =
        tournament[matchLevel][matchIndex].player2;
      break;
  }

  let winner = tournament[matchLevel][matchIndex].winner;
  let newLevel = matchLevel + 1;
  let newMatch = Math.floor(matchIndex / 2);

  if (newLevel <= tournament.length - 1) {
    if (matchIndex % 2 === 0) {
      tournament[newLevel][newMatch].player1 = winner;
    } else {
      tournament[newLevel][newMatch].player2 = winner;
    }
  }
}

function updateDom(tournament) {
  for (let levelIndex = 0; levelIndex < tournament.length; levelIndex++) {
    let level = tournament[levelIndex];
    for (let matchIndex = 0; matchIndex < level.length; matchIndex++) {
      let match = level[matchIndex];

      let player1 = document.querySelector(`.l${levelIndex}.m${matchIndex}.p1`);

      let player2 = document.querySelector(`.l${levelIndex}.m${matchIndex}.p2`);

      if (match.player1) {
        player1.textContent = match.player1;
      }

      if (match.player2) {
        player2.textContent = match.player2;
      }
    }
  }

  let winner = document.querySelector(".winner");
  let level = tournament[tournament.length - 1];
  winner.textContent = level[level.length - 1].winner;
}

function generateLevelDom(index) {
  let level = document.createElement("div");
  level.classList.add("level", `l${index}`);
  return level;
}

function generateMatchDom(levelIndex, matchIndex) {
  let match = document.createElement("div");
  match.classList.add("match", `l${levelIndex}`, `m${matchIndex}`);
  return match;
}

function generatePlayerDom(levelIndex, matchIndex, playerIndex, playerName) {
  let player = document.createElement("p");

  player.classList.add(
    "player",
    `l${levelIndex}`,
    `m${matchIndex}`,
    `p${playerIndex}`
  );

  player.textContent = playerName;

  return player;
}

function generateDom(tournament) {
  let body = document.querySelector("body");

  for (let levelIndex = 0; levelIndex < tournament.length; levelIndex++) {
    let level = tournament[levelIndex];
    let levelDom = generateLevelDom(levelIndex);
    body.appendChild(levelDom);

    for (let matchIndex = 0; matchIndex < level.length; matchIndex++) {
      let match = level[matchIndex];
      let matchDom = generateMatchDom(levelIndex, matchIndex);
      levelDom.appendChild(matchDom);

      let player = "";

      if (match.player1) {
        player = match.player1;
      }

      let player1Dom = generatePlayerDom(levelIndex, matchIndex, 1, player);

      matchDom.appendChild(player1Dom);

      player = "";

      if (match.player2) {
        player = match.player2;
      }

      let player2Dom = generatePlayerDom(levelIndex, matchIndex, 2, player);

      matchDom.appendChild(player2Dom);
    }
  }

  // add a p for the winner
  let winner = document.createElement("p");
  winner.classList.add("player", "winner");
  body.appendChild(winner);
}

const playerList = [
  "Adrien GOUACIDE",
  "Nicolas DUCHÊNE",
  "Stéphanie CHARY",
  "Nathan TEISSIER",
  "Matteo FRA",
  "Imane QAJJOU",
  "Enzo MARTINEZ",
  "Sirikone KEOHAVONG",
  "Fatiha ABDELLAOUI",
  "Audrey CANNESSON",
  "Abdelkrim KISSOUM",
  "Sarah CASARIN",
  "Tarek KOUSSAIER",
  "Fouad MESBAH",
  "Jeffrey VALENTIN",
  "Manuel AGUET",
];

function test() {
  //create a tournament
  let tournament = createTournament(playerList);

  setWinner(tournament, 0, 0, 1);

  setWinner(tournament, 0, 1, 2);

  setWinner(tournament, 1, 0, 1);

  updateDom(tournament);
}

function testDom() {
  let tournament = createTournament(playerList);

  generateDom(tournament);
  updateDom(tournament);

  window.addEventListener("click", (event) => {
    let player = event.target;
    if (player.classList[1] === "winner") {
      return true;
    }

    let levelIndex = parseInt(player.classList[1].replace("l", ""));
    let matchIndex = parseInt(player.classList[2].replace("m", ""));
    let playerIndex = parseInt(player.classList[3].replace("p", ""));

    setWinner(tournament, levelIndex, matchIndex, playerIndex);
    updateDom(tournament);
  });
}

testDom();
