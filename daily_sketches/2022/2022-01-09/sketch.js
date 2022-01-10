// Daily Sketch for 2022-01-09
// Ram Narasimhan

/*
Genuary 2022

Desc: Architecture.
*/


const cnv = {
  xMargin: 30,
  yMargin: 30,
}

let palette = []
const params = {
  xStep: 60,
  yStep: 60,
  bgColor: "#d3d3d3",
  blkColor: [0, 0, 0],
  moves: 1000
}


sqSize = 960;

function setup() {
  createCanvas(sqSize, sqSize);
  colorMode(HSB);
  background(0, 0, 0);


  background(params.blkColor);
  print(params.bgColor)
  palette2 = random(RGBPalList)
  palette = random(RGBPalList)
  palette = replicate(palette, 100)
  cnv.height = height - 2 * cnv.yMargin // usable height
  cnv.width = width - 2 * cnv.yMargin //usable width
  fill(params.blkColor);


  cEnd = color(220, 0, 100)
  cStart = color(220, 30, 70)
  skyGradient(0, 0, width, height, cStart, cEnd)


  for (rep = 0; rep < 10; rep++) {
    push();
    x = random(width)
    yStart = height
    _ht = random(600, 800) - 30 * rep
    _width = random(100, 350)
    drawBuildings(x, yStart, _ht, _width, rep);
    pop();
  }

  draw_border(clr = params.blkColor, sw = 50); //rn_utils.js
}


function drawBuildings(x, yStart, _ht, bldgWidth, bldgNumber) {
  colr = 210 + int(random(-10, 10))
  fill(colr, 30 + bldgNumber * 4, 80)
  bldgHt = _ht

  if (random() < 0.1) { bldgHt = 1200 };

  yNW = yStart - bldgHt
  rect(x, yNW, bldgWidth, bldgHt);

  front = {
    nwx: x + 10, nwy: yNW,
    ht: bldgHt, width: bldgWidth
  }
  addFrontWindow(front)

  trapHt = bldgHt
  angle = PI / 4

  xtrapNW = x + bldgWidth;
  ytrapNW = yNW;
  trapWidth = 50;
  xNE = xtrapNW + trapWidth * cos(angle);
  yNE = ytrapNW + trapWidth * sin(angle);

  fill(colr + jitter(-10, 10), 25 + bldgNumber, 60)
  drawTrapezium(xtrapNW, ytrapNW, xNE, yNE, trapHt)

}


function addFrontWindow(front) {

  numFloors = int(random(10, 20))
  floorStep = front.ht / numFloors
  numWindows = int(random(5, 10));
  wMargin = 4;
  windowStep = front.width / (numWindows + 2)
  windowW = windowStep - wMargin;
  windowHt = random(10, floorStep - 10);
  y = front.nwy
  for (wf = 0; wf < numFloors; wf++) {
    y += floorStep
    for (wi = 0; wi < numWindows; wi++) {
      x = front.nwx + wi * windowStep
      push()
      fill(20 + int(jitter(-5, 5)), 3, 30)
      rect(x, y, windowW, windowHt)
      pop()
    }

  }



}

function drawTrapezium(xNW, yNW, xNE, yNE, trapHt) {

  xSE = xNE;
  ySE = yNE + trapHt;
  xSW = xNW;
  ySW = ySE;
  beginShape();
  vertex(xNW, yNW);
  vertex(xNE, yNE) // NE Vertex
  vertex(xSE, ySE) //SE vertex
  vertex(xSW, ySW)
  endShape(CLOSE);
}

