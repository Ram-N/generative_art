// Daily Sketch for 2022-01-15
// Ram Narasimhan.

/*

*/

let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}


const params = {
    xStep: 20,
    yStep: 20,
    bgColor: "#d3d3d3",
    blkColor: "#0f0f0f",
}


class SandParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = random(-1, 1);
        this.vy = random(-2, 1);
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.3;
    }

    show() {
        noStroke();
        fill(34 + jitter(6), random(50, 100), 100)
        circle(this.x, this.y, 4);
    }

    cull() {
        if (this.x > width || this.x < 0 || this.y > height - 100 || this.y < 0) {
            return true;
        }
    }

};


function setup() {

    createCanvas(960, 960);

    //background(params.bgColor);
    background(params.blkColor);
    colorMode(HSB);

    palette = random(RGBPalList);
    palette = replicate(palette, 100)
    palette2 = random(palList)
    palette2 = replicate(palette2, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width

    topHalfBox = new Bbox(0, 0, width, height / 2)
    bottomHalfBox = new Bbox(0, height / 2, width, height / 2)

    createBg();

    particles = [];
    for (p = 0; p < 200; p++) {
        b = new SandParticle(width / 2 + jitter(-5, 6), height / 2 + jitter(-5, 6));
        particles.push(b);
    }

    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}


function draw() {

    background(params.blkColor)
    createBg();
    for (let i = 0; i < particles.length; i++) {
        if (particles[i].cull()) {
            particles.splice(i, 1);
            b = new SandParticle(width / 2 + jitter(-5, 6), height / 2 + jitter(-5, 6));
            particles.push(b);
        } else {
            particles[i].update();
        }
        particles[i].show();

    }

}


function createBg() {

    randomSeed(105);
    let dune = { verticalWidthofDunes: topHalfBox.h / 2 }
    drawDunes(topHalfBox, dune); //p5_layers.js

    dune = { verticalWidthofDunes: topHalfBox.h / 4 }

    drawDunes(bottomHalfBox, dune); //p5_layers.js
    drawPyramid()
    drawHourglass()

}

function drawHourglass() {
    push();
    translate(width / 2, height / 2)
    bCurve = {
        numSlices: 60,
        start: { x: -width / 3, y: -height / 2 },
        control1: { x: -width / 3, y: -height / 3 + 120 },
        control2: { x: -width / 4, y: -2 * height / 3 + 200 },
        end: { x: - 100, y: 0 }
    }
    bzPts = findBezierPoints(bCurve)
    fill(params.blkColor)
    stroke(179, 0, 100);
    strokeWeight(5)
    for (bz of bzPts) {
        hourGlassCutout();
        scale(1, -1)
        hourGlassCutout();
        scale(-1, 1)
        hourGlassCutout();
    }

    for (symm of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
        push();
        scale(symm);
        drawSpindle();
        pop();
    }
    pop();

    stroke(params.blkColor)
    strokeWeight(7);
    line(0, height / 2, width / 2 - 107, height / 2)
    line(width, height / 2, width / 2 + 107, height / 2)
}


function drawSpindle() {
    xStart = -width / 3
    strokeWeight(25)
    stroke(22, 80, random(80, 90));
    line(-xStart, 0, -xStart, height / 2)
    fill(22, 80, random(80, 90));
    noStroke();
    for (rep = 0; rep < 3; rep++) {
        ellipse(-xStart, - 20 - rep * 20, 40, 30);
        ellipse(-xStart, -height / 2 + 30 + (rep * 25), 40, 30);
    }
}


function hourGlassCutout() {
    beginShape()
    vertex(-width / 2, -height / 2)
    for (bz of bzPts) {
        vertex(bz.x, bz.y)
    }
    vertex(-width / 2, 0)
    endShape(CLOSE);

}


function drawPyramid() {

    push();
    translate(width / 2, 2 * height / 3 + 80)

    swx = -100
    swy = 100
    sex = -40
    sey = 160
    se2x = 130
    se2y = 130
    noStroke();
    origin = createVector(0, 0)
    sw = createVector(swx, swy)
    se = createVector(sex, sey)
    se2 = createVector(se2x, se2y)
    for (amount = 1; amount > 0; amount -= 0.1) {
        fill(15 + amount * 25, 80 + amount * 10, random(50, 80));
        swv = p5.Vector.lerp(origin, sw, amount);
        sev = p5.Vector.lerp(origin, se, amount);
        se2v = p5.Vector.lerp(origin, se2, amount);
        triangle(0, 0, swv.x + jitter(-3, 3), swv.y + jitter(-3, 3), sev.x + jitter(-3, 3), sev.y);
        fill(15 + amount * 25, 80 + amount * 10, random(80, 90));
        triangle(0, 0, sev.x + jitter(-3, 3), sev.y + jitter(-3, 3), se2v.x + jitter(-3, 3), se2v.y);
    }

    pop();
}

