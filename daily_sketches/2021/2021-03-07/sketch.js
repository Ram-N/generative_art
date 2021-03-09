// Daily Sketch by Ram Narasimhan, 2021-03-07

//Basic Idea: Create a bunch of non-overlapping blobs
// 1. Find the smallest polygon hull...

let palette = []
let xStep;
let yStep;
const cw = 10;
const ch = 15;
let canvasXMargin = 25;
let canvasYMargin = 25;

let nBlobs = 20;

function setup() {
  createCanvas(860, 860);
  //background("#d3d3d3");
  background("#030303");
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

  nRows = 30;
  nCols = 35;
  xStep = (width - 2 * canvasXMargin) / nCols;
  yStep = (height - 2 * canvasYMargin) / nRows;

  stroke(255)
  //renderGrid()

  let alphaValue = 100;
  for (rep = 0; rep < nBlobs; rep++) {
    c = color(random(palette));
    c.setAlpha(alphaValue);
    fill(c);
    makeBlob();
  }
  // print('back')
  // for (v of oVerts) {
  //   print(v)
  // }

  //   push();
  //   translate(xoff, height * 0.25 * (bloom + 1));
  //   pop();

}

function makeBlob() {
  let verts = [];
  for (pt = 0; pt < 5; pt++) {
    y = int(random(nRows));
    x = int(random(nCols));
    let v = createVector(x, y);
    px = canvasXMargin + xStep * v.x;
    py = canvasYMargin + yStep * v.y;
    //ellipse(px, py, 15, 15);
    verts.push(v);
  }

  hull = getHull(verts);
  print(hull)
  renderHull(hull);

}

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
    //line(currentVertex.x, currentVertex.y, checking.x, checking.y);

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

alphaValue = 20;
function renderHull(hull) {
  c = color(random(palette));
  c.setAlpha(alphaValue);
  fill(c);

  noStroke();
  beginShape();
  for (let p of hull) {
    coords = getCoords(p)
    vertex(coords.x, coords.y);
  }
  endShape(CLOSE);
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