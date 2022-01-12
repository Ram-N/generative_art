// Daily Sketch for 2022-01-10
// Ram Narasimhan

/*
Genuary 2022
Desc: ML - Wrong Answers only
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
  colorMode(HSB);
  background(0, 0, 0);


  background(params.blkColor);
  print(params.bgColor)
  palette2 = random(RGBPalList)
  palette = random(RGBPalList)
  palette = replicate(palette, 100)
  cnv.height = height - 2 * cnv.yMargin // usable height
  cnv.width = width - 2 * cnv.yMargin //usable width
  fill(params.blkColor);

  tg = new TileGrid(12, 12, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin)
  //tg.renderTileGrid(200)

  //TRAINING DATA
  startRow = 1
  curve = [false, true, true]
  for (tCol = 0; tCol < 3; tCol++) {
    curved = curve[tCol]
    for (tRow = startRow; tRow < tg.rows - startRow; tRow++) {
      tile = tg.getTileFromCR(tCol, tRow, verbose = false)
      populateTile(tile, points = tRow + 1, curved)
    }
  }

  push();
  //Machine Learning
  strokeWeight(5)
  stroke('white')
  noFill();
  NWTile = tg.getTileFromCR(4, 3)
  SETile = tg.getTileFromCR(tg.cols - 4, tg.rows - 3)
  x1 = random(NWTile.x + 20, SETile.x)
  y1 = random(NWTile.y - 30, SETile.y)

  offset = 30;
  beginShape();
  curveVertex(tg.getTileFromCR(3, 6).x, (NWTile.y + SETile.y) / 2)
  for (rep = 0; rep < 30; rep++) {
    x2 = random(NWTile.x, SETile.x)
    y2 = random(NWTile.y, SETile.y)
    vertex(x2, y2);
    circle(x2, y2, 10)
    x1 = x2; y1 = y2;
  }

  endShape();

  line(tg.getTileFromCR(9, 6).x - offset, (NWTile.y + SETile.y) / 2,
    tg.getTileFromCR(3, 6).x + offset, (NWTile.y + SETile.y) / 2);
  pop();


  for (tCol = tg.cols - 3; tCol < tg.cols - 1; tCol++) {
    for (tRow = startRow; tRow < tg.rows - startRow; tRow++) {
      tile = tg.getTileFromCR(tCol, tRow, verbose = false)
      resultsTile(tile)
    }
  }



  draw_border(clr = params.blkColor, sw = 50); //rn_utils.js
}

function resultsTile(tile) {


  if (!tile.active) { return }
  x = tile.cx;
  y = tile.cy;
  stepSize = tile.width;
  radius1 = stepSize * 0.5;
  radius2 = radius1 * 0.6;

  colr = random(palette2);
  fill(colr)

  if (random() < 0.2) {
    arc(tile.x, tile.y, stepSize, stepSize, 0, PI / 2)
  }
  if (random() < 0.2) {
    arc(tile.x + tile.width, tile.y, stepSize, stepSize, PI / 2, PI)
  }
  if (random() < 0.15) {
    arc(tile.x + tile.width, tile.y + tile.height, stepSize, stepSize, PI, PI * 1.5)
  }
  if (random() < 0.25) {
    arc(tile.x, tile.y + tile.height, stepSize, stepSize, PI * 1.5, TAU)
  }
  tile.active = 0;
}


function populateTile(tile, points, curved) {

  if (!tile.active) { return }
  x = tile.cx;
  y = tile.cy;
  stepSize = tile.width;
  radius1 = stepSize * 0.5;
  radius2 = radius1 * 0.6;
  mult = random(0.3, 1)

  colr = random(palette);
  fill(colr)
  rot = PI / 7 * int(random(5))
  push();
  stroke(10, 0, 50)
  star(x, y, radius1, radius2, points, rot, curved = curved, repeat = tile.col * 3 + 1)
  pop();

  tile.active = 0;
}

