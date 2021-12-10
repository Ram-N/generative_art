// Daily Sketch for 2021-12-05
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
    numBands: 20,
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

    strokeWeight(4)
    stepSize = 3;
    numX = width / stepSize;
    freq = width / 8 // TWO to reach one Freq.
    for (i = 0; i < params.numBands; i++) {
        stroke(random(palette2))
        prevX = 0;
        prevY = height / params.numBands * i;
        print(prevY, 'prevY')
        for (x = 0; x < width; x += stepSize) {
            angle = freq * x / TAU;
            deltaY = sin(i * angle) * 10 + cos(i * angle) * 20;
            line(prevX, prevY, x, prevY + deltaY);
            prevX = x; prevY += deltaY;
            print(prevX, prevY)
        }

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
