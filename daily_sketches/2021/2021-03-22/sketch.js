// Daily Sketch for 2021-03-21
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


  background("#d3d3d3");
  //background("#0F0F0F");
  //background(seablue);

  //  cnv.height = height - 2 * cnv.yMargin
  //  cnv.width = width - 2 * cnv.yMargin
  //  fill(20)
  //  rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height)
  let alphaValue = 100;

  background('lightgrey');
  stepSize = 5;
  _dir = ['curve', 'rect'];
  for (let sweep = 0; sweep < 2; sweep++) {
    _type = _dir[sweep]
    for (let gridX = 0; gridX < img.width; gridX += stepSize) {
      for (let gridY = 0; gridY < img.height; gridY += stepSize) {
        let tileX = 1;
        let tileY = 1;
        posX = tileX * gridX;
        posY = tileY * gridY;
        c = img.get(posX, posY); //get color from certain pixels
        paintPixel(posX, posY, c, stepSize, _type)
      }
    }
  }

  draw_border(30);

}
function fillProbability(p, c) {
  if (random() < p) {
    fill(c);
  } else {
    noFill();
  }

}

function paintPixel(posX, posY, c, stepSize, _type) {
  push();
  translate(posX, posY);
  //rotate(radians(random(360)))
  stroke(color(c));
  if (_type == 'curve') {
    fillProbability(0, c);
    strokeWeight(random(5));
    strokeWeight(2);
    if (random() < 0.1) {
      curve(posX, posY,
        sin(posX) * 60, cos(posY) * sin(posY) * 40,
        0, 0,
        cos(posY) * sin(posX) * 140, cos(posY) * sin(posX) * 50);
    }
  } else {
    odds = random()
    if (odds < 0.1) {
      strokeWeight(random(stepSize));
      strokeWeight(stepSize);
      rect(0, 0, stepSize, stepSize);
    } else if (odds < 0.3) {
      strokeWeight(stepSize / 2);
      rect(0, 0, stepSize, stepSize);
    }
  }
  pop();
}






function draw_border(c = 0) {
  push();
  strokeWeight(20);
  stroke(c);
  noFill();
  rect(0, 0, width, height)
  pop();
}
