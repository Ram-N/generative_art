// Daily Sketch for 2021-05-07
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


  vehicle = new Vehicle(0, 100);
  let numCurves = 12;
  for (c = 0; c < numCurves; c++) {
    //path = new Path(0, height / 2, width, random(height));
    path = new Path(0, height / 2, width, height / numCurves * c);
    vehicle.vel.x = c + 1;
    vPath = [];
    while (!single_path()) {
      //keep looping until path terminates
    }
    displayPath(vPath)
  }


  draw_border(clr = "#d3d3d3", sw = 57); //rn_utils.js
  draw_border(c = "#d3d3d3", sw = 25); //rn_utils.js
  draw_border(c = 20, sw = 20);
}


function displayPath(fullPath) {
  noStroke();
  fill(random(palette));
  for (let p of fullPath) {
    circle(p.x, p.y, 20);
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



