// Daily Sketch for 2021-12-22
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
  xMargin: 30,
  yMargin: 30,
}

const params = {
  tw: 80, // triangle width of the hexgrid...
  xStep: 60,
  yStep: 60,
  bgColor: [210, 50, 80],
  blkColor: [0, 0, 0],
}


function setup() {
  createCanvas(860, 860);
  background("#d3d3d3");
  palette = red_brown_orange; //colors.js
  //palette = purples; //colors.js
  palette = replicate(palette, 10)


  cnv.height = height - 2 * cnv.yMargin // usable height
  cnv.width = width - 2 * cnv.yMargin //usable width
  fill(params.blkColor);
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
    for (gpt of co) {
      push();

      translate(gpt.x, gpt.y) // go to grid point center

      if (random(1) < 0.5) {
        c = color(random(purples))
        c.setAlpha(alphaValue);
        fill(c);
      } else {
        noFill();
      }
      rad = base_r * random([0.5, 0.75, 1, 1.25, 0.25])
      hx = new Polygon(0, 0, 6, rad, random(palette));
      strokeWeight(int(random(3, 10)));
      hx.render()
      //hx.renderVertices();
      pop();
    }
  }

  draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}//end setup


