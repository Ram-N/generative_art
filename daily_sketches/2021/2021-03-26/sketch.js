// Daily Sketch for 2021-03-26
// Ram Narasimhan.
/*
ECHO effects*/

let palette = []
const cnv = {
  xMargin: 30,
  yMargin: 30,
}

const gr = {
  rows: 20,
  cols: 20
}


function setup() {
  createCanvas(860, 860);
  background("#d3d3d3");
  //background("#0F0F0F");
  //background(seablue);
  draw_border(20);
  palette = red_brown_orange; //colors.js
  palette = replicate(palette, 10)

  cnv.height = height - 2 * cnv.yMargin //usable height
  cnv.width = width - 2 * cnv.yMargin //usable width
  fill(20)
  rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);
  grid = new Grid(gr.rows, gr.cols, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin);
  stroke(255);
  //renderGridPoints(grid.points) // rn_grid.js
  translate(width / 2, height / 2);
  strokeWeight(5);
  point(0, 0)
  let _scales = [[1, 1], [-1, 1], [1, -1], [-1, -1]];

  const shape = {
    nEcho: 1,
    maxRadius: 200,
    sq: 30,
    extension: 50
  };

  for (let sc of _scales) {
    push();
    scale(sc[0], sc[1]);
    for (let echo = 0; echo < shape.nEcho; echo++) {
      let r = shape.maxRadius;
      let s = shape.sq;
      let ext = shape.extension;
      renderShape(r, s, ext);
    }
    pop();
  }
}

function renderShape(r, s, ext) {
  let alphaValue = 100;
  colr = color(random(palette));
  colr.setAlpha(alphaValue);

  semiEnd = r / 2 + ext;
  extEnd = r / 2;
  arc(-semiEnd, 0, r, r, PI, 3 / 4 * TWO_PI);
  arc(0, -semiEnd, r, r, PI, 3 / 4 * TWO_PI);

  stroke(255, 0, 0)
  line(-semiEnd, -r / 2, -extEnd, -r / 2) // till extension
  strokeWeight(3)
  line(-extEnd, -r / 2, -extEnd + s, -r / 2)
  stroke(200, 20, 0)
  strokeWeight(1)
  line(-extEnd + s, -r / 2, -extEnd + s, -r / 2 + s)

  stroke(0, 255, 0)
  line(-r / 2, -semiEnd, -r / 2, -extEnd) // vert
  strokeWeight(3)
  line(-r / 2, -extEnd, -r / 2, -extEnd + s)
  line(-r / 2, -extEnd + s, -r / 2 + s, -extEnd + s)
}



function draw_border(c = 0) {
  push();
  strokeWeight(20);
  stroke(c);
  noFill();
  rect(0, 0, width, height)
  pop();
}
