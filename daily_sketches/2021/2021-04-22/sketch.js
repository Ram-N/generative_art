// Daily Sketch for 2021-04-22
// Ram Narasimhan.
/*
HexGrid.
2. Draw all the traingles, using 3 colors...
3. Create a triangle class, ID = its grid position
4. each triangle has 3 neighbors = s, t and d(own)
5. Code in some color rules for neighbors

*/
let palette = []
const cnv = {
  xMargin: 50,
  yMargin: 50,
}

const params = {
  tw: 80 // triangle width of the hexgrid...
}


function setup() {
  createCanvas(860, 860);
  background("#d3d3d3");
  //background("#0F0F0F");
  //background(seablue);
  palette = red_brown_orange; //colors.js
  //palette = purples; //colors.js
  palette = replicate(palette, 10)

  cnv.height = height - 2 * cnv.yMargin
  cnv.width = width - 2 * cnv.xMargin
  fill(20)
  rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height)

  hg = new HexGrid(cnv.width, cnv.height, cnv.xMargin, cnv.yMargin, params.tw);
  stroke(255)
  //renderGridPoints(gridPts) // grid.js
  let alphaValue = 100;
  print(hg.points.length) // columns. each one is a column of points

  //fill("#1167b1")
  stroke(0);
  strokeWeight(5)
  //base_r = cnv.width / (25)
  base_r = params.tw


  for (co of hg.points) {
    //co = hg.points[0]
    for (g of co) {
      push();

      translate(g.x, g.y) // go to grid point center

      if (random(1) < 0.5) {
        c = color(random(purples))
        c.setAlpha(alphaValue);
        fill(c);
      } else {
        noFill();
      }
      rad = base_r
      hx = new Polygon(0, 0, 6, rad, random(palette));
      strokeWeight(int(random(3, 5)));
      hx.render()
      hx.renderVertices();
      stroke(palette[g.row]);
      //point(0, 0)
      //print(g.row, g.col)
      pop();
    }
  }

  //  draw_border(clr = "#d3d3d3", sw = 57); //rn_utils.js
  draw_border(c = "#d3d3d3", sw = 25 * 2 + cnv.xMargin); //rn_utils.js
  draw_border(c = 20, sw = 20);
}//end setup

// function draw() {
//   hex.render()
// }

