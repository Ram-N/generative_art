// Daily Sketch for 2021-03-23
// Ram Narasimhan.
/*
1. Rectangular shapes and overlapping lines
*/
let palette = []
const cnv = {
  xMargin: 30,
  yMargin: 30,
}

const gr = {
  rows: 20,
  cols: 20
}
const nEcho = 20;

function setup() {
  createCanvas(860, 860);
  background("#d3d3d3");
  //background("#0F0F0F");
  //background(seablue);
  draw_border(20);
  palette = red_brown_orange; //colors.js
  palette = purples; //colors.js
  palette = replicate(palette, 10)

  cnv.height = height - 2 * cnv.yMargin
  cnv.width = width - 2 * cnv.yMargin
  fill(20)
  rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);
  grid = new Grid(gr.rows, gr.cols, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin);
  //grid = new Grid(gr.rows, gr.cols, cnv.width, cnv.height, 0, 0);
  stroke(255);
  //renderGridPoints(grid.points) // rn_grid.js
  let alphaValue = 100;
  for (let echo = 0; echo < nEcho; echo++) {
    colr = color(random(palette));
    colr.setAlpha(alphaValue);
    renderRectComplex(grid, colr);
  }

}


function renderRectComplex(grid, colr) {
  rw = grid.xStep * (1 + int(random(10)));
  rh = grid.yStep * (1 + int(random(10)));
  gx = int(random(grid.rows));
  gy = int(random(grid.cols));
  r = grid.getGlobalCoords(gx, gy)
  print(r.x + rw, grid.width)
  if ((r.x + rw < grid.width) && (r.y + rh < grid.height)) {
    push();
    noFill();
    if (colr) {
      fill(colr)
    }
    translate(r.x, r.y);
    rect(0, 0, rw, rh);
    pop();
  }

}


function getInternalGridPoints(bbox, gridPts) {
  // grid points inside bbox
  gridBox = [];
  for (g of gridPts) {
    if ((g.x <= bbox.xMax) &&
      (g.x >= bbox.xMin) &&
      (g.y <= bbox.yMax) &&
      (g.y >= bbox.yMin)
    ) {
      gridBox.push(g)
    }
  }
  return gridBox
}

function markInternalPoints(hull, blobGpts) {
  for (gpt of blobGpts) {
    val = isPointInside(gpt, hull)
    if (val == 1) {
      gpt.free = false;
    }
  }
}


function draw_border(c = 0) {
  push();
  strokeWeight(20);
  stroke(c);
  noFill();
  rect(0, 0, width, height)
  pop();
}
