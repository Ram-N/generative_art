// Daily Sketch for 2021-04-12
// Ram Narasimhan.
/*
10 PRINT Variations.
I had this idea to try TWO 10 print grids, stacked on top of each other...
*/


let palette = []
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

    cnv.height = height - 2 * cnv.yMargin
    cnv.width = width - 2 * cnv.yMargin
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);

}

function draw() {
    //background(255);
    xStep = params.xStep;
    yStep = params.yStep;
    maxRow = cnv.height / yStep;
    maxCol = cnv.width / xStep;
    dx = xStep / 2;
    dy = yStep / 2;
    for (var row = 0; row < maxRow; row += 1) {
        if (row % 2) {
            strokeWeight(random([4, 2]));
        } else {
            strokeWeight(random([1, 3]));
        }
        y = cnv.yMargin + row * yStep;
        for (var col = 0; col < maxCol; col += 1) {
            x = cnv.xMargin + col * xStep;
            xdx = x + xStep / 2;
            ydy = y + yStep / 2;
            stroke(palette[Math.floor(x / xStep)]);
            stroke(random(palette));
            let _dir = random(4)
            if (_dir < 1) {
                line(x, y, x + xStep, y + yStep); // \
            }
            else if (_dir < 2) {
                line(x, y + yStep, x + xStep, y); // /
            }

            // off-grid Print10 overlay
            _dir = random(7)
            stroke(palette2[Math.floor(x / xStep)]);
            stroke(random(palette2));
            if (_dir < 1) {
                line(xdx, ydy, xdx + xStep, ydy); //top horiz --
            }
            else if (_dir < 2) {
                line(xdx, ydy, xdx, ydy + yStep); // | vert near
            }
            else if (_dir < 3) {
                line(xdx + xStep, ydy, xdx + xStep, ydy + yStep); // vert away
            }
        }

    }
    draw_border(clr = "#d3d3d3", sw = 58); //rn_utils.js
    draw_border(clr = 20, sw = 20); //rn_utils.js
    noLoop();
}