let headX = 250;
let headY = 250;
let headDirection = 5;

let myCircles = []; 
let greyRectangles = []; 

let idleImages = [];
let runImages = [];

let catAnimation;

let points = 0;
let health = 10; //  health to 10

let timer = 0; // Timer to 0
let timerInterval;

let youWinTextSize = 30; 
let playAgainButton;

let yuckSound; //  the bad food sound 
let chompSound; //  the good food sound 
let cookingMusic; //  the cooking music 

let isMusicStarted = false; 

function preload() {
  //idle and run
    for (let i = 1; i <= 8; i++) {
        idleImages.push(loadImage('catImages/Idle (' + i + ').png'));
    }

 
    for (let i = 1; i <= 8; i++) {
        runImages.push(loadImage('catImages/Run (' + i + ').png'));
    }

    // Load sound effects
    yuckSound = loadSound('sounds/yuck.mp3');
    chompSound = loadSound('sounds/chomp.mp3');
    cookingMusic = loadSound('sounds/Cooking_Music.mp3');
}

function setup() {
    createCanvas(500, 500);

    backgroundPattern();
    
    // Kitty
    catAnimation = new AnimationImage(headX, headY, 100, 100, idleImages);

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

    // Croutons
    for (let rect of greyRectangles) {
        rect.draw();
    }

    // Kitty
    catAnimation.display();

 
    updateCircles();

    // Toma
    for (let i = 0; i < myCircles.length; i++) {
        myCircles[i].draw();
        if (myCircles[i].checkCollision(catAnimation)) {
            if (myCircles[i].isBadFood) {
                health--; //ouch?
                // Yucky
                yuckSound.play();
            } else {
                points++;
                // Good Food
                chompSound.play();
            }
            myCircles[i].resetPosition();
            break;
        }
    }

    // Running
    if (health > 0 && timer > 0) { // Only allow movement if health is greater than 0 and timer is running
        if (keyIsDown(LEFT_ARROW)) {
            let canMove = true;
            for (let rect of greyRectangles) {
                if (rect.checkCollision(catAnimation, -5, 0)) {
                    canMove = false;
                    break;
                }
            }
            if (canMove) {
                catAnimation.move(-5, 0);
                catAnimation.images = runImages;
            }
        } else if (keyIsDown(RIGHT_ARROW)) {
            let canMove = true;
            for (let rect of greyRectangles) {
                if (rect.checkCollision(catAnimation, 5, 0)) {
                    canMove = false;
                    break;
                }
            }
            if (canMove) {
                catAnimation.move(5, 0);
                catAnimation.images = runImages;
            }
        } else {
            catAnimation.images = idleImages;
        }
        if (keyIsDown(UP_ARROW)) {
            let canMove = true;
            for (let rect of greyRectangles) {
                if (rect.checkCollision(catAnimation, 0, -5)) {
                    canMove = false;
                    break;
                }
            }
            if (canMove) {
                catAnimation.move(0, -5);
            }
        }
        if (keyIsDown(DOWN_ARROW)) {
            let canMove = true;
            for (let rect of greyRectangles) {
                if (rect.checkCollision(catAnimation, 0, 5)) {
                    canMove = false;
                    break;
                }
            }
            if (canMove) {
                catAnimation.move(0, 5);
            }
        }
    }

    // Time, Score, Health!
    fill(0); 
    textSize(15);
    textAlign(LEFT, BOTTOM);
    text("Timer: " + timer, 10, height - 10);

    fill(0); 
    textSize(15); 
    textAlign(LEFT, BOTTOM);
    text("Points: " + points, 10, height - 30);

    fill(255, 0, 0); 
    textSize(15); 
    textAlign(LEFT, BOTTOM);
    text("Health: " + health, 10, height - 50); 

    if (points === 10) {
        timer = 0;
        clearInterval(timerInterval);
        fill(0, 255, 0);
        textSize(youWinTextSize);
        textAlign(CENTER, CENTER);
        text("That's a full Kitty!", width / 2, height / 2);
        playAgainButton.show();
    } else if (health <= 0 || timer === 0) { // Game over
        fill(255, 0, 0);
        textSize(youWinTextSize);
        textAlign(CENTER, CENTER);
        text("Kitty Got Sick!", width / 2, height / 2);
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
    health = 10; 
    playAgainButton.hide();
    if (!isMusicStarted) {
        cookingMusic.loop();
        isMusicStarted = true;
    }
    
    greyRectangles = [];
    for (let i = 0; i < 3; i++) {
        let x, y;
        do {
            x = random(width - 50);
            y = random(height - 50);
        } while (collideRectRect(x, y, 50, 50, headX - 50, headY - 50, 100, 100)); // Ensure the rectangle doesn't collide with the cat
        greyRectangles.push(new GreyRectangle(x, y, 50, 50));
    }
    
  
    myCircles = [];
    // Toma
    for (let i = 0; i < 5; i++) {
        myCircles.push(new MyCircle(random(10, width - 10), random(10, height - 10), random(5, 25), random(100, 255), random(75), random(150), false));
    }
    
    // Bad Toma
    for (let i = 0; i < 3; i++) {
        myCircles.push(new MyCircle(random(10, width - 10), random(10, height - 10), random(5, 25), 255, 255, 0, true));
    }
    

    timerInterval = setInterval(updateTimer, 1000);
}

function updateCircles() {
    for (let i = 0; i < myCircles.length; i++) {
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

class MyCircle {
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

class GreyRectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw() {
        fill(150);
        rect(this.x, this.y, this.width, this.height);
    }

    checkCollision(otherObject, dx = 0, dy = 0) {
        return collideRectRect(this.x, this.y, this.width, this.height, otherObject.x + dx, otherObject.y + dy, otherObject.w, otherObject.h);
    }
}

// BG Circles
function backgroundPattern() {
  
    background(255);
  
 
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
