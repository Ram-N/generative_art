// Daily Sketch for 2021-04-01
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
  rows: 100,
  cols: 50,
  nShapes: 20
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
      renderRectComplex(rct, grid, colr);
    }
  }

  //complete it systematically
  strokeWeight(2)
  for (let rhy = 0; rhy < grid.rows; rhy++) {
    sWest = grid.getGPt(0, rhy); // west wall
    sEast = grid.getGPt(grid.cols, rhy); // east wall
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
  let peri = [];
  gx = int(random(grid.cols));
  gy = int(random(grid.rows));
  rnw = grid.getGlobalCoords(gx, gy) // nw corner
  iw = (1 + int(random(10)));
  ih = (1 + int(random(10)));
  rw = grid.xStep * iw;
  rh = grid.yStep * ih;
  if ((rnw.x + rw < grid.width) && (rnw.y + rh < grid.height)) {
    bbox = getRectBbox(rnw, rw, rh);
    gridPts = getInternalGridPoints(bbox, grid.points)
    print(gridPts)
    for (g of gridPts) {
      if ((g.col == gx) || (g.col == (gx + iw))) {
        peri.push(g);
        push();
        strokeWeight(10)
        point(g.x, g.y)
        pop();
      }
    }
    rnw.vertices = getVertices(rnw, rw, rh)

    push();
    //centroid
    cenX = rnw.x + rw / 2;
    cenY = rnw.y + rh / 2;
    strokeWeight(4);
    point(cenX, cenY);
    pop();

    cen = createVector(cenX, cenY)
    beginShape();
    print("Rect verts", rnw.vertices, cen)
    for (v of rnw.vertices) {
      print(cen.sub(v))
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
      perimeter: peri
    })
  }
}

function renderRectComplex(rct, grid, colr) {

  print(rct)
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

function getVertices(r, rw, rh) {
  let verts = [
    createVector(r.x, r.y),
    createVector(r.x + rw, r.y),
    createVector(r.x + rh, r.y + rh),
    createVector(r.x, r.y + rh)]

  return verts;
}


//Bbox only has x0, x1, y0 and y1
function getRectBbox(r, rw, rh) {
  try {
    return {
      xMin: r.x,
      xMax: r.x + rw,
      yMin: r.y,
      yMax: r.y + rh
    };
  } catch (err) {
    print("Rect NW", r, "hull", rw, rh)
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
      g.free = false;
      gridBox.push(g)
    }
  }
  return gridBox
}
