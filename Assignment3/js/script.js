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
  createCanvas(1000, 800); 
  chillX = width / 2;
  chillY = height / 2;
  chillSpeedX = random(-5, 5); 
  chillSpeedY = random(-5, 5); 
  jumpX = width / 3;
  jumpY = height / 3;

  // Move Time (5 sec?)
  setInterval(moveJumpCat, 1000);
}

function draw() {
  background(225,192,203);

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
  image(aiCatImage, 200, 100);

  image(chillCatImage, chillX, chillY);

  image(jumpCatImage, jumpX, jumpY);
  
  // Border
  noStroke();
  fill(150, 200, 255);
  rect(0, 0, 1000, 25);
  rect(0, 0, 25, 1000);
  rect(25, 775, 1000, 25);
  rect(975, 25, 25, 1000);
  fill(0);
  
  // Font
  textFont(Font); // Changed from newFont to Font
  textSize(25);
  text("Violet Zumwalt", 800, 790);
  text("Cat Images", 100, 75);
}

// Jump Move
function moveJumpCat() {
  jumpX = random(width);
  jumpY = random(height);
}
