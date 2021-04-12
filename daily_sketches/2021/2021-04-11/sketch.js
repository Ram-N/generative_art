let palette = []
const cnv = {
    xMargin: 30,
    yMargin: 30,
}

const params = {
    xStep: 20,
    yStep: 20,
    nShapes: 10,
    multiplier: [2.0, 1.5, 0.5]
}


function setup() {
    createCanvas(960, 960);
    background("#d3d3d3");
    //background("#0F0F0F");
    fill("#0f0f0f");
    draw_border(20); //rn_utils.js
    palette = rainbowDash; //colors.js
    //palette = cappuccino; //colors.js
    palette = replicate(palette, 100)

    cnv.height = height - 2 * cnv.yMargin
    cnv.width = width - 2 * cnv.yMargin
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);

}

function draw() {
    //background(255);
    xStep = params.xStep;
    yStep = params.yStep;
    for (var y = cnv.yMargin; y <= cnv.height; y += params.yStep) {
        if ((y - cnv.yMargin) % (2 * params.yStep)) {
            strokeWeight(4);
        } else {
            stroke(255, 0, 0);
            strokeWeight(2);
        }
        for (var x = cnv.xMargin; x <= cnv.width; x += params.xStep) {
            stroke(palette[Math.floor(x / params.xStep)]);
            let _dir = random(7)
            if (_dir < 1) {
                line(x, y, x + xStep, y + yStep);
            }
            else if (_dir < 2) {
                line(x, y + yStep, x + xStep, y);
            }
            else if (_dir < 3) {
                line(x, y, x + xStep, y);
            }
            else if (_dir < 4) {
                line(x, y, x, y + yStep);
            }
            else if (_dir < 5) {
                line(x + xStep, y, x + xStep, y + yStep);
            }
        }
    }
    noLoop();
}