// Daily Sketch for 2021-06-19
// Ram Narasimhan.

/*
SYMMETRY
CONCENTRIC Circles and Squares...

palList = [rainbowDash, take5, cappuccino, purples, melons, 
    red_brown_orange, red_orange, greys]
    */


let palette = []
let grid;
const cnv = {
    xMargin: 50,
    yMargin: 50,
}

const params = {
    xStep: 40,
    yStep: 40,
    numBounces: 500,
    bgColor: "#0f0f0f", //black
}


function setup() {
    createCanvas(660, 660);
    background(params.bgColor);
    //background("#0F0F0F");
    draw_border(20); //rn_utils.js
    palette2 = take5;
    palette2 = replicate(palette2, 100)
    palette = red_brown_orange; //colors.js
    palette = replicate(palette, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(random(palette2));
    //rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);
    rect(0, 0, width, height);
    grid = new Grid(params.xStep, params.yStep, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin);

    edgePts = getEdgeGridPoints(grid);

    numE = edgePts.length
    offset = 1
    currIndex = int(random(numE))
    numE4 = int((numE + 2) / 4) + offset
    pt0 = edgePts[currIndex]

    print(numE, numE4)

    for (gpt of grid.points) {
        gpt.display()
    }
    strokeWeight(3)
    push();
    translate(width / 2, height / 2);
    rectMode(CENTER)
    mult = 70;
    let alphaValue = 100;
    for (side = 8; side > 1; side--) {
        stroke(random(palette))
        c = color(random(palette2));
        c.setAlpha(alphaValue);
        fill(c);
        rect(0, 0, side * mult, side * mult)
        c = color(random(palette2));
        c.setAlpha(alphaValue);
        fill(c);
        circle(0, 0, side * mult)
    }
    pop();

    endPoints = [[[0, 0], [grid.cols, grid.rows]],
    [[0, grid.rows], [grid.cols, 0]]]
    for (e of endPoints) {
        print(e[0], e[1], 'e0 e1');
        p0 = grid.getGPt(e[0][0], e[0][1]);
        p1 = grid.getGPt(e[1][0], e[1][1]);
        line(p0.x, p0.y, p1.x, p1.y)
    }
    draw_border(clr = 20, sw = 50); //rn_utils.js

}

