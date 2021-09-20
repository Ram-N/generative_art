// Daily Sketch for 2021-09-17
// Ram Narasimhan.
/*

Keywords: Spirograph

*/


let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}

const params = {
    bgColor: "#d3d3d3",
    xStep: 25,
    yStep: 25,
    r1: 80,
    r2: 60,
}



function setup() {
    createCanvas(960, 960);
    background(params.bgColor);
    fill("#0f0f0f");
    draw_border(20); //rn_utils.js
    palette = random(palList);
    palette = red_orange;
    palette = replicate(palette, 100)
    palette2 = take5; //colors.js
    palette2 = replicate(palette2, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height)

    r1 = params.r1
    r2 = params.r2
    s1 = createSlider(0, 100, 5);
    s1.position(970, 10);
    s1.style('width', '80px');
}

function draw() {

    numCols = 6
    xStep = (cnv.width) / numCols;
    yStep = (cnv.height) / numCols;
    xStart = xStep * 3 / 4;
    yStart = yStep * 3 / 4;
    amp = 30;
    angleMode(DEGREES);
    strokeWeight(3)
    stroke(params.bgColor)
    for (row = 0; row < numCols; row++) {
        for (col = 0; col < numCols; col++) {
            x = xStart + col * xStep
            yOffset = amp * sin(col * xStep * TAU / 7);
            y = yStart + row * yStep + yOffset;
            print(yOffset, col, col * TAU / 100, sin((col * xStep) * TAU / 100))
            circle(x, y, 10)
            nestedMandala(x, y);
        }
    }
    draw_border(clr = params.bgColor, sw = 29 + cnv.xMargin); //rn_utils.js
    draw_border(clr = 20, sw = 20); //rn_utils.js
    noLoop();

}

function nestedMandala(x, y) {
    numMand = 2;
    maxRadius = 44;
    for (let mand = 0; mand < numMand; mand++) {
        stroke(random(palette));
        strokeWeight(3)
        r1 = ((numMand - mand) / numMand) * maxRadius;
        r2 = r1 / int(random(3, 12));
        p = int(r1 * (mand + 1) / (numMand + 1));
        //print(r1, r2, p, maxRadius, (r1 - r2 + p));

        push();
        translate(x, y);
        noFill();
        renderSpiro(r1, r2, p, 0);
        pop();
        //maxRadius = r1 - r2 - p;
    }
}


// These are the correct equations: https://linuxgazette.net/133/luana.html
//    x(t,R,r,p) = (R-r)*cos(t) + p*cos((R-r)*t/r)
//   y(t,R,r,p) = (R-r)*sin(t) - p*sin((R-r)*t/r)

function renderSpiro(r1, r2, p, phase = 0) {
    let px = 0;
    let py = 0;

    aStep = 1;
    a = phase;
    px = (r1 - r2) * cos(a) + p * cos((r1 - r2) * a / r2)
    py = (r1 - r2) * sin(a) - p * sin((r1 - r2) * a / r2)
    for (a = phase; a <= 360 + phase; a += aStep) {
        x = (r1 - r2) * cos(a) + p * cos((r1 - r2) * a / r2)
        y = (r1 - r2) * sin(a) - p * sin((r1 - r2) * a / r2)
        line(px, py, x, y)
        px = x;
        py = y;
    }

}

