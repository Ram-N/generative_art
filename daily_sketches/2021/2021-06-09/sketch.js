// Daily Sketch for 2021-06-09
// Ram Narasimhan.

/*
Start with a rect/square
Draw lines from one edge to another.
pick North point, South point, 
Pick direction point

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
    createCanvas(660, 660);
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
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);
    grid = new Grid(params.xStep, params.yStep, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin);

    stroke(params.bgColor)
    for (sw = 1; sw < 4; sw++) {
        strokeWeight(sw * 8)
        for (i = 0; i < 10; i++) {
            renderRandomLine();
        }
    }
    draw_border(clr = 20, sw = 50); //rn_utils.js

}

function renderRandomLine() {
    d = random([['N', 'S'], ['E', 'S'], ['W', 'S'], ['N', 'W'], ['E', 'N'], ['W', 'E']])
    pt0 = getRandomPoint(d[0])
    pt1 = getRandomPoint(d[1])
    line(pt0.x, pt0.y, pt1.x, pt1.y)

}

function getRandomPoint(_dir) {
    //north edge. Y=0, x is between 0 and cnv.width

    if (_dir == 'N') {
        pt = { x: random(0, cnv.width) + cnv.xMargin, y: 0 }
    }

    if (_dir == 'S') {
        pt = { x: random(0, cnv.width) + cnv.xMargin, y: cnv.height + 2 * cnv.yMargin }
    }
    if (_dir == 'E') {
        pt = { y: random(0, cnv.height) + cnv.yMargin, x: cnv.width + 2 * cnv.xMargin }
    }
    if (_dir == 'W') {
        pt = { y: random(0, cnv.height) + cnv.yMargin, x: 0 }
    }

    return pt
}