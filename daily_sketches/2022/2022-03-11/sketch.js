// Daily Sketch for 2021-03-11
// Ram Narasimhan

/*
Keywords: dithering

Basic dithering. Take a base image and push its colors to a reduced palette.

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
    moves: 1000
}

const BgParams = {
    size: "medium",
    rows: 10,
    columns: 10,
    color: "red",
    sw: 3,
    numLayers: 3,
    pal: ['salmon', 'green', 'lightblue', 'white'],

}

let numImages = 1;
let imgs = [];
_str = ['assets/base_image.png']
function preload() {
    for (i = 0; i < numImages; i++) {
        imgs[i] = loadImage(_str[i]);
    }
}

function setup() {

    radiusSlider = createSlider(0, 600, 500);
    radiusSlider.position(1060, 10);
    radiusSlider.style('width', '200px');
    radiusSlider.changed(redraw);
    createCanvas(960, 960);
    let button = createButton("reset sketch");
    button.mousePressed(resetSketch);
    //colorMode(HSB);
    background(params.blkColor);
    print(params.bgColor)
    palette2 = random(RGBPalList)
    palette = random(RGBPalList)
    palette = replicate(palette, 100)
    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(params.blkColor);


    iW = imgs[0].width
    iH = imgs[0].height

    print(iW, iH, 'base image')

    dither = 1
    if (dither) {
        let steps = 1
        makeDithered(imgs[0], steps);
        image(imgs[0], (width - iW) / 2, (height - iH) / 2);
        // Apply gray filter to the whole canvas
        //filter(GRAY);
    }

    //createField(2);

    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}





function createField(eclipse = 2) {

    if (eclipse != 2) {
        _box = new Bbox(0, 0, width, height);
        diagWall(_box, BgParams);
    }
    randomSeed(228);

    drawDunes();

    // fill("gold")
    // beginShape();
    // vertex(0, height - 100)
    // vertex(0, height)
    // vertex(width, height)
    // vertex(width, height - 200)
    // endShape(CLOSE);

    numStalks = 8;
    for (rep = 0; rep <= numStalks; rep++) {
        xStart = rep * 110;
        var bezierParams = [{ x: xStart, y: 200 },
        { x: xStart - random(100), y: height - 300 },
        { x: xStart + random(100), y: height - 200 },
        { x: xStart, y: height }
        ]
        var cPoints = findCBezPoints(bezierParams, random([80, 100, 120]));
        if (rep % eclipse) {
            for (bz of cPoints) {
                colr = random(dark_cappuccino)
                stroke(colr);
                fill(colr);
                rad = noise(bz.x, bz.y)
                circle(bz.x, bz.y, 50)
            }
        }

        pal = green_yellow;
        alphaValue = random([200, 225])
        numPetals = random([3, 2]);
        for (pet = 0; pet <= numPetals; pet++) {
            colr = random(pal)
            c = color(colr);
            c.setAlpha(alphaValue);
            fill(c);
            stroke(0, 0, 0);
            radius1 = 50;
            radius2 = 130;
            npoints = random([7, 11, 9]);
            if (pet % eclipse) {
                xAdj = random(-100, 100)
                yAdj = random(-50, 50)
                yValue = 200 - yAdj
                rot = PI / 7 * random([1, 2, 3, 4]) * 0
                push();
                star(xStart + xAdj, yValue, radius1, radius2, npoints, rot = rot, curved = false, repeat = 1)
                pop();
                colr = random(pal)
                c = color(colr);
                c.setAlpha(alphaValue);
                fill(c);
                frac = random([0.8, , 0.7])
                push();
                star(xStart + xAdj, yValue, radius1 * frac, radius2 * frac, npoints, rot = rot, curved = true, repeat = 1)
                pop();
            }
        }
    }

}

function drawDunes() {

    let amplitude = 7.0; // Height of wave
    let ygap = 0;
    let period = 200; // wave periodicity
    let perturb = 15;
    let num_waves = 4;


    let ystart = height - 250;
    let yend = height;
    ygap = (yend - ystart) / num_waves;

    //draw a bunch of sinusoidal lines
    for (let wave = 0; wave < num_waves; wave++) {

        amplitude = int(5 + random(7));
        slope = -1 + random(2);
        inflection_x = random(width);

        beginShape();
        fill(234, 206 - 5 * wave, 106 + 10 * wave);
        stroke(179, 146, 131);
        strokeWeight(3);
        vertex(0, height); //lower left
        let yoffset = ystart + wave * ygap;
        print('yoff', yoffset)
        dx = int(random(perturb));
        dx = 0;
        for (let x = 0; x < width; x += 5) {

            y = yoffset + sin(TWO_PI / period * (x + dx)) * amplitude;
            vertex(x, y);
            yoffset += slope;
            if (x > inflection_x) {
                slope *= -1;
            }
        }
        vertex(width, height);//lower right
        endShape(CLOSE);
    }

}