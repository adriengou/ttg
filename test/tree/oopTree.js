function createMatch(player1 = "", player2 = "", level = 0, index = 0) {
  var winner = "";

  function getPlayer1() {
    return player1;
  }

  function getPlayer2() {
    return player2;
  }

  function setPlayer1(player) {
    player1 = player;
  }

  function setPlayer2(player) {
    player2 = player;
  }

  function getLevel() {
    return level;
  }

  function setLevel(n) {
    level = n;
  }

  function getIndex() {
    return index;
  }

  function setIndex(n) {
    index = n;
  }

  function getWinner() {
    return winner;
  }

  function setWinner(playerNumber) {
    if (playerNumber === 1) {
      winner = player1;
    } else if (playerNumber === 2) {
      winner = player2;
    }

    return winner;
  }

  function setData(o) {
    player1 = o.player1;
    player2 = o.player2;

    winner = o.winner;

    level = o.level;
    index = o.index;
  }

  function getData() {
    return { player1, player2, winner, level, index };
  }

  return {
    getPlayer1,
    getPlayer2,
    setPlayer1,
    setPlayer2,
    getIndex,
    setIndex,
    getLevel,
    setLevel,
    getWinner,
    setWinner,
    setData,
    getData,
  };
}

function testMatch() {
  var match = createMatch("player_A", "player_B");

  console.log(match.getPlayer1(), match.getPlayer2());
  match.setPlayer1("new_player_A");
  match.setPlayer2("new_player_B");
  console.log(match.getPlayer1(), match.getPlayer2());

  console.log(match.getIndex());
  match.setIndex(3);
  console.log(match.getIndex());

  console.log(match.getLevel());
  match.setLevel(4);
  console.log(match.getLevel());

  console.log(match.getWinner());
  match.setWinner(2);
  console.log(match.getWinner());

  var data = JSON.stringify(match.getData());
  console.log(data);

  var match_2 = createMatch();
  console.log(match_2.getData());
  match_2.setData(JSON.parse(data));
  console.log(match_2.getData());
}

// testMatch();
//------------------------------------------------------------------------------
/*





























*/
function createTournament(list = []) {
  //Variables
  //an array for all the levels
  levels = [];

  //Number of players
  let numberOfPlayers = list.length;

  //Initialization
  //Generate the first level with matches with random players
  let firstLevel = [];
  let listClone = [...list];

  for (let i = 0; i < numberOfPlayers / 2; i++) {
    let randomIndex1 = Math.floor(Math.random() * listClone.length);
    let randomName1 = listClone[randomIndex1];
    listClone.splice(randomIndex1, 1);

    let randomIndex2 = Math.floor(Math.random() * listClone.length);
    let randomName2 = listClone[randomIndex2];
    listClone.splice(randomIndex1, 1);

    let match = createMatch(randomName1, randomName2, 0, i);
    firstLevel.push(match);
  }

  levels.push(firstLevel);

  // How many levels there is
  let numberOfLevels = 1;

  let n = levels[0].length; //The number of matches in the first level

  while (n > 1) {
    n = n / 2;
    numberOfLevels++;
  }

  // Generate all the other levels with empty matches
  n = levels[0].length / 2;

  for (let i = 1; i < numberOfLevels; i++) {
    levels.push([]);
    for (let j = 0; j < n; j++) {
      levels[i].push(createMatch("", "", i, j));
    }
    n = n / 2;
  }

  //Methods
  function getData() {
    let data = {};
    data.playerList = list;
    data.levels = [];

    for (let level of levels) {
      let dataLevel = [];
      for (let match of level) {
        dataLevel.push(match.getData());
      }
      data.levels.push(dataLevel);
    }
    return data;
  }

  function getPlayer1(levelIndex, matchIndex) {
    return levels[levelIndex][matchIndex].getPlayer1();
  }

  function getPlayer2(levelIndex, matchIndex) {
    return levels[levelIndex][matchIndex].getPlayer2();
  }

  function setPlayer1(levelIndex, matchIndex, player) {
    levels[levelIndex][matchIndex].setPlayer1(player);
  }

  function setPlayer2(levelIndex, matchIndex, player) {
    levels[levelIndex][matchIndex].setPlayer2(player);
  }

  function getWinner(levelIndex, matchIndex) {
    return levels[levelIndex][matchIndex].getWinner();
  }

  function setWinner(levelIndex, matchIndex, playerNumber) {
    //if there is no winner
    if (getWinner(levelIndex, matchIndex)) {
      return false;
    }

    //Set winner in the match and set him as a player in the next
    let winner = levels[levelIndex][matchIndex].setWinner(playerNumber);

    let nextLevelIndex = levelIndex + 1;
    let nextMatchIndex = Math.floor(matchIndex / 2);

    if (matchIndex % 2 === 0) {
      setPlayer1(nextLevelIndex, nextMatchIndex, winner);
    } else {
      setPlayer2(nextLevelIndex, nextMatchIndex, winner);
    }
    return true;
  }

  //Object Returns
  return {
    getData,
    getPlayer1,
    getPlayer2,
    setPlayer1,
    setPlayer2,
    getWinner,
    setWinner,
  };
}

