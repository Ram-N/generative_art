// Daily Sketch for 2021-12-08
// Ram Narasimhan.

/*
Keywords: images
Desc: Composite image made up of vertical strips of 3 images
*/

let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}

const params = {
    xStep: 60,
    yStep: 60,
    bgColor: [210, 50, 80],
    blkColor: [0, 0, 0],
    numBands: 45,
}


function setup() {

    createCanvas(960, 960);
    colorMode(HSB);
    background(params.blkColor);
    print(params.bgColor)
    palette2 = random(HSBpalList)
    palette = replicate(palette, 100)
    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(params.blkColor);

    strokeWeight(2)
    stepSize = 10;
    numX = width / stepSize;
    wavelength = 10 // higher number ==> flatter waves
    amplitude = 5;
    miniAmplitude = 4
    a_incr = TAU / wavelength
    for (j = 0; j < params.numBands; j++) {
        jj = j % 3
        colr = random(palette2)
        // if (j % 2) {
        //     colr = "black"
        //
        stroke(colr); fill(colr)
        stroke('black')
        prevX = 0;
        prevY = height / params.numBands * j;
        print(prevY, 'prevY')
        offset = random([37, 8, 29, 21, 32])
        beginShape()
        vertex(0, height)
        for (i = 0; i < numX; i++) {
            x = i * stepSize
            angle = a_incr * i;
            deltaY = sin(angle) * amplitude //+ sin(angle) * miniAmplitude;
            vertex(x + offset, prevY + deltaY);
            prevX = x; prevY += deltaY;
            //print(prevX, prevY)
        }
        vertex(width, height)
        endShape(CLOSE)
    }




    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}


function renderPatch(rgb, luma) {
    numLines = 5;
    cutoff = 0.5
    strokeWeight(1);
    fill(rgb.r, rgb.g, rgb.b)
    stroke(rgb.r, rgb.g, rgb.b)
    if (luma < 128) {
        numLines = 6
        cutoff = 0.8
        strokeWeight(2)
    }
    for (l = 0; l < numLines; l++) {
        xInc = l * (stepSize / numLines)
        if (random() < cutoff) {
            line(xInc, 0, xInc, stepSize) //vstripes
        }
        if (random() < cutoff) {
            line(0, xInc, stepSize, xInc) //horiz stripes
        }
    }
}
