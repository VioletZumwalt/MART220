let catAnimation;
let idleImages = [];
let runImages = [];
let jumpImages = [];
let deadImages = [];

let goodFood = [];
let badFood = [];
let particles = [];

let points = 0;
let health = 10;
let isDead = false;
let isWin = false;
let gameStarted = false; 
let cookingMusic;
let yuckSound;
let chompSound;

let foodSpawnInterval = 60; 
let frameCountSinceLastSpawn = 0;

let startButton; 
let playAgainButton; 

function preload() {
    // Kitty Cat
    for (let i = 1; i <= 8; i++) {
        idleImages.push(loadImage('catImages/idle/Idle (' + i + ').png'));
        runImages.push(loadImage('catImages/walk/Walk (' + i + ').png'));
        jumpImages.push(loadImage('catImages/attack/jump (' + i + ').png'));
    }
    for (let i = 1; i <= 10; i++) {
        deadImages.push(loadImage('catImages/dead/Dead (' + i + ').png'));
    }

    // Audio
    cookingMusic = loadSound('sounds/Cooking_Music.mp3');
    yuckSound = loadSound('sounds/yuck.mp3');
    chompSound = loadSound('sounds/chomp.mp3');
}

function setup() {
    createCanvas(800, 400);

    // Buttons
    startButton = createButton("Start Game");
    startButton.position(width / 2 - 50, height / 2);
    startButton.mousePressed(startGame);

    playAgainButton = createButton("Play Again");
    playAgainButton.position(width / 2 - 50, height / 2 + 50);
    playAgainButton.mousePressed(restartGame);
    playAgainButton.hide();

    // cat
    catAnimation = new AnimationImage(100, height / 2, 100, 100, idleImages);
}

function draw() {
    // Background
    background(135, 206, 235); 

    fill(0, 140, 0); 
    rect(0, height / 2, width, height / 2); 

    // Else
    if (gameStarted) {
        // kitty cat
        catAnimation.display();
        if (!isDead && !isWin) {
            handleInput();
            checkCatCollision();
        }

        // food
        frameCountSinceLastSpawn++;
        if (frameCountSinceLastSpawn >= foodSpawnInterval && !isDead && !isWin) {
            frameCountSinceLastSpawn = 0;
            spawnFood();
        }

        for (let food of goodFood) {
            food.display();
            if (!isDead && !isWin) {
                food.update();
            }
        }

        for (let food of badFood) {
            food.display();
            if (!isDead && !isWin) {
                food.update();
            }
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].display();
            if (particles[i].finished()) {
                particles.splice(i, 1);
            }
        }

        // Display score and health
        textSize(20);
        fill(255);
        text("Score: " + points, 20, 30);
        text("Health: " + health, 20, 60);

        // Checks
        if (health <= 0 || points <= -10) {
            gameOver();
        }

        if (points >= 15) {
            winGame();
        }
    }
}

function spawnFood() {

    goodFood.push(new Food(random(width, width * 2), random(50, height - 50), true));

    badFood.push(new Food(random(width, width * 2), random(50, height - 50), false));
}

function handleInput() {
    if (keyIsDown(UP_ARROW) && catAnimation.y > 50) {
        catAnimation.move(0, -5);
        catAnimation.images = jumpImages;function checkCatCollision() {
            for (let i = goodFood.length - 1; i >= 0; i--) {
                if (goodFood[i].checkCollision(catAnimation)) {
                    points++;
                    chompSound.play();
                    spawnParticles(catAnimation.x + catAnimation.w / 2, catAnimation.y + catAnimation.h / 2, [0, 255, 0]); 
                    goodFood.splice(i, 1);
                }
            }
            for (let i = badFood.length - 1; i >= 0; i--) {
                if (badFood[i].checkCollision(catAnimation)) {
                    health--;
                    yuckSound.play();
                    spawnParticles(catAnimation.x + catAnimation.w / 2, catAnimation.y + catAnimation.h / 2, [255, 0, 0]); 
                    badFood.splice(i, 1);
                }
            }
        }
        
    }
    if (keyIsDown(DOWN_ARROW) && catAnimation.y < height - 100) {
        catAnimation.move(0, 5);
        catAnimation.images = runImages;
    }
}

function checkCatCollision() {
    for (let i = goodFood.length - 1; i >= 0; i--) {
        if (goodFood[i].checkCollision(catAnimation)) {
            points++;
            chompSound.play();
            spawnParticles(catAnimation.x + catAnimation.w / 2, catAnimation.y + catAnimation.h / 2, [0, 255, 0]); 
            goodFood.splice(i, 1);
        }
    }
    for (let i = badFood.length - 1; i >= 0; i--) {
        if (badFood[i].checkCollision(catAnimation)) {
            health--;
            yuckSound.play();
            spawnParticles(catAnimation.x + catAnimation.w / 2, catAnimation.y + catAnimation.h / 2, [255, 0, 0]); 
            badFood.splice(i, 1);
        }
    }
}


function gameOver() {
    isDead = true;
    catAnimation.images = deadImages;
    fill(255, 0, 0);
    textSize(30);
    textAlign(CENTER);
    if (health <= 0) {
        text("Kitty got sick!", width / 2, height / 2);
    } else if (points <= -10) {
        text("Kitty missed supper!", width / 2, height / 2);
    } else {
        text("Game Over", width / 2, height / 2);
    }
    cookingMusic.stop();
    playAgainButton.show();
}

function winGame() {
    isWin = true;
    fill(0, 255, 0);
    textSize(30);
    textAlign(CENTER);
    text("You Win!", width / 2, height / 2);
    cookingMusic.stop();
    playAgainButton.show();
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
        this.y += dy;
    }

    nextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }
}

class Food {
    constructor(x, y, isGood) {
        this.x = x;
        this.y = y;
        this.size = 30;
        this.isGood = isGood;
        this.color = isGood ? [0, 255, 0] : [255, 0, 0];
        this.speed = 2;
    }

    display() {
        fill(this.color);
        ellipse(this.x, this.y, this.size);
    }

    update() {
        this.x -= this.speed;
        if (this.x + this.size / 2 < 0) {
            if (this.isGood) {
                points--; // Don't miss good food!
            }
            this.respawn();
        }
    }

    respawn() {
        this.x = random(width, width * 2);
        this.y = random(50, height - 50);
    }

    checkCollision(otherObject) {
        let d = dist(this.x, this.y, otherObject.x + otherObject.w / 2, otherObject.y + otherObject.h / 2);
        return d < this.size / 2 + otherObject.w / 2;
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = random(5, 10);
        this.xSpeed = random(-2, 2);
        this.ySpeed = random(-5, -1);
        this.alpha = 255;
    }

    update() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.alpha -= 5;
    }

    display() {
        noStroke();
        fill(this.color[0], this.color[1], this.color[2], this.alpha);
        ellipse(this.x, this.y, this.size);
    }

    finished() {
        return this.alpha < 0;
    }
}

function spawnParticles(x, y, color) {
    for (let i = 0; i < 10; i++) {
        let particle = new Particle(x, y, color);
        particles.push(particle);
    }
}

function startGame() {
    gameStarted = true;
    startButton.hide();
    cookingMusic.loop();
}

function restartGame() {
    location.reload(); 
}
// Have a great summer!!