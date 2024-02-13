let catImg;
let x, y;
let xSpeed, ySpeed;

function preload() {
  catImg = loadImage('Images/Cat-Selfie.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = random(width);
  y = random(height);
  xSpeed = random(1, 3);
  ySpeed = random(1, 3);
}

let myFont;
function preload() {
  myFont = loadFont('fonts/Kingsman.ttf');
}

function setup() {
  fill('#ED225D');
  textFont(myFont);
  textSize(36);
  text('p5*js', 10, 50);
}

var x = 0;
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  square(x,100,25);
  x++;
}
