// Daily Sketch by Ram Narasimhan, 2021-03-14

/*
1. DONE Split JS files into shapes.js and grid.js
2. Have to scan each shape twice. Once to check for hull overlaps, and once for all interior points overlaps.
3. Sweep horizontally then vertically, then horizontally to place blobs on the grid/canvas

*/
let palette = []
let xStep;
let yStep;
const cw = 10;
const ch = 15;
const cnv = {
  xMargin: 30,
  yMargin: 30
}


let nBlobs = 1;
let ctrAttempts = 104
let sizeAttempts = 7;


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
  palette = melons; //colors.js
  palette = replicate(palette, 10)

  nRows = 50;
  nCols = 40;
  grid = createGrid(nRows, nCols);

  stroke(255)
  //renderGrid(grid)

  let alphaValue = 220;

  for (sizeAtt = 0; sizeAtt < sizeAttempts; sizeAtt++) {
    xRange = 150 - sizeAtt * 20;
    yRange = 200 - sizeAtt * 25;
    ctA = ctrAttempts * (sizeAtt + 1)
    print('sizeAtt', sizeAtt, ctA)
    c = color(random(palette));
    c.setAlpha(alphaValue);
    fill(c);
    for (attempt = 0; attempt < ctA; attempt++) {
      cy = int(random(nRows));
      cx = int(random(nCols));
      for (rep = 0; rep < nBlobs; rep++) {
        cx = cx + int(random(-5, 5))
        cy = cy + int(random(-5, 5))
        success = makeBlob(cx, cy, xRange, yRange);
        //print(success)
      }
    }
  }
}

function makeBlob(cx, cy, xRange, yRange) {
  let verts = [];
  numBlobPts = 5 + int(random(20))

  centerX = cnv.xMargin + xStep * cx;
  centerY = cnv.yMargin + yStep * cy;

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
    overlap = isBlobOvelapping(hull);
    //print(cx, cy, "overlap", overlap)
    if (!overlap) {
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
