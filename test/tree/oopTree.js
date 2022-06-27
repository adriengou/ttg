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
    listClone.splice(randomIndex2, 1);

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
    if (
      getWinner(levelIndex, matchIndex) ||
      !getPlayer1(levelIndex, matchIndex) ||
      !getPlayer2(levelIndex, matchIndex)
    ) {
      return false;
    }

    //Set winner in the match and set him as a player in the next
    let winner = levels[levelIndex][matchIndex].setWinner(playerNumber);

    if (levelIndex === 3) {
      return winner;
    } else {
      let nextLevelIndex = levelIndex + 1;
      let nextMatchIndex = Math.floor(matchIndex / 2);

      if (matchIndex % 2 === 0) {
        setPlayer1(nextLevelIndex, nextMatchIndex, winner);
      } else {
        setPlayer2(nextLevelIndex, nextMatchIndex, winner);
      }
      return [true, nextLevelIndex, nextMatchIndex, winner];
    }
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
function createTreeDomManager(tournament, animationTime) {
  let tournamentElem = document.querySelector(".tournament");

  function generate() {
    // add tournament to body
    document.body.appendChild(tournamentElem);
    //Generate tournament DOM
    let levels = tournament.getData().levels;
    for (let levelIndex = 0; levelIndex < levels.length; levelIndex++) {
      //create a level element
      let levelElem = document.createElement("div");
      levelElem.classList.add("level");
      levelElem.setAttribute("level", levelIndex);

      //add level to tournament
      tournamentElem.appendChild(levelElem);

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
        let matchElem = document.getElementById("matchTemplate");
        matchElem = matchElem.content.cloneNode(true);
        matchElem = matchElem.querySelector(".match");
        matchElem.setAttribute("match", matchIndex);
        matchElem.setAttribute("level", levelIndex);

        //add match to level
        levelElem.appendChild(matchElem);

        //Create the player 1
        let playersElem = matchElem.querySelectorAll(".player");
        playersElem[0].setAttribute("match", matchIndex);
        playersElem[0].setAttribute("level", levelIndex);
        playersElem[0].setAttribute("player", 1);
        playersElem[0].textContent = levels[levelIndex][matchIndex].player1;
        //Create the player 2
        playersElem[1].setAttribute("match", matchIndex);
        playersElem[1].setAttribute("level", levelIndex);
        playersElem[1].setAttribute("player", 2);
        playersElem[1].textContent = levels[levelIndex][matchIndex].player2;

        //bracket elem
        let bracketElem = matchElem.querySelector(".bracket");
        bracketElem.setAttribute("match", matchIndex);
        bracketElem.setAttribute("level", levelIndex);
      }
    }

    setInterval(() => {
      let matchesElem = document.querySelectorAll(".match");
      for (matchElem of matchesElem) {
        let playersElem = matchElem.querySelectorAll(".player");
        let playersELemHeight = [
          playersElem[0].getBoundingClientRect().top,
          playersElem[1].getBoundingClientRect().bottom,
        ];
        let playerElemHeight = playersElem[0].getBoundingClientRect().height;
        let bracketElem = matchElem.querySelector(".bracket");
        bracketElem.style.height = `${
          playersELemHeight[1] -
          playersELemHeight[0] -
          2 * (playerElemHeight / 3)
        }px`;
      }
    }, 100);

    let winnerElem = document.createElement("p");
    winnerElem.classList.add("winner", "player");
    tournamentElem.appendChild(winnerElem);
  }

  function addEvents() {
    let playersElem = tournamentElem.querySelectorAll(".player");

    for (const playerElem of playersElem) {
      if (playerElem.classList.contains("winner")) {
        continue;
      }

      playerElem.addEventListener("click", function (e) {
        setWinner(playerElem);
      });
    }
  }

  function setWinner(elem) {
    if (typeof elem === "string") {
      return false;
    }

    let levelIndex = parseInt(elem.getAttribute("level"));
    let matchIndex = parseInt(elem.getAttribute("match"));
    let playerIndex = parseInt(elem.getAttribute("player"));

    let r;

    r = tournament.setWinner(levelIndex, matchIndex, playerIndex);
    if (!r) {
      return false;
    }

    //get bracket Elem
    let bracketElem = tournamentElem.querySelector(
      `.bracket[level="${levelIndex}"][match="${matchIndex}"]`
    );

    //if the players is up set animation to up bars
    //else set animation to bottom bars
    let barsElem;
    if (playerIndex === 1) {
      //get up bars and middle
      barsElem = bracketElem.querySelectorAll(".up, .middle");
    } else {
      barsElem = bracketElem.querySelectorAll(".down, .middle");
    }

    for (const elem of barsElem) {
      elem.classList.add("anim");
    }

    let nextPlayerIndex;
    if (matchIndex % 2 === 0) {
      nextPlayerIndex = 1;
    } else {
      nextPlayerIndex = 2;
    }

    let nextPlayerElem;
    if (levelIndex < 3) {
      nextPlayerElem = document.querySelector(
        `[level="${r[1]}"][match="${r[2]}"][player="${nextPlayerIndex}"]`
      );
    } else {
      nextPlayerElem = document.querySelector(`.winner`);
    }

    barsElem[2].addEventListener(
      "animationend",
      function () {
        if (levelIndex < 3) {
          nextPlayerElem.textContent = r[3];
        } else {
          nextPlayerElem.textContent = r;
        }
      },
      false
    );
  }

  return { generate, addEvents };
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
  let domManager = createTreeDomManager(tournament);
  domManager.generate();
  domManager.addEvents();
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
