// Daily Sketch for 2021-04-11
// Ram Narasimhan.
/*
*/

let palette = []
const cnv = {
  xMargin: 30,
  yMargin: 30,
}

const params = {
  rows: 75,
  cols: 75,
}


function setup() {
  //createCanvas(860, 860);
  createCanvas(640, 384);
  background('#0000ff');

  fill("#0f0f0f");
  draw_border(20); //rn_utils.js
  palette = rainbowDash; //colors.js
  palette = cappuccino; //colors.js
  palette = replicate(palette, 10)

  cnv.height = height - 2 * cnv.yMargin
  cnv.width = width - 2 * cnv.yMargin
  fill(127)
  rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);
  grid = new Grid(params.rows, params.cols, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin);
  grid.dispalyGridPoints()// rn_grid.js
  stroke(224);
  strokeWeight(3);

}





var w = 16;
var h = 16;
var index = 0;

function draw() {
  var x1 = w * index;
  var x2 = x1 + w;
  var y1 = h * 23;
  var y2 = h * 24;
  _dir = random(3)
  if (_dir < 1) {
    line(x2, y1, x1, y2);
  }
  else if (_dir < 2) {
    line(x1, y1, x2, y2);
  }
  else {
    line(x1, y1, x2, y1);
  }

  index++;
  if (index >= width / w) {
    print('moving up', h * 23, width, height)
    var p = get(0, h, width - 20, h * 23);
    background('#0000ff');
    set(0, 0, p);
    index = 0;
  }
}