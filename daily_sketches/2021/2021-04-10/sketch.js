// Daily Sketch for 2021-04-09
// Ram Narasimhan.
/*
 Path Following a shape - start from perimeter points and go all around...
  Goal 2: Draw 'ripples' that start from one edge and go to the other, circumscribing rectangles
*/

let palette = []
const cnv = {
  xMargin: 30,
  yMargin: 30,
}

const params = {
  rows: 75,
  cols: 75,
  nShapes: 10,
  multiplier: [2.0, 1.5, 0.5]

}


function setup() {
  createCanvas(860, 860);
  background("#d3d3d3");
  //background("#0F0F0F");
  fill("#0f0f0f");
  draw_border(20); //rn_utils.js
  palette = rainbowDash; //colors.js
  palette = cappuccino; //colors.js
  palette = replicate(palette, 10)

  cnv.height = height - 2 * cnv.yMargin
  cnv.width = width - 2 * cnv.yMargin
  fill(127)
  rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);
  grid = new Grid(params.rows, params.cols, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin);
  stroke(255);
  grid.dispalyGridPoints()// rn_grid.js
  //renderGridPoints(grid.points) 
  let alphaValue = 30;




  for (let sh = 0; sh < params.nShapes; sh++) {
    colr = color(100, 100, 200);
    //colr.setAlpha(alphaValue);
    rct = createRectComplex(grid, colr, sh);
    if (rct) {
      rct.vertices = getRectVertices(rct)
      displayPoly(rct);
      for (mul of params.multiplier) {
        displayEcho(rct, mul);
        print('mul', mul)
      }
      print(rct, 'rect')
    }
  }
}





function createRectComplex(grid, colr, num) {

  // Add a while loop for min number of tries...
  ix = int(random(grid.cols));
  iy = int(random(grid.rows));
  //ix = random([10, 45])
  //iy = random([10, 45])

  rnw = grid.getGPt(ix, iy) // nw corner
  iw = (1 + int(random(10)));
  ih = (1 + int(random(10)));
  //iw = 20;
  //ih = 20;
  rw = grid.xStep * iw;
  rh = grid.yStep * ih;
  if ((rnw.x + rw < grid.width) && (rnw.y + rh < grid.height)) {

    //polygon created
    return ({
      x: rnw.x,
      y: rnw.y,
      width: rw,
      height: rh,
      id: num,
      iw: iw,
      ih: ih,
    })
  }
}

/* given the grid points contained on or inside a rect,
this function marks them as PERI or INTERIOR
*/
function markRectPerimeterInterior(grid, gridPts, ix, iy, iw, ih) {
  let peri = [];
  let inter = [];
  let corners = [];

  let nwc = grid.getGPt(ix, iy);
  let nec = grid.getGPt(ix + iw, iy);
  let sec = grid.getGPt(ix + iw, iy + ih);
  let swc = grid.getGPt(ix, iy + ih);
  corners.push(nwc);
  corners.push(nec);
  corners.push(sec);
  corners.push(swc);

  cPairs = [[nwc, nec], [nec, sec], [sec, swc], [swc, nwc]];

  for (cp of cPairs) {
    inbetween = grid.getGPtsBetween(cp[0], cp[1]);
    for (let ib of inbetween) {
      peri.push(ib);
    }
  }

  for (g of gridPts) {
    if (
      (g.col == ix) || (g.col == ix + iw) ||
      (g.row == iy) || (g.row == iy + ih)
    ) {
      //peri.push(g);
    } else {//must be interior to the rectangle
      inter.push(g);
    }
  }
  return { corners, peri, inter }
}





let step = 0.01;
let amount = 0;

function DDraw() {
  //background(240);
  let v0 = createVector(0, 0);

  let v1 = createVector(mouseX, mouseY);
  drawArrow(v0, v1, 'red');

  let v2 = createVector(90, 90);
  drawArrow(v0, v2, 'blue');

  if (amount > 1 || amount < 0) {
    step *= -1;
  }
  amount += step;
  let v3 = p5.Vector.lerp(v1, v2, amount);

  drawArrow(v0, v3, 'purple');
}

// draw an arrow for a vector at a given base position
function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}