// Daily Sketch for 2022-01-20
// Ram Narasimhan

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

let ygap = 0;
let period = 100; // wave periodicity
let perturb = 50;
let num_pts = 60;


function setup() {
    createCanvas(960, 960);


    palette = random(RGBPalList);
    palette = ['blue', 'white', 'purple']
    palette = replicate(palette, 100)
    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width



    background("#d0efff");
    let ystart = height / 3;
    fill("#1167b1");
    rect(0, 0, width, ystart)

    cStart = color(254, 216, 177)
    cEnd = color(255, 153, 51)
    cEnd = color(255, 0, 05)
    skyGradient(0, 0, width, ystart, cStart, cEnd)

    cStart = color(105, 176, 255)
    cEnd = color(189, 219, 255);
    skyGradient(0, ystart, width, height, cStart, cEnd)



    let amplitude = 10.0; // Height of wave
    drawWaveHeads(amplitude);

    drawHalfCircles(ystart)

    //draw a bunch of sinusoidal lines
    numWaves = 35;
    radius1 = 5;
    radius2 = 10;
    for (let wave = 0; wave < numWaves; wave++) {
        //fill(0, ygap / 3, 255);
        strokeWeight(2);
        npoints = random([4, 5, 6]);
        darkFlag = 0;
        let yoffset = ystart + ygap;
        dx = int(random(perturb));
        for (let x = 0; x < width; x += 12) {
            stroke(random(10, 100), ygap / 3, 255);
            toss = random();
            if (toss < 0.2 && (darkFlag == 1)) {
                darkFlag = 0
            }

            if (toss < 0.05 && (darkFlag == 0)) {
                darkFlag = 1
            }

            if (darkFlag == 1) { stroke(random(20, 40)) }
            y = yoffset + sin(TWO_PI / period * (x + dx)) * amplitude;
            star(x, y, radius1, radius2, npoints, rot = 0, curved = true, repeat = 1)
        }
        ygap += 20;

    }


    draw_border(clr = params.blkColor, sw = 50); //rn_utils.js
}

function drawHalfCircles(ystart) {
    strokeWeight(3)
    for (let rep = 0; rep < 80; rep++) {
        fill(200 + (rep / 4));
        stroke(random(0, 128))
        rad = 30 + rep * 0.75
        x = random(width / 2, width)
        y = ystart - 90 + rep
        startAngle = random(PI / 2, PI)
        arc(x, y, rad, rad, startAngle, TAU + PI / 4)
    }
}

function drawWaveHeads(amplitude) {
    // wave heads
    noStroke();
    htAdj = [10, 60, 90]
    wAdj = [width / 8, width / 3, width / 2];
    for (rep = 0; rep < 3; rep++) {
        adj = htAdj[rep]
        doubleSpiral(wAdj[rep], height / 4 - adj, amplitude, 50)
    }
}


function doubleSpiral(x, y, amplitude, rInner) {
    fill(0, ygap / 3, random(200, 25));
    spiral(x, y, rInner * 2, amplitude);
    fill(0, 170, 255);
    spiral(x, y, rInner, amplitude);

}



function spiral(startx, starty, mw, amplitude) {

    var r1 = 0;
    var r2 = 0;
    var step = 1;
    var ang = PI / 30;
    var spiralwidth = 0;
    var dw = mw / num_pts; // width tapers off
    push();
    translate(startx, starty);

    beginShape(TRIANGLE_STRIP);
    for (var i = 0; i < num_pts; i++) {
        r1 += step;
        spiralwidth += dw;
        r2 = r1 + spiralwidth;
        var r1x = r1 * sin(ang * i);
        var r1y = r1 * cos(ang * i);
        var r2x = r2 * sin(ang * i);
        var r2y = r2 * cos(ang * i);
        vertex(r1x, r1y);
        vertex(r2x, r2y);
    }
    endShape();
    pop();

    var xdiff = r2x - r1x;
    var ydiff = r2y - r1y;

    push();
    translate(startx + r1x, starty + r1y);

    //draw the tail of the wave
    beginShape();
    curveVertex(0, 0); // the first control point
    curveVertex(0, 0); // the first control point

    for (let i = 0; i < 40; i++) {
        curveVertex(i * 20, sin(i * 5) * amplitude);
    }

    for (let j = 0; j < 40; j++) {
        curveVertex((40 - j) * 20, mw + sin(j * 5) * amplitude);
    }

    curveVertex(xdiff, ydiff); // is also the last control point
    curveVertex(xdiff, ydiff); // is also the last control point
    endShape();

    pop();
}

