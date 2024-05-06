class Particle {
  constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.size = random(5, 10);
      this.vx = random(-1, 1);
      this.vy = random(-5, -1);
      this.alpha = 255;
  }

  update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= 5;
  }

  display() {
      noStroke();
      fill(this.color[0], this.color[1], this.color[2], this.alpha);
      ellipse(this.x, this.y, this.size);
  }

  isFinished() {
      return this.alpha <= 0;
  }
}
