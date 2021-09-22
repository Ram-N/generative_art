// Daily Sketch for 2021-09-19
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
    bgColor: "#d3d3d3",
    blkColor: "#0f0f0f",
}


function setup() {
    createCanvas(960, 960);
    background(params.bgColor);
    //background("#0F0F0F");
    // fill("#0f0f0f");
    // draw_border(20); //rn_utils.js
    palette = cappuccino; //colors.js
    palette = rainbowDash; //colors.js
    palette = replicate(palette, 100)
    palette2 = take5; //colors.js
    palette2 = replicate(palette2, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill("#0f0f0f");
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);

    grid = new Grid(params.xStep, params.yStep, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin);

    strokeWeight(3);
    // for (row = 0; row <= grid.rows; row += 1) {
    //     for (col = 0; col <= grid.cols; col += 1) {
    //         createShape(row, col);
    //     }
    // }

    for (let r = 0; r <= 100; r += 1) {
        row = int(random(grid.rows))
        col = int(random(grid.cols))
        createShape(row, col);
    }

    draw_border(clr = params.bgColor, sw = 29 + cnv.xMargin); //rn_utils.js
    draw_border(clr = 20, sw = 20); //rn_utils.js


}


function createShape(row, col) {
    gpt = grid.getGPt(col, row);
    xStep = grid.xStep;
    yStep = grid.yStep;
    x = gpt.x;
    y = gpt.y;

    strokeWeight(20)
    stroke(params.blkColor)
    fill(random(palette))
    htp = int(random(row, grid.rows));
    wdp = int(random(col, grid.cols));
    newpt = grid.getGPt(htp, wdp);
    //noStroke();

    beginShape();

    vertex(x, y)
    if (random() < 0.5) {
        vertex(newpt.x, y);
        vertex(newpt.x, newpt.y);
    }
    if (random() < 0.5) {
        vertex(newpt.x, newpt.y);
        vertex(x, newpt.y);
    }
    endShape(CLOSE);



}
