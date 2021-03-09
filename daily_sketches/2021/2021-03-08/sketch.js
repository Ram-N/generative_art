// Daily Sketch by Ram Narasimhan, 2021-03-08

// Goal for today: Create better-shaped Blobs.
//Next: make the blobs to be non-overlapping

let palette = []
let xStep;
let yStep;
const cw = 10;
const ch = 15;
let canvasXMargin = 25;
let canvasYMargin = 25;

let nBlobs = 30;
let nClusters = 3;

function setup() {
  createCanvas(860, 860);
  background("#d3d3d3");
  //background("#030303");
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
  xStep = (width - 2 * canvasXMargin) / nCols;
  yStep = (height - 2 * canvasYMargin) / nRows;

  stroke(255)
  //renderGrid()

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
  let xRange = 50 + random(50);
  let yRange = 50 + random(100);
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





function renderGrid() {
  strokeWeight(3);
  for (row = 0; row < nRows; row++) {
    for (col = 0; col < nCols; col++) {
      px = canvasXMargin + xStep * col
      py = canvasYMargin + yStep * row
      point(px, py);
    }
  }
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