// Daily Sketch for 2021-04-16
// Ram Narasimhan.
/*
Goal: 
1. draw a bunch of large tiles. Simple squares
2. Center Squares, with Background color for effect.
3. Rotate
4. Draw the connecting rectangles... not squares

Keywords: Celtic pattern, Squares, Tiling
Desc: This is a classic Celtic pattern, based on overlapping squares. The appeal is that it
Desc: sort of looks like they are all interconnected.
*/


let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}

const params = {
    nRows: 9,
    nCols: 9, // number of tiles per row in the active canvas
}
bgColor = '#0f0f0f'


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
    grid = new Grid(params.nCols, params.nRows, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin);
    stroke(255);
    grid.dispalyGridPoints(255)// rn_grid.js

    rectMode(CENTER);
    noStroke();
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

    rectMode(CORNER);
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
    fill(palette2[count + 1]);
    // if (row % 2) {
    //     strokeWeight(random([3]));
    //     fill(palette2[count + 1]);
    // } else {
    //     strokeWeight(random([4]));
    //     fill(palette[count]);
    // }

    rw = grid.xStep;
    rh = grid.yStep;
    _colors = [bgColor, palette[1], bgColor, palette[2], bgColor]
    frac = [1, 0.8, 0.6, 0.4, 0.2];
    for (sq = 0; sq < 5; sq++) {
        fill(_colors[sq]);
        rect(xdx, ydy, rw * frac[sq], rh * frac[sq]);
    }

    //4 connectors
    fill(palette[1])
    rect(xdx, ydy - rh * 0.4, rw * 0.2, rh * 0.2); //top
    rect(xdx, ydy + rh * 0.4, rw * 0.2, rh * 0.2); //bottom
    rect(xdx + rw * 0.4, ydy, rw * 0.2, rh * 0.2); //right
    rect(xdx - rw * 0.4, ydy, rw * 0.2, rh * 0.2); //bottom

    fill(bgColor);
    rect(xdx, ydy - rh * 0.4, rw * 0.05, rh * 0.2); //top
    rect(xdx, ydy + rh * 0.4, rw * 0.05, rh * 0.2); //bottom
    rect(xdx + rw * 0.4, ydy, rw * 0.2, rh * 0.05); //right
    rect(xdx - rw * 0.4, ydy, rw * 0.2, rh * 0.05); //bottom


    //4 chimneys
    fill(bgColor)
    //fill(random(palette))
    rect(xdx - 0.15 * rw, ydy - rh * 0.3, rw * 0.1, rh * 0.2); //top
    rect(xdx + 0.15 * rw, ydy + rh * 0.3, rw * 0.1, rh * 0.2); //bottom
    rect(xdx + rw * 0.3, ydy - 0.15 * rh, rw * 0.2, rh * 0.1); //right
    rect(xdx - rw * 0.3, ydy + 0.15 * rh, rw * 0.2, rh * 0.1); //bottom


}
