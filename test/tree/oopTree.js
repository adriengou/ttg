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
  };
}

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
      var matchIndex = matches.length - 1;
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

  function setData(o) {
    matches = o.matches;
    level = o.level;

    for (matchData of o.matches) {
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
    setData,
  };
}

function createTournament(list) {
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
  for (var i = 0; i < startMatchesNumber; i++) {
    var p1 = playerList[Match.floor(Math.random() * playerList.length)];
    var p2 = playerList[Match.floor(Math.random() * playerList.length)];

    firstLevel.createMatch(p1, p2);
    levels.push(firstLevel);
  }
}
