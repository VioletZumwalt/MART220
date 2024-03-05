// JavaScript source code

var headX = 250;
var headY = 250;
var headDirection = 5;

var toma1X = 300;
var toma1Y = 200;
var toma2X = 285;
var toma2Y = 300;
var toma3X = 120;
var toma3Y = 250;
var toma4X = 320;
var toma4Y = 250;
var toma5X = 180;
var toma5Y = 210;

var mouseShapeX;
var mouseShapeY;

var myCircles = []; // declare a circle array

var idleImages = [];
var runImages = [];

var catAnimation;

var points = 0;

var timer = 30; // Timer in seconds
var timerInterval;

var youWinTextSize = 60;
var playAgainButton;

function preload() {
    // Load idle images
    for (var i = 1; i <= 8; i++) {
        idleImages.push(loadImage('catImages/Idle (' + i + ').png'));
    }

    // Load run images
    for (var i = 1; i <= 8; i++) {
        runImages.push(loadImage('catImages/Run (' + i + ').png'));
    }
}

function setup() {
    createCanvas(500, 500);

    // Kity
    catAnimation = new AnimationImage(headX, headY, 100, 100, idleImages);

    //Tomato
    for (var i = 0; i < 5; i++) {
        myCircles[i] = new myCircle(random(10, width - 10), random(10, height - 10), random(5, 25), random(100, 255), random(75), random(150)); //
    }

    // Start timer countdown
    timerInterval = setInterval(updateTimer, 1000);

    // PLAY AGAIN
    playAgainButton = createButton("Play again?");
    playAgainButton.position(width / 2 - 50, height - 50); 
    playAgainButton.mousePressed(resetGame);
    playAgainButton.hide();
}

function draw() {
    background(120, 45, 200);
    textSize(22);
    text("Food!", 30, 80);

    // plate
    fill(300, 300, 300);
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

    // Tomato
    for (var i = 0; i < myCircles.length; i++) {
        myCircles[i].draw();
        if (checkCollision(catAnimation.x + catAnimation.w / 2, catAnimation.y + catAnimation.h / 2, myCircles[i].x, myCircles[i].y, catAnimation.w / 2)) {
            // collission with cat
            myCircles[i].x = random(10, width - 10);
            myCircles[i].y = random(10, height - 10);
            points++; 
            break;
        }
    }

    // kitty
    catAnimation.display();

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
    fill(255);
    textAlign(LEFT, BOTTOM);
    text("Timer: " + timer, 10, height - 10);

    fill(255);
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

function drawTomato(x, y) {
    strokeWeight(5);
    fill(200, 0, 5);
    circle(x, y, 20);
}

function checkCollision(catX, catY, objX, objY, radius) {
    var d = dist(catX, catY, objX, objY);
    return d < radius; 
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
    timerInterval = setInterval(updateTimer, 1000); 
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
    constructor(x, y, diameter, r, g, b) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.r = r;
        this.g = g;
        this.b = b;
    }

    draw() {
        fill(this.r, this.g, this.b);
        circle(this.x, this.y, this.diameter);
    }
}
