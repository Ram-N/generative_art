// Daily Sketch for 2021-04-14
// Ram Narasimhan.
/*
10 PRINT Variations.
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
        // if (row % 2) {
        //     strokeWeight(random([4]));
        // } else {
        //     strokeWeight(random([3]));
        // }
        strokeWeight(4);
        y = cnv.yMargin + row * yStep;
        for (var col = 0; col < maxCol; col += 1) {
            x = cnv.xMargin + col * xStep;
            xdx = x + xStep / 2;
            ydy = y + yStep / 2;
            //stroke(palette[Math.floor(x / xStep)]);
            stroke(palette[3]);
            let _dir = random(7)
            if (_dir < 1) {
                line(x, y, x + xStep, y + yStep); // \
            }
            else if (_dir < 2) {
                line(x, y + yStep, x + xStep, y); // /
            }
            else if (_dir < 5) {
                stroke(palette[4]);
                //arc(xdx, ydy, xStep, yStep, PI / 4, 5 / 4 * PI); // tiny circle
                bezier(x + xStep, y, x + rFrac() * xStep, y, x, y + yStep * rFrac(), x, y + yStep)
            }
            else if (_dir < 7) {
                stroke(palette[4]);
                bezier(x, y, x + rFrac() * xStep, y, x + xStep, y + yStep * rFrac(), x + xStep, y + yStep)
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

    }
    draw_border(clr = "#d3d3d3", sw = 58); //rn_utils.js
    draw_border(clr = 20, sw = 20); //rn_utils.js
    noLoop();
}

function rFrac() {
    //    return (random([0.1, 0.3, 0.5, 0.7, 0.9]))
    return 0.5

}