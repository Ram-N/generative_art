// Daily Sketch for 2021-03-31
// Ram Narasimhan.
/*
1. Add some "textures" Parallel lines in one of 3 orientations

*/
let palette = []
const cnv = {
  xMargin: 50,
  yMargin: 50,
}


const params = {
  rows: 100,
  cols: 100,
  nTiles: 3,
  numEcho: 4
}

function setup() {
  createCanvas(860, 860);
  background("#d3d3d3");
  draw_border(20);

  let c1 = color(0, 7, 16);
  let c2 = color(49, 16, 2);
  background("#d0efff");
  bgGradient(0, 0, width, height, c1, c2)

  palette = red_brown_orange; //colors.js
  palette = purples; //colors.js
  palette = melons; //colors.js


  cnv.height = height - 2 * cnv.yMargin
  cnv.width = width - 2 * cnv.yMargin
  fill(20)
  //rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height)
  //gridPts = createGrid(params.rows, params.cols);
  stroke(255)
  //renderGridPoints(gridPts) // grid.js

  tiles = createTileGrid(params.nTiles, cnv)

  //fill("#1167b1")
  stroke(0);
  strokeWeight(5)
  base_r = cnv.width / (params.nTiles * 3.5)
  sizes = [base_r, base_r * 0.5, base_r * 0.7]
  //sizes = [base_r * 0.5]
  moves = [[0, 1], [0, -1], [-1.5, 0], [1.5, 0]]

  colorset = [purples, melons, red_orange];

  for (tileSide of [2, 3, 1]) {
    tiles = createTileGrid(tileSide, cnv);
    palette = colorset[tileSide - 1]
    palette = replicate(palette, 10)
    for (tile of tiles) {
      render_tile_hexagons(palette);
    }
  }


}

function render_tile_hexagons(palette) {
  let alphaValue = 100;

  push();
  translate(tile.x, tile.y)

  for (k = 0; k < params.numEcho; k++) {
    if (random(1) < 0.3) {
      c = color(random(purples))
      c.setAlpha(alphaValue);
      fill(c);
    } else {
      noFill();
    }
    rad = random(sizes)
    selectedMove = random(moves)
    //xAdj = selectedMove[0] * rad
    //yAdj = selectedMove[1] * rad * sin(PI / 3)
    xAdj = random([-1, 0, 1]) * rad
    yAdj = random([-1, 0, 1]) * rad * sin(PI / 3)
    hx = new Polygon(xAdj, yAdj, 6, rad, palette[7 - k])
    hx.rotate(PI / 4 * int(random(5)))
    hx.render()
    hx.renderVertices();
    if (random(1) < 0.2) {
      hx.renderStripes(2, 0.2);
    }
  }
  stroke(250)
  //point(0, 0)

  pop();

}



function draw_border(c = 0) {
  push();
  strokeWeight(20);
  stroke(c);
  noFill();
  rect(0, 0, width, height)
  pop();
}


function bgGradient(xs, ys, xe, ye, c1, c2) {

  noFill();
  for (let i = ys; i <= ye; i++) {
    let inter = map(i, ys, ye, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(xs, i, xs + xe, i);
  }

}