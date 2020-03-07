// comment
/*
comment
HTMLInputElement

Canvas.toDataUrl(‘image/png’)



*/

var selected_color;
change_color("808080");

function change_color(x) {
  selected_color = x;
  insert0f(x);
  insert1f(x);
  fill_canvas(x);
}


function insert0f(x) {
  var i = document.getElementById("color0id")
  i.value = x;
}

function insert1f(x) {
  var i = document.getElementById("color1id")
  i.value = "#"+x.toLowerCase();
}

function color0f() {
  var i = document.getElementById("color0id");
  var x = i.value;
  if (i.checkValidity()) {
    x = x.toUpperCase();
    change_color(x)
//    alert("OK - color0f : "+x);
  } else {
    alert("NO valid color hex value! : "+x);
  }
}

function color1f() {
  var i = document.getElementById("color1id");
  var x = i.value;
  x = x.substr(1).toUpperCase();
  change_color(x)
//  alert("OK - color1f : "+x);
}

function fill_canvas(x) {
  var c = document.getElementById("canvas0");
  var ctx = c.getContext("2d");
  ctx.fillStyle = "#"+x;
  ctx.fillRect(0,0,c.width,c.height);
}

function pgn0f() {
  var c = document.getElementById("canvas0");
  var d = c.toDataURL();
  var a = document.createElement("a");
  a.href = d;
  a.download = selected_color+".png";
//  document.body.appendChild(a);
  a.click();
//  document.body.removeChild(a)
//  delete a;
//  alert("OK - pgn0f");
}





/*
comment



*/

