// Daily Sketch for 2021-04-05
// Ram Narasimhan.
/*
Go for a HexGrid...
*/
let palette = []
const cnv = {
  xMargin: 50,
  yMargin: 50,
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
  hg = new HexGrid(cnv.width, cnv.height, cnv.xMargin, cnv.yMargin);
  stroke(255)
  //renderGridPoints(gridPts) // grid.js
  let alphaValue = 100;

  print(hg.points.length)

  //fill("#1167b1")
  stroke(0);
  strokeWeight(5)
  base_r = cnv.width / (25)
  sizes = [base_r, base_r * 0.5, base_r * 3 / 4]
  sizes = [base_r * 0.5]
  moves = [[0, 1], [0, -1], [-1.5, 0], [1.5, 0]]

  //  _x, _y, _n, _scale, _col
  for (rw of hg.points) {
    for (g of rw) {
      push();
      translate(g.x, g.y)

      if (random(1) < 0.5) {
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
      //hx = new Polygon(xAdj, yAdj, 6, rad, random(red_brown_orange));
      hx = new Polygon(0, 0, 6, rad, random(red_orange));
      hx.rotate(PI / 4 * int(random(5)))
      hx.render()
      hx.renderVertices();
      hx.renderStripes(2, 0.2);
      stroke(250)
      point(0, 0)
      pop();
    }
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
