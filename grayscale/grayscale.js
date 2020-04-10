// comment
/*
comment
HTMLInputElement

Canvas.toDataUrl(‘image/png’)


*/


// ----------------
// ... display grayscale

const wzor1 = "C = (C'<0.04045) ?  C'/12.92 : (C'+0.055)/1.055)^2.4"
const wzor2 = "C' = (C<0.0031308) ? 12.92*C : 1.055*C^(1/2.4)-0.055"
document.getElementById("wzor1").innerHTML = wzor1;
document.getElementById("wzor2").innerHTML = wzor2;
function showhide(idString) {
  let x = document.getElementById("section" + idString);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}


// ----------------
// ... input/select RGB color

var oneColor; // base color RGB
var arrayOfColors; // array of color: color + 7*gray
const arrayOfIndex = ["00", "02", "03", "04", "05", "06", "07", "08"];
changeColor("00FF00"); // initialize

function changeColor(c) { // after change base color RGB
  oneColor = c;
  arrayOfColors = [c, hexGrayColor(lumxRGB(c)),
    hexGrayColor(lumBT601(c)), hexGrayColor(lumBT709(c)), hexGrayColor(lumBT2100(c)),
    hexGrayColor(gHSI(c)), hexGrayColor(gHSL(c)), hexGrayColor(gHSV(c))];

  document.getElementById("color0id").value = c;
  document.getElementById("color1id").value = "#" + c.toLowerCase();

  for (let i = 0; i < 8; i++) {
    let canvas = document.getElementById("pngCanvas" + arrayOfIndex[i]);
    fillCanvas(canvas, arrayOfColors[i]);
    document.getElementById("pngSpan" + arrayOfIndex[i]).innerHTML = "" + arrayOfColors[i];
  }
}

function color0f() {
  const i = document.getElementById("color0id");
  let x = i.value;
  if (i.checkValidity()) {
    x = x.toUpperCase();
    changeColor(x)
  } else {
    alert("NO valid color hex value! : " + x);
  }
}
function color1f() {
  const i = document.getElementById("color1id");
  let x = i.value;
  x = x.substr(1).toUpperCase();
  changeColor(x)
}

function pngDownload(index) {
  const canvas = document.getElementById("pngCanvas" + arrayOfIndex[index]);
  const name = arrayOfColors[index] + ".png";
  canvasDownload(canvas, name);
}




// ----------------
// functions of canvas


function clearCanvas(canvas) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.beginPath()
}

function fillCanvas(canvas, c) {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#" + c;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function getColorOfPixel0(canvas) {
  const ctx = canvas.getContext("2d");
  const imgData = ctx.getImageData(0, 0, 1, 1);
  return hex8Color(imgData.data);
}

function canvasDownload(canvas, name) {
  const d = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = d;
  a.download = name
  //  document.body.appendChild(a);
  a.click();
  //  document.body.removeChild(a)
  //  delete a;
}


// ----------------
// functions of color and grayscale

function aColor(c) { // from hex6 to array3 <0,1>
  const ac = [c.substr(0, 2), c.substr(2, 2), c.substr(4, 2)];
  for (let i = 0; i < 3; i++) {
    ac[i] = parseInt(ac[i], 16) / 255;
  }
  return ac;
}
function hexGrayColor(c01) { // from <0,1> to hex6
  let hc = Math.round(c01 * 255);
  hc = hex2Color(hc);
  hc = hc + hc + hc;
  return hc
}
function hex2Color(c) { // from <0,255> to hex2
  let hc = c.toString(16);
  if (hc.length < 2) {
    hc = "0" + hc;
  }
  hc = hc.toUpperCase();
  return hc
}
function hex6Color(ac) { // from array3 <0,255> to hex6
  let c = "";
  for (let i = 0; i < 3; i++) {
    c += hex2Color(ac[i]);
  }
  return c;
}
function hex8Color(ac) { // from array4 <0,255> to hex8
  let c = "";
  for (let i = 0; i < 4; i++) {
    c += hex2Color(ac[i]);
  }
  return c;
}


function lum(ac, af) { // multiply two arrays
  let res = 0;
  for (let i = 0; i < 3; i++) {
    res = res + ac[i] * af[i];
  }
  return res;
}

function gammaLin(pNLin) {
  let res;
  if (pNLin < 0.04045) {
    res = pNLin / 12.92;
  } else {
    res = Math.pow((pNLin + 0.055) / 1.055, 2.4);
  }
  return res;
}
function gammaNLin(pLin) {
  let res;
  if (pLin < 0.0031308) {
    res = 12.92 * pLin;
  } else {
    res = 1.055 * Math.pow(pLin, 1 / 2.4) - 0.055;
  }
  return res;
}