function testTournament() {
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

  var t = createTournament(playerList);
  logObject("Début du tournoi", t);
  console.log(t.setWinner(0, 1, 2));
  logObject("gagnant", t);
  console.log(t.setWinner(0, 1, 2));
}

// testTournament();
/*





























*/
//------------------------------------------------------------------------------
function createDomManager(tournament, animationTime) {
  let tournamentElem = document.querySelector(".tournament");

  function generate() {
    //Generate tournament DOM
    let levels = tournament.getData().levels;
    for (let levelIndex = 0; levelIndex < levels.length; levelIndex++) {
      //create a level element
      let levelElem = document.createElement("div");
      levelElem.classList.add("level");
      levelElem.setAttribute("level", levelIndex);

      //create bracket list element
      let bracketListElem = document.createElement("div");
      bracketListElem.classList.add("bracketList");
      bracketListElem.setAttribute("level", levelIndex);

      //add matches and bracket to level  and bracket list
      for (
        let matchIndex = 0;
        matchIndex < levels[levelIndex].length;
        matchIndex++
      ) {
        //create the match
        let matchElem = document.createElement("div");
        matchElem.classList.add("match");
        matchElem.setAttribute("level", levelIndex);
        matchElem.setAttribute("match", matchIndex);

        //Create the player 1
        let player1Elem = document.createElement("p");
        player1Elem.classList.add("player");
        player1Elem.setAttribute("level", levelIndex);
        player1Elem.setAttribute("match", matchIndex);
        player1Elem.setAttribute("player", 1);
        player1Elem.textContent = levels[levelIndex][matchIndex].player1;

        //Create the player 2
        let player2Elem = document.createElement("p");
        player2Elem.classList.add("player");
        player2Elem.setAttribute("level", levelIndex);
        player2Elem.setAttribute("match", matchIndex);
        player2Elem.setAttribute("player", 2);
        player2Elem.textContent = levels[levelIndex][matchIndex].player2;

        //Add the players to the match
        matchElem.appendChild(player1Elem);
        matchElem.appendChild(player2Elem);

        //add match to level
        levelElem.appendChild(matchElem);

        //create a bracket element
        let bracketTemp = document.getElementById("bracketTemplate");

        bracketElem = bracketTemp.content.cloneNode(true);
        bracketElem = bracketElem.querySelector(".bracket");
        console.log(bracketTemp);
        bracketElem.classList.add("bracket");
        bracketElem.setAttribute("level", levelIndex);
        bracketElem.setAttribute("match", matchIndex);

        //add bracket to bracketList
        bracketListElem.appendChild(bracketElem);
      }

      //add level to tournament
      tournamentElem.appendChild(levelElem);

      //add bracket list to tournament
      tournamentElem.appendChild(bracketListElem);
    }
    // add tournament to body
    document.body.appendChild(tournamentElem);
    console.log(tournamentElem);
  }

  function addEvents() {}

  function setWinner(elem) {
    let;
  }

  return { generate };
}

function testDomManager() {
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
  let tournament = createTournament(playerList);
  logObject("tournament data: \n", tournament);
  let domManager = createDomManager(tournament);
  domManager.generate();
}

testDomManager();
//------------------------------------------------------------------------------

function logObject(text, o) {
  let data = o.getData();
  data = JSON.stringify(data, null, 4);
  console.log("-".repeat(100));
  console.log(text);
  console.log(data);
  console.log("-".repeat(100));
}
//------------------------------------------------------------------------------
