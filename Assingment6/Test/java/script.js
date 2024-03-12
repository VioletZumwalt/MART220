// JavaScript source code

var headX = 250;
var headY = 250;
var headDirection = 5;

var mouseShapeX;
var mouseShapeY;

var myCircles = []; // declare a circle array

var idleImages = [];
var runImages = [];

var catAnimation;

var points = 0;

var timer = 0; // Timer in seconds, initially set to 0
var timerInterval;

var youWinTextSize = 30; // Decreased text size
var playAgainButton;

var yuckSound; // Declare the bad food sound variable
var chompSound; // Declare the good food sound variable
var cookingMusic; // Declare the cooking music variable

var isMusicStarted = false; // Flag to track if music has started

function preload() {
    // Load idle images
    for (var i = 1; i <= 8; i++) {
        idleImages.push(loadImage('catImages/Idle (' + i + ').png'));
    }

    // Load run images
    for (var i = 1; i <= 8; i++) {
        runImages.push(loadImage('catImages/Run (' + i + ').png'));
    }

    // Load sound effects
    yuckSound = loadSound('sounds/yuck.mp3');
    chompSound = loadSound('sounds/chomp.mp3');
    cookingMusic = loadSound('sounds/Cooking_Music.mp3');
}

function setup() {
    createCanvas(500, 500);
    // Set up the background pattern
    backgroundPattern();
    
    // Kity
    catAnimation = new AnimationImage(headX, headY, 100, 100, idleImages);

    // Good Food (Tomato)
    for (var i = 0; i < 5; i++) {
        myCircles[i] = new myCircle(random(10, width - 10), random(10, height - 10), random(5, 25), random(100, 255), random(75), random(150), false);
    }

    // Bad Food (Yellow Circles)
    for (var i = 0; i < 3; i++) {
        myCircles.push(new myCircle(random(10, width - 10), random(10, height - 10), random(5, 25), 255, 255, 0, true));
    }

    // PLAY AGAIN
    playAgainButton = createButton("Play again?");
    playAgainButton.position(width / 2 - 50, height - 50);
    playAgainButton.mousePressed(resetGame);
    playAgainButton.hide();
}

function draw() {
    // Clear the canvas
    clear();
    
    // Set up the background pattern
    backgroundPattern();

        // plate
        fill(50, 50, 50);
        circle(headX, headY, 300);
    
      // lettuce
      strokeWeight(8);
      fill(0, 179, 113);
      triangle(200, 150, 250, 192, 320, 320);
      triangle(200, 200, 380, 200, 360, 360);
      triangle(160, 350, 250, 192, 320, 320);
      triangle(210, 320, 135, 192, 320, 150);
      triangle(140, 320, 250, 192, 150, 320);
      triangle(160, 320, 230, 150, 320, 320);
      triangle(200, 320, 290, 150, 380, 320);
      triangle(200, 320, 210, 150, 320, 320);
      triangle(300, 320, 380, 200, 320, 320);
    
      // pepper
      point(245, 215);
      point(230, 185);
      point(260, 195);
    
      // cheese
      line(200, 300, 200, 150);
      line(300, 250, 180, 270);
      line(325, 180, 360, 200);
      line(285, 300, 360, 330);
    
    // Kity
    catAnimation.display();

    // Update circle positions
    updateCircles();

    // Tomato
    for (var i = 0; i < myCircles.length; i++) {
        myCircles[i].draw();
        if (myCircles[i].checkCollision(catAnimation)) {
            // collision with cat
            if (myCircles[i].isBadFood) {
                points--; // Decrease points for bad food
                // Play bad food sound effect
                yuckSound.play();
            } else {
                points++;
                // Play good food sound effect
                chompSound.play();
            }
            myCircles[i].resetPosition();
            break;
        }
    }

    // Movement
    if (timer > 0) {
        if (keyIsDown(LEFT_ARROW)) {
            catAnimation.move(-5, 0);
            catAnimation.images = runImages;
        } else if (keyIsDown(RIGHT_ARROW)) {
            catAnimation.move(5, 0);
            catAnimation.images = runImages;
        } else {
            catAnimation.images = idleImages;
        }
        if (keyIsDown(UP_ARROW)) {
            catAnimation.move(0, -5);
        }
        if (keyIsDown(DOWN_ARROW)) {
            catAnimation.move(0, 5);
        }
    }

    // Timer and points
    fill(0); // Black text color
    textSize(15); // Decreased text size
    textAlign(LEFT, BOTTOM);
    text("Timer: " + timer, 10, height - 10);

    fill(0); // Black text color
    textSize(15); // Decreased text size
    textAlign(LEFT, BOTTOM);
    text("Points: " + points, 10, height - 30);

    if (points === 20) {
        timer = 0;
        clearInterval(timerInterval);
        fill(0, 255, 0);
        textSize(youWinTextSize);
        textAlign(CENTER, CENTER);
        text("That's a full Kitty!", width / 2, height / 2);
        playAgainButton.show();
    } else if (timer === 0) {
        fill(255, 0, 0);
        textSize(youWinTextSize);
        textAlign(CENTER, CENTER);
        text("Kitty is still hungry!", width / 2, height / 2);
        playAgainButton.show();
    }
}

function updateTimer() {
    if (timer > 0) {
        timer--;
    } else {
        clearInterval(timerInterval);
    }
}

function resetGame() {
    // Reset 
    timer = 30;
    points = 0;
    playAgainButton.hide();
    if (!isMusicStarted) {
        cookingMusic.loop();
        isMusicStarted = true;
    }
    
    // Start timer interval
    timerInterval = setInterval(updateTimer, 1000);
}

function updateCircles() {
    for (var i = 0; i < myCircles.length; i++) {
        myCircles[i].jumpRandomly();
    }
}

function mousePressed() {
    if (timer == 0) { // Start timer only if it's not already running
        timerInterval = setInterval(updateTimer, 1000);
    }
}

class AnimationImage {
    constructor(x, y, width, height, images) {
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        this.images = images;
        this.currentImageIndex = 0;
        this.timerInterval = 250;
        this.timer = setInterval(this.nextImage.bind(this), this.timerInterval);
    }

    display() {
        image(this.images[this.currentImageIndex], this.x, this.y, this.w, this.h);
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    nextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }
}

class myCircle {
    constructor(x, y, diameter, r, g, b, isBadFood) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.r = r;
        this.g = g;
        this.b = b;
        this.speedX = random(-3, 3);
        this.speedY = random(-3, 3);
        this.isBadFood = isBadFood;
    }

    draw() {
        fill(this.r, this.g, this.b);
        circle(this.x, this.y, this.diameter);
    }

    checkCollision(otherObject) {
        return collideCircleCircle(this.x, this.y, this.diameter, otherObject.x + otherObject.w / 2, otherObject.y + otherObject.h / 2, otherObject.w);
    }

    resetPosition() {
        this.x = random(10, width - 10);
        this.y = random(10, height - 10);
    }

    jumpRandomly() {
        if (timer > 0) {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > width) {
                this.speedX *= -1;
            }
            if (this.y < 0 || this.y > height) {
                this.speedY *= -1;
            }
        }
    }
}

// Function to create background pattern
function backgroundPattern() {
    // Set background color
    background(255);
  
    // Draw pattern
    for (let x = 0; x < width; x += 20) {
        for (let y = 0; y < height; y += 20) {
            if ((x + y) % 40 === 0) {
                fill(200);
                noStroke();
                circle(x, y, 10);
            }
        }
    }
}
