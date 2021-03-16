// Daily Sketch for 2021-03-15
// Ram Narasimhan.
/*
1. DONE Have to scan each shape twice. Once to check for hull overlaps, and once for all interior points overlaps.
2. DONE WHen placing blobs, Sweep horizontally then vertically, then horizontally
3. Scale to shrink, or expand...give blobs an "aura"
*/
let palette = []
let xStep;
let yStep;
const cw = 10;
const ch = 15;
const cnv = {
  xMargin: 80,
  yMargin: 80,
}


let nBlobs = 3;
let ctrAttempts = 10;
let sizeAttempts = 7;

const grid = {
  rows: 100,
  cols: 100
}

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
  rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height)

  gridPts = createGrid(grid.rows, grid.cols);
  stroke(255)
  //renderGridPoints(gridPts) // usually for debugging

  let alphaValue = 220;
  let horiz;

  for (sizeAtt = 0; sizeAtt < sizeAttempts; sizeAtt++) {
    xRange = 100 - sizeAtt * 12;
    yRange = 125 - sizeAtt * 12;
    print('sizeAtt', sizeAtt)
    if (sizeAtt % 2) {
      horiz = true;
      c = color("#f3f3f3");
    } else {
      horiz = false;
      c = color(random(palette));
    }
    c = color(random(palette));
    c.setAlpha(alphaValue);
    fill(c);
    cuts = 6 + (sizeAtt * 2)
    for (attempt = 0; attempt < cuts * cuts; attempt++) {
      if (horiz) { // sweep horizontally, so x changes rapidly
        cy = int(Math.floor(attempt / cuts) * cnv.height / cuts) + cnv.yMargin;
        cx = int((attempt % cuts) * cnv.width / cuts) + cnv.xMargin;
      } else { // sweep vertically, so y changes rapidly
        cx = int(Math.floor(attempt / cuts) * cnv.width / cuts) + cnv.xMargin;
        cy = int((attempt % cuts) * cnv.height / cuts) + cnv.yMargin;
      }
      for (rep = 0; rep < nBlobs; rep++) {
        cx = cx + int(random(-10, 10))
        cy = cy + int(random(-10, 10))
        //print(attempt, cuts, cx, cy)
        success = makeBlob(cx, cy, xRange, yRange);
      }
    }
  }
}


function makeBlob(centerX, centerY, xRange, yRange) {

  verts = generateBlobVertices(centerX, centerY, xRange, yRange);
  if (verts.length < 4) {
    return (0) // cannot make a blob
  }

  hull = getHull(verts); // make shape from verts
  if (hull.length > 2) {
    bbox = hull_bbox(hull, verts)
    blobGpts = getInternalGridPoints(bbox, gridPts) // grid points inside bbox
    overlap = isBlobOvelapping(hull, blobGpts);
    if (!overlap) {
      renderHull(hull);
      markInternalPoints(hull, blobGpts);
      //renderInternalGridPoints(blobGpts);
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
