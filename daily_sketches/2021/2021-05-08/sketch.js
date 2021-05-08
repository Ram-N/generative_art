// Daily Sketch for 2021-05-08
// Ram Narasimhan.
/*

*/
let palette = []
const cnv = {
  xMargin: 30,
  yMargin: 30,
}

const params = {
  nRows: 5,
  nCols: 5, // number of tiles per row in the active canvas
  bgColor: '#0f0f0f',
}

// Steering Behavior Code adapted from Daniel Schiffman's The coding train

let vehicle;
let path;
let vPath = [];

function setup() {
  createCanvas(860, 860);
  background(0);
  palette = red_brown_orange; //colors.js
  palette = replicate(palette, 10)
  // palette = purples; //colors.js  
  // palette = replicate(palette, 10)
  picked = random(purples)
  fill(random(cappuccino))
  fill(0)
  stroke(255);
  let alphaValue = 100;
  cnv.height = height - 2 * cnv.yMargin // usable height
  cnv.width = width - 2 * cnv.yMargin //usable width
  rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);


  let numCurves = 18;
  for (c = 1; c < numCurves; c++) {
    vehicle = new Vehicle(0, height / 2 - 30 * (9 - c));
    //path = new Path(0, height / 2, width, random(height));
    path = new Path(0, height / numCurves * (c), width, height / numCurves * (numCurves - c));
    vehicle.vel.x = c + 1;
    vPath = [];
    while (!single_path()) {
      //keep looping until path terminates
    }
    displayPath(vPath, c)
  }
  for (c = 1; c < numCurves; c++) {
    print(c)
    vehicle = new Vehicle(width / 2 - 30 * (9 - c), 0);
    path = new Path(width / numCurves * (c), 0, width / numCurves * (numCurves - c), height);
    vehicle.vel.x = c + 1;
    vPath = [];
    circuit_breaker = 0
    while (circuit_breaker < 700) {
      //keep looping until path terminates
      if (single_path()) {
        break;
      }
      circuit_breaker++;
    }
    //print(vPath)
    displayPath(vPath, c)
  }


  draw_border(clr = "#d3d3d3", sw = 57); //rn_utils.js
  draw_border(c = "#d3d3d3", sw = 25); //rn_utils.js
  draw_border(c = 20, sw = 20);
}


function displayPath(fullPath, c_int) {
  noStroke();
  print(fullPath.length)
  fill(palette[c_int]);
  for (let p of fullPath) {
    circle(p.x, p.y, 5);
  }
}

function single_path() {
  let halt;
  let force = vehicle.follow(path);
  vehicle.applyForce(force);
  halt = vehicle.edges();
  vehicle.update(vPath);
  return halt
}



