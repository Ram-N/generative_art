// A JS utility library to use with p5.js sketches. 
//Ram Narasimhan

// Updated: November 2021

//Functions in this library
/*

DrawSanddunes
BgLayer
sineWall
diagWall
brickWall
*/

class Bbox { // A bounding box
    constructor(x, y, w, h) {
        this.x = x; // nw corner x
        this.y = y; //nw y
        this.h = h;
        this.w = w;
    }

    display(colr, sw = 1) {
        strokeWeight(sw)
        if (colr) {
            stroke(colr);
            fill(colr);
        }
        rect(this.x, this.y, this.w, this.h)
    }
}


function drawDunes(bBox, dune) {

    let amplitude = 7.0; // Height of wave
    let ygap = 0;
    let period = 200; // wave periodicity
    let perturb = 15;
    let num_waves = 10;

    let ystart = (bBox.y + bBox.h) - dune.verticalWidthofDunes;
    let yEnd = (bBox.y + bBox.h);
    let xEnd = (bBox.x + bBox.w);

    //print(ystart, yEnd, 'ys ye')
    ygap = (yEnd - ystart) / num_waves;

    push();
    colorMode(HSB)
    //draw a bunch of sinusoidal lines
    for (let wave = 0; wave < num_waves; wave++) {

        amplitude = int(5 + random(-3, 7));
        slope = -1 + random(2);
        inflection_x = random(width);

        beginShape();
        fill(25 + wave * 2, 80 + wave * 10, random(90, 100));
        //fill(234, 206 - 5 * wave, 106 + 10 * wave);
        stroke(25 + wave * 2, 90, 80);
        strokeWeight(3);
        vertex(bBox.x, yEnd); //lower left of Box
        let yoffset = ystart + wave * ygap;
        //print('yoff', yoffset)
        dx = int(random(perturb));
        dx = 0;
        for (let x = bBox.x; x < xEnd; x += 5) {

            y = yoffset + sin(TWO_PI / period * (x + dx)) * amplitude;
            if (y > bBox.y + bBox.h) { y = bBox.y + bBox.h }
            vertex(x, y);
            yoffset += slope;
            if (x > inflection_x) {
                slope *= -1;
            }
        }
        vertex(xEnd, yEnd);//lower right of Box
        endShape(CLOSE);
    }
    pop();
}

function BgLayer(_box, BgParams) {

    translate(_box.x, _box.y)
    //print(BgParams)
    stroke(BgParams.color)
    strokeWeight(BgParams.sw)
    if (BgParams.rows > 0) {
        yStep = _box.h / (BgParams.rows + 1)
    }

}

function sineWall(_box, BgParams) {
    BgParams.type = 'brick';
    BgParams.color = random(palette2)
    BgParams.rows = int(random(5, 15))
    BgParams.sw = 3;
    BgParams.size = random(['small', 'medium', 'large'])

    if (BgParams.size == 'small') {
        amplitude = _box.h / 20
        frequency = _box.w / 20 //
    }
    if (BgParams.size == 'medium') {
        amplitude = _box.h / 10
        frequency = _box.w / 10 //pixels. freq:2PI. x : ?
    }
    if (BgParams.size == 'large') {
        amplitude = _box.h / 3
        frequency = _box.w / 3 //pixels. freq:2PI. x : ?
    }

    //    BgLayer(_box, BgParams);
    translate(_box.x, _box.y)
    //print(BgParams)
    stroke(BgParams.color)
    strokeWeight(BgParams.sw)
    if (BgParams.rows > 0) {
        yStep = _box.h / (BgParams.rows + 1)
    }

    for (y = yStep / 2; y < _box.h; y += yStep) {
        beginShape()
        for (x = 0; x < _box.w; x += 3) {
            deltaY = cos(x * TAU / frequency)
            if ((y + deltaY < _box.h) && (y + deltaY > 0)) {
                vertex(x, y + deltaY * amplitude)
            }
        }
        endShape()
    }
}

function brickWall(_box, BgParams) {
    BgParams.type = 'brick';
    BgParams.color = random(palette2)
    BgParams.rows = int(random(5, 15))
    BgParams.sw = 3;
    BgParams.size = random(['small', 'medium', 'large']);
    if (BgParams.rows > 0) {
        yStep = _box.h / (BgParams.rows + 1)
        xStep = yStep * 2
    }

    translate(_box.x, _box.y)
    stroke(BgParams.color)
    strokeWeight(BgParams.sw)
    xOff = xStep / 2
    for (y = yStep / 2; y < _box.h; y += yStep) {
        if (xOff > 0) {
            xOff = 0
        } else {
            xOff = xStep / 2
        }
        line(0, y, _box.w, y) //horiz
        for (x = xOff; x < _box.w; x += xStep) {
            line(x, y, x, y + yStep) //vert
        }
    }
}


function diagWall(_box, BgParams) {
    BgParams.type = 'diag';
    BgParams.color = random(palette2)
    BgParams.rows = int(random(5, 15));
    BgParams.sw = 3;
    BgParams.size = random(['NW', 'NE', 'SE', 'SW']);
    if (BgParams.rows > 0) {
        yStep = _box.h / (BgParams.rows + 1)
        xStep = yStep * 2
    }

    pal = BgParams.pal;

    translate(_box.x, _box.y)
    //stroke(BgParams.color)
    noStroke();
    strokeWeight(BgParams.sw)
    fill(pal[0]);
    rect(0, 0, _box.w, _box.h);

    xMax = _box.w;
    numSteps = 5;
    numLayers = BgParams.numLayers;
    for (layer = 0; layer < numLayers; layer++) {

        yMin = max(_box.h * (0.8 - 0.2 * layer), 0);
        yMax = _box.h * (0.8 - 0.1 * layer);
        yStep = (yMax - yMin) / numSteps; //average y distance
        xStep = (xMax) / numSteps; //average distance
        fill(pal[layer])
        beginShape();
        vertex(0, 0) // nw corner of the box
        vertex(_box.w, 0) // ne corner of the box
        for (vtx = 0; vtx < numSteps; vtx++) {
            xDist = int(xStep) + jitter(5)
            yDist = int(yStep) + jitter(3)
            vertex(xMax - xDist * vtx, yMin + yDist);
        }
        vertex(0, yMax)
        endShape(CLOSE);
    }
}








function bubblesLayer(_box, numBubbles, palette) {
    for (let cir = 0; cir < numBubbles; cir++) {
        noFill();
        colr = random(palette);
        strokeWeight(5);
        stroke(colr[0], 20, 80)
        toss = random();
        if (toss > 0.5) {
            fill(colr[0], 20, 80)
            radius = random(10, 15);
        }
        if (toss <= 0.5) {
            strokeWeight(3);
            stroke(colr)
            fill(colr)
            radius = random(15, 30);
        }
        cx = random(_box.x + radius, _box.x + _box.w - radius);
        cy = random(_box.y + radius, _box.y + _box.h - radius);
        circle(cx, cy, radius);

    }

}

function coloredWall(_box, BgParams) {
    // //Custom Tiling
    // colSplit = Array(10).fill(1)
    // rowSplit = Array(10).fill(1)
    push();
    translate(_box.x, _box.y)
    //stroke(BgParams.color)
    noStroke();
    fill(random(BgParams.palette))
    rect(0, 0, _box.w, _box.h);
    pop();
}