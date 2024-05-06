class MyCircle {
    constructor(x, y, diameter, r, g, b, health) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.r = r;
        this.g = g;
        this.b = b;
        this.health = health;
        this.speedX = random(-3, 3); 
        this.speedY = random(-3, 3); 
        this.isBadFood = (r === 255 && g === 0 && b === 0);
    }

    draw() {
        if (this.health > 0) {
            fill(this.r, this.g, this.b);
            circle(this.x, this.y, this.diameter);
        }
    }

    checkCollision(otherObject) {
        let d = dist(this.x, this.y, otherObject.x + otherObject.w / 2, otherObject.y + otherObject.h / 2);
        if (d < this.diameter / 2 + otherObject.w / 2) {
            if (this.health > 0) {
                return true;
            }
        }
        return false;
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