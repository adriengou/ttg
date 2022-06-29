//config
const elemSelector = ".name_group p";

//dom elements
const elements = document.querySelectorAll(elemSelector);
let squares = [];
for (let index = 0; index < elements.length; index++) {
  // console.log(elements[index].getBoundingClientRect());
  squares.push({
    dom: elements[index],
    x: elements[index].getBoundingClientRect().x,
    y: elements[index].getBoundingClientRect().y,
    start: elements[index].getBoundingClientRect(),
  });
}
//console.log(squares);

//variables
let selectedElement = false;
let swappingElement = false;
let mouseX;
let mouseY;

//function to check if two element overlap
function elementsOverlap(el1, el2) {
  const domRect1 = el1.getBoundingClientRect
    ? el1.getBoundingClientRect()
    : el1;

  const domRect2 = el2.getBoundingClientRect
    ? el2.getBoundingClientRect()
    : el2;

  return !(
    domRect1.top > domRect2.bottom ||
    domRect1.right + window.innerWidth < domRect2.left ||
    domRect1.bottom < domRect2.top ||
    domRect1.left + window.innerWidth > domRect2.right
  );
}

//function to move a dom element from its origin
function moveElement(element, x, y, drag = false) {
  let deltaX;
  let deltaY;
  if (drag) {
    deltaX = mouseX - element.x;
    deltaY = mouseY - element.y;
  } else {
    deltaX = 0;
    deltaY = 0;
  }

  let vectorX = x - element.x - deltaX;
  let vectorY = y - element.y - deltaY;

  element.dom.style.transform = `translate(${vectorX}px, ${vectorY}px)`;
}

function swapElement(el1, el2) {
  let copy = el1.textContent;
  el1.textContent = el2.textContent;
  el2.textContent = copy;
}

document.addEventListener("mousemove", function (e) {
  console.log(selectedElement);
  if (selectedElement !== false) {
    moveElement(squares[selectedElement], e.clientX, e.clientY, true);
    squares[selectedElement].dom.style.zIndex = "100";

    for (let index = 0; index < squares.length; index++) {
      if (index !== selectedElement) {
        if (index === 0) {
          // console.log(
          //   squares[selectedElement].dom.getBoundingClientRect(),
          //   squares[index].start
          // );
        }

        if (
          elementsOverlap(squares[selectedElement].dom, squares[index].start)
        ) {
          if (swappingElement) {
            squares[swappingElement].dom.style.transform =
              "translate(0px, 0px)";
          }

          swappingElement = index;

          moveElement(
            squares[swappingElement],
            squares[selectedElement].x,
            squares[selectedElement].y
          );
        } else if (index === swappingElement) {
          squares[swappingElement].dom.style.transform = "translate(0px, 0px)";
          swappingElement = false;
        }
      }
    }
  }
});

document.addEventListener("mouseup", function (e) {
  if (selectedElement !== false && swappingElement !== false) {
    let e1 = selectedElement;
    let e2 = swappingElement;

    for (const element of squares) {
      element.dom.style.transform = "translate(0px, 0px)";
    }
    swapElement(squares[e1].dom, squares[e2].dom);
  } else if (selectedElement !== false) {
    squares[selectedElement].dom.style.transform = "translate(0px, 0px)";
  }
  if (selectedElement !== false) {
    squares[selectedElement].dom.style.zIndex = "0";
    selectedElement = false;
  }
});

for (let index = 0; index < squares.length; index++) {
  squares[index].dom.addEventListener("mousedown", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!selectedElement) {
      selectedElement = index;
    }
  });
}
