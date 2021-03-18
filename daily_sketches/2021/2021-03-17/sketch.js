// Daily Sketch for 2021-03-17
// Ram Narasimhan.
/*
1. create a n by n tile_grid
2. place overlapping hexagons there...

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
  let alphaValue = 100;

  nTiles = 3
  tiles = createTileGrid(nTiles, cnv)

  //fill("#1167b1")
  stroke(0);
  strokeWeight(5)
  base_r = cnv.width / (nTiles + 4)
  numEcho = 3
  sizes = [base_r, base_r * 0.5, base_r * 3 / 4]
  sizes = [base_r * 0.5]
  moves = [[0, 1], [0, -1], [-1.5, 0], [1.5, 0]]

  //  _x, _y, _n, _scale, _col
  for (tile of tiles) {
    push();
    translate(tile.x, tile.y)
    for (k = 0; k < numEcho; k++) {
      if (random(1) < 0.5) {
        //c = color(red_brown_orange[7 - k])
        c = color(random(purples))
        c.setAlpha(alphaValue);
        fill(c);
      } else {
        noFill();
      }
      rad = random(sizes)
      selectedMove = random(moves)
      print(selectedMove)
      //xAdj = selectedMove[0] * rad
      //yAdj = selectedMove[1] * rad * sin(PI / 3)
      xAdj = random([-1, 0, 1]) * rad
      yAdj = random([-1, 0, 1]) * rad * sin(PI / 3)
      hx = new Polygon(xAdj, yAdj, 6, rad, red_brown_orange[7 - k])
      //hx.rotate(PI / 4 * int(random(5)))
      hx.render()
    }
    stroke(250)
    point(0, 0)

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
