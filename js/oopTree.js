function logObject(text, o) {
  let data = o.getData();
  data = JSON.stringify(data, null, 4);
  console.log("-".repeat(100));
  console.log(text);
  console.log(data);
  console.log("-".repeat(100));
}
//------------------------------------------------------------------------------

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
function createTournament() {
  //Variables
  let playerList;
  //an array for all the levels
  let levels = [];

  function init(list) {
    levels = [];
    playerList = [...list];
    //Number of players
    let numberOfPlayers = list.length;

    //Initialization
    //Generate the first level with matches with random players
    let firstLevel = [];
    let listClone = [...list];

    for (let i = 0; i < numberOfPlayers / 2; i++) {
      // let randomIndex1 = Math.floor(Math.random() * listClone.length);
      // let randomName1 = listClone[randomIndex1];
      // listClone.splice(randomIndex1, 1);

      // let randomIndex2 = Math.floor(Math.random() * listClone.length);
      // let randomName2 = listClone[randomIndex2];
      // listClone.splice(randomIndex2, 1);

      // let match = createMatch(randomName1, randomName2, 0, i);
      // firstLevel.push(match);

      let name1 = listClone.shift();
      let name2 = listClone.shift();

      let match = createMatch(name1, name2, 0, i);
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
  }

  //Methods
  function getData() {
    let data = {};
    data.playerList = playerList;
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
    init,
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
  let tournamentElem = document.querySelector(".tree");

  console.log("tournoi à la création");
  console.log(tournamentElem, tournamentElem.innerHTML);

  let bracketInterval;

  function generate() {
    //reset the dom
    console.log(tournamentElem, tournamentElem.innerHTML);

    tournamentElem.innerHTML = "";
    console.log("tournoi avant generation: ");
    console.log(tournamentElem, tournamentElem.innerHTML);

    // add tournament to body
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

    if (!bracketInterval) {
      bracketInterval = setInterval(() => {
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
    }

    let winnerElem = document.createElement("p");
    winnerElem.classList.add("winner", "player");
    tournamentElem.appendChild(winnerElem);
    console.log("tournoi apres generation: ");
    console.log(tournamentElem, tournamentElem.innerHTML);
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

// testDomManager();
//------------------------------------------------------------------------------
/*



























*/
function createGroupDomManager() {
  const playerSelector = ".name_group p";
  const playersElements = document.querySelectorAll(playerSelector);
  const shuffleBtn = document.querySelector("#group > button");

  function shuffle() {
    let names = getPlayerList();

    let newList = [];

    while (names.length) {
      let r = Math.floor(Math.random() * names.length);
      newList.push(names.splice(r, 1));
    }

    for (let i = 0; i < newList.length; i++) {
      playersElements[i].textContent = newList[i];
    }
  }

  function getPlayerList() {
    let list = [];
    for (const el of playersElements) {
      list.push(el.textContent);
    }
    return list;
  }

  function setPlayerList(list) {
    for (let i = 0; i < playersElements.length; i++) {
      if (i >= list.length) {
        playersElements[i].textContent = "";
      } else {
        playersElements[i].textContent = list[i];
      }
    }
  }

  //Events
  shuffleBtn.addEventListener("click", shuffle);

  //Return
  return {
    shuffle,
    getPlayerList,
    setPlayerList,
  };
}

function testGroupDomManager() {
  let groupMan = createGroupDomManager();
}
//testGroupDomManager();
/*





























*/
function createSettingsDomManager() {
  const nameDom = document.querySelector(
    "#settings > div > div.column.left_column > div:nth-child(1) > input[type=text]"
  );

  const gameDom = document.querySelector(
    "#settings > div > div.column.left_column > div:nth-child(2) > input[type=text]"
  );

  const randomDom = document.querySelector(
    "#settings > div > div.column.left_column > div:nth-child(3) > div > input[type=checkbox]"
  );

  const playersDom = document.querySelector(
    "#settings > div > div.column.right_column > textarea"
  );

  const form = { nameDom, gameDom, randomDom, playersDom };

  const popupDom = document.querySelector("#settings .popup");

  function showPopup(error) {
    let textDom = popupDom.querySelector("p");
    textDom.textContent = error;
    popupDom.classList.remove("hidden");
  }

  function validate() {
    let isValid = true;
    let message = "";

    console.log(
      nameDom.value.length,
      gameDom.value.length,
      playersDom.value.length,
      playersDom.value
    );
    //no empty field
    isValid = nameDom.value.length > 0 ? isValid : false;

    isValid = gameDom.value.length > 0 ? isValid : false;

    isValid = playersDom.value.length > 0 ? isValid : false;

    if (!isValid) {
      message += "A field is empty !";
      isValid = false;
    }

    //odd number of players
    let lines = playersDom.value.split("\n");

    //number of lines
    let n = 0;
    for (const l of lines) {
      if (l !== "") {
        n++;
      }
    }

    if (n % 2 !== 0) {
      message += "\nIt needs an even amount of players !";
      isValid = false;
    }

    if (!isValid) {
      showPopup(message);
    }

    return isValid;
  }

  function getSettings() {
    return {
      name: nameDom.value,
      game: gameDom.value,
      random: randomDom.checked,
    };
  }

  function setSettings(data, list) {
    nameDom.value = data.name;
    gameDom.value = data.game;
    randomDom.checked = data.random;
    playersDom.value = list.join("\n");
  }

  function getPlayerList() {
    let list = playersDom.value.split("\n");
    return list;
  }

  function getRandomStatus() {
    return randomDom.checked;
  }

  //event
  const popupBtnDom = popupDom.querySelector("button");
  popupBtnDom.addEventListener("click", function (e) {
    popupDom.classList.add("hidden");
  });

  return {
    validate,
    getPlayerList,
    getRandomStatus,
    getSettings,
    setSettings,
  };
}

function testSettingsDomManager() {
  let settMan = createSettingsDomManager();
  settMan.validate();
}
/*





























*/
function createStorageManager() {
  function save(settings, list) {
    let saveName = settings.name;
    let save = {
      settings,
      list,
    };

    localStorage.setItem(saveName, JSON.stringify(save));
  }

  function load(saveName) {
    return JSON.parse(localStorage.getItem(saveName));
  }

  function loadNames() {
    let names = [];
    for (const name in { ...localStorage }) {
      names.push(name);
    }
    return names;
  }

  return {
    save,
    load,
    loadNames,
  };
}
/*





























*/
function createTournamentDomManager(
  tournament,
  settingMan,
  groupMan,
  treeMan,
  storageManager
) {
  const parent = document.querySelector("main");
  const settingsNext = document.querySelector("#settings > button");

  const groupBack = document.querySelector(
    "#group > div.button_wrapper > button:nth-child(1)"
  );

  const groupNext = document.querySelector(
    "#group > div.button_wrapper > button:nth-child(2)"
  );

  const treeBack = document.querySelector("#tree > button");

  const loadImgDom = document.querySelector(".storage .load img");
  const saveImgDom = document.querySelector(".storage .save img");
  const loadBtn = document.querySelector(".storage .load button");
  const saveBtn = document.querySelector(".storage .save button");
  const loadSelect = document.querySelector(".storage .load select");
  const saveInput = document.querySelector(".storage .save input");
  const savePopup = document.querySelector(".storage .save .popup");
  const loadPopup = document.querySelector(".storage .load .popup");

  function saveTournament() {
    storageManager.save(settingMan.getSettings(), groupMan.getPlayerList());
  }

  function loadTournament(saveName) {
    let data = storageManager.load(saveName);

    settingMan.setSettings(data.settings, data.list);
    groupMan.setPlayerList(data.list);
  }

  loadImgDom.addEventListener("click", function (e) {
    loadPopup.classList.toggle("hidden");

    if (loadPopup.classList.contains("hidden")) {
      return false;
    }

    loadSelect.innerHTML = "";
    for (const name of storageManager.loadNames()) {
      const optionDom = document.createElement("option");
      optionDom.value = name;
      optionDom.textContent = name;
      loadSelect.appendChild(optionDom);
    }
  });

  saveImgDom.addEventListener("click", function (e) {
    if (!loadPopup.classList.contains("hidden")) {
      loadPopup.classList.add("hidden");
    }

    if (!settingMan.validate()) {
      return false;
    }
    saveTournament();
  });

  loadBtn.addEventListener("click", function (e) {
    loadTournament(loadSelect.value);
  });

  settingsNext.addEventListener("click", function (e) {
    if (!settingMan.validate()) {
      return false;
    }

    let list = settingMan.getPlayerList();
    groupMan.setPlayerList(list);
    if (settingMan.getRandomStatus()) {
      groupMan.shuffle();
    }

    parent.scroll({
      top: 0,
      left: window.innerWidth,
      behavior: "smooth",
    });
  });

  groupBack.addEventListener("click", function (e) {
    parent.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });

  groupNext.addEventListener("click", function (e) {
    let playerList = groupMan.getPlayerList();
    tournament.init(playerList);

    console.log("TOURNAMENT DATA");
    console.log(playerList);

    treeMan.generate();
    treeMan.addEvents();

    parent.scroll({
      top: 0,
      left: 2 * window.innerWidth,
      behavior: "smooth",
    });
  });

  treeBack.addEventListener("click", function (e) {
    parent.scroll({
      top: 0,
      left: window.innerWidth,
      behavior: "smooth",
    });
  });
}

function testDomManager() {
  let tournament = createTournament();
  let treeMan = createTreeDomManager(tournament);
  let settingMan = createSettingsDomManager();
  let groupMan = createGroupDomManager();
  let storageManager = createStorageManager();

  let tourMan = createTournamentDomManager(
    tournament,
    settingMan,
    groupMan,
    treeMan,
    storageManager
  );
}

testDomManager();

/*
Adrien GOUACIDE
Nicolas DUCHÊNE
Stéphanie CHARY
Nathan TEISSIER
Matteo FRA
Imane QAJJOU
Enzo MARTINEZ
Sirikone KEOHAVONG
Fatiha ABDELLAOUI
Audrey CANNESSON
Abdelkrim KISSOUM
Sarah CASARIN
Tarek KOUSSAIER
Fouad MESBAH
Jeffrey VALENTIN
Manuel AGUET
*/
