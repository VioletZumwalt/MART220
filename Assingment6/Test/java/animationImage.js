class AnimationImage {
    constructor(x, y, width, height, images) {
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        this.images = images;
        this.currentImageIndex = 0;
        this.timerInterval = 150; 
        this.timer = setInterval(this.nextImage.bind(this), this.timerInterval);
    }

    display() {
        image(this.images[this.currentImageIndex], this.x, this.y, this.w, this.h);
    }

    nextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }
}
