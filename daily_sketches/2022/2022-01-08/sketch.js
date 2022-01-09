// Daily Sketch for 2022-01-07
// Ram Narasimhan

/*
Genuary 2022

Keywords: Sol LeWitt, genuary2022, Wall Drawing

Desc: This is a generative version of Sol LeWitt's Wall Drawing 1081
Desc : Bands of bright primary colors in rectangles. The shapes are limited to the rectangle 
Desc: and the trapezoid, two of the original six that LeWitt used. 
Desc: The colors are only the three primary colors; red, blue and yellow, and the three secondary colors; green, purple and orange.
*/


const cnv = {
  xMargin: 30,
  yMargin: 30,
}

let palette = []
const params = {
  xStep: 60,
  yStep: 60,
  bgColor: "#d3d3d3",
  blkColor: [0, 0, 0],
  moves: 1000
}


sqSize = 960;

function setup() {
  createCanvas(sqSize, sqSize);
  //colorMode(HSB);
  background(0, 0, 0);


  background(params.blkColor);
  print(params.bgColor)
  palette2 = random(RGBPalList)
  palette = random(RGBPalList)
  palette = replicate(palette, 100)
  cnv.height = height - 2 * cnv.yMargin // usable height
  cnv.width = width - 2 * cnv.yMargin //usable width
  fill(params.blkColor);


  for (rep = 0; rep < 2; rep++) {
    push();
    translate(0, 200 * rep)
    var cBez1 = [{ x: -10, y: 520 }, { x: 200, y: -400 }, { x: 210, y: height * 1.5 }, { x: width * 1.2, y: height - 450 }]
    var cPoints = findCBezPoints(cBez1, 150)
    for (bz = 0; bz < cPoints.length - 1; bz++) {
      colr = random(palette)
      v1 = cPoints[bz];
      v2 = cPoints[bz + 1];
      stroke(colr);
      noFill();
      drawHalfMoons(createVector(v1.x, v1.y), createVector(v2.x, v2.y))
    }
    pop();
  }

  draw_border(clr = params.bgColor, sw = 50); //rn_utils.js
}


//given 2 points V1 and v2, draws several half-moons that are tangential to v1, v2
function drawHalfMoons(v1, v2) {


  angle = (v2.copy().sub(v1)).heading()
  for (rep = 0; rep < 10; rep++) {
    midpt = p5.Vector.lerp(v1, v2, random(0.2, 0.8));

    r = random(200)
    px = midpt.x + r / 2 * cos(angle + 3 * PI / 2)
    py = midpt.y + r / 2 * sin(angle + 3 * PI / 2)

    arc(px, py, r, r, angle + PI / 4, angle + PI - PI / 4)

  }
}


function findCBezPoints(b, numPts) {
  var startPt = b[0];
  var controlPt1 = b[1];
  var controlPt2 = b[2];
  var endPt = b[3];
  var pts = [b[0]];
  var lastPt = b[0];
  var tests = 100;
  for (var t = 0; t <= numPts; t++) {
    // calc another point along the curve
    var pt = getCubicBezierXYatPercent(startPt, controlPt1, controlPt2, endPt, t / numPts);
    // add the pt if it's not already in the pts[] array
    var dx = pt.x - lastPt.x;
    var dy = pt.y - lastPt.y;
    var d = Math.sqrt(dx * dx + dy * dy);
    var dInt = parseInt(d);
    if (dInt > 0 || t == tests) {
      lastPt = pt;
      pts.push(pt);
    }
  }
  return (pts);
}