function lumxRGB(c) {
  const ac = aColor(c);
  const af = [0.2126, 0.7152, 0.0722];
  for (let i = 0; i < 3; i++) {
    ac[i] = gammaLin(ac[i]);
  }
  let y = lum(ac, af);
  y = gammaNLin(y);
  return y;
}
function lumBT601(c) {
  const ac = aColor(c);
  const af = [0.299, 0.587, 0.114];
  return lum(ac, af);
}
function lumBT709(c) {
  const ac = aColor(c);
  const af = [0.2126, 0.7152, 0.0722];
  return lum(ac, af);
}
function lumBT2100(c) {
  const ac = aColor(c);
  const af = [0.2627, 0.6780, 0.0593];
  return lum(ac, af);
}
function gHSI(c) {
  const ac = aColor(c);
  return ac.reduce((t, x) => t + x, 0) / 3;
}
function gHSL(c) {
  const ac = aColor(c);
  return (Math.max(...ac) + Math.min(...ac)) / 2;
}
function gHSV(c) {
  const ac = aColor(c);
  return Math.max(...ac);
}


// ----------------
// ... functions of array

function array2dim(array, row, col) {
  let newArray = new Array(row);
  for (let i = 0; i < row; i++) {
    newArray[i] = array.slice(i * col, (i + 1) * col);
  }
  return newArray;
}







// ----------------
// ... input RGBA color


const canvasAR = document.getElementById("pngCanvasAR");
const canvasFS = document.getElementById("pngCanvasFS");
const canvasID = document.getElementById("pngCanvasID");


var oneColor2; // base color RGBA
const arrayOfIndex2 = ["AR", "FS", "ID"];
// changeColor2("00FF0002"); // initialize
changeColor2("B0000002"); // initialize


function color2f() { // onchange oneColor2
  const i = document.getElementById("color2id");
  console.log(i.value);
  let x = i.value;
  if (i.checkValidity()) {
    x = x.toUpperCase();
    changeColor2(x);
  } else {
    alert("NO valid color hex value! : " + x);
  }
}
function changeColor2(c) { // after change oneColor2 (base color RGBA)
  oneColor2 = c;
  document.getElementById("color2id").value = c;

  clearCanvas(canvasAR);
  fillCanvas(canvasAR, c.substr(0, 6));
  const cAR = getColorOfPixel0(canvasAR);

  clearCanvas(canvasFS);
  fillCanvas(canvasFS, c);
  const cFS = getColorOfPixel0(canvasFS);

  clearCanvas(canvasID);
  const ctx = canvasID.getContext("2d");

  // ctx.imageSmoothingEnabled = false;
  // ctx.shadowColor = "#ffffffff" // rgba(0, 0, 0, 1);
  // ctx.globalAlpha = 1;
  // ctx.globalCompositeOperation = "copy";
  // //ctx.mozImageSmoothingEnabled = false;

  // console.log("ctx.imageSmoothingEnabled", ctx.imageSmoothingEnabled);
  // console.log("ctx.imageSmoothingQuality", ctx.imageSmoothingQuality);
  // console.log("ctx.shadowColor", ctx.shadowColor);
  // console.log("ctx.globalAlpha", ctx.globalAlpha);
  // console.log("ctx.globalCompositeOperation", ctx.globalCompositeOperation);

  const imgDataID = ctx.getImageData(0, 0, canvasID.width, canvasID.height);
  for (let i = 0; i < imgDataID.width * imgDataID.height; i++) {
    imgDataID.data[4 * i] = parseInt(c.substr(0, 2), 16);
    imgDataID.data[4 * i + 1] = parseInt(c.substr(2, 2), 16);
    imgDataID.data[4 * i + 2] = parseInt(c.substr(4, 2), 16);
    imgDataID.data[4 * i + 3] = parseInt(c.substr(6, 2), 16);

    // #FF060002
    // #B200FF02
    // #B0000002

    // imgDataID.data[4 * i] = 178;
    // imgDataID.data[4 * i + 1] = 0;
    // imgDataID.data[4 * i + 2] = 255;
    // imgDataID.data[4 * i + 3] = 2;
  }
  ctx.putImageData(imgDataID, 0, 0);
  const cID = getColorOfPixel0(canvasID);

  // console.log("imgDataID", imgDataID);

  // const imgDataIDplus = ctx.getImageData(0, 0, canvasID.width, canvasID.height);
  // console.log("imgDataIDplus", imgDataIDplus);

  // console.log("ctx", ctx);
  // console.log("canvasID", canvasID);

  document.getElementById("pngSpanAR").innerHTML = c + " > " + cAR; // + "_AR";
  document.getElementById("pngSpanFS").innerHTML = c + " > " + cFS; // + "_FS";
  document.getElementById("pngSpanID").innerHTML = c + " > " + cID; // + "_ID";

}


