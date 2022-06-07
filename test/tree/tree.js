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

  return count + 1;
}

function createTournament(list) {
  let tournament = [];
  let numberOfLevels = numberOfHalvings(list.length);

  //create first level
  let level = createRandomMatches(list);
  tournament.push(level);

  //set random players for the first level

  return tournament;
}

function setWinner(tournament, matchLevel, matchIndex, player) {
  //set the winner in the match

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

  //check if level exists
  if (tournament[newLevel]) {
    tournament[newLevel].every((element) => {
      if (element.player1 === "") {
        element.player1 = winner;
        return false;
      } else if (element.player2 === "") {
        element.player2 = winner;
        return false;
      }

      return true;
    });
  } else {
    //create level and add the match with a player in it
    tournament[newLevel] = [];
    let match = createMatch();
    match.player1 = winner;
    tournament[newLevel].push(match);
  }
}

function updateDom(tournament) {
  let playerElement = document.querySelectorAll("p");
  console.log(playerElement);
  let arr = [];

  for (row of tournament) {
    for (e of row) {
      arr.push(e);
    }
  }

  let playerIndex = 0;

  for (let index = 0; index < arr.length; index++) {
    if (arr[index].player1) {
      playerElement[playerIndex].textContent = arr[index].player1;
    }
    playerIndex++;

    if (arr[index].player2) {
      playerElement[playerIndex].textContent = arr[index].player2;
    }
    playerIndex++;
  }
}

const playerList = [
  "Adrien GOUACIDE",
  "Nicolas DUCHÊNE",
  "Stéphanie CHARY",
  "NathanTEISSIER",
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

  console.log("tournament");
  console.log(tournament);

  setWinner(tournament, 0, 0, 1);
  console.log("tournament");
  console.log(tournament);

  setWinner(tournament, 0, 1, 2);
  console.log("tournament");
  console.log(tournament);

  setWinner(tournament, 1, 0, 1);
  console.log("tournament");
  console.log(tournament);

  updateDom(tournament);
}

test();
