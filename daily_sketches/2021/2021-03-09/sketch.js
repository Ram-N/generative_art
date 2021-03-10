// Daily Sketch by Ram Narasimhan, 2021-03-09

// color hull verts
// 3. Go get xmin, xmax, ymin, ymax.
// 4. See which points are inside. Mark them as taken. (Start all initial points as free)
//Next: make the blobs to be non-overlapping

let palette = []
let xStep;
let yStep;
const cw = 10;
const ch = 15;
let canvasXMargin = 25;
let canvasYMargin = 25;

let nBlobs = 1;
let nClusters = 3;


function setup() {
  createCanvas(860, 860);
  background("#d3d3d3");
  //background("#030303");
  draw_border();


  palette = [
    "#03071e",
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
  nCols = 45;
  grid = createGrid(nRows, nCols);

  stroke(255)
  renderGrid(grid)

  let alphaValue = 100;

  for (cluster = 0; cluster < nClusters; cluster++) {
    cy = int(random(nRows));
    cx = int(random(nCols));
    for (rep = 0; rep < nBlobs; rep++) {
      c = color(random(palette));
      c.setAlpha(alphaValue);
      fill(c);
      cx = cx + int(random(-5, 5))
      cy = cy + int(random(-5, 5))
      makeBlob(cx, cy);
    }
  }



}




function makeBlob(cx, cy) {
  let verts = [];
  // let xRange = 50 + random(450);
  // let yRange = 50 + random(300);
  let xRange = 450;
  let yRange = 300;
  vBlob = 3 + int(random(20))

  px = canvasXMargin + xStep * cx;
  py = canvasYMargin + yStep * cy;

  for (pt = 0; pt < vBlob; pt++) {
    y = -yRange / 2 + random(yRange);
    x = -xRange / 2 + random(xRange);
    let v = createVector(px + x, py + y);
    verts.push(v);
  }

  hull = getHull(verts);
  print(hull)
  renderHull(hull);

  pt = grid[533]
  point(pt.x, pt.y)
  val = isPointInside(pt, hull)
  print(pt, val)

}

function isPointInside(pt, hull) {

  let h0 = hull[0];
  strokeWeight(5)
  point(h0.x, h0.y)

  //hvector is from h0 to hi
  //pvector is from h0 to pt
  //then check their cross product sign  
  for (i = 1; i < hull.length; i++) {
    checking = hull[i]
    stroke(i * 20)
    strokeWeight(i + 1)
    line(h0.x, h0.y, hull[i].x, hull[i].y)
    const pv = p5.Vector.sub(pt, h0);
    const hv = p5.Vector.sub(checking, h0);
    const cross = pv.cross(hv);
    print(cross.z, 'cross z')
    if (cross.z < 0) { // found a better point
      best = checking;
      bestIndex = i;
    }


  }

  return (0)
}



function renderHull(hull) {
  alphaValue = 100 + random(100);
  c = color(random(palette));
  stroke(c);
  c.setAlpha(alphaValue);
  fill(c);
  push();
  //rotate(PI / 7 * int(random(7)));
  beginShape();
  for (let p of hull) {
    vertex(p.x, p.y);
  }
  endShape(CLOSE);

  for (let p of hull) {
    strokeWeight(10)
    point(p.x, p.y)
  }

  pop();

}

//deprecated
function getCoords(v) {
  px = canvasXMargin + xStep * v.x;
  py = canvasYMargin + yStep * v.y;
  return (createVector(px, py))
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

function draw_border() {
  push();
  strokeWeight(20);
  stroke(0);
  noFill();
  rect(0, 0, width, height)
  pop();
}