function pngDownload2(index) {
  const name = oneColor2 + "_" + index + ".png";
  const canvas = document.getElementById("pngCanvas" + index);
  canvasDownload(canvas, name);
}




// ----------------
// ... tests



/*
//const xColors = ["00", "FF"];
const xColors = ["00", "80", "FF"];
//const xColors = ["00", "55", "AA", "FF"];
//const xColors = ["00", "40", "80", "C0", "FF"];
const nxColors = xColors.length;  // 2, 3, 4, 5
const axColors = []; // wszystkie mozliwe kombinacje - array; 8, 27, 64, 125
for (let i1 = 0; i1 < nxColors; i1++) {
  for (let i2 = 0; i2 < nxColors; i2++) {
    for (let i3 = 0; i3 < nxColors; i3++) {
      axColors.push(xColors[i1] + xColors[i2] + xColors[i3]);
    }
  }
}
const naxColors = axColors.length;
*/

/*
canvasXX.width = naxColors * (32 + 1) - 1;
canvasXX.height = 64;
for (let i = 0; i < naxColors; i++) {
  ctxXX.fillStyle = "#" + axColors[i];
  //ctxXX.fillStyle = "#" + hexGrayColor(lumxRGB(axColors[i]));
  //ctxXX.fillStyle = "#" + hexGrayColor(lumBT601(axColors[i]));
  //ctxXX.fillStyle = "#" + hexGrayColor(lumBT709(axColors[i]));
  //ctxXX.fillStyle = "#" + hexGrayColor(lumBT2100(axColors[i]));
  //ctxXX.fillStyle = "#" + hexGrayColor(gHSI(axColors[i]));
  //ctxXX.fillStyle = "#" + hexGrayColor(gHSL(axColors[i]));
  //ctxXX.fillStyle = "#" + hexGrayColor(gHSV(axColors[i]));
  ctxXX.fillRect(i * 32 + i * 1, 0, 32, 64);
  ctxXX.fillStyle = "#000000"
  ctxXX.fillRect((i + 1) * 32 + i * 1, 0, 1, 64);
}
*/

/*
canvasXX.width = 32;
canvasXX.height = 64;
for (let i = 0; i < naxColors; i++) {
  var c = axColors[i];
  var g = hexGrayColor(gHSV(axColors[i]));
  ctxXX.fillStyle = "#" + g;
  ctxXX.fillRect(0, 0, canvasXX.width, canvasXX.height);
  var d = canvasXX.toDataURL();
  var a = document.createElement("a");
  a.href = d;
  //a.download = c + ".png";
  a.download = g.substr(0,2) + "_" + c + ".png";
  a.click();
}
*/






// ----------------
// ... input/select graphics file


let nameGfile = "";
const imgGFile = document.getElementById("imgGFile");
const anchorGFile = document.getElementById("anchorGFile");
const spanGFile = document.getElementById("spanGFile");
const spanGImage = document.getElementById("spanGImage");
const divX = document.getElementById("divX");
const divT = document.getElementById("divT");

let nnn = 0;

const arrayOfFunction = [["00", "color", null], ["01", "alpha", null], ["02", "gray", lumxRGB],
["03", "gray", lumBT601], ["04", "gray", lumBT709], ["05", "gray", lumBT2100],
["06", "gray", gHSI], ["07", "gray", gHSL], ["08", "gray", gHSV]];

const arrayOfColorElements = arrayOfFunction.map(element => {
  const div = document.createElement("div");
  const img = document.createElement("img");
  const name = document.createElement("img");
  name.src = "images/name-" + element[0] + ".png";
  div.className = "divOfColorElement";
  img.className = "imgOfColorElement";
  name.className = "imgOfColorName";
  div.appendChild(img);
  div.appendChild(name);
  return [div, img, element];
});



function onchangeG(gfiles) {
  nameGfile = "";
  imgGFile.src = "";
  anchorGFile.href = "";
  anchorGFile.download = "";
  spanGFile.innerHTML = "";
  spanGImage.innerHTML = "";
  divX.innerHTML = "";
  divT.innerHTML = "";
  nnn++;
  let textfile = "";
  if (gfiles.length === 0) {
    textfile = "no file selected";
  } else {
    const gfile = gfiles[0];
    nameGfile = gfile.name;
    textfile += " ; name: " + gfile.name;
    textfile += " ; size: " + gfile.size + " B";
    textfile += " ; type: " + gfile.type;
    if (gfile.type.startsWith("image/")) {
      imgFromFile(gfile);  // to imgFile
    } else {
      textfile += " ; no image type";
    }
  }
  textfile += " ; file no. " + nnn;
  spanGFile.innerHTML = textfile;
}

