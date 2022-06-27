//config
const elemSelector = ".square";
const groupSelector = ".dragndrop";
const styleToChange = "backgroundColor";

//function to check if two element overlap
function elementsOverlap(el1, el2) {
  const domRect1 = el1.dom.getBoundingClientRect();
  let domRect2;

  domRect2 = el2.startRect;

  return !(
    domRect1.top > domRect2.bottom ||
    domRect1.right < domRect2.left ||
    domRect1.bottom < domRect2.top ||
    domRect1.left > domRect2.right
  );
}

//Create the array of objects
let elemList = [];

//Currently selected element
let selectedElem;
let switchedElem;

//Create object in the array
elemList = document.querySelectorAll(elemSelector);

//Adding the events
for (const elem of elemList) {
  elem.addEventListener("mousedown", function (e) {
    selectedElem = elem;
  });
}

//mousup event
document.addEventListener("mouseup", function (e) {
  selectedElem.style.zIndex = 0;
  selectedElem.style.transform = `translate(0px, 0px)`;
  selectedElem = false;
});

//Mouse event
let mouseX;
let mouseY;

const groupElem = document.querySelector(groupSelector);
document.addEventListener("mousemove", function (e) {
  mouseX = e.screenX;
  mouseY = e.screenY;

  if (selectedElem) {
    let domRect = selectedElem.getBoundingClientRect();
    let vX, vY;

    vX = mouseX - domRect.x;
    vY = mouseY - domRect.y;

    selectedElem.style.transform = `translate(${vX}px, ${vY}px)`;
    selectedElem.style.zIndex = 100;
  }
});
