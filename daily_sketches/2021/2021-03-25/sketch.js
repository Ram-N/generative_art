// Daily Sketch for 2021-03-25
// Ram Narasimhan.
/*
 Rectangular shapes and overlapping lines
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
    print(this.path, 'path')
  }

  createPath(grid) {
    let path = [];
    let curr = this.source;
    let max_loop = 100;
    let iter = 0;
    while (!this.terminatePath(curr, grid) && (iter < max_loop)) {
      let next = this.getNextGPt(curr, grid)
      if (next) {
        next.free = false;
        //print('next node', next.col, next.row)
        path.push({ gs: curr, ge: next });
        curr = next;
      }
      iter++;
    }
    print(path.length, 'path length')
    return path
  }

  terminatePath(GPt, grid) {
    //print('term conditions', GPt.col, GPt.row, (GPt.col == grid.cols), (GPt.row == 0), (GPt.row == grid.rows));
    if ((GPt.col == grid.cols) || (GPt.row == 0) || (GPt.row == grid.rows)) {
      print('terminate cond raised')
      return 1
    }

    return 0
  }

  getNextGPt(currGPt, grid) {
    let n;
    let neigh = grid.get4NearestGridPoints(currGPt.col, currGPt.row);
    let currMinDist = 10000;
    let next;
    //print('length of neigh', neigh.length)
    for (n of neigh) {
      //print('neighbor', n, this.target)
      if (n.free) {
        let dn = dist(n.x, n.y, this.target.x, this.target.y)
        if (dn < currMinDist) {
          currMinDist = dn;
          next = n;
        }
      }
    }
    return next;
  }

  /* when rendering, everything gets converted to Global coords */
  render() {
    // each LINK has a gs (grid start) and ge (grid end) for a single link of the ripple
    for (let link of this.path) {
      //print('link', link, 'link')
      line(link.gs.x, link.gs.y, link.ge.x, link.ge.y)
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
const nShapes = 2;

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
  //renderGridPoints(grid.points) // rn_grid.js
  let alphaValue = 100;
  for (let echo = 0; echo < nShapes; echo++) {
    colr = color(random(palette));
    colr.setAlpha(alphaValue);
    rct = createRectComplex(grid, colr);
    renderRectComplex(rct, grid, colr);
  }

  for (let rhy = 0; rhy < 10; rhy++) {
    gt = int(random(grid.rows));
    let source = grid.getGPt(0, gt);
    let target = grid.getGPt(grid.cols, gt);
    rip = new Ripple(source, target, grid)
    rip.createPath(grid)
    print('starting render')
    rip.render();
  }
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
