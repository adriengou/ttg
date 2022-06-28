function shuffle() {
  //config
  const shuffleSelector = ".name_group p";
  const shuffleElements = document.querySelectorAll(shuffleSelector);

  let names = [];
  for (const el of shuffleElements) {
    names.push(el.textContent);
  }

  let newList = [];

  while (names.length) {
    let r = Math.floor(Math.random() * names.length);
    newList.push(names.splice(r, 1));
  }

  for (let i = 0; i < newList.length; i++) {
    console.log(shuffleElements[i], newList[i]);
    shuffleElements[i].textContent = newList[i];
  }
  console.log(shuffleElements);
}

const shuffleBtn = document.querySelector("#group > button");

shuffleBtn.addEventListener("click", shuffle);
