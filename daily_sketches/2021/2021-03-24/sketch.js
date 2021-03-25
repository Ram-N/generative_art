// Daily Sketch for 2021-03-24
// Ram Narasimhan.
/*
 Rectangular shapes and overlapping lines
Goal1 : Given a rectangle (on the ptsGrid) mark free or not.
Goal 2: Draw 'ripples' that start from one edge and go to the other, circumscribing rectangles
*/

class Ripple {
  /**
   * Create and Return a grid object
   * @param  {Integer} nRows Number of rows
   * @param  {Integer} nCols Number of columns
   */
  constructor(_source, _target, grid) {
    this.source = _source; // a grid point
    this.target = _target; // a grid point
    this.path = this.createPath(grid)
  }

  createPath(grid) {
    print('grid', grid)
    let path = [];
    let next = this.getNextGPt(this.source, grid)
    path.push({ gs: this.source, ge: next });
    return path
  }

  getNextGPt(currGPt, grid) {
    print(currGPt, 'curr GPT', grid)
    let n;
    let neigh = grid.get4NearestGridPoints(currGPt.x, currGPt.y);
    let currMinDist = 10000;
    let next;
    for (n of neigh) {
      print('NNN', n)
      let dn = dist(n.x, n.y, this.target.x, this.target.y)
      if (dn < currMinDist) {
        currMinDist = dn;
        next = n;
      }
    }
    return next;
  }

  /* when rendering, everything gets converted to Global coords */
  render() {
    // each LINK has a gs (grid start) and ge (grid end) for a single link of the ripple

    for (let link of this.path) {
      let linkSt = grid.getGlobalCoords(link.gs.x, link.gs.y);
      let linkEnd = grid.getGlobalCoords(link.ge.x, link.ge.y);
      line(linkSt.x, linkSt.y, linkEnd.x, linkEnd.y)
    }
  }

}



let palette = []
const cnv = {
  xMargin: 30,
  yMargin: 30,
}

const gr = {
  rows: 20,
  cols: 20
}
const nEcho = 5;

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
  stroke(255);
  renderGridPoints(grid.points) // rn_grid.js
  let alphaValue = 100;
  for (let echo = 0; echo < nEcho; echo++) {
    colr = color(random(palette));
    colr.setAlpha(alphaValue);
    rct = createRectComplex(grid, colr);
    renderRectComplex(rct, grid, colr);
  }

  gt = int(random(grid.rows));
  let source = createVector(0, gt);
  let target = createVector(grid.cols, gt);
  print(source, 'source')
  rip = new Ripple(source, target, grid)
  print(grid, 'grid...')
  rip.createPath(grid)
  rip.render();
}






function createRectComplex(grid, colr) {

  // Add a while loop for min number of tries...

  rw = grid.xStep * (1 + int(random(10)));
  rh = grid.yStep * (1 + int(random(10)));
  gx = int(random(grid.rows));
  gy = int(random(grid.cols));
  r = grid.getGlobalCoords(gx, gy) // nw corner
  if ((r.x + rw < grid.width) && (r.y + rh < grid.height)) {
    bbox = getRectBbox(r, rw, rh);
    gridPts = getInternalGridPoints(bbox, grid.points)
    print(gridPts)
    for (g of gridPts) {
      strokeWeight(10)
      point(g.x, g.y)
    }
    return ({
      x: r.x,
      y: r.y,
      width: rw,
      height: rh
    })
  }
}

function renderRectComplex(rct, grid, colr) {

  //print(r.x + rw, grid.width)
  if ((r.x + rw < grid.width) && (r.y + rh < grid.height)) {
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





function draw_border(c = 0) {
  push();
  strokeWeight(20);
  stroke(c);
  noFill();
  rect(0, 0, width, height)
  pop();
}
