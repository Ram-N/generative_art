// Daily Sketch for 2021-04-03
// Ram Narasimhan.
/*
 Goal 1: Rectangular shapes. Points on the Perimeter. Internal points.
 Path Following a shape
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
  nShapes: 2
}


function setup() {
  createCanvas(860, 860);
  background("#d3d3d3");
  //background("#0F0F0F");
  fill("#0f0f0f");
  draw_border(20); //rn_utils.js
  palette = purples //colors.js
  palette = replicate(palette, 10)

  cnv.height = height - 2 * cnv.yMargin
  cnv.width = width - 2 * cnv.yMargin
  //fill(20)
  rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);
  grid = new Grid(params.rows, params.cols, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin);
  stroke(255);
  //renderGridPoints(grid.points) // rn_grid.js
  let alphaValue = 100;
  for (let echo = 0; echo < params.nShapes; echo++) {
    colr = color(random(palette));
    colr.setAlpha(alphaValue);
    rct = createRectComplex(grid, colr, echo);
    if (rct) {
      print(rct, 'rect')
      renderRectComplex(rct, grid, colr);
      //   push();
      //   strokeWeight(5)
      //   point(rct.perimeter[5].x, rct.perimeter[5].y)
      //   pop();
    }
  }


  //complete it systematically
  strokeWeight(2)
  for (let rhy = 0; rhy < grid.rows; rhy += 2) {
    sWest = grid.getGPt(0, rhy); // west wall
    sEast = grid.getGPt(grid.cols, grid.rows - rhy); // east wall
    if (sEast.free) {
      createAndRenderPath(sEast, sWest) //from R to L
    }
    if (sWest.free) {
      createAndRenderPath(sWest, sEast) // from the right to left
    }
  }

}

function createAndRenderPath(source, target) {
  rip = new Ripple(source, target, grid)
  rip.createPath(grid) // creates a single path
  rip.render(random(red_orange));
}




function createRectComplex(grid, colr, num) {

  // Add a while loop for min number of tries...
  ix = int(random(grid.cols));
  iy = int(random(grid.rows));
  ix = random([10, 55])
  iy = random([10, 55])

  rnw = grid.getGlobalCoords(ix, iy) // nw corner
  iw = (1 + int(random(10)));
  ih = (1 + int(random(10)));
  iw = 10;
  ih = 10;
  rw = grid.xStep * iw;
  rh = grid.yStep * ih;
  if ((rnw.x + rw < grid.width) && (rnw.y + rh < grid.height)) {
    bbox = getRectGridBbox(ix, iy, iw, ih); // in grid coords
    gridPts = getRectGridPoints(bbox, grid.points)
    //print(gridPts)

    let { corners, peri, inter } = markRectPerimeterInterior(grid, gridPts, ix, iy, iw, ih)
    rnw.vertices = getRectVertices(rnw, rw, rh)

    push();
    //centroid
    cenX = rnw.x + rw / 2;
    cenY = rnw.y + rh / 2;
    strokeWeight(4);
    point(cenX, cenY);
    pop();

    cen = createVector(cenX, cenY)
    beginShape();
    for (v of rnw.vertices) {
      //print(cen.sub(v))
      vertex(v + (cen.sub(v) * 0.5))
    }
    endShape();

    //polygon created
    return ({
      x: rnw.x,
      y: rnw.y,
      width: rw,
      height: rh,
      id: num,
      iw: iw,
      ih: ih,
      corners: corners,
      interior: inter,
      perimeter: peri
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
      push();
      strokeWeight(6)
      point(g.x, g.y)
      pop();
    }
  }
  return { corners, peri, inter }
}



function renderRectComplex(rct, grid, colr) {

  //print(r.x + rw, grid.width)
  if ((rct.x + rct.width < grid.width) && (rct.y + rct.height < grid.height)) {
    push();
    noFill();
    if (colr) {
      fill(colr)
    }
    translate(rct.x, rct.y);
    rect(0, 0, rct.width, rct.height);
    pop();
  }

}



/*
returns all grid points inside bbox. gridworld coordinates
these could be perimeter grid points
or, these could be totally interior
*/
function getRectGridPoints(bbox, gridPts) {
  gridBox = [];
  for (g of gridPts) {
    if ((g.col <= bbox.xMax) &&
      (g.col >= bbox.xMin) &&
      (g.row <= bbox.yMax) &&
      (g.row >= bbox.yMin)
    ) {
      g.free = false;
      gridBox.push(g)
    }
  }
  return gridBox
}
