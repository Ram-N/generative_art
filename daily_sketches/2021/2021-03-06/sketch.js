// Daily Sketch by Ram Narasimhan, 2021-03-06

//Basic Idea: Create a bunch of non-overlapping blobs
// 1. form blobs on a grid
// 2. make them non-overlapping

let palette = []
let xStep;
let yStep;
const cw = 20;
const ch = 25;
let canvasXMargin = 25;
let canvasYMargin = 25;
//let verts = []

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

  fill(255);
  nRows = 20;
  nCols = 25;
  xStep = (width - 2 * canvasXMargin) / nCols;
  yStep = (height - 2 * canvasYMargin) / nRows;

  for (row = 0; row < nRows; row++) {
    for (col = 0; col < nCols; col++) {
      px = canvasXMargin + xStep * col
      py = canvasYMargin + yStep * row
      ellipse(px, py, 3, 3);
    }
  }

  oVerts = makeBlob();
  print('back')
  for (v of oVerts) {
    print(v)
  }

  //   push();
  //   translate(xoff, height * 0.25 * (bloom + 1));
  //   pop();

}

function makeBlob() {
  let verts = [];
  for (pt = 0; pt < 5; pt++) {
    y = int(random(nRows));
    x = int(random(nRows));
    let v = createVector(x, y);
    v.ordered = false;
    verts.push(v);
  }

  const MAX_DIST = 1000;
  //reorder them by distance
  vOrder = []
  vOrder.push(verts[0])
  verts[0].ordered = true;
  for (i = 0; i < 5; i++) {
    curr_min_dist = MAX_DIST
    if (!verts[i].ordered) {
      for (j = 0; j < 5; j++) {
        if (!verts[j].ordered && i != j) {
          if (dist(verts[i].x, verts[i].y, verts[j].x, verts[j].y) < curr_min_dist) {
            curr_min_dist = dist(verts[i].x, verts[i].y, verts[j].x, verts[j].y);
            curr_candidate = j
          }
        }
      }
      vOrder.push(verts[curr_candidate]);
      verts[curr_candidate].ordered = true;
    }
  }

  beginShape();
  for (v of vOrder) {
    print(v.x, v.y)
    px = canvasXMargin + xStep * v.x;
    py = canvasYMargin + yStep * v.y;
    vertex(px, py);
  }
  endShape(CLOSE);

  print('done')
  return (vOrder)
}



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