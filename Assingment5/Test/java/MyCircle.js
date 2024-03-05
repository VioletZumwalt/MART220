class myCircle {
    constructor(x, y, diameter, redColor, greenColor, blueColor) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.redColor = redColor;
        this.greenColor = greenColor;
        this.blueColor = blueColor;
    }

    draw() {
        fill(this.redColor, this.greenColor, this.blueColor);
        circle(this.x, this.y, this.diameter);
    }
}
