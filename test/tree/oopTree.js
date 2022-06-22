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
function createTournament(list = []) {}

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
/*





























*/
//------------------------------------------------------------------------------
function createDomManager(tournament, animationTime) {}

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
  let domManager = createDomManager(tournament, 0.4);
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