function imgFromFile(xfile) {
  //readerx.onload = (function(i) { return function(e) { i.src = e.target.result; }; })(imgGFile);
  const xreader = new FileReader();
  xreader.onload = function () { imgGFile.src = xreader.result; }
  xreader.readAsDataURL(xfile);
  //imgGFile.src = URL.createObjectURL(xfile);
  //imgGFile.onload = function() { URL.revokeObjectURL(this.src); }
}

function onloadG() {
  const textimage = " ; size: " + imgGFile.naturalWidth + "x" + imgGFile.naturalHeight + " px";
  spanGImage.innerHTML = textimage;
  anchorGFile.href = imgGFile.src;
  anchorGFile.download = nameGfile;

  let w = Math.floor((Math.max(document.body.clientWidth, 1255) - 18) / 3);
  let h; // w ; 1255 = max other element ; 18=3+6+6+3 = interspace
  if (imgGFile.naturalWidth <= w) {
    w = imgGFile.naturalWidth;
    h = imgGFile.naturalHeight;
  } else {
    h = Math.ceil(w * imgGFile.naturalHeight / imgGFile.naturalWidth);
  }
  w = Math.max(w, 142); // 142 = name element
  h = Math.max(h, 32); //  54 = swap element ; 6 = interspace ; 19+1 = name element ; 54-6-20 ; add 4
  // console.log(w, h);

  // let canvasX = imgToCanvas(imgGFile, "color", null);

  let canvasX = document.createElement("canvas");
  canvasX.width = imgGFile.naturalWidth;
  canvasX.height = imgGFile.naturalHeight;
  let ctxX = canvasX.getContext("2d");
  ctxX.drawImage(imgGFile, 0, 0);
  let imgDataX = ctxX.getImageData(0, 0, canvasX.width, canvasX.height);

  // imgDataX.data[0] = 178;
  // imgDataX.data[1] = 0;
  // imgDataX.data[2] = 255;
  // imgDataX.data[3] = 2;
  // ctx.putImageData(imgDataX, 0, 0)

  let imgX = document.createElement("img");
  imgX.src = canvasX.toDataURL();
  imgX.className = "imgX";
  imgX.style.maxWidth = (Math.max(document.body.clientWidth, 1255) - 6) + "px";
  // width ; 1255 = max other element ; 3+3 = padding,border,margin
  let aX = document.createElement("a");
  aX.appendChild(imgX);
  aX.href = imgX.src;
  aX.download = "";
  aX.className = "aX";
  // divX.appendChild(canvasX);
  // divX.appendChild(imgX);
  divX.appendChild(aX);

  arrayOfColorElements.forEach(element => {
    element[1].src = imgToCanvas(imgGFile, element[2][1], element[2][2]).toDataURL();
    element[1].style.maxWidth = w + "px";
    element[1].style.maxHeight = h + "px";
    element[0].style.width = w + "px";
    element[0].style.height = (h + 20) + "px";
    // console.log(element);
  });
  let arrayOfColorElements33 = arrayOfColorElements.map(element => {  // array of element (div)
    return element[0];
  });
  arrayOfColorElements33 = array2dim(arrayOfColorElements33, 3, 3);
  displayArrayOfElements(divT, arrayOfColorElements33, w, h + 20);  // external - array.js
}

function imgToCanvas(img, sign, functionGray) {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  if (sign === "alpha") {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < imgData.width * imgData.height; i++) {
      imgData.data[4 * i + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
  } else if (sign === "gray") {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < imgData.width * imgData.height; i++) {
      let rgb = [imgData.data[4 * i], imgData.data[4 * i + 1], imgData.data[4 * i + 2]];
      rgb = hex6Color(rgb);
      let gray = functionGray(rgb);
      gray = Math.round(gray * 255);
      imgData.data[4 * i] = gray;
      imgData.data[4 * i + 1] = gray;
      imgData.data[4 * i + 2] = gray;
      imgData.data[4 * i + 3] = 255
    }
    ctx.putImageData(imgData, 0, 0);
  }
  return canvas;
}

function addElementToCell(cell, element) {  // from element (div) to insideCell (div)
  // let els = cell.getElementsByClassName("element");
  // Array.prototype.forEach.call(els, function (el) {
  //   cell.removeChild(el);
  // });
  if (element) {
    cell.appendChild(element);
  }
}











// ----------------

/*
comment

console.log();
//console.log();

a.forEach(e => {
  xxxxx;
})
x = a.map(e => {
  xxxxx;
})


i = window.createElement("img");
i.src = "xxx";
i.alt = "xxx";


imgWidthMax = Math.floor(Math.max(document.body.clientWidth, 1255) - 18) / 3);
imgHeightMax = Math.ceil(imgWidthMax * imgGFile.naturalHeight / imgGFile.naturalWidth);




function sum1(x, y) {
  return x + y;
}
var sum2 = function (x, y) {
  return x + y;
}
var sum3 = (x, y) => x + y;


*/

