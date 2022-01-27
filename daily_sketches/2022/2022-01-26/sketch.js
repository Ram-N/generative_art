// Daily Sketch for 2022-01-25
// Ram Narasimhan.

let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}

const params = {
    tw: 80, // triangle width within the Hexgrid
    xStep: 5,
    yStep: 5,
    bgColor: [210, 50, 80],
    blkColor: [0, 0, 0],
}

function setup() {

    createCanvas(960, 960);
    colorMode(HSB);
    background(params.blkColor);
    print(params.bgColor)
    palette = random(palList)
    palette = replicate(palette, 100)
    palette2 = random(palList)
    palette2 = replicate(palette2, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(params.blkColor);
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);

    smooth();

    var xstart = random(10),
        xnoise = xstart,
        ynoise = random(10);

    var llength = 10;

    push();
    //rotate(PI / 4);
    //primer coat
    for (var y = 0; y <= height; y += params.yStep) {
        ynoise += 0.1;
        xnoise = xstart;
        for (var x = 0; x <= width; x += params.xStep) {
            xnoise += 0.1;
            stroke(20 + x * 0.1, 50, 100);
            renderStroke(x, y, noise(xnoise, ynoise), llength);
        }
    }
    pop();

    //horiz stripes
    capp = replicate(Hcappuccino, 100)

    for (let index = 0; index < 10; index++) {
        push();
        y1 = index * 0.1 * height
        stroke(capp[index])
        bbox = new Bbox(0, y1, width, 40)
        renderbBox(bbox, xnoise, ynoise, llength)
        pop();
    }


    panelsPerSide = 10
    ppSide = panelsPerSide
    pgrid = createSquareGrid(panelsPerSide, margin = 5);
    for (panel of pgrid.panels) {
        xnoise = random(100);
        ynoise = random(10);
        bbox = new Bbox(panel.x, panel.y, panel.w, panel.h)
        if ((panel.col + panel.row) % 2) {
            push();
            fill(random(palette))
            c = color(Hblue_green[panel.col % 8]);
            c.setAlpha(1)
            stroke(c);
            renderbBox(bbox, xnoise, ynoise, llength)
            _sc = panel.w * 0.2
            bbox = new Bbox(panel.x + _sc, panel.y + _sc, panel.w - 2 * _sc, panel.h - 2 * _sc)
            c = color(random(Hred_yellow));
            c.setAlpha(0.8)
            stroke(c);

            renderbBox(bbox, xnoise, ynoise, llength)
            pop();
        } else {
            //renderCircle(bbox, xnoise, ynoise, llength)
        }

    }



    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}


function renderCircle(bbox, nwXnoise, nwYnoise, llength) {
    ynoise = nwYnoise;
    nwXnoise = random(10);

    c = color('darkblue')
    c.setAlpha(0.5)
    stroke(c);
    fill(c)

    push();
    translate(bbox.cx, bbox.cy)
    for (let index = 0; index < 1500; index++) {
        ynoise += 0.1;
        x = random(-bbox.w, bbox.w);
        y = random(-bbox.h, bbox.h)
        if (dist(0, 0, x, y) < bbox.w / 2 - 20) {//inside circle
            xnoise += 0.1;
            strokeWeight(2)
            renderStroke(x, y, noise(xnoise, ynoise), llength);
        }
    }
    pop();
}


function renderbBox(bbox, nwXnoise, nwYnoise, llength) {
    ynoise = nwYnoise;
    for (var y = bbox.y; y <= bbox.ye; y += params.yStep) {
        ynoise += 0.1;
        xnoise = nwXnoise;
        for (var x = bbox.x; x <= bbox.xe; x += params.xStep) {
            xnoise += 0.1;
            strokeWeight(2)
            renderStroke(x, y, noise(xnoise, ynoise), llength);
        }
    }

}


function renderStroke(x, y, noiseFactor, llength = 7) {
    push();
    translate(x, y);
    rotate(noiseFactor * TAU);
    line(0, 0, llength, 0);
    pop();
}

