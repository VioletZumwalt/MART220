let angles = [0, 0, 0, 0, 0]; // Array to store rotation angles for each shape
let textureImgs = [];
let font;

function preload() {
  // Load your texture images
  textureImgs[0] = loadImage('./img/bubblegum.jpg');
  textureImgs[1] = loadImage('./img/cat.webp');
  textureImgs[2] = loadImage('./img/electricity.jpg');
  textureImgs[3] = loadImage('./img/forest.jpg');
  textureImgs[4] = loadImage('./img/wood.jpg');

  font = loadFont('./img/CampanaScript_PERSONAL_USE_ONLY.otf');
}

function setup() {
  createCanvas(800, 600, WEBGL);
}

function draw() {
    background(220);

      // Set text font and color
  fill(0);
  
  // Title
  push();
  translate(-width / 2 + 10, -height / 2 + 10);
  textFont(font);
  textSize(50);
  textAlign(LEFT, TOP);
  text("Wheeee", 0, 0); // Position the title
  pop();
  
  // Name
  push();
  translate(-width / 2 + 10, -height / 2 + 50);
  textFont(font);
  textSize(40);
  textAlign(LEFT, TOP);
  text("Violet Z", 0, 0); // Position the name
  pop();

    // Box
    push();
    translate(-250, 250, 0);
    rotateX(angles[0]);
    rotateY(angles[0]);
    texture(textureImgs[0]);
    box(70, 70, 70, 100);
    pop();
    
    // Cylinder
    push();
    translate(-201, -140, 0); 
    rotateX(angles[1]);
    rotateY(angles[1]);
    texture(textureImgs[1]);
    cylinder(55, 95, 100);
    pop();
    
    //  Cone
    push();
    translate(37, -100, 0); 
    rotateX(angles[2]);
    rotateY(angles[2]);
    texture(textureImgs[2]);
    cone(30, 300, 75);
    pop();
    
    // Sphere
    push();
    translate(110, 100, 0); 
    rotateX(angles[3]);
    rotateY(angles[3]);
    texture(textureImgs[3]);
    sphere(40, 5);
    pop();
    
    // Torus
    push();
    translate(340, 100, 0); 
    rotateX(angles[4]);
    rotateY(angles[4]);
    texture(textureImgs[4]);
    torus(35, 150, 56);
    pop();


  angles[0] += 0.01; 
  angles[1] -= 0.02; 
  angles[2] += 0.03; 
  angles[3] += 0.04; 
  angles[4] -= 0.05; 
}
