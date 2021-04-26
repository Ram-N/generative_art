// Daily Sketch for 2021-04-25
// Ram Narasimhan.
/*
HexGrid.
1. Give c, r, o, get triangles
2. Assign 3 neighbors or each triangle
3. Draw all the traingles, using 3 colors...
4. Code in a few color rules for neighbors

*/
let palette = []
const cnv = {
  xMargin: 30,
  yMargin: 30,
}

const params = {
  tw: 30 // triangle width of the hexgrid...
}


function setup() {
  createCanvas(860, 860);
  background("#d3d3d3");
  //background("#0F0F0F");
  //background(seablue);
  palette = red_brown_orange; //colors.js
  palette = cappuccino;
  palette = replicate(palette, 10)
  palette2 = purples; //colors.js  
  palette2 = replicate(palette2, 10)


  cnv.height = height - 2 * cnv.yMargin
  cnv.width = width - 2 * cnv.xMargin
  fill(20)
  //rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height)

  hg = new HexGrid(cnv.width, cnv.height, cnv.xMargin, cnv.yMargin, params.tw);
  stroke(255);
  //renderGridPoints(gridPts) // grid.js
  let alphaValue = 100;
  //  print(hg.points.length) // columns. each one is a column of points

  stroke(0);

  for (co of hg.points) {
    //co = hg.points[0]
    for (g of co) {

      push();
      translate(g.x, g.y) // go to grid point center
      if (g.col % 2) {
        strokeWeight(4)
        stroke(200, 0, 0)
      } else {
        strokeWeight(8)
        stroke(0, 0, 200)
      }
      //point(0, 0)
      //print(g.col, g.row)
      pop();
    }
  }


  for (t of hg.triangles) {
    if (random() < 2) {
      // print('Tri', t)
      // print(t.row)
      _clr = color(random(palette))
      //_clr.setAlpha(alphaValue);

      if (t.orientation) {
        _clr = 'black'
      }
      t.display(_clr)
    }
  }

  for (let i = 0; i < 30; i++) {
    // col, row, orientation  
    t = hg.getTriangle(int(random(hg.cols)), int(random(hg.rows)), random([0, 1]))
    if (t) {
      t.displayNeighbors(hg)
    }
  }

  //  t131 = hg.getTriangle(2, 7, 1)
  //  t131.displayNeighbors(hg)

  // t131 = hg.getTriangle(3, 2, 1)
  // t131.display("red")

  // t131 = hg.getTriangle(3, 4, 11
  // t131.display("red")

  // //side
  // t131 = hg.getTriangle(3, 3, 1)
  // t131.display("orange")




  draw_border(clr = "#d3d3d3", sw = 57); //rn_utils.js
  draw_border(c = "#d3d3d3", sw = 25); //rn_utils.js
  draw_border(c = 20, sw = 20);
}//end setup


