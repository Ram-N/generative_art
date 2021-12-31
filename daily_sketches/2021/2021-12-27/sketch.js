// Daily Sketch for 2021-12-27
// Ram Narasimhan.

/*



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

    xleft = width * 0.4;
    xRight = 0.7 * width;
    yRight = xleft;
    yleft = xRight;

    startPts = Array(9).fill([]);
    endPts = Array(9).fill([]);

    eT = [-PI / 3.7, PI * 1.2, PI / 3, 0.5]
    sT = [0.9 * PI, PI / 3.3, 5.7, 1.4 * PI];
    cir = -1;

    //Custom Tiling
    colSplit = [1, 1, 1,]
    rowSplit = [1, 1, 1,]
    pgrid = new PanelGrid(cnv, colSplit, rowSplit)

    pcount = 0;
    for (panel of pgrid.panels) {
        push();
        translate(panel.cx, panel.cy);
        renderCir(panel);
        pop();
        pcount += 1;
    }

    //drawConnectionLines();


    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}


function drawConnectionLines() {

    //line connections

    numLines = startPts[0].length
    for (l = 0; l < numLines - 1; l++) {
        h = l * 5 + cir;
        strokeWeight(5)

        stroke([h, random([40, 60, 80, 100]), random([40, 60, 80, 100])])
        connect('SE', 0, 1, l);
        connect('SE', 1, 2, l);
        connect('SE', 2, 3, l);
        connect('SE', 3, 0, l, lineoffset = 1);


        connect('SE', 0, 1, 19, 0);
        connect('SE', 1, 2, 19, 0);
        connect('SE', 2, 3, 19, 0);
    }
}

function renderCir(panel) {
    cir += 1
    strokeWeight(7)

    push();

    for (rep = 0; rep < 15; rep++) {
        rad = 13 * rep;
        dia = rad * 2;
        theta = random(0, PI);
        endTheta = random(PI, TAU);
        h = rep * 0.5 + 12 * cir;
        stroke([h, 100, 100])
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
        line(startPts[cirA][l][0], startPts[cirA][l][1], endPts[cirB][l + lineoffset][0], endPts[cirB][l + lineoffset][1])
    }
    if (sym == "EE") {
        line(endPts[cirA][l][0], endPts[cirA][l][1], endPts[cirB][l][0], endPts[cirB][l][1])
    }

}
