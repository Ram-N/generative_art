// Daily Sketch for 2021-04-18
// Ram Narasimhan.
/*
Goal: 
1. Find the 2 entry points in the North border of each tile.
2. Rotate 90 to find all 8 points...
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
    nRows: 10,
    nCols: 10, // number of tiles per row in the active canvas
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
    // rotate(PI / 4);
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
    // fill(palette2[count + 1]);
    // if (row % 2) {
    //     strokeWeight(random([3]));
    //     fill(palette2[count + 1]);
    // } else {
    //     strokeWeight(random([4]));
    //     fill(palette[count]);
    // }

    //set tile-specific parameters
    rw = grid.xStep;
    rh = grid.yStep;
    frac = [1, 0.8, 0.6];
    var picked = random(palette);
    _colors[1] = picked;
    touchPoints = []; // tile junction points

    push();
    translate(xdx, ydy); //tile center

    for (squ = 0; squ < 3; squ++) {
        fill(_colors[squ]);
        //rect(xdx, ydy, rw * frac[squ], rh * frac[squ]);
        rect(0, 0, rw * frac[squ], rh * frac[squ]);
    }

    //1/3, 2/3 gives the entry point. 0.5 - 1/3 is e0, 0.5+1/3 is e1
    var entryOffset = (1 / 2 - 1 / 3) * rw;
    var borderDist = rh / 2;
    //store  4 Jpts for this tile
    w0 = createVector(-borderDist, entryOffset);
    w1 = createVector(-borderDist, -entryOffset);
    n0 = createVector(-entryOffset, -borderDist);
    n1 = createVector(entryOffset, -borderDist);
    touchPoints.push(w0);
    touchPoints.push(w1);
    touchPoints.push(n0);
    touchPoints.push(n1);

    color0 = "#b44303";
    color1 = palette[3];
    noFill();
    strokeWeight(5);

    for (r = 0; r < 2; r++) {
        rotate(r * PI);
        stroke(color0)
        bezier(w0.x, w0.y, 0, 0, w1.x, w1.y, n0.x, n0.y);
        bezier(w1.x, w1.y, n0.x, n0.y, 0, 0, n1.x, n1.y);
    }
    for (r = 1; r < 3; r++) {
        rotate(r * PI / 2);
        //stroke(color1)
        bezier(w0.x, w0.y, 0, 0, w1.x, w1.y, n0.x, n0.y);
        //stroke(color1)
        bezier(w1.x, w1.y, n0.x, n0.y, 0, 0, n1.x, n1.y);
    }
    pop();

}
