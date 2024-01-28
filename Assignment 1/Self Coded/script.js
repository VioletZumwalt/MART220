// JavaScript source code
var headX = 250;
var headY = 250;
var headDirection = 5;

var bodyX = 200;
var bodyY = 185;
var bodyDirection = 3;

var size = 15;
var count = -1;
var sizeDirection = 5;


function setup() {
  createCanvas(400,400);
}

function draw() {
  background(220);
}
function setup() {
    createCanvas(500, 500);
}
function draw() {
    background(120, 45, 78);
    textSize(22)
    text("Food!", 30, 80);

    // plate
    fill(300, 300, 300);
    circle(headX, headY, 300);
  
  // decoration
  strokeWeight(8)
  fill(0, 179, 113);
  triangle(200, 150, 250, 192, 320, 320)
  triangle(200, 200, 380, 200, 360, 360)
  triangle(160, 350, 250, 192, 320, 320)
  triangle(210, 320, 135, 192, 320, 150)
  triangle(140, 320, 250, 192, 150, 320)
  triangle(160, 320, 230, 150, 320, 320)
  triangle(200, 320, 290, 150, 380, 320)
  triangle(200, 320, 210, 150, 320, 320)
  triangle(300, 320, 380, 200, 320, 320)

    // tomato
    strokeWeight(5);
    fill(200,0,5)
    circle(300, 200, 20);
    circle(285, 300, 20);
    circle(120, 250, 20);
    circle(320, 250, 20);
    circle(180, 210, 20);

    // pepper
    point(245, 215);
    point(230, 185);
    point(260, 195);

    // cheese
    line(200, 300, 200, 150);
    line(300, 250, 180, 270);
    line(325, 180, 360, 200);
    line(285, 300, 360, 330);

    // Fork 
    line(50, 200, 50, 400)
    line(50, 250, 75, 250)
    line(50, 250, 25, 250)
    line(25, 200, 25, 250)
    line(75, 200, 75, 250)
  

    
    fill(120);
    textSize(size);
   
    text("Violet Zumwalt", 270, 500);
}