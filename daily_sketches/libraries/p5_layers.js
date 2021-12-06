// A JS utility library to use with p5.js sketches. 
//Ram Narasimhan

// Updated: November 2021

//Functions in this library
/*
BgLayer
sineWall
diagWall
brickWall
*/


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
    BgParams.rows = int(random(5, 15))
    BgParams.sw = 3;
    BgParams.size = random(['NW', 'NE', 'SE', 'SW']);
    if (BgParams.rows > 0) {
        yStep = _box.h / (BgParams.rows + 1)
        xStep = yStep * 2
    }

    translate(_box.x, _box.y)
    //stroke(BgParams.color)
    noStroke();
    strokeWeight(BgParams.sw)
    fill(random(palette2))
    rect(0, 0, _box.w, _box.h);

    xMax = _box.w;
    numSteps = 5;
    numLayers = random([2, 3, 4, 5, 6, 7])
    for (layer = 0; layer < numLayers; layer++) {

        yMin = max(_box.h * (0.8 - 0.2 * layer), 0);
        yMax = _box.h * (0.8 - 0.1 * layer);
        yStep = (yMax - yMin) / numSteps; //average y distance
        xStep = (xMax) / numSteps; //average distance
        fill(random(palette2))
        beginShape();
        vertex(0, 0) // nw corner of the box
        vertex(_box.w, 0) // nw corner of the box
        for (vtx = 0; vtx < numSteps; vtx++) {
            xDist = int(xStep) + jitter(5)
            yDist = int(yStep) + jitter(3)
            vertex(xMax - xDist * vtx, yMin + yDist);
        }
        vertex(0, yMax)
        endShape(CLOSE);
    }
}

// beginShape()
// vertex(0, 0)
// vertex(width, 0)
// vertex(width, 88) //come down a bit
// vertex(280, 360) //down more, x less
// vertex(0, 435) // x=0, y final
// endShape(CLOSE)

// fill(random(palette2))
// beginShape()
// vertex(0, 0)
// vertex(200, 0)
// vertex(80, 160)
// vertex(0, 200)
// endShape(CLOSE)







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

function coloredPanelBackground() {
    //Custom Tiling
    colSplit = Array(10).fill(1)
    rowSplit = Array(10).fill(1)

    pgrid = new PanelGrid(cnv, colSplit, rowSplit, margin = 0) //rn_grids
    pgrid.renderPanelGrid(1);
    pMargin = 0;
    for (p of pgrid.panels) {
        _box.x = p.x + pMargin;
        _box.y = p.y + pMargin;
        _box.w = p.w - 2 * pMargin;
        _box.h = p.h - 2 * pMargin;
        fill(random(random(palList)))
        rect(p.x, p.y, p.w, p.h)
        fill(random(random(palList)))
        triangle(p.x, p.y, p.x, p.y + p.h, p.x + p.w, p.y + p.h)
    }

}