// Daily Sketch for 2021-06-01
// Ram Narasimhan.
/*

Build shapes from a Grid.
Lerp color...

*/


let palette = []
let grid;
const cnv = {
    xMargin: 10,
    yMargin: 10,
}

const params = {
    xStep: 100,
    yStep: 100,
    bgColor: "#0f0f0f", //black
}


function setup() {
    createCanvas(960, 960);
    background(params.bgColor);
    //background("#0F0F0F");
    draw_border(20); //rn_utils.js
    palette = cappuccino; //colors.js
    palette = rainbowDash; //colors.js
    palette = red_brown_orange;
    palette = replicate(palette, 100)
    palette2 = take5; //colors.js
    palette2 = replicate(palette2, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(random(palette));
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);
    grid = new Grid(params.xStep, params.yStep, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin);

    rowTracker = Array(grid.cols + 1).fill(0)

    numShapes = params.xStep
    for (iter = 0; iter < numShapes; iter += 1) {

        rowAvg = rowTracker.reduce((a, b) => a + b) / (grid.cols)
        beginShape()
        fill(palette[iter])
        sWest = grid.getGPt(0, grid.rows)
        vertex(sWest.x, sWest.y)

        // contours at the Northern border
        for (var col = 0; col <= grid.cols; col += 1) {
            colAvg = rowTracker[col]
            //print(rowAvg, colAvg)
            if ((colAvg - rowAvg) > 2) {
                rInc = 1
            } else if ((rowAvg - colAvg) > 2) {
                rInc = 2 + int(random(2))
            } else {
                rInc = 1 + int(random(2))
            }
            rowTracker[col] += rInc

            // keep the rInc small if rowTracker is way over the average for this iter...
            if (rowTracker[col] > grid.cols) {
                rowTracker[col] = grid.cols
            }
            pt = grid.getGPt(col, rowTracker[col])
            if (pt) {
                if (col == grid.cols) {
                    vertex(pt.x, pt.y)
                } else {
                    curveVertex(pt.x, pt.y)
                }
            }

        }

        sEast = grid.getGPt(grid.cols, grid.rows)
        vertex(sEast.x, sEast.y)
        endShape(CLOSE)
    }




    //draw_border(clr = 220, sw = 20); //rn_utils.js
    draw_border(clr = 20, sw = 50); //rn_utils.js

}








function prep_diagonal_segments(row, col) {
    gpt = grid.getGPt(col, row);
    if (row % 2) {
        gpt.sw = random([3]);
    } else {
        gpt.sw = random([4]);
    }
    gpt.pal = random(palette2);
    gpt._dir = random(4);
}



function draw_diagonal_segments(row, col) {

    gpt = grid.getGPt(col, row);

    xStep = grid.xStep;
    yStep = grid.yStep;
    x = gpt.x;
    y = gpt.y;

    strokeWeight(gpt.sw)
    stroke(gpt.pal);
    if (gpt._dir < 1) {
        line(x, y, x + xStep, y + yStep); // \
        grid.getGPt(col + 1, row + 1).active = 1;
    }
    else if (gpt._dir < 2) {
        line(x, y + yStep, x + xStep, y); // /
        //        grid.getGPt(col, row + 1).active = 1;
        //        grid.getGPt(col + 1, row).active = 1;
    }

}

function drawAllDiagonalSegments(grid) {
    for (var row = 0; row < grid.rows; row += 1) {
        for (var col = 0; col < grid.cols; col += 1) {
            draw_diagonal_segments(row, col);
        }
    }
}


