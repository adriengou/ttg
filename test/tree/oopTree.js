function createMatch(player1 = "", player2 = "", level = 0, index = 0) {
  var winner = "";

  function getPLayer1() {
    return player1;
  }

  function getPLayer2() {
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
    getPLayer1,
    getPLayer2,
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

  console.log(match.getPLayer1(), match.getPLayer2());
  match.setPlayer1("new_player_A");
  match.setPlayer2("new_player_B");
  console.log(match.getPLayer1(), match.getPLayer2());

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

//---------------------------------------------------------------------------

function createLevel(index) {
  var matches = [];
  var level = index;

  function getLevel() {
    return level;
  }

  function getMatch(index) {
    return matches[index];
  }

  function getMatches() {
    return match;
  }

  function addMatch(player1, player2) {
    if (matches.length) {
      var matchIndex = matches.length;
    } else {
      var matchIndex = 0;
    }

    var match = createMatch(player1, player2, level, matchIndex);
    matches.push(match);
  }

  function setWinner(matchIndex, playerNumber) {
    matches[matchIndex].setWinner(playerNumber);
  }

  function getWinner(matchIndex) {
    return matches[matchIndex].getWinner();
  }

  function getData() {
    data = {};
    data.level = level;
    data.matches = [];

    for (var match of matches) {
      data.matches.push(match.getData());
    }

    return data;
  }

  function setData(o) {
    level = o.level;
    var newMatches = o.matches;

    for (var matchData of newMatches) {
      var match = createMatch();
      match.setData(matchData);
      matches.push(match);
    }
  }

  return {
    getLevel,
    getMatch,
    getMatches,
    addMatch,
    setWinner,
    getWinner,
    getData,
    setData,
  };
}

function testLevel() {
  var level = createLevel(0);
  level.addMatch("player_a", "player_b");
  var data = JSON.stringify(level.getData());
  console.log(data);
  var new_level = createLevel(1);
  console.log(new_level.getData());
  console.log("json ", JSON.parse(data));
  new_level.setData(JSON.parse(data));
  console.log(new_level.getData());
}

//testLevel();

//------------------------------------------------------------------------------

function createTournament(list = []) {
  var playerList = list;
  var levels = [];

  // get the number of matches at level 0
  var startMatchesNumber = playerList.length / 2;

  //get the number of levels
  //divide by 2 until it reaches 1
  var maxLevelsNumber = 1;
  var i = startMatchesNumber;

  while (i > 1) {
    maxLevelsNumber++;
    i = i / 2;
  }

  //generate the first level randomly
  var firstLevel = createLevel(0);

  //create [startMatchesNumber] matches with
  //random names from the player list
  let copiedList = [...playerList];
  for (var i = 0; i < startMatchesNumber; i++) {
    let index1 = Math.floor(Math.random() * copiedList.length);
    let p1 = copiedList[index1];
    copiedList.splice(index1, 1);

    let index2 = Math.floor(Math.random() * copiedList.length);
    let p2 = copiedList[index2];
    copiedList.splice(index2, 1);

    firstLevel.addMatch(p1, p2);
  }

  levels.push(firstLevel);

  //create all the other levels
  for (let levelIndex = 1; levelIndex < maxLevelsNumber; levelIndex++) {
    let newLevel = createLevel(levelIndex);
    levels.push(newLevel);
  }

  function getPlayerList() {
    return playerList;
  }

  function setPlayerList(list) {
    playerList = list;
  }

  function addLevel() {
    var newLevel = createLevel(levels.length - 1);
    levels.push(newLevel);
  }

  function getLevels() {
    return levels;
  }

  function getData() {
    var data = {};
    data.playerList = playerList;
    data.levels = [];

    for (l of levels) {
      data.levels.push(l.getData());
    }

    return data;
  }

  function setData(data) {
    levels = [];
    playerList = data.playerList;
    for (l of data.levels) {
      var newLevel = createLevel();
      newLevel.setData(l);
      levels.push(newLevel);
    }
  }

  function getWinner(levelIndex, matchIndex) {
    return levels[levelIndex].getWinner();
  }

  function setWinner(levelIndex, matchIndex, playerNumber) {
    //set the winner in the match
    if (!level[levelIndex].getWinner(matchIndex)) {
      level[levelIndex].setWinner(matchIndex, playerNumber);
    } else {
      return false;
    }

    //--determine the index of the next match
    //    euclidean division of the match index by 2
    //      floored down division
    let nextMatchIndex = Math.floor(matchIndex / 2);

    //--move the winner to the next match
    //    if the next match doesn't exist
    //      create the next match of the next level
    let nextMatch = createMatch("", "", levelIndex + 1, nextMatchIndex);
    levels[levelIndex + 1][nextMatchIndex] = nextMatch;

    //  if the match is at the top side of the next match
    //    set the winner as the first player of the next match
    //  if the match is at the bottom side of the next match
    //    set the winner as the second player of the next match
    if (matchIndex === nextMatchIndex * 2) {
      setWinner(levelIndex + 1, nextMatchIndex, 1);
    } else {
      setWinner(levelIndex + 1, nextMatchIndex, 2);
    }
  }

  return {
    getPlayerList,
    setPlayerList,
    addLevel,
    getLevels,
    getData,
    setData,
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
}

//testTournament();
//------------------------------------------------------------------------------
function createDomManager(tournament, animationTime) {
  let matchesDom = document.querySelector(".match");

  function getPlayers(match) {
    for (let matchDom of matchesDom) {
      if (
        matchDom.getAttribute("level") === levelIndex &&
        matchDom.getAttribute("match") === matchIndex
      ) {
        return matchDom.querySelectorAll("p");
      }
    }
  }

  function triggerAnimation(previousMatchIndex, nextMatchIndex) {
    let selector = `.bracket[match=${nextMatchIndex}] .middle,`;

    if (nextMatchIndex * 2 === previousMatchIndex) {
      selector += `.bracket[match=${nextMatchIndex}] .up`;
    } else {
      selector += `.bracket[match=${nextMatchIndex}] .down`;
    }

    let bars = document.querySelectorAll(selector);
    for (let bar of bars) {
      bar.classList.add("progress");
    }
  }

  function updateMatch(previousMatch, nextMatch) {
    let namesDom = getPlayers(match);

    triggerAnimation(previousMatch.getIndex(), nextMatch.getIndex());

    setTimeout(function () {
      namesDom[0].textContent = nextMatch.getPlayer1();
      namesDom[1].textContent = nextMatch.getPlayer2();
    }, animationTime + 100);
  }
}
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
