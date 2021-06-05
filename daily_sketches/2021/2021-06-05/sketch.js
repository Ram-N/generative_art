// Daily Sketch for 2021-06-05
// Ram Narasimhan.
/*

Triangular shapes
No curved Vertices...
*/


let palette = []
let grid;
const cnv = {
    xMargin: 10,
    yMargin: 10,
}

const params = {
    xStep: 35,
    yStep: 35,
    bgColor: "#0f0f0f", //black
}


function setup() {
    createCanvas(960, 960);
    background(params.bgColor);
    //background("#0F0F0F");
    draw_border(20); //rn_utils.js
    palette = purples;
    palette = replicate(palette, 100)
    palette2 = take5; //colors.js
    palette2 = replicate(palette2, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(random(palette));
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);
    grid = new Grid(params.xStep, params.yStep, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin);

    sWCorner = grid.getGPt(0, grid.rows)
    nECorner = grid.getGPt(grid.cols, 0)
    nWCorner = grid.getGPt(0, 0)
    sECorner = grid.getGPt(grid.cols, grid.rows)


    numShapes = params.xStep
    //numShapes = 10
    rowTracker = initRowTracks(grid, numShapes);
    for (iter = 0; iter < numShapes; iter += 1) {
        renderWavyTriangle('NW', iter);
        renderWavyTriangle('SE', iter);
    }


    //draw_border(clr = 220, sw = 20); //rn_utils.js
    draw_border(clr = 20, sw = 50); //rn_utils.js

}

function initRowTracks(grid, numIters) {

    rowTracker = [];
    rowHigh = [];
    for (var col = 0; col < grid.cols; col += 1) {
        rowTracker[col] = [];
        rowHigh[col] = 0;
        for (iter = 0; iter < numIters; iter += 1) {
            rowTracker[col][iter] = 0;
        }
    }

    print(rowTracker, 'initialized')
    rowTotal = 0
    for (iter = 0; iter < numIters; iter += 1) {
        rowAvg = rowTotal / grid.cols;
        print(rowAvg)
        rowTotal = 0;
        for (var col = 0; col < grid.cols; col += 1) {
            colAvg = rowTracker[col][iter]
            if ((colAvg - rowAvg) > 2) {
                rInc = 1
            } else if ((rowAvg - colAvg) > 2) {
                rInc = 2 + int(random(2))
            } else {
                rInc = 1 + int(random(2))
            }

            rowTracker[col][iter] = rowHigh[col] + rInc;
            rowHigh[col] += rInc;
            rowTotal += rInc;
            //print(rowTracker[col][iter], col, iter, 'pp')
        }
    }
    print(rowTracker, "after looping")
    return rowTracker;
}


function renderWavyTriangle(orientation, iter) {


    if (orientation == 'NW') {
        corner = nWCorner;
        startCol = 0;
        row = numShapes - iter;
        endCol = row;
        activePalette = palette
    }

    if (orientation == 'SE') {
        corner = sECorner;
        startCol = iter;
        endCol = grid.cols;
        row = iter;
        activePalette = palette
    }

    fill(activePalette[row]);
    beginShape();
    vertex(corner.x, corner.y)

    if (orientation == 'SE') {
        pt = grid.getGPt(iter, iter)
        vertex(pt.x, pt.y)
    }

    for (var col = startCol; col < endCol; col += 1) {
        pt = grid.getGPt(col, rowTracker[col][row])
        if (rowTracker[col][row] > grid.rows) {
            pt = grid.getGPt(col, grid.rows)
        }
        if ((orientation == 'SE') && (rowTracker[col][row] > col)) {
            pt = grid.getGPt(col, col)
        }
        if (pt) {
            if ((orientation == 'SE') && (col == 0)) {
                vertex(pt.x, pt.y)
            } else if ((orientation == 'NW') && (col == row)) {
                vertex(pt.x, pt.y)
            } else {
                vertex(pt.x, pt.y)
            }
        }

    }

    if (orientation == 'SE') {
        pt = grid.getGPt(grid.cols, iter)
        vertex(pt.x, pt.y)
    }

    if (orientation == 'NW') {
        pt = grid.getGPt(row, row)
        vertex(pt.x, pt.y)
    }

    vertex(corner.x, corner.y)
    endShape(CLOSE);

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


