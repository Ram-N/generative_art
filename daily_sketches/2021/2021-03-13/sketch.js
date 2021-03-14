// Daily Sketch by Ram Narasimhan, 2021-03-13

/*

1. Make sure that all the blobPts are WITHIN the canvasarea... not out of bounds

*/
let palette = []
let xStep;
let yStep;
const cw = 10;
const ch = 15;
let canvasXMargin = 30;
let canvasYMargin = 30;

let nBlobs = 1;
let ctrAttempts = 50;
let sizeAttempts = 6;


function setup() {
  createCanvas(860, 860);
  //background("#d3d3d3");
  background("#0F0F0F");
  draw_border(200);


  palette = [
    //"#03071e",
    "#370617",
    "#6a040f",
    "#9d0208",
    "#d00000",
    "#dc2f02",
    "#e85d04",
    "#f48c06",
    "#faa307",
    "#ffba08",
  ];  // brown-orange-red
  palette = replicate(palette, 10)

  nRows = 50;
  nCols = 40;
  grid = createGrid(nRows, nCols);

  stroke(255)
  //renderGrid(grid)

  let alphaValue = 180;

  for (sizeAtt = 0; sizeAtt < sizeAttempts; sizeAtt++) {
    xRange = 250 - sizeAtt * 40;
    yRange = 300 - sizeAtt * 50;
    ctA = ctrAttempts * (sizeAtt + 1)
    print('sizeAtt', sizeAtt, ctA)
    for (attempt = 0; attempt < ctA; attempt++) {
      cy = int(random(nRows));
      cx = int(random(nCols));
      for (rep = 0; rep < nBlobs; rep++) {
        c = color(random(palette));
        c.setAlpha(alphaValue);
        fill(c);
        cx = cx + int(random(-5, 5))
        cy = cy + int(random(-5, 5))
        success = makeBlob(cx, cy, xRange, yRange);
        print(success)
      }
    }
  }
}


function makeBlob(cx, cy, xRange, yRange) {
  let verts = [];
  numBlobPts = 5 + int(random(20))

  centerX = canvasXMargin + xStep * cx;
  centerY = canvasYMargin + yStep * cy;

  //bunch of random points clumped around CenterX, CenterY
  for (pt = 0; pt < numBlobPts; pt++) {
    let x = random(-xRange / 2, xRange / 2);
    let y = random(-yRange / 2, yRange / 2);
    let v = createVector(centerX + x, centerY + y);
    if (!outOfBounds(v)) {
      verts.push(v);
    }
  }

  if (verts.length < 4) {
    return (0) // cannot make a blob
  }

  hull = getHull(verts); // make shape from verts
  if (hull.length > 2) {
    bbox = hull_bbox(hull, verts)
    gridPoints = getInternalGridPoints(bbox) // grid points inside bbox
    //print('new blob Hull length', hull.length)
    olap = isBlobOvelapping(hull);
    //print(cx, cy, "overlap", olap)
    if (!olap) {
      renderHull(hull);
      markInternalPoints(gridPoints);
      //renderInternalGridPoints(gridPoints);
      return (1);
    }
  }

  //making copies
  // for (k = 0; k < 1; k++) {
  //   xStep = k * 100
  //   yStep = k * 150
  //   newHull = moveHull(hull, xStep, yStep)
  //   renderHull(newHull);
  // }
  return (0) //unable to
}


function get4NearestGridPoints(hpt) {
  //each hpt has 4 grid points around it. Find them.
  gpts = [];
  hx = hpt.x
  hy = hpt.y
  xStep = (width - 2 * canvasXMargin) / nCols;
  yStep = (height - 2 * canvasYMargin) / nRows;
  gx = Math.floor((hx - canvasXMargin) / xStep)
  gy = Math.floor((hy - canvasYMargin) / yStep)
  //print(gx, gy, xStep, yStep)
  gpt = getGridCoords(gx, gy)
  for (g of grid) {
    if ((g.x == gpt.x) && (g.y == gpt.y)) {
      gpts.push(g)
    }
    if ((g.x == gpt.x) && (g.y == gpt.y + yStep)) {
      gpts.push(g)
    }
    if ((g.x == gpt.x + xStep) && (g.y == gpt.y)) {
      gpts.push(g)
    }
    if ((g.x == gpt.x + xStep) && (g.y == gpt.y + yStep)) {
      gpts.push(g)
    }
  }
  //print(hpt.x, gpts.length, 'gpts')
  return (gpts)
}


