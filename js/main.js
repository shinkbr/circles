var w = window.innerWidth;
var h = window.innerHeight;
var r = 30;

var svg = d3.select("body").append("svg").attr({
  "width": w,
  "height": h
});
var gCircle = svg.append("g")
var gClock = svg.append("g")

var clock = gClock.append("text").attr({
  "x": w / 2,
  "y": h / 2,
  "text-anchor": "middle",
  "font-family": "Stalemate, cursive",
  "font-size": "100pt"
}).text(Date(Date.now()).split(" ").slice(0,5).join(" "));

function xrnd(){ return Math.random() * w }
function yrnd(){ return Math.random() * h }
function rrnd(){ return Math.random() * r }
function frnd() {
  var letters = "0123456789ABCDEF".split("");
  var color = "#";
  for (var i=0; i<6; i++){
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function addCircle(){
  gCircle.append("circle").attr({
    "cx": xrnd,
    "cy": yrnd,
    "r": rrnd,
    "fill": frnd
  })
}

function shuffle(){
  gCircle.selectAll("circle").transition().attr({
    "cx": xrnd,
    "cy": yrnd,
    "r": rrnd,
    "fill": frnd
  })
}

function tick(){
  shuffle();
  clock.text(Date(Date.now()).split(" ").slice(0,5).join(" "));
}

// event handler for a space key to add a circle
$(window).keydown(function(e){
  if(e.which === 32){
    addCircle();
  }
});

for (var i=0; i<80; i++){
  addCircle();
}

// dirty hack to fix the clock's position
setTimeout(function(){
  var bb = clock[0][0].getBoundingClientRect();
  clock.attr({"x": bb.left, "text-anchor": "start"});
}, 800);

var shf = setInterval(tick, 1000);
