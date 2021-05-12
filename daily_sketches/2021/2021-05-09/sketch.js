// Daily Sketch for 2021-05-09
// Ram Narasimhan.
/*
Portrait Painting

*/
let palette = []
let cnv;
cnv = {
  xMargin: 50,
  yMargin: 50,
}

const grid = {
  rows: 100,
  cols: 100
}

let img;
let posX, posY;
let c;

function preload() {
  img = loadImage('assets/RN1.JPG');
}

function setup() {

  cnv = createCanvas(img.width, img.height);
  cnv.position((windowWidth - img.width) / 2, (windowHeight - img.height) / 2)
  print(img.width, img.height)
  img.loadPixels();

  background("#d3d3d3");
  //background("#0F0F0F");
  //background(seablue);

  //  cnv.height = height - 2 * cnv.yMargin
  //  cnv.width = width - 2 * cnv.yMargin
  //  fill(20)
  //  rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height)
  let alphaValue = 100;

  background('lightgrey');
  sizes = [40, 30, 20];
  for (stepSize of sizes) {
    for (let gridX = 0; gridX < img.width; gridX += stepSize) {
      for (let gridY = 0; gridY < img.height; gridY += stepSize) {
        let tileX = 1;
        let tileY = 1;
        posX = tileX * gridX;
        posY = tileY * gridY;
        patch = img.get(posX, posY, stepSize, stepSize); //get color from certain pixels
        rgb = getAvgPatchColor(patch)
        //image(patch, posX, posY);
        paintPatch(posX, posY, rgb, stepSize)
      }
    }
  }
  // patch = img.get(460, 433, 80, 40); //get color from certain pixels
  // image(patch, 460, 433)

  draw_border(30);
}

function fillProbability(p, c) {
  if (random() < p) {
    fill(c);
  } else {
    noFill();
  }

}

function getAvgPatchColor(patch) {

  patch.loadPixels();
  rgb = { r: 0, g: 0, b: 0, a: 0 }

  wR = 0; wG = 0; wB = 0;
  wTotal = 0;
  for (var y = 0; y < patch.height; y++) {
    for (var x = 0; x < patch.width; x++) {
      var index = (x + y * patch.width) * 4;
      var r = patch.pixels[index + 0];
      var g = patch.pixels[index + 1];
      var b = patch.pixels[index + 2];
      var a = patch.pixels[index + 3];

      const w = a / 255; // w is in the interval [0, 1]
      wR += r * w;
      wG += g * w;
      wB += b * w;
      wTotal += w;
    }
  }
  numP = patch.height * patch.width;
  rgb.r = wR / numP | 0;
  rgb.g = wG / numP | 0;
  rgb.b = wB / numP | 0;
  rgb.a = wTotal / numP | 0;
  return rgb
}


function paintPatch(posX, posY, rgb, stepSize) {

  push();
  translate(posX, posY);

  //ac = getAvgPatchColor(c)

  pc = color(rgb.r, rgb.g, rgb.b)
  stroke(pc);
  odds = random();
  //fillProbability(0, pc);
  if ((stepSize == 20) && (odds < 0.3)) {
    fill(pc)
  } else {
    noFill();
  }
  if (odds < 0.3) {
    strokeWeight(stepSize / 8);
  } else {
    strokeWeight(stepSize / 6);
  }

  odds = random();
  // if (odds < 0.5) {
  //   rect(0, 0, stepSize, stepSize);
  // } else {
  ellipse(0, 0, stepSize, stepSize);
  // }

  pop();
}