function isBlobOvelapping(hull) {
  //1 if overlapping, 0 means it is fine to place it there
  for (h of hull) {
    gpts = get4NearestGridPoints(h)
    //print(gpts, "grid points")
    for (gp of gpts) {
      // push();
      // strokeWeight(10);
      // point(gp.x, gp.y);
      // pop();
      if (!gp.free) {
        //print(gp, 'not free')
        return (1)
      }
    }
  }
  return (0)

}


function getInternalGridPoints(bbox) {
  // grid points inside bbox
  gridBox = [];
  for (g of grid) {
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

function markInternalPoints(gridPoints) {
  for (gpt of gridPoints) {
    val = isPointInside(gpt, hull)
    if (val == 1) {
      gpt.free = false;
    }
  }
}


function renderInternalGridPoints(gridPoints) {
  push();
  strokeWeight(3);
  for (g of gridPoints) {
    if (g.free) {
      stroke(0, 200, 0);
    } else {
      stroke(128, 0, 0);
    }
    point(g.x, g.y)
  }
  pop();
}


function moveHull(hull, xStep, yStep) {
  newHull = [];
  for (h of hull) {
    let v = createVector(h.x + xStep, h.y + yStep);
    newHull.push(v)
  }
  return (newHull)
}

function hull_bbox(hull, verts) {
  try {
    return {
      xMin: Math.min.apply(Math, hull.map(function (o) { return o.x; })),
      xMax: Math.max.apply(Math, hull.map(function (o) { return o.x; })),
      yMin: Math.min.apply(Math, hull.map(function (o) { return o.y; })),
      yMax: Math.max.apply(Math, hull.map(function (o) { return o.y; }))
    };
  } catch (err) { // <-- the "error object", could use another word instead of err
    print("verts", verts, "hull", hull)
  }
}


function isPointInside(pt, hull) {

  let h0 = hull[0];
  //strokeWeight(5)
  //point(h0.x, h0.y)

  bbox = hull_bbox(hull)
  //print('bbox', bbox)

  if ((pt.x > bbox.xMax) || (pt.x < bbox.xMin)) {
    print('no need to check')
    return (0)
  }

  //hvector is from h0 to hi
  //pvector is from h0 to pt
  //then check their cross product sign  
  crossZ = [];
  for (i = 1; i < hull.length; i++) {
    checking = hull[i]
    const pv = p5.Vector.sub(pt, h0);
    const hv = p5.Vector.sub(checking, h0);
    const cross = pv.cross(hv);
    //print(cross.z, 'cross z')
    crossZ.push(cross.z)
  }

  sector = -1;
  for (i = 1; i < crossZ.length; i++) {
    if (Math.sign(crossZ[i - 1]) != Math.sign(crossZ[i])) { // found the sector
      sector = i;
      //print(i - 1, i, crossZ.length, hull.length)
    }
  }

  /*
  if (sector != -1) {
    push();
    stroke(255);
    strokeWeight(8);
    point(h0.x, h0.y)
    point(hull[sector].x, hull[sector].y)
    point(hull[sector + 1].x, hull[sector + 1].y)
    pop();
  } 
  */

  //print('sector', sector, sector + 1)
  //we know the sector, but we still have to see if the pt is inside or outside the hull...

  if (sector != -1) {
    const edge = p5.Vector.sub(hull[sector], hull[sector + 1]);
    const hp = p5.Vector.sub(hull[sector], pt);
    const cross2 = edge.cross(hp);
    //print(cross2.z, 'cross2')
    if (cross2.z > 0) {
      return 1
    } else {
      return 0
    }
  }
  return (0)
}



function renderHull(hull) {
  alphaValue = 100 + random(100);
  c = color(random(palette));
  stroke(c);
  c.setAlpha(alphaValue);
  //fill(c);
  push();
  //rotate(PI / 7 * int(random(7)));
  beginShape();
  for (let p of hull) {
    vertex(p.x, p.y);
  }
  endShape(CLOSE);

  // for (let p of hull) {
  //   strokeWeight(10)
  //   point(p.x, p.y)
  // }

  pop();

}

function getCoords(v) {
  px = canvasXMargin + xStep * v.x;
  py = canvasYMargin + yStep * v.y;
  return (createVector(px, py))
}

function getGridCoords(gCol, gRow) {
  px = canvasXMargin + xStep * gCol;
  py = canvasYMargin + yStep * gRow;
  return ({
    x: px,
    y: py
  })
}

//GRID RELATED FUNCTION
function outOfBounds(pt) {
  if (pt.x < canvasXMargin) { return 1 }
  if (pt.x > width - canvasXMargin) { return 1 }
  if (pt.y < canvasYMargin) { return 1 }
  if (pt.y > height - canvasYMargin) { return 1 }
  return 0
}




// Adapted from Gift Wrapping Algorithm by Daniel Shiffman
// Made it a stand-alone function for me to use
function getHull(points) {

  let hull = [];

  points.sort((a, b) => a.x - b.x);
  let leftMost = points[0];
  currentVertex = leftMost;
  hull.push(currentVertex);
  nextVertex = points[1];

  done = false;
  attempts = 0;
  while (!done && attempts < 1000) {

    nextVertex = getNextVertex(currentVertex, points);
    if (nextVertex == leftMost && hull.length > 2) {
      done = true;
    } else {
      hull.push(nextVertex);
      currentVertex = nextVertex;
      nextVertex = leftMost;
    }
    attempts++;
  }
  return (hull)
}


function getNextVertex(currentVertex, points) {
  nextVertex = random(points);
  for (index = 0; index < points.length; index++) {
    let checking = points[index];
    stroke(255);

    const a = p5.Vector.sub(nextVertex, currentVertex);
    const b = p5.Vector.sub(checking, currentVertex);
    const cross = a.cross(b);

    if (cross.z < 0) { // found a better point
      nextVertex = checking;
      nextIndex = index;
    }

  }

  return (nextVertex)

}




function renderGrid(grid) {
  strokeWeight(3);
  for (p of grid) {
    point(p.x, p.y);
  }
}

function createGrid(nRows, nCols) {
  let grid = [];
  xStep = (width - 2 * canvasXMargin) / nCols;
  yStep = (height - 2 * canvasYMargin) / nRows;
  for (row = 0; row < nRows; row++) {
    for (col = 0; col < nCols; col++) {
      px = canvasXMargin + xStep * col
      py = canvasYMargin + yStep * row
      let v = createVector(px, py);
      v.free = true;
      grid.push(v);
    }
  }
  return (grid)
}


////////////
function keyTyped() {
  // png is much higher quality than jpg
  if (key == 's') {
    let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + "-" + nf(millis(), 3, 0);
    saveCanvas('keep_' + timeStamp + 'png');
  }
  if (key == 'k') {
    let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + "-" + nf(millis(), 3, 0);
    saveCanvas('keep_' + timeStamp + 'png');
    saveCanvas('keep0.png'); //representative. will overwrite existing file
  }

}

function replicate(arr, times) {
  var al = arr.length,
    rl = al * times,
    res = new Array(rl);
  for (var i = 0; i < rl; i++)
    res[i] = arr[i % al];
  return res;
}

function draw_border(c = 0) {
  push();
  strokeWeight(20);
  stroke(c);
  noFill();
  rect(0, 0, width, height)
  pop();
}
