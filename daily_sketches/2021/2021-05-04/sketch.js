// Daily Sketch for 2021-05-03
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
  numEcho: 15
}

haikus = ["An old silent pond A frog jumps into the pond— Splash! Silence again.",
  "A world of dew, And within every dewdrop A world of struggle.",
  "The light of a candle Is transferred to another candle— Spring twilight",
  "I write, erase, rewrite erase again, and then a poppy blooms.",
  "Over the wintry Forest, winds howl in rage With no leaves to blow.",
  "The apparition of these faces in the crowd; Petals on a wet, black bough.",
  "love between us is speech and breath. loving you is a long river running.",
  "the first cold shower even the monkey seems to want a little coat of straw",
  "the wind of Fuji I've brought on my fan a gift from Edo"
]

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
  background("#72efdd")
  fill(picked)
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
    strokeWeight(3)

    fc = random(palette.slice(1, 6))
    print(fc)
    stroke(fc)
    //stroke(picked);
    noFill();
    strokeWeight(1);
    //rect(0, 0, tz, tz);

    //place text here...
    h = random(haikus)
    let yPos = -tz / 2 + 20;
    let xPos = -tz / 2;

    col = 0;
    row = 0;
    for (let i = 0; i < h.length; i++) {
      col += 1;
      if (xPos >= tz / 2 - 10) {
        col = 0;
        row += 1;
        xPos = -tz / 2
        yPos += 23
      }
      text(h[i], xPos, yPos);
      xPos += textWidth(h[i]);
    }

    pop();
  }




  draw_border(clr = "#d3d3d3", sw = 57); //rn_utils.js
  draw_border(c = "#d3d3d3", sw = 25); //rn_utils.js
  draw_border(c = 20, sw = 20);
}




