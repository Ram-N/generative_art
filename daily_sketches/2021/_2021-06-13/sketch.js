// Daily Sketch for 2021-06-12
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
    //rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);
    rect(0, 0, width, height);
    grid = new Grid(params.xStep, params.yStep, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin);

    edgePts = getEdgeGridPoints(grid);

    for (e of edgePts) {
        e.display()
    }

    stroke(params.bgColor)
    for (sw = 1; sw <= 5; sw++) {
        stroke(palette2[sw])
        strokeWeight((5 - sw) * 8)
        for (i = 0; i < sw * 5; i++) {
            renderEdgeLine(edgePts);
        }
    }
    draw_border(clr = 20, sw = 50); //rn_utils.js

}

function renderEdgeLine(edgePts) {
    pt0 = random(edgePts)
    pt1 = random(edgePts)
    line(pt0.x, pt0.y, pt1.x, pt1.y)

}

function getRandomPoint(_dir) {
    //north edge. Y=0, x is between 0 and cnv.width

    if (_dir == 'N') {
        pt = {
            x: int(random(0, 10)) / 10 * cnv.width + cnv.xMargin,
            y: 0
        }
    }

    if (_dir == 'S') {
        pt = {
            x: int(random(0, 10)) / 10 * cnv.width + cnv.xMargin,
            y: cnv.height + 2 * cnv.yMargin
        }
    }
    if (_dir == 'E') {
        pt = {
            y: int(random(0, 10)) / 10 * cnv.height + cnv.yMargin,
            x: cnv.width + 2 * cnv.xMargin
        }
    }
    if (_dir == 'W') {
        pt = {
            y: int(random(0, 10)) / 10 * cnv.height + cnv.yMargin,
            x: 0
        }
    }


    return pt
}
