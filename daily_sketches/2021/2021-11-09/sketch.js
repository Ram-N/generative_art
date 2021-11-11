// Daily Sketch for 2021-11-08
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

    xleft = width * 0.4;
    xRight = 0.7 * width;
    yRight = xleft;
    yleft = xRight;

    startPts = [[], [], [], []];
    endPts = [[], [], [], []];
    eT = [-PI / 3.7, PI * 1.2, PI / 3, 0.5]
    sT = [0.9 * PI, PI / 3.3, 5.7, 1.4 * PI];
    cir = -1;

    strokeWeight(2);
    for (trans of [[xleft, yRight], [xleft, yleft], [xRight, yleft], [xRight, yRight],]) {
        cir += 1
        strokeWeight(7)

        push()
        //translate(width / 2, height / 2)
        translate(trans[0], trans[1])

        //connectionPoints are ready. Start drawing circles...
        for (rep = 0; rep < 20; rep++) {
            rad = 13 * rep;
            dia = rad * 2;

            //calc the angle of the point of Bez to the center of the circle
            //theta = Math.atan2(conY - y, conX - x);
            theta = sT[cir]
            endTheta = eT[cir]
            if (theta < 0) { theta += TAU };
            h = rep * 2;
            stroke([h, 100, 100])
            arc(0, 0, dia, dia, theta, endTheta);
            //convert the endpoint to cartesian
            //These endpts and startpts are needed to draw connecting lines
            xEnd = rad * cos(endTheta)
            yEnd = rad * sin(endTheta)
            point(xEnd, yEnd)
            endPts[cir].push([trans[0] + xEnd, trans[1] + yEnd]);
            startPts[cir].push([trans[0] + rad * cos(theta), trans[1] + rad * sin(theta)]);
        }
        pop();
    }

    //line connections
    numLines = startPts[0].length
    stroke("white");
    for (l = 0; l < numLines - 1; l++) {
        h = l * 2;
        stroke([h, 100, 100])
        connect('SE', 0, 1, l);
        connect('SE', 1, 2, l);
        connect('SE', 2, 3, l);
        connect('SE', 3, 0, l, lineoffset = 1);
    }

    connect('SE', 0, 1, 19, 0);
    connect('SE', 1, 2, 19, 0);
    connect('SE', 2, 3, 19, 0);


    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
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
