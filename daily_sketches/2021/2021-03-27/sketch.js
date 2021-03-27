// Daily Sketch for 2021-03-27
// Ram Narasimhan.
/*
ECHO effects for a shape...
*/

let palette = []
const cnv = {
  xMargin: 30,
  yMargin: 30,
}

const gr = {
  rows: 20,
  cols: 20
}

const shape = {
  nEcho: 5,
  maxRadius: 340,
  sq: 70,
  extension: 50,
  step: 6
};

const _scales = [[1, 1], [-1, 1], [1, -1], [-1, -1]];


function setup() {
  createCanvas(860, 860);
  background(seablue);
  draw_border(20);
  palette = red_orange; //colors.js
  palette = replicate(palette, 10)

  cnv.height = height - 2 * cnv.yMargin //usable height
  cnv.width = width - 2 * cnv.yMargin //usable width
  fill(20)
  rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);
  grid = new Grid(gr.rows, gr.cols, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin);
  stroke(255);
  //renderGridPoints(grid.points) // rn_grid.js
  frameRate(3); // make frameRate 10 FPS
}

let changes = [0, 1, 2, 3, 4, 3, 2, 1];

function draw() {
  background(0);
  draw_border(220);

  noFill();
  translate(width / 2, height / 2);
  strokeWeight(5);

  //pick a value that goes up and eases down smoothly, endlessly
  let fv = changes[frameCount % changes.length]
  let rmax = shape.maxRadius
  for (let echo = 0; echo < shape.nEcho; echo++) {
    colr = color(palette[echo]);
    stroke(colr);
    for (let sc of _scales) {
      push();
      scale(sc[0], sc[1]);
      step = (shape.step - fv) * echo;
      let r = rmax - 5 * step;
      let s = shape.sq;
      let ext = shape.extension;
      renderShape(rmax, r, s, ext); //1/4th of the shape gets rendered
      pop();
    }
  }

}


function renderShape(rmax, r, s, ext) {

  semiEnd = rmax / 2 + ext;
  extEnd = r / 2;
  arc(-semiEnd, 0, r, r, PI, 3 / 4 * TWO_PI);
  arc(0, -semiEnd, r, r, PI, 3 / 4 * TWO_PI);

  //stroke(255, 0, 0)
  line(-semiEnd, -r / 2, -extEnd, -r / 2) // till extension
  line(-extEnd, -r / 2, -extEnd + s, -r / 2)
  line(-extEnd + s, -r / 2, -extEnd + s, -r / 2 + s)

  //stroke(0, 255, 0)
  line(-r / 2, -semiEnd, -r / 2, -extEnd) // vert
  line(-r / 2, -extEnd, -r / 2, -extEnd + s)
  line(-r / 2, -extEnd + s, -r / 2 + s, -extEnd + s)
}



function draw_border(c = 220) {
  push();
  strokeWeight(20);
  stroke(c);
  noFill();
  rect(0, 0, width, height)
  pop();
}
