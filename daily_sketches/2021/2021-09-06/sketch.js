// Daily Sketch for 2021-09-06
// Ram Narasimhan.
/*

Keywords: Grid points, 10PRINT

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

    strokeWeight(3);

    for (row = 0; row < grid.rows; row += 1) {
        for (col = 0; col < grid.cols; col += 1) {
            drawConnectingLines(row, col);
        }
    }

    draw_border(clr = 20, sw = 20); //rn_utils.js


}


function drawConnectingLines(row, col) {
    gpt = grid.getGPt(col, row);
    xStep = grid.xStep;
    yStep = grid.yStep;
    x = gpt.x;
    y = gpt.y;


    if (random() < 0.3) {
        stroke(palette2[3]);
        line(x, y, x + xStep, y + yStep); // \
    }
    if (random() < 0.3) {
        stroke(palette2[1]);
        line(x, y + yStep, x + xStep, y); // /
    }

    if ((random() < 0.4) && (col > 1)) {
        stroke(palette2[2]);

        line(x, y, x - xStep, y); // <--
    }
    if (random() < 0.4) {
        stroke(palette[3]);
        line(x, y, x + xStep, y); // -->
    }
}
