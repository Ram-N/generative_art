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
  palette = red_brown_orange; //colors.js  
  palette = replicate(palette, 10)
  cubePalette = [palette[5], palette[4], palette[2], palette[6]]; // top left right=red

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
    //    if (!curr.view) { // let's assign it a view.
    topN = curr.up
    sideN = curr.side
    downN = curr.down
    if (topN) {
      topColor = topN.view
    }

    if (!curr.orientation) { // > orientation:0

      if (topN && (topColor == 1)) {
        if ((sideN) && (sideN.view == 1)) { // topColor
          curr.view = 1
          continue
        }
        if (random() < 0.3) {
          curr.view = 2
          if (downN) {
            downN.view = 2
          }
        } else { //random > 0.5
          if ((sideN) && (sideN.view == 2)) { // cannot be topColor
            curr.view = 2
            if (downN) {
              downN.view = 2
            }
          } else if ((sideN) && (sideN.view == 3)) { // cannot be topColor
            curr.view = 2
            if (downN) {
              downN.view = 2
            }
          } else {
            curr.view = 1 // >
          }
        }
        continue
      }

      if ((topN) && (topColor == 2)) {
        if ((sideN) && (sideN.view == 1)) {
          curr.view = 1
        } else {
          curr.view = 2
        }
        continue
      }


      if ((topN) && (topColor == 3)) {
        if ((sideN) && (sideN.view == 1)) {
          curr.view = 1 // > curr orientation 0
        }
        else {
          //print('> color 3...', curr.row, curr.col)
          curr.view = 3
        }
        continue
      }


    } // done with > orientation

    if (curr.orientation) { // < triangle

      if ((topN) && (topColor == 1)) {
        if (random() < 0.5) {
          curr.view = 1
          if (sideN) {
            //print('> side >', sideN.row, sideN.col, 'was color', sideN.view)
            sideN.view = 1
            //print('> side >', sideN.row, sideN.col, 'is now color', sideN.view)
          }
        } else {
          //print(' < Rtcolor < ', curr.row, curr.col)
          curr.view = 3
          if (downN) {
            //print('> down >', downN.row, downN.col, 'was color', downN.view)
            //print('> RightColorDN', downN.row, downN.col, " 3color upper is < 3 and upper upper is >top")
            downN.view = 3
            //print('> down > ', downN.row, downN.col, 'is now color', downN.view)
          }
        }
        continue
      }

      if ((topN) && (topColor == 2)) {
        curr.view = 2
        continue
      }

      if ((topN) && (topColor == 3)) {
        if (random() < 0.5) {
          curr.view = 3
          if ((downN) && (!downN.view)) {
            //print('<curr 333 ', curr.row, curr.col, " 3color upper is > 3 and down > 3")
            downN.view = 3
          }
        } else {
          curr.view = 1
          if (sideN) {
            //print('> side >', sideN.row, sideN.col, 'was color', sideN.view)
            sideN.view = 1
            //print('> side >', sideN.row, sideN.col, 'is now color', sideN.view)
          }
        }
        continue
      }

    }

    curr.view = random([1, 2, 3])
    curr.random = 1
  }

  renderTriangles(hg)


  draw_border(clr = "#d3d3d3", sw = 57); //rn_utils.js
  draw_border(c = "#d3d3d3", sw = 25); //rn_utils.js
  draw_border(c = 20, sw = 20);
}//end setup


function renderTriangles(hg) {
  if (cubePalette.length < 4) {
    print('Cube Palette must have at least 4 colors')
  }

  for (curr of hg.triangles) {
    //print(curr.view, "RC", curr.row, curr.col)
    curr.display(cubePalette[curr.view])
  }
}

