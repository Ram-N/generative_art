// Daily Sketch for 2021-06-20
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

    numP = 6;
    side = 280 * 2;
    strokeWeight(3)
    push();
    translate(width / 2, height / 2);
    rectMode(CENTER)
    mult = Math.sqrt(2);
    let alphaValue = 100;
    for (r = 5; r >= 1; r--) {
        mult *= 1 / Math.sqrt(2)
        if (r % 2) {
            stroke(200);
        } else {
            stroke(20);
        }
        c = color(random(palette2));
        c.setAlpha(alphaValue);
        fill(c);
        rect(0, 0, side * mult, side * mult)
        c = color(random(palette2));
        c.setAlpha(alphaValue);
        fill(c);
        if (random(1) < 0.5) {
            circle(0, 0, side * mult)
        } else {
            decorateCircle(side * mult / 2, numP + (2 * r))
        }
    }
    pop();

    // endPoints = [[[0, 0], [grid.cols, grid.rows]],
    // [[0, grid.rows], [grid.cols, 0]]]
    // for (e of endPoints) {
    //     p0 = grid.getGPt(e[0][0], e[0][1]);
    //     p1 = grid.getGPt(e[1][0], e[1][1]);
    //     line(p0.x, p0.y, p1.x, p1.y)
    // }
    draw_border(clr = 20, sw = 50); //rn_utils.js

}

//r: radius
function decorateCircle(r, numPetals) {


    for (petal = 0; petal < numPetals; petal++) {
        push();
        rotate(petal * TAU / numPetals);
        // circle(r, 0, 10)
        line(r, 0, r * cos(TAU / numPetals), r * sin(TAU / numPetals))
        pop();
    }

}