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

var timer = 30; // Timer in seconds
var timerInterval;

var youWinTextSize = 60;
var playAgainButton;

var yuckSound;

function preload() {
    // Load idle images
    for (var i = 1; i <= 8; i++) {
        idleImages.push(loadImage('catImages/Idle (' + i + ').png'));
    }

    // Load run images
    for (var i = 1; i <= 8; i++) {
        runImages.push(loadImage('catImages/Run (' + i + ').png'));
    }

    // Load sound effect
    yuckSound = loadSound('sounds/yuck.mp3');
    yumSound = loudSound('sounds/chomp.mp3');
    bgSound = loudSound('sounds/CookingMusic.mp3');
}

function setup() {
    createCanvas(500, 500);

    // Kity
    catAnimation = new AnimationImage(headX, headY, 100, 100, idleImages);

    // Good Food (Tomato)
    for (var i = 0; i < 5; i++) {
        myCircles[i] = new myCircle(random(10, width - 10), random(10, height - 10), random(5, 25), random(100, 255), random(75), random(150));
    }

    // Bad Food (Yellow Circles)
    for (var i = 0; i < 3; i++) {
        myCircles.push(new myCircle(random(10, width - 10), random(10, height - 10), random(5, 25), 255, 255, 0));
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

    // Update circle positions
    updateCircles();

    // Tomato
    for (var i = 0; i < myCircles.length; i++) {
        myCircles[i].draw();
        if (myCircles[i].checkCollision(catAnimation)) {
            // collision with cat
            if (myCircles[i].r === 255 && myCircles[i].g === 255 && myCircles[i].b === 0) {
                points--; // Decrease points for bad food
                // Play sound effect
                yuckSound.play();
            } else {
                points++;
            }
            myCircles[i].resetPosition();
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

function updateCircles() {
    for (var i = 0; i < myCircles.length; i++) {
        myCircles[i].jumpRandomly();
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
    constructor(x, y, diameter, r, g, b) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.r = r;
        this.g = g;
        this.b = b;
        this.speedX = random(-3, 3);
        this.speedY = random(-3, 3);
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
