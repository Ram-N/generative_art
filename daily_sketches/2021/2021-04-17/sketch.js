// Daily Sketch for 2021-04-17
// Ram Narasimhan.
/*
Goal: 
3. Rotate the entire tiling
5. Animate?
6. Variations?

Keywords: Celtic pattern, Squares, Tiling
Desc: This is a classic Celtic pattern, based on overlapping squares. The appeal is that it
Desc: sort of looks like they are all interconnected.
*/


let palette = []
let grid;
const cnv = {
    xMargin: -700, // this trick is needed since the whole figure is getting rotated
    yMargin: -700,
}

const params = {
    nRows: 8,
    nCols: 8, // number of tiles per row in the active canvas
    bg: '#d3d3d3',
}


function setup() {
    createCanvas(960, 960);
    background("#d3d3d3");
    //background("#0F0F0F");
    fill("#0f0f0f");
    draw_border(20); //rn_utils.js
    bgColor = params.bg;
    palette = cappuccino; //colors.js
    //palette = rainbowDash; //colors.js
    palette = replicate(palette, 100)
    palette2 = take5; //colors.js
    palette2 = replicate(palette2, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);
    grid = new Grid(params.nCols, params.nRows, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin);
    // stroke(255);
    // grid.dispalyGridPoints(255)// rn_grid.js

    rectMode(CENTER);
    noStroke();
}

function draw() {
    noStroke();
    xStep = grid.xStep;
    yStep = grid.yStep;
    dx = xStep / 2;
    dy = yStep / 2;
    _colors = [bgColor, random(palette), bgColor, random(palette), bgColor]

    push();
    //translate(width / 2, height / 2);
    rotate(PI / 4);
    for (var row = 0; row < grid.rows; row += 1) {
        for (col = 0; col < grid.cols; col += 1) {
            create_and_display_tile(row, col, _colors);
        }
    }
    pop();

    rectMode(CORNER);
    draw_border(clr = 20, sw = 20); //rn_utils.js
    noLoop();

}


function create_and_display_tile(row, col, _colors) {
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
    frac = [1, 0.8, 0.6, 0.4, 0.2];
    var picked = random(palette);
    //_colors[1] = picked;
    for (squ = 0; squ < 5; squ++) {
        fill(_colors[squ]);
        rect(xdx, ydy, rw * frac[squ], rh * frac[squ]);
    }

    //INLET CALCULATIONS
    inletStart = 0.31;
    inletEnd = 0.38;
    inletW = inletEnd - inletStart;
    inletCx = (inletStart + inletEnd) / 2 - 0.5

    //CONNECTOR Box: 3 lines. 1-0-1. 1 is topColor - _colors[1] 
    //
    cnxW = (0.5 - inletEnd) * 2;
    cnxStart = inletEnd;
    cnxEnd = cnxStart + cnxW;
    cnxHt = 0.1;
    cnxCenX = 0;
    cnxCenY = - 0.45;

    //CONNECTION Split: bgColor. Width is 0.05rw, ht=cnxHt
    //CONNECTION Lower Right outlet: bgColor. Width is 0.1 rw, ht=cnxHt/2
    cnxLRtOutletY = cnxCenY + cnxHt / 4
    cnxSplitW = 0.06
    cnxSplitCenX = cnxSplitW / 2 + 0.05

    //render everything, using Rotation
    push();
    translate(xdx, ydy);

    for (r = 0; r < 4; r++) {
        rotate(r * PI / 2);
        fill(bgColor);
        rect(inletCx * rw, -0.35 * rh, rw * inletW, rh * 0.1); //inlet
        fill(_colors[1]);
        rect(cnxCenX * rw, cnxCenY * rh, rw * cnxW, rh * cnxHt + 2); //CNX wide box
        fill(bgColor);
        rect(cnxCenX * rw, cnxCenY * rh, rw * cnxSplitW, rh * cnxHt + 1); //CNX center split
        rect(cnxSplitCenX * rw, cnxLRtOutletY * rh, rw * 0.1, rh * cnxHt / 2); //CNXBox Lower Right Outlet
    }
    pop();
}
