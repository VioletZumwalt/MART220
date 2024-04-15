let angles = [0, 0, 0, 0, 0]; // Array to store rotation angles for each shape
let textureImgs = [];
let shapes = []; // Array to hold shapes
let font;
let faceModel;

function preload() {
  // Load your texture images
  textureImgs[0] = loadImage('./img/bubblegum.jpg');
  textureImgs[1] = loadImage('./img/cat.webp');
  textureImgs[2] = loadImage('./img/electricity.jpg');
  textureImgs[3] = loadImage('./img/forest.jpg');
  textureImgs[4] = loadImage('./img/wood.jpg');
  textureImgs[5] = loadImage('./img/sun.webp');

  faceModel = loadModel('./img/face.stl', true);

  font = loadFont('./img/CampanaScript_PERSONAL_USE_ONLY.otf');
}

function setup() {
  createCanvas(800, 600, WEBGL);

  // Add shapes to the array
  shapes.push({type: 'box', x: -250, y: 250, z: 0, textureIndex: 0, size: [70, 70, 70, 100]});
  shapes.push({type: 'cylinder', x: -201, y: -140, z: 0, textureIndex: 1, size: [55, 95, 100]});
  shapes.push({type: 'cone', x: 37, y: -100, z: 0, textureIndex: 2, size: [30, 300, 75]});
  shapes.push({type: 'sphere', x: 110, y: 100, z: 0, textureIndex: 3, size: [40, 5]});
  shapes.push({type: 'model', x: 340, y: 100, z: 0, textureIndex: 5, size: null});
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

  // Loop through shapes array and draw each shape
  for (let i = 0; i < shapes.length; i++) {
    let shape = shapes[i];
    push();
    translate(shape.x, shape.y, shape.z);
    rotateX(angles[i]);
    rotateY(angles[i]);
    texture(textureImgs[shape.textureIndex]);
    if (shape.type === 'box') {
      box(...shape.size);
    } else if (shape.type === 'cylinder') {
      cylinder(...shape.size);
    } else if (shape.type === 'cone') {
      cone(...shape.size);
    } else if (shape.type === 'sphere') {
      sphere(...shape.size);
    } else if (shape.type === 'model') {
      model(faceModel);
    }
    pop();
    angles[i] += 0.01 * (i + 1); // Adjust rotation speed for each shape
  }
}

function mouseClicked() {
  // Update position and size of each shape when mouse is clicked
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].x = random(-width / 2, width / 2);
    shapes[i].y = random(-height / 2, height / 2);
    shapes[i].z = random(-200, 200);
    if (shapes[i].size) {
      for (let j = 0; j < shapes[i].size.length; j++) {
        shapes[i].size[j] = random(20, 100);
      }
    }
  }
}
