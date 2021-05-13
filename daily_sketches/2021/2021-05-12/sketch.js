// Daily Sketch for 2021-05-12
// Ram Narasimhan.
/*
Portrait Painting

Version 5:
MousePressed, reveal PATCHES based on mouseX and mouseY

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
  noFill();
  background('lightgrey');

  // stepSize = 50;
  // for (let gridX = 0; gridX < img.width; gridX += stepSize) {
  //   for (let gridY = 0; gridY < img.height; gridY += stepSize) {
  //     patch = img.get(gridX, gridY, stepSize, stepSize); //get color from certain pixels
  //     rgb = getAvgPatchColor(patch)
  //     paintBase(gridX, gridY, rgb, stepSize)
  //   }
  // }
  sizes = [25, 20, 10, 5]; // this could be keypressed parameter...
  stepSize = random(sizes);

}

function draw() {


  posX = mouseX;
  posY = mouseY;
  bright = 30;

  for (let pAttempt = 0; pAttempt < 200 / stepSize; pAttempt++) {
    posX = mouseX + random(-bright, bright);
    posY = mouseY + random(-bright, bright);
    if ((posX < 0) || (posX > img.width) || (posY < 0) || (posY > img.height)) {
      posX = mouseX;
      posY = mouseY;
      continue
    }
    patch = img.get(posX, posY, stepSize, stepSize); //get color from certain pixels      
    getAvgPatchColor(patch)
    rgb = getAvgPatchColor(patch)
    paintPatch(posX, posY, rgb, stepSize)
  }

  draw_border(30);
  noLoop();
}


function mousePressed() {
  loop();
}

function mouseDragged() {
  loop();
}


function keyTyped() {
  // png is much higher quality than jpg
  if (key == 's') {
    let timeStamp = year() + "-" + nf(month(), 2) + "-" + nf(day(), 2) + "-" + nf(hour(), 2) + "-" + nf(minute(), 2) + "-" + nf(second(), 2);// + "-" + nf(millis(), 3, 0);
    print('ts', timeStamp)
    saveCanvas('keep_' + timeStamp);
  }
  if (key == 'k') {
    let timeStamp = year() + "-" + nf(month(), 2) + "-" + nf(day(), 2) + "-" + nf(hour(), 2) + "-" + nf(minute(), 2) + "-" + nf(second(), 2);// + "-" + nf(millis(), 3, 0);
    saveCanvas('keep_' + timeStamp + 'png');
    saveCanvas('keep0.png'); //representative. will overwrite existing file
  }

  if (key == '1') {
    stepSize = 10;
  }
  if (key == '2') {
    stepSize = 20;
  }

  if (key == 'x') {
    noLoop();
  }
  print('key', key)
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


function paintBase(posX, posY, rgb, stepSize) {
  push();
  stroke(255)
  translate(posX, posY);
  fill(color(rgb.r, rgb.g, rgb.b))
  rect(0, 0, stepSize, stepSize)
  pop();
}

function paintPatch(posX, posY, rgb, stepSize) {

  push();
  ss5 = stepSize / 2
  translate(posX + ss5, posY + ss5);
  pc = color(rgb.r, rgb.g, rgb.b)
  stroke(pc);
  //stroke(random(0, 100));

  bright = brightness(color(rgb.r, rgb.g, rgb.b, rgb.a))
  factor = 1;
  if (bright < 200) {
    factor = 2;
  } else if (bright < 150) {
    factor = 3;
  } else if (bright < 100) {
    factor = 4;
  } else if (bright < 50) {
    factor = 5;
  } else if (bright < 25) {
    factor = 6;
  }

  strokeWeight(factor);
  //ellipse(0, 0, stepSize / factor, stepSize / factor);
  odds = random();
  if (odds < 0.1) {
    line(-ss5, -ss5, ss5, ss5)
  } else if (odds < 0.2) {
    fill(pc)
    circle(0, 0, ss5)
    //line(ss5, -ss5, -ss5, ss5)
  } else {
    line(-ss5, -ss5, ss5, ss5)
    line(ss5, -ss5, -ss5, ss5)
  }
  pop();
}


