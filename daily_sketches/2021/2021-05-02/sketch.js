// Daily Sketch for 2021-05-02
// Ram Narasimhan.
/*
Tile Grid
5x5 squares...and variations

*/
let palette = []
const cnv = {
  xMargin: 30,
  yMargin: 30,
}

const params = {
  nRows: 5,
  nCols: 5, // number of tiles per row in the active canvas
  bgColor: '#0f0f0f'
}


function setup() {
  createCanvas(860, 860);
  background("#d3d3d3");
  //background("#0F0F0F");
  //background(seablue);
  palette = red_brown_orange; //colors.js
  palette = replicate(palette, 10)
  palette = purples; //colors.js  
  palette = replicate(palette, 10)
  picked = random(red_brown_orange)
  background(picked)
  fill(picked)
  stroke(255);
  let alphaValue = 100;

  cnv.height = height - 2 * cnv.yMargin // usable height
  cnv.width = width - 2 * cnv.yMargin //usable width
  rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);
  grid = new Grid(params.nCols, params.nRows, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin);
  //grid.dispalyGridPoints(255)// rn_grid.js

  tiles = createTileGrid(5, cnv)
  print(tiles)
  //fill('red')
  for (tcoord of tiles) {
    push();
    rectMode(CENTER);
    //tcoord = grid.getGPt(t.x, t.y)
    translate(tcoord.x, tcoord.y)
    rotate(PI / 7 * int(random(8)));
    stroke(picked);
    if (random() < 1) {
      fill(random(palette))
    } else {
      noFill();
    }
    strokeWeight(10);
    tilesize = grid.xStep * 0.7
    tz = tilesize / 2;
    rect(0, 0, tilesize, tilesize)
    line(0, -tz, 0, tz)
    pop();
  }

  noStroke();

  draw_border(clr = "#d3d3d3", sw = 57); //rn_utils.js
  draw_border(c = "#d3d3d3", sw = 25); //rn_utils.js
  draw_border(c = 20, sw = 20);
}




