// Load the images
let jumpCatImage;
let chillCatImage;
let aiCatImage;

var Font;

function preload() {
  jumpCatImage = loadImage('images/Cat-Jump.png');
  chillCatImage = loadImage('images/Cat-Chill.png');
  aiCatImage = loadImage('images/AI-Cat.png');
  Font = loadFont('fonts/Kingsman.ttf');
}

// Chill speeds and locale
let chillX, chillY; 
let chillSpeedX, chillSpeedY; 

// Jump Locale
let jumpX, jumpY; 

function setup() {
  createCanvas(800, 600); 
  chillX = width / 2;
  chillY = height / 2;
  chillSpeedX = random(-5, 5); 
  chillSpeedY = random(-5, 5); 
  jumpX = width / 2;
  jumpY = height / 2;

  // Move Time (5 sec?)
  setInterval(moveJumpCat, 5000);
}

function draw() {
  background(255);

  // Chill locale
  chillX += chillSpeedX;
  chillY += chillSpeedY;
  
  // Wall jump
  if (chillX <= 0 || chillX >= width) {
    chillSpeedX *= -1;
  }
  if (chillY <= 0 || chillY >= height) {
    chillSpeedY *= -1;
  }
  
  // Cat Spawner
  image(chillCatImage, chillX, chillY);
  
  image(aiCatImage, 200, 200);

  image(jumpCatImage, jumpX, jumpY);
  
  // Border
  noStroke();
  fill(150, 200, 255);
  rect(0, 0, 800, 25);
  rect(0, 25, 25, 600);
  rect(25, 575, 800, 25);
  rect(775, 25, 25, 600);
  fill(0);
  
  // Font
  textFont(newFont);
  textSize(25);
  text("Violet Zumwalt", 500, 525);
  text("Cat Images", 100, 75);
}

// Jump Move
function moveJumpCat() {
  jumpX = random(width);
  jumpY = random(height);
}
