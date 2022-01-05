// Daily Sketch for 2022-01-05
// Ram Narasimhan

/*
Keywords: Genuary2022

DESTROY A SQUARE

Draw a square with Linear Gradient colors.
Eat away from its corners
Show the dropped pieces as debris
*/

let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}


// xStep: 90,
// yStep: 90,

const params = {
    xStep: 90,
    yStep: 90,
    bgColor: [210, 50, 80],
    blkColor: [0, 0, 0],
    moves: 1000
}



function setup() {

    createCanvas(960, 960);
    colorMode(HSB);
    background(params.blkColor);
    print(params.bgColor)
    let palette2 = Hred_orange;
    palette = Hblue_green
    palette = replicate(palette, 100)
    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(params.blkColor);

    panelsPerSide = 3
    pgrid = createSquareGrid(panelsPerSide, 45);

    avoid1 = [0] // destroyer 1 not applied to panel 0
    avoid11 = [0, 3] // destroyer 1 not applied to panel 0
    avoid2 = [0, 3, 6] // destroyer 1 not applied to panel 0
    include4 = [2, 5, 7]
    include32 = [2, 5, 8]

    include3 = [2, 4, 5, 7, 8] //black horizontals
    include5 = [8]


    pcount = 0;
    let from = color(palette2[0]);
    let to = color(palette2[5]);
    print(from, to)
    for (panel of pgrid.panels) {

        xe = panel.x + panel.w
        ye = panel.y + panel.h

        drawGradient(panel.x, panel.y, xe, ye, from, to)

        nwx = panel.w / 8;
        nwy = nwx;
        sqWidth = panel.w - 2 * nwx
        nex = nwx + sqWidth

        if (!avoid1.includes(panel.col * panelsPerSide + panel.row)) {
            lasty = destroyer1(panel, sqWidth, nwx, nwy) //NE corner
        }
        if (!avoid11.includes(panel.col * panelsPerSide + panel.row)) {
            destroyer11(panel, sqWidth, nwx)
        }

        if (!avoid2.includes(panel.col * panelsPerSide + panel.row)) {
            destroyer2(sqWidth, nex, lasty) // chip away at the eastern wall
        }
        if (include4.includes(panel.col * panelsPerSide + panel.row)) {
            growth4(from, to, panel.y, ye)
        }

        if (include3.includes(panel.col * panelsPerSide + panel.row)) {
            growth3(from, to, panel.y, ye)
        }

        if (include32.includes(panel.col * panelsPerSide + panel.row)) {
            growth32(panel.y, ye)
        }
        if (include5.includes(panel.col * panelsPerSide + panel.row)) {
            growth5(from, to, panel.y, ye)
        }
    }


    // push();
    // stroke('white')
    // noFill();
    // setLineDash([5, 5]); //create the dashed line pattern here
    // rect(nwx, nwy, sqWidth, sqWidth)
    // pop();

    //    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}

//Eastern wall
function destroyer1(panel, sqWidth, nwx, nwy) {

    randomSeed(10)
    push();
    translate(panel.x, panel.y);
    fill(params.blkColor)
    noStroke();
    for (i = 0; i < 5; i++) {
        rad = sqWidth - random(20) * i
        y = -5 + random(20) * i
        x = panel.w - nwx
        arc(x, y, rad, rad, 0, PI * 1.1)
    }
    pop();

    return y //lastY value
}

function destroyer11(panel, sqWidth, nwx) {

    randomSeed(1983)
    push();
    translate(panel.x, panel.y);
    fill(params.blkColor)
    noStroke();
    for (i = 0; i < 5; i++) {
        rad = sqWidth - random(20) * i
        y = -5 + 20 * i
        x = panel.w - nwx - random(10)
        arc(x, y, rad, rad, 0, PI * 1.1)
    }
    pop();

}


//black inroads
function growth3(color1, color2, ys, ye) {
    fill(params.blkColor)
    seed = int(random(1000))
    print('seed', seed)
    noiseSeed(355);
    push();
    translate(panel.x, panel.y);

    startFrac = 0.65
    endFrac = 0.85
    newys = (ye - ys) * startFrac;
    newye = (ye - ys) * endFrac;
    for (let i = newys; i <= newye; i++) {
        //let frac = map(i, newys, newye, startFrac, endFrac);
        stroke(params.blkColor);
        ingrowth = noise(i * 0.02) * 140
        line(panel.w - ingrowth, i, panel.w, i);
    }
    pop();
}


//black inroads
function growth32(ys, ye) {
    fill(params.blkColor)
    randomSeed(112244)
    push();
    translate(panel.x, panel.y);

    strokeWeight(2)
    startFrac = 0.65
    endFrac = 0.85
    newys = (ye - ys) * startFrac;
    newye = (ye - ys) * endFrac;
    for (let i = newys; i <= newye; i++) {
        //let frac = map(i, newys, newye, startFrac, endFrac);
        stroke(params.blkColor);
        ingrowth = random(140)
        line(panel.w - ingrowth, i, panel.w, i);
    }
    pop();
}


function growth4(color1, color2, ys, ye) {
    fill(params.blkColor)
    randomSeed(324)
    push();
    translate(panel.x, panel.y);

    startFrac = 0.85
    newys = (ye - ys) * startFrac;
    newye = panel.h + panel.h / 8
    print(newys, ys, ye, 'new', panel.w)
    for (let i = newys; i <= newye; i++) {
        // fill(random(palette))
        let frac = map(i, newys, newye, startFrac, 1 + 1 / 8);
        let c = lerpColor(color1, color2, frac);
        stroke(c);
        growth = noise(i * 0.02) * 20
        line(panel.w, i, panel.w + growth, i);
    }
    pop();
}


//ADDITIONAL NEW SQUARE
function growth5(color1, color2, ys, ye) {
    randomSeed(111);
    push();
    translate(panel.x + 8, panel.y + 35);

    startFrac = 0.85
    newys = (ye - ys) * startFrac;
    newye = panel.h
    sqW = newye - newys
    print(newys, ys, ye, 'news', panel.w, sqW)

    for (let i = newys; i <= newye; i++) {
        // fill(random(palette))
        let frac = map(i, newys, newye, 0, 1);
        let c = lerpColor(color1, color2, frac);
        stroke(c);
        line(panel.w, i, panel.w + sqW, i);
    }
    pop();
}


function destroyer2(sqWidth, nex, lasty) {
    fill(params.blkColor)
    randomSeed(3234)
    push();
    translate(panel.x, panel.y);
    noStroke();
    yStep = panel.w / 10;
    for (i = 0; i < 5; i++) {
        //fill(random(palette))
        rad = 40 + 7 * (10 - i)
        y = panel.h / 3 + yStep * i
        x = nex
        arc(x, y, rad, rad, 0, PI * 1.1)
    }
    pop();
}

function drawGradient(xs, ys, xe, ye, color1, color2) {

    noFill();
    for (let i = ys; i <= ye; i++) {
        let frac = map(i, ys, ye, 0, 1);
        let c = lerpColor(color1, color2, frac);
        stroke(c);
        line(xs, i, xe, i);
    }

}

function setLineDash(list) {
    drawingContext.setLineDash(list);
}



