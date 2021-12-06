// Daily Sketch for 2021-11-12
// Ram Narasimhan.

/*

Get rid of bezier and keep it simple.


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
}


function setup() {
    createCanvas(960, 960);
    colorMode(HSB);
    background(params.blkColor);
    print(params.bgColor)
    palette2 = HrainbowDash; //colors.js
    palette = Hcappuccino; //colors.js
    palette = replicate(palette, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(params.blkColor);
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);


    noFill();

    numEchoes = 8
    echoStep = 8;

    //set up coloring
    colr = []
    base = int(random(360));
    for (cl = 0; cl < numEchoes; cl++) {
        h = (base + cl * 10) % 360;
        colr.push([h, 100, 100]);
    }

    cir = -1;
    //Custom Tiling
    rCount = 10
    colCount = rCount;
    colSplit = Array(rCount).fill(1)
    rowSplit = colSplit
    print(rowSplit, colSplit)
    numCircles = rCount * colCount
    startPts = [];
    endPts = [];
    for (c = 0; c < numCircles; c++) {
        startPts.push([])
        endPts.push([])
    }

    strokeWeight(4);
    pgrid = new PanelGrid(cnv, colSplit, rowSplit)
    pcount = 0;
    for (panel of pgrid.panels) {
        push();
        translate(panel.cx, panel.cy);
        renderCir(panel);
        pop();
        pcount += 1;
    }


    //which circle connects to which other circle?
    cirConnects = Array.from(Array(numCircles).keys())
    shuffleArray(cirConnects);
    print(cirConnects)


    // //line connections
    // for (l = 3; l < numEchoes; l++) {
    //     stroke(colr[l])
    //     for (i = 0; i < numCircles - 1; i++) {
    //         connect('SE', cirConnects[i], cirConnects[i + 1], l);
    //     }
    // }

    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}

function renderCir(panel) {
    cir += 1

    push();
    theta = random(0, PI);
    endTheta = theta + PI + random(0, PI / 4);

    //print('cir', cir, theta, endTheta)
    for (rep = 0; rep < numEchoes; rep++) {
        rad = echoStep * rep;
        dia = rad * 2;
        h = rep * 2;
        stroke(colr[rep])
        arc(0, 0, dia, dia, theta, endTheta);
        //convert the endpoint to cartesian
        //These endpts and startpts are needed to draw connecting lines
        xEnd = rad * cos(endTheta)
        yEnd = rad * sin(endTheta)
        point(xEnd, yEnd)
        endPts[cir].push([panel.cx + xEnd, panel.cy + yEnd]);
        startPts[cir].push([panel.cx + rad * cos(theta), panel.cy + rad * sin(theta)]);
    }
    pop();
}



function connect(sym, cirA, cirB, l, lineoffset = 0) {
    //print(sym, cirA, cirB, l, lineoffset)
    if (sym == "SE") {
        print(cirA, cirB, l)
        line(startPts[cirA][l][0], startPts[cirA][l][1], endPts[cirB][l + lineoffset][0], endPts[cirB][l + lineoffset][1])
    }
    if (sym == "EE") {
        line(endPts[cirA][l][0], endPts[cirA][l][1], endPts[cirB][l][0], endPts[cirB][l][1])
    }

}