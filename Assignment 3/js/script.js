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

function draw() {
  background(220);
  
  // Draw the cat image
  image(catImg, x, y, 100, 100);
  
  // Move the cat
  x += xSpeed;
  y += ySpeed;
  
  // Bounce when hitting the edges
  if (x <= 0 || x >= width - 100) {
    xSpeed *= -1;
  }
  if (y <= 0 || y >= height - 100) {
    ySpeed *= -1;
  }
}
