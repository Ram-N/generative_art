// Daily Sketch for 2021-03-21
// Ram Narasimhan.
/*
Pendants, rhythmic parallel lines

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
  //renderGridPoints(gridPts) // grid.js
  let alphaValue = 100;

  let nTiles = 6
  let nEcho = 12;
  bbOffset = 20;
  let pendants = [];
  var penGrid = new Array(nTiles);
  for (var i = 0; i < penGrid.length; i++) {
    penGrid[i] = new Array(nTiles);
  }


  tiles = createTileGrid(nTiles, cnv)
  stroke(0);
  strokeWeight(5)

  for (const [index, tile] of tiles.entries()) {
    push();
    translate(tile.nwx, tile.nwy)
    //stroke(250)
    strokeWeight(3)
    //rect(0, 0, tile.width, tile.height)
    pop();

    stroke(250)
    strokeWeight(2)
    pen = new Pendant(tile.x, tile.y, nEcho, tile.width - 2 * bbOffset, tile.height - 2 * bbOffset,
      { wall: 'W', frac: 0.5 },
      { wall: 'E', frac: 0.5 },
      'vert', '#454221');
    print(pen.x, pen.y, pen.nwy)
    pen.row = index % nTiles
    pen.col = Math.floor(index / nTiles)
    pendants.push(pen);
    penGrid[pen.row][pen.col] = pen
  }

  for (pen of pendants) {
    stroke("#FDA50F")
    pen.render()
  }

  for (col = 0; col < nTiles; col++) {
    for (row = 0; row < nTiles; row++) {
      //if ((row == nTiles - 1) || (!row)) {//last row
      p = penGrid[row][col]
      print(row, col, nTiles - 1)
      print(col <= (nTiles - 1), (!col % 2), col)
      if (col < nTiles - 1) {
        q = penGrid[row][col + 1]
        print(p, q)
        line(p.exit.x, p.exit.y, q.entry.x, q.entry.y);
      }
      if (col == nTiles - 1) {
        if (!(row % 2) && (row < nTiles - 1)) {
          q = penGrid[row + 1][col]
          print(p, q)
          line(p.exit.x, p.exit.y, q.exit.x, q.exit.y);
        }
      }
      if (col == 0) {
        if ((row % 2) && (row < nTiles - 1)) {
          q = penGrid[row + 1][col]
          print(p, q)
          line(p.entry.x, p.entry.y, q.entry.x, q.entry.y);
        }
      }

    }
  }

}


function draw_border(c = 0) {
  push();
  strokeWeight(20);
  stroke(c);
  noFill();
  rect(0, 0, width, height)
  pop();
}
