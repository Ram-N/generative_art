// Daily Sketch for 2021-04-28
// Ram Narasimhan.
/*
HexGrid.
1. Code in some rules for Neighbors

*/
let palette = []
const cnv = {
  xMargin: 30,
  yMargin: 30,
}

const params = {
  tw: 20 // triangle width of the hexgrid...
}


function setup() {
  createCanvas(860, 860);
  background("#d3d3d3");
  //background("#0F0F0F");
  //background(seablue);
  palette = red_brown_orange; //colors.js
  //palette = [cappuccino[0], cappuccino[3], cappuccino[4]];
  palette = replicate(palette, 10)
  palette2 = purples; //colors.js  
  palette2 = replicate(palette2, 10)
  cubePalette = [palette[0], 'white', palette[0], palette[4]]; // top left right=red

  cnv.height = height - 2 * cnv.yMargin
  cnv.width = width - 2 * cnv.xMargin
  fill(20)

  hg = new HexGrid(cnv.width, cnv.height, cnv.xMargin, cnv.yMargin, params.tw);
  hg.getTriangleNeighbors() // 3 neighbors get attached to each triangle.

  stroke(255);
  //renderGridPoints(gridPts) // grid.js
  let alphaValue = 100;
  //  print(hg.points.length) // columns. each one is a column of points

  noStroke(0);

  for (curr of hg.triangles) {
    _clr = color(random(palette))
    if (!curr.view) { // let's assign it a view.
      topN = curr.up
      sideN = curr.side
      downN = curr.down

      if ((!curr.orientation) && (sideN) && (sideN.view == 1)) {
        curr.view = 1
        continue
      }

      if (topN && (topN.view)) {
        topColor = topN.view
        topO = topN.orientation;
        curr.view = topN.view;
        if ((topColor == 1) && (!curr.orientation) && (topO == 1)) {
          curr.view = 2
        }
        if ((topColor == 1) && (!curr.orientation) && (!topO)) {
          curr.view = 3
        }
        toptopN = topN.up
        if (toptopN) {
          if ((topColor == 3) && (!curr.orientation) && (toptopN.view == 3)) {
            curr.view = 3
          }
        }
      } else {
        curr.view = random([1, 2, 3])
      }
      curr.display(cubePalette[curr.view]) // move all display to after assigning colors
    }

  }

  // for (let i = 0; i < 30; i++) {
  //   // col, row, orientation  
  //   t = hg.getTriangle(int(random(hg.cols)), int(random(hg.rows)), random([0, 1]))
  //   if (t) {
  //     t.displayNeighbors(hg)
  //   }
  // }





  draw_border(clr = "#d3d3d3", sw = 57); //rn_utils.js
  draw_border(c = "#d3d3d3", sw = 25); //rn_utils.js
  draw_border(c = 20, sw = 20);
}//end setup


