// Daily Sketch for 2021-06-07
// Ram Narasimhan.
/*

25 squares rotated
*/


let palette = []
let grid;
const cnv = {
    xMargin: 50,
    yMargin: 50,
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
    palette = cappuccino;
    palette = replicate(palette, 100)
    palette2 = take5; //colors.js
    palette2 = replicate(palette2, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(random(palette));
    //    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);
    //    grid = new Grid(params.xStep, params.yStep, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin);

    nCols = 5;
    nRows = 5;
    xStep = cnv.width / nCols
    yStep = cnv.height / nRows
    x2 = xStep / 2 + cnv.xMargin
    y2 = yStep / 2 + cnv.yMargin

    rectMode(CENTER)

    for (col = 0; col < nCols; col++) {
        for (row = 0; row < nRows; row++) {
            id = col * nCols + row
            mult = 1;
            if (id % 2) {
                mult = 0.717;
            }
            side = xStep * mult;
            push();
            translate(col * xStep + x2, row * yStep + y2);
            rotate(PI / 4 * id)

            rect(0, 0, side, side);
            pop();
        }
    }

    rectMode(CORNER)


    draw_border(clr = 20, sw = 50); //rn_utils.js

}