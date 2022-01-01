// Daily Sketch for 2022-01-01
// Ram Narasimhan

/*
Keywords: GenuarySW2022

Desc: Draw a single line that twists and turns in 45 degree angles. It forms clusters and then jumps to a different area

Ideas to Try:
Implement Pt to Point jumps.. to direct it to jump somewhere
Zonal clusters, one color per cluster...(go to all the zones for uniform coverage)

Integral distances...Done
*/


let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}

const params = {
    xStep: 25,
    yStep: 25,
    bgColor: "#d3d3d3",
    blkColor: "#0f0f0f",
}



function setup() {
    createCanvas(1410, 1410);
    colorMode(HSB);
    background(params.blkColor);
    print(params.bgColor)
    palette2 = random(palList)
    palette = random(palList)
    palette = replicate(palette, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(random(palette2));
    fill(params.blkColor);
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);

    for (c = 31; c > 0; c--) {
        fill(180 + 2 * c, 50, 30 - c)
        noStroke();
        circle(width / 2, height / 2, c * 45)
    }

    stroke(random(palette))
    drawSpiralofSquares();

    // fill(255)
    draw_border(clr = params.bgColor, sw = 30 + cnv.xMargin); //rn_utils.js

}


function drawSpiralofSquares() {

    var angle = 0.89;
    var offset = 0;
    var radius = 0;
    var speed = 1.41;
    var col = {
        r: 255,
        g: 0,
        b: 0
    }

    prevX = 0; prevY = 0;

    for (let r = 0; r < 32; r++) {
        incrRadius = 12 + Math.floor(r / 2) + Math.floor(r / 3) - Math.floor(r / 9) + 2 * Math.floor(r / 27);

        push();

        adjust = -20
        if (r == 28) { adjust += 20 }
        fixX = width / 2 + adjust;
        fixY = height / 2 - 10;

        translate(fixX, fixY);

        col.r = random(0, 200);
        col.g = random(0, 250);
        col.b = random(100, 250);
        var x = offset + cos(angle) * radius;
        var y = offset + sin(angle) * radius;

        // stroke('white')
        // line(prevX, prevY, x, y)
        fill(col.r, col.g, col.b);
        noStroke();
        if (r == 31) {
            drawSquares31(x, y, r)
        } else {
            drawSquares(x, y, r);
        }
        angle += speed;
        radius += incrRadius;
        prevX = x; prevY = y;
        pop();

    }

}


function drawSquares(x, y, numPerSide) {

    push();

    //width of Big square = numPerSide * 7
    step = 9
    squareOffset = numPerSide * step / 2
    translate(x - squareOffset, y - squareOffset)

    hstart = numPerSide * 5;

    for (let i = 0; i < numPerSide; i++) {
        for (let j = 0; j < numPerSide; j++) {
            h = (hstart + numPerSide * 2 + i) % 360;
            fill([h, 100, 100])
            rect(i * step, j * step, 7, 7)
        }
    }

    pop();
}

function drawSquares31(x, y, numPerSide) {

    push();
    fill(255)
    step = 9
    squareOffset = numPerSide * step / 2
    translate(x - squareOffset - 38, y - squareOffset + 38)

    hstart = numPerSide * 5;


    for (let i = 0; i < numPerSide; i++) {
        for (let j = 0; j < 17; j++) {
            h = (hstart + numPerSide * 2 + i) % 360;
            fill([h, 100, 100])
            rect(i * step, j * step, 7, 7)
        }
    }

    for (let j = 0; j < 13; j++) {
        h = (hstart + numPerSide * 2 + j) % 360;
        fill([h, 100, 100])
        rect(j * step, 17 * step, 7, 7)
    }
    pop();
}



//check if NewPoint is leaving the canvas
function outOfBounds(newPt) {
    if ((newPt.x > cnv.xMargin + cnv.width) || (newPt.x < cnv.xMargin)) {
        return (1)
    }
    if ((newPt.y > cnv.yMargin + cnv.height) || (newPt.y < cnv.yMargin)) {
        return (1)
    }
    return (0)// not ooB
}

