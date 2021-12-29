// Daily Sketch for 2021-12-26
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
    moves: 1000
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



    xLeft = width * 0.25;
    xMid = width / 2;
    xRight = 0.75 * width;
    yRight = xLeft;
    yLeft = xRight;
    yMid = width / 2;

    startPts = [];
    endPts = [];
    startTheta = [0.4, 0.7, 0.9, 0.3, 0, 1.3, 0, -0.1, 1.5];
    eTheta = [1.0, 1.2, 1.7, 0.6, 0, -0.4, 0.6, 0.1, 0.1]
    cir = -1;

    strokeWeight(2);

    for (cenx of [xLeft, xMid, xRight]) {
        for (ceny of [yLeft, yMid, yRight]) {
            cir += 1
            circ_endPts = []
            circ_startPts = []
            if (ceny == yMid && cenx == xMid) {
                continue
            }
            strokeWeight(10)
            push();
            translate(cenx, ceny)

            for (rep = 0; rep < 10; rep++) {
                rad = 15 * rep;
                dia = rad * 2;
                theta = startTheta[cir] * PI
                endTheta = eTheta[cir] * PI

                h = 100 + rep * 10;
                stroke([h, 100, 100])
                arc(0, 0, dia, dia, theta, endTheta);


                //convert the endpoint to cartesian
                //These endpts and startpts are needed to draw lineConnecting lines
                xEnd = rad * cos(endTheta)
                yEnd = rad * sin(endTheta)
                //point(xEnd, yEnd)
                circ_endPts.push([cenx + xEnd, ceny + yEnd])
                circ_startPts.push([cenx + rad * cos(theta), ceny + rad * sin(theta)])
            }

            startPts.push(circ_startPts)
            endPts.push(circ_endPts)

            pop();

        }

    }


    print(startPts)

    drawLineConnections()

    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}


function drawLineConnections() {
    //line lineConnections
    numLines = startPts[0].length
    for (l = 0; l < numLines - 1; l++) {
        h = 100 + l * 10;
        stroke([h, 100, 100])
        lineConnect('ES', 0, 1, l);
        lineConnect('ES', 1, 2, l);
        lineConnect('ES', 2, 4, l);
        lineConnect('ES', 4, 7, l);
        lineConnect('ES', 7, 6, l, lineoffset = 1);
        lineConnect('ES', 6, 5, l, lineoffset = 1);
        lineConnect('ES', 5, 3, l, lineoffset = 1);
        lineConnect('ES', 3, 0, l, lineoffset = 1);
    }
}


// Every circular arc has a start and end set of points...
// Connect two adjacent circles...
// SE : From start to End
// EE: from end to end
function lineConnect(sym, cirA, cirB, l, lineoffset = 0) {
    //print(sym, cirA, cirB, l, lineoffset)
    if (sym == "SE") {
        line(startPts[cirA][l][0], startPts[cirA][l][1], endPts[cirB][l + lineoffset][0], endPts[cirB][l + lineoffset][1])
    }
    if (sym == "ES") {
        line(endPts[cirA][l][0], endPts[cirA][l][1], startPts[cirB][l + lineoffset][0], startPts[cirB][l + lineoffset][1])
    }
    if (sym == "EE") {
        line(endPts[cirA][l][0], endPts[cirA][l][1], endPts[cirB][l][0], endPts[cirB][l][1])
    }

}
