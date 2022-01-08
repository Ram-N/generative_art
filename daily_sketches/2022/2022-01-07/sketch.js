// Daily Sketch for 2022-01-07
// Ram Narasimhan

/*
Genuary 2022

Keywords: Sol LeWitt, genuary2022, Wall Drawing

Desc: This is a generative version of Sol LeWitt's Wall Drawing 1081
Desc : Bands of bright primary colors in rectangles. The shapes are limited to the rectangle 
Desc: and the trapezoid, two of the original six that LeWitt used. 
Desc: The colors are only the three primary colors; red, blue and yellow, and the three secondary colors; green, purple and orange.
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
  //colorMode(HSB);
  background(0, 0, 0);


  background(params.blkColor);
  print(params.bgColor)
  palette2 = random(RGBPalList)
  palette = random(RGBPalList)
  palette = ['blue', 'yellow', 'blue', 'black', 'yellow', 'purple', 'green', 'orange']
  palette = replicate(palette, 100)
  cnv.height = height - 2 * cnv.yMargin // usable height
  cnv.width = width - 2 * cnv.yMargin //usable width
  fill(params.blkColor);

  //background Stripes
  push()
  rotate(PI / 4)
  rW = 50
  for (r = 0; r < 15; r++) {
    fill('white')
    rect(2 * rW * r, -height, rW, 2 * height)
  }
  pop();

  xNW = 50; yNW = 50;
  xSW = xNW;
  ySW = cnv.yMargin + cnv.width - 100 - random(20)

  nextCoords = { "panelxNW": xNW, "panelyNW": yNW, "panelySW": ySW }
  last = 0;
  prev = 0;
  nextCoords.done = false;
  while (!nextCoords.done) {
    xNW = nextCoords.panelxNW;
    yNW = nextCoords.panelyNW;
    ySW = nextCoords.panelySW;
    xSW = xNW;
    chosen = pickWallPanelColor(last, prev)
    nextCoords = addWallPanel(xNW, yNW, xSW, ySW, chosen);
    prev = last;
    last = chosen;
  }

  draw_border(clr = params.bgColor, sw = 50); //rn_utils.js
}

//Trapezoids that follow certain constraints
function addWallPanel(xNW, yNW, xSW, ySW, chosencolor) {


  fill(chosencolor)
  wpWidth = random(10, 100)
  if (chosencolor == 'black') {
    wpWidth = random(10, 25)
  }
  trapHt = random(-20, 20)
  xNE = xNW + wpWidth
  yNE = yNW + trapHt
  ySE = ySW - trapHt
  if (yNE < 50) { yNE = 50 }
  done = false
  if (xNE > cnv.xMargin + cnv.width - 10) { done = true }
  else {
    beginShape();
    vertex(xNW, yNW);
    vertex(xNE, yNE) // NE Vertex
    vertex(xNE, ySE) //SE vertex
    vertex(xSW, ySW)
    endShape(CLOSE);
  }

  return ({ "panelxNW": xNE, "panelyNW": yNE, "panelySW": ySE, "done": done })
}


function pickWallPanelColor(last, prev) {

  if (last != 'red' && prev != 'red') {
    return 'red'
  }
  if (last == 'red') {
    chosen = random(palette);
    while (chosen == last) { // cannot have two consecutive colors be the same
      chosen = random(palette);
    }
    return chosen;
  }
  chosen = 'red'
  if (random() < 0.66) {
    chosen = random(palette);
    while (chosen == last) { // cannot have two consecutive colors be the same
      chosen = random(palette);
    }
  }
  return chosen
}
