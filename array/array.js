

const displayArrayOfElements = (targetDiv, arrayElements, dimH, dimV) => {
  targetDiv.innerHTML = "";

  const displayCell = (i, j) => {
    let e = arrayElements[i][j];
    let c = arrayCells[i][j];
    //let cI = c.getElementsByClassName("insideCell")[0];
    addElementToCell(c, e);  // external function ; from element to insideCell (div)
  }
  const swapElements = (i1, j1, i2, j2) => {
    let tmp = arrayElements[i1][j1];
    arrayElements[i1][j1] = arrayElements[i2][j2];
    arrayElements[i2][j2] = tmp;
    displayCell(i1, j1);
    displayCell(i2, j2);
  }

  if (!Array.isArray(arrayElements)) { return }
  const arrayCells = new Array(arrayElements.length);  // array if insideCell (div)
  //arrayElements.forEach((rowElements, rowIdx) => {
  for (let rowIdx = 0; rowIdx < arrayElements.length; rowIdx++) {
    const rowElements = arrayElements[rowIdx]
    const row = document.createElement("div");
    row.className = "rowCells";
    row.style.height = dimV + "px";
    targetDiv.appendChild(row);

    if (!Array.isArray(rowElements)) { continue }
    arrayCells[rowIdx] = new Array(rowElements.length);
    //rowElements.forEach((columnElement, columnIdx) => {
    for (let columnIdx = 0; columnIdx < rowElements.length; columnIdx++) {
      const outsideCell = document.createElement("div");
      const insideCell = document.createElement("div");
      outsideCell.className = "outsideCell";
      insideCell.className = "insideCell";
      outsideCell.style.width = dimH + "px";
      arrayCells[rowIdx][columnIdx] = insideCell;
      outsideCell.appendChild(insideCell);
      row.appendChild(outsideCell);
      displayCell(rowIdx, columnIdx);

      if (columnIdx > 0) {
        const leftSwapper = document.createElement("div");
        leftSwapper.className = "leftSwapper showOnHover";
        leftSwapper.onclick = () => swapElements(rowIdx, columnIdx, rowIdx, columnIdx - 1);
        outsideCell.appendChild(leftSwapper);

        const leftSwapperText = document.createElement("span");
        leftSwapperText.className = "swapperText";
        leftSwapperText.innerHTML = "\u21D4";
        leftSwapper.appendChild(leftSwapperText);
      }

      if (rowIdx > 0 && Array.isArray(arrayElements[rowIdx - 1]) && columnIdx < arrayElements[rowIdx - 1].length) {
        const topSwapper = document.createElement("div");
        topSwapper.className = "topSwapper showOnHover";
        topSwapper.onclick = () => swapElements(rowIdx, columnIdx, rowIdx - 1, columnIdx);
        outsideCell.appendChild(topSwapper);

        const topSwapperText = document.createElement("span");
        topSwapperText.className = "swapperText"
        topSwapperText.innerHTML = "\u21D5";;
        topSwapper.appendChild(topSwapperText);
      }

    }
  }
  // console.log(arrayElements);
  // console.log(arrayCells);
}




//  console.log()
