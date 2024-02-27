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

var forkX = 50;
var forkY = 200;

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

var myCircles = []; 

var idleImages = []; 

function preload() {
    // Load idle images
    for (var i = 1; i <= 8; i++) {
        idleImages.push(loadImage('catImages/Idle (' + i + ').png'));
    }
}

var catAnimation;

function setup() {
    createCanvas(500, 500);

    // Create cat animation
    catAnimation = new AnimationImage(30, 350, 100, 100, idleImages);

    //Circles spawning
    for (var i = 0; i < 5; i++) {
        myCircles[i] = new myCircle(random(10, width - 10), random(10, height - 10), random(5, 25), random(100, 255), random(75), random(150)); //
    }
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

    // tomato
    strokeWeight(5);
    fill(200, 0, 5);
    circle(toma1X, toma1Y, 20);
    circle(toma2X, toma2Y, 20);
    circle(toma3X, toma3Y, 20);
    circle(toma4X, toma4Y, 20);
    circle(toma5X, toma5Y, 20);

    // pepper
    point(245, 215);
    point(230, 185);
    point(260, 195);

    // cheese
    line(200, 300, 200, 150);
    line(300, 250, 180, 270);
    line(325, 180, 360, 200);
    line(285, 300, 360, 330);

    // Fork and movement
    line(forkX, forkY, forkX, forkY + 200);
    line(forkX, forkY + 50, forkX + 25, forkY + 50);
    line(forkX, forkY + 50, forkX - 25, forkY + 50);
    line(forkX - 25, forkY, forkX - 25, forkY + 50);
    line(forkX + 25, forkY, forkX + 25, forkY + 50);

    if (keyIsDown(LEFT_ARROW)) {
        forkX -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        forkX += 5;
    }
    if (keyIsDown(UP_ARROW)) {
        forkY -= 5;
    }
    if (keyIsDown(DOWN_ARROW)) {
        forkY += 5;
    }

    // Collision detection with toma
    if (
        (forkX >= toma1X - 10 && forkX <= toma1X + 10 && forkY >= toma1Y - 10 && forkY <= toma1Y + 10) ||
        (forkX >= toma2X - 10 && forkX <= toma2X + 10 && forkY >= toma2Y - 10 && forkY <= toma2Y + 10) ||
        (forkX >= toma3X - 10 && forkX <= toma3X + 10 && forkY >= toma3Y - 10 && forkY <= toma3Y + 10) ||
        (forkX >= toma4X - 10 && forkX <= toma4X + 10 && forkY >= toma4Y - 10 && forkY <= toma4Y + 10) ||
        (forkX >= toma5X - 10 && forkX <= toma5X + 10 && forkY >= toma5Y - 10 && forkY <= toma5Y + 10)
    ) {
        // If fork touches any tomato, bye
        toma1X = -100;
        toma1Y = -100;
        toma2X = -100;
        toma2Y = -100;
        toma3X = -100;
        toma3Y = -100;
        toma4X = -100;
        toma4Y = -100;
        toma5X = -100;
        toma5Y = -100;
    }

    // no more secondary circles.
    for (var i = 0; i < myCircles.length; i++) {
        var d = dist(forkX, forkY, myCircles[i].x, myCircles[i].y);
        if (d < myCircles[i].diameter / 2 + 10) {
            myCircles.splice(i, 1);
        }
    }

    fill(120);
    textSize(size);

    text("Violet Zumwalt", 400, 500);

    fill(120, 0, 60);

    // Draw circles
    for (var i = 0; i < myCircles.length; i++) {
        myCircles[i].draw();
    }

    // Draw cat animation
    catAnimation.display();
}

function mouseClicked() {

    //spawn tomatos
    mouseShapeX = mouseX;
    mouseShapeY = mouseY;

    // toma location also changes
    toma1X = random(0, width);
    toma1Y = random(0, height);
    toma2X = random(0, width);
    toma2Y = random(0, height);
    toma3X = random(0, width);
    toma3Y = random(0, height);
    toma4X = random(0, width);
    toma4Y = random(0, height);
    toma5X = random(0, width);
    toma5Y = random(0, height);
}

