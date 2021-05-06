// Daily Sketch for 2021-05-05
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
  bgColor: '#0f0f0f',
}


function setup() {
  createCanvas(860, 860);
  background("#d3d3d3");
  //background("#0F0F0F");
  //background(seablue);
  palette = red_brown_orange; //colors.js
  palette = replicate(palette, 10)
  // palette = purples; //colors.js  
  // palette = replicate(palette, 10)
  picked = random(purples)
  //background("#72efdd")
  fill(random(cappuccino))
  stroke(255);
  let alphaValue = 100;

  cnv.height = height - 2 * cnv.yMargin // usable height
  cnv.width = width - 2 * cnv.yMargin //usable width
  rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);
  grid = new Grid(params.nCols, params.nRows, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin);
  //grid.dispalyGridPoints(255)// rn_grid.js

  tiles = createTileGrid(5, cnv)
  //fill('red')
  tz = grid.xStep * 0.9
  textSize(18);
  textFont('courier');
  //textAlign(LEFT, CENTER);

  for (tcoord of tiles) {
    push();
    rectMode(CENTER);
    translate(tcoord.x, tcoord.y)
    fc = random(palette.slice(6, 9))
    print(fc)
    stroke(fc)
    //stroke(picked);
    noFill();
    strokeWeight(1);
    //rect(0, 0, tz, tz);

    //place text here...
    h = random(haikus)
    let yPos = -tz / 2 + 10;
    let xPos = -tz / 2;

    col = 0;
    row = 0;
    for (let i = 0; i < h.length; i++) {
      col += 1;
      if (xPos >= tz / 2 - 10) {
        rotate(PI / 2)
        col = 0;
        row += 1;
        xPos = -tz / 2
      }
      text(h[i], xPos, yPos);
      xPos += textWidth(h[i]) - 2;
    }

    pop();
  }




  draw_border(clr = "#d3d3d3", sw = 57); //rn_utils.js
  draw_border(c = "#d3d3d3", sw = 25); //rn_utils.js
  draw_border(c = 20, sw = 20);
}




