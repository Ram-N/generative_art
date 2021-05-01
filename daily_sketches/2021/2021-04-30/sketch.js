// Daily Sketch for 2021-04-30
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
  tw: 40 // triangle width of the hexgrid...
}


function setup() {
  createCanvas(860, 860);
  background("#d3d3d3");
  //background("#0F0F0F");
  //background(seablue);
  //palette = red_brown_orange; //colors.js
  //palette = [cappuccino[0], cappuccino[3], cappuccino[4]];
  palette = replicate(palette, 10)
  palette = purples; //colors.js  
  palette = replicate(palette, 10)
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
    //if (random() < 0.02) break;
    if (!curr.view) { // let's assign it a view.
      topN = curr.up
      sideN = curr.side
      downN = curr.down
      if (topN) {
        topColor = topN.view
      }

      if (!curr.orientation) { // > orientation

        if (topN && (topColor == 1)) {
          if (random() < 0.5) {
            curr.view = 2
            if (downN) {
              downN.view = 2
            }
          } else {
            curr.view = 1
          }
          continue
        }

        if ((topN) && (topColor == 2)) {
          if (random() < 0.5) {
            curr.view = 2
            continue
          } else {
            curr.view = 1
            if (curr.side) {
              curr.side.view = 1
              continue
            }
          }
        }


        if ((topN) && (topColor == 3)) {
          curr.view = 3
          continue
        }


        if ((sideN) && (sideN.view == 2)) {
          if ((topN) && (topN.view == 1)) {
            curr.view = 1
            continue
          } else {
            curr.view = 2
          }
        }

        if ((sideN) && (sideN.view == 1)) {
          curr.view = 1
          continue
        }




      } // done with > orientation

      if (curr.orientation) { // < triangle

        if ((topN) && (topColor == 1)) {
          if (random() < 0.5) {
            curr.view = 1
            if (sideN) {
              sideN.view = 1
            }
            continue
          } else {
            curr.view = 3
            if (downN) {
              downN.view = 3
            }
            continue
          }
        }
        if ((topN) && (topColor == 2)) {
          curr.view = 2
          continue
        }

        if ((topN) && (topColor == 3)) {
          if (random() < 0.5) {
            curr.view = 3
            if (downN) {
              downN.view = 3
            }
          } else {
            curr.view = 1
            if (sideN) {
              sideN.view = 1
            }
          }
          continue
        }

      }

      curr.view = random([1, 2, 3])
    }

  }

  renderTriangles(hg)





  draw_border(clr = "#d3d3d3", sw = 57); //rn_utils.js
  draw_border(c = "#d3d3d3", sw = 25); //rn_utils.js
  draw_border(c = 20, sw = 20);
}//end setup


function renderTriangles(hg) {
  for (curr of hg.triangles) {
    curr.display(cubePalette[curr.view])
  }
}

