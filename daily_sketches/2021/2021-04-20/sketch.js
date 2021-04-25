// Daily Sketch for 2021-04-20
// Ram Narasimhan.
/*

Keywords: Celtic pattern, Squares, Tiling, Symmetry
*/


let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}

const params = {
    nRows: 5,
    nCols: 5, // number of tiles per row in the active canvas
    bg: "#0f0f0f",
}


function setup() {
    createCanvas(960, 960);
    background("#d3d3d3");
    //background("#0F0F0F");
    //    draw_border(20); //rn_utils.js. drawn in function draw()
    palette = cappuccino; //colors.js
    palette = rainbowDash; //colors.js
    palette = red_orange;
    // palette = take5; //colors.js
    bgColor = params.bg;
    palette = replicate(palette, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill("#0f0f0f");
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
    _colors = [bgColor, cappuccino[2], bgColor]

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
    draw_border(clr = "#d3d3d3", sw = 57); //rn_utils.js
    draw_border(clr = 20, sw = 20); //rn_utils.js
    noLoop();

}


function create_and_display_tile(row, col, _colors) {
    gpt = grid.getGPt(row, col);
    x = gpt.x;
    y = gpt.y;
    xdx = x + xStep / 2;
    ydy = y + yStep / 2;

    //set tile-specific parameters
    rw = grid.xStep;
    rh = grid.yStep;
    frac = [1, 0.6, 0.5];

    push();
    translate(xdx, ydy); //tile center

    //base squares
    for (squ = 0; squ < 3; squ++) {
        fill(_colors[squ]);
        //rect(xdx, ydy, rw * frac[squ], rh * frac[squ]);
        rect(0, 0, rw * frac[squ], rh * frac[squ]);
    }

    //1/3, 2/3 gives the entry point. 0.5 - 1/3 is e0, 0.5+1/3 is e1
    var entryOffset = (1 / 2 - 1 / 3) * rw; // 2 junction per tile side
    var borderDist = rh / 2;
    //store  4 Jpts for this tile. The others come through rotational symmetry
    w0 = createVector(-borderDist, entryOffset);
    w1 = createVector(-borderDist, -entryOffset);
    n0 = createVector(-entryOffset, -borderDist);
    n1 = createVector(entryOffset, -borderDist);

    color0 = palette[3];
    color1 = palette[1];
    ribColor = cappuccino[1]
    ribColor = "#bc7267";
    ribSw = 0.06 * rw;
    bzSw = 0.07 * rw;
    noFill();

    for (r = 0; r < 4; r++) {
        rotate(r * PI / 2);

        // Vertical rib in the background
        strokeWeight(ribSw);
        stroke(ribColor)
        line(n0.x, n0.y, n0.x, w1.y);
        // make this color dependent on R, and also on
        // the tile row and column.
        strokeWeight(bzSw)
        tileID = row * params.nCols + col
        stroke(palette[tileID])
        bztip = 0.7
        bezier(-rw * frac[1] * bztip, -rh * frac[1] * bztip,
            -rw * frac[1] * 0.6, -rh * frac[1] * 0.8,
            -rw * frac[1] * 0.5, -rh * frac[1] * 0.8,
            0, -rh * frac[1] * 0.5)
        bezier(-rw * frac[1] * bztip, -rh * frac[1] * bztip,
            -rw * frac[1] * 0.8, -rh * frac[1] * 0.6,
            -rw * frac[1] * 0.8, -rh * frac[1] * 0.5,
            -rw * frac[1] * 0.5, 0)


        // horizontal rib in the foreground.
        //WHen combined with vertical, it forms an off-center square
        strokeWeight(ribSw);
        stroke(ribColor)
        line(w1.x, w1.y, n0.x, w1.y);


    }
    pop();

}
