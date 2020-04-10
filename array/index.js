

const textColorArray = ["black", "navy", "blue", "green", "teal", "lime", "aqua", "maroon",
  "purple", "olive", "gray", "silver", "red", "fuchsia", "yellow", "white"];
const hexColorArray = ["#000000", "#000080", "#0000ff", "#008000", "#008080", "#00ff00", "#00ffff", "#800000",
  "#800080", "#808000", "#808080", "#c0c0c0", "#ff0000", "#ff00ff", "#ffff00", "#ffffff"];
const arrayOfColors = [
  ["black", "navy", "blue", "green"],
  ["teal", "lime", "aqua", "maroon"],
  ["purple", "olive", "gray", "silver"],
  ["red", "fuchsia", "yellow", "white"],
  ["black", "navy", "blue", "green"],
  ["teal", "lime", "aqua", "maroon"],
  ["purple", "olive", "gray", "silver", "pink"],
  ["red", "fuchsia", "yellow", "white"]];

const arrayOfColorElements = arrayOfColors.map((rowArray, rowIdx) => {
  return rowArray.map((columnArray, columnIdx) => {
    let e = document.createElement("div");
    e.style.width = "400px";
    e.style.height = "200px";
    e.style.backgroundColor = columnArray;
    e.className = "element";
    return e;
  });
});

//const arrayOfColorElements = new Array(8);
//arrayOfColorElements[0] = [];
//arrayOfColorElements[1] = new Array(4);
//arrayOfColorElements[2] = new Array(4);
//arrayOfColorElements[3] = new Array(4);
//arrayOfColorElements[4] = 5
//arrayOfColorElements[4][2] = null;
//arrayOfColorElements[5] = new Array(4);
//arrayOfColorElements[5][2] = arrayOfColorElementsX[5][2];
//arrayOfColorElements[6] = new Array(5);
//arrayOfColorElements[6][2] = arrayOfColorElementsX[5][2];
arrayOfColorElements[6][2].textContent = " jkkjl kjnkjn kjkjnk kjkjn x ghsh adfgadgadfg agadgadg gadfga";
//arrayOfColorElements[7] = new Array(4);

// function addElementToCell(cell, element) {
//   cell.style.backgroundColor = element;
// }

function addElementToCell(cell, element) {
  // let els = cell.getElementsByClassName("element");
  // Array.prototype.forEach.call(els, function (el) {
  //   cell.removeChild(el);
  // });
  if (element) {
    element.style.verticalAlign = "middle";
    cell.appendChild(element);
  }

}

const divT = document.getElementById("divT");
displayArrayOfElements(divT, arrayOfColorElements, 240, 120);




//  console.log(cell)

