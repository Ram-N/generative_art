// Daily Sketch for 2021-03-16
// Ram Narasimhan.
/*
1. Draw hexagons
2. overlap 3 hexagons

*/
let palette = []
const cnv = {
  xMargin: 50,
  yMargin: 50,
}

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
  //renderGridPoints(gridPts) // grid.js
  let alphaValue = 220;

  let centers = [{ x: width / 4, y: height / 4 },
  { x: 3 * width / 4, y: height / 4 },
  { x: 2 * width / 4, y: 2 * height / 4 },
  { x: width / 4, y: 3 * height / 4 },
  { x: 3 * width / 4, y: 3 * height / 4 }]
  //fill("#1167b1")
  stroke(0);
  strokeWeight(3)
  base_r = 100
  numEcho = 5
  //  _x, _y, _n, _scale, _col
  for (ctr of centers) {
    push();
    translate(ctr.x, ctr.y)
    for (k = 0; k < numEcho; k++) {
      if (random(1) < 0.5) {
        fill(red_brown_orange[8 - k])
      } else {
        noFill();
      }
      xAdj = int(random(-3, 3)) * base_r / 4
      hex = new Polygon(xAdj, 0, 6, 100 * (1 - k / numEcho), red_brown_orange[7 - k])
      hex.rotate(PI / 4 * int(random(5)))
      hex.render()
    }
    pop();
  }
}
// function draw() {
//   hex.render()
// }

function draw_border(c = 0) {
  push();
  strokeWeight(20);
  stroke(c);
  noFill();
  rect(0, 0, width, height)
  pop();
}
