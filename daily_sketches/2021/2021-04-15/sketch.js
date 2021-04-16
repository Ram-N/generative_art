// Daily Sketch for 2021-04-15
// Ram Narasimhan.
/*
Keywords: 10Print variations
Desc: Keep track of every grid point. Note how many line segments end there - 0, 1 or 2.
Desc: Based on that value, new line segments are drawn, below.
Desc: The idea is that continuous "Strands" will flow from top to bottom.

*/


let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}

const params = {
    xStep: 25,
    yStep: 25,
}


function setup() {
    createCanvas(960, 960);
    background("#d3d3d3");
    //background("#0F0F0F");
    fill("#0f0f0f");
    draw_border(20); //rn_utils.js
    palette = cappuccino; //colors.js
    palette = rainbowDash; //colors.js
    palette = replicate(palette, 100)
    palette2 = take5; //colors.js
    palette2 = replicate(palette2, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);
    grid = new Grid(params.xStep, params.yStep, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin);
    stroke(255);
    //grid.dispalyGridPoints(255)// rn_grid.js

}

function draw() {
    //background(255);
    xStep = grid.xStep;
    yStep = grid.yStep;
    dx = xStep / 2;
    dy = yStep / 2;

    for (var row = 0; row < grid.rows; row += 1) {
        for (col = 0; col < grid.cols; col += 1) {
            draw_lines(row, col);
        }
    }

    stroke(255)
    strokeWeight(3)
    for (g of grid.points) {
        //eliminate border points
        if ((!g.count) && (g.col) && (g.row)) {
            if ((g.col != grid.cols) && (g.row != grid.rows)) {
                circle(g.x, g.y, 10)
            }
        }

    }

    draw_border(clr = 20, sw = 20); //rn_utils.js
    noLoop();

}


function draw_lines(row, col) {
    gpt = grid.getGPt(row, col);
    x = gpt.x;
    y = gpt.y;
    xdx = x + xStep / 2;
    ydy = y + yStep / 2;
    count = gpt.count;
    if (row % 2) {
        strokeWeight(random([3]));
        stroke(palette2[count + 1]);
    } else {
        strokeWeight(random([4]));
        stroke(palette[count]);
    }

    let _dir = random(10)
    if (_dir < 1) {
        line(x, y, x + xStep, y + yStep); // \
        grid.getGPt(row + 1, col + 1).count++;
    }
    else if (_dir < 2) {
        line(x, y + yStep, x + xStep, y); // /
        grid.getGPt(row + 1, col).count++;
    }
    else if (_dir < 5) {
        bezier(x + xStep, y, xdx, y, x, ydy, x, y + yStep)
        grid.getGPt(row + 1, col).count++;
    }
    else if (_dir < 7) {
        bezier(x, y, xdx, y, x + xStep, ydy, x + xStep, y + yStep)
        grid.getGPt(row + 1, col + 1).count++;
    }

    // stroke(palette2[Math.floor(x / xStep)]);
    // stroke(palette2[2]);
    //            arc(xdx, ydy, xStep, yStep, -PI / 4, 3 / 4 * PI); // tiny circle
    // if (_dir < 1) {
    //     line(xdx, ydy, xdx + xStep, ydy); //top horiz --
    // }
    // else if (_dir < 2) {
    //     line(xdx, ydy, xdx, ydy + yStep); // | vert near
    // }
    // else if (_dir < 3) {
    //     line(xdx + xStep, ydy, xdx + xStep, ydy + yStep); // vert away
    // }
    // else if (_dir < 4) { // circle
    //     circle(xdx, ydy, xStep, yStep); // circle
    // }
}
