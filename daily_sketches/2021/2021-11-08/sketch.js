// Daily Sketch for 2021-11-08
// Ram Narasimhan.

/*
Keywords: Echoes, single line

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

    xleft = width / 4;
    yleft = 3 * width / 4;
    xRight = 3 * width / 4;
    yRight = width / 4;


    startPts = [[], [], [], []];
    endPts = [[], [], [], []];
    eT = [-PI / 2, PI, PI / 2, 0]
    sT = [PI, PI / 2, TAU, 1.5 * PI];
    cir = -1;

    strokeWeight(2);

    for (trans of [[xleft, yRight], [xleft, yleft], [xRight, yleft], [xRight, yRight],]) {
        cir += 1

        push()
        //translate(width / 2, height / 2)
        translate(trans[0], trans[1])
        angle = 0;
        r = width * 0.6;
        incr = TAU / 12
        // for (rep = 0; rep < 1; rep++) {
        angle += incr
        var cBez1 = [{ x: 0, y: 0 },
        { x: width * 0.2 * cos(angle - incr), y: width * 0.2 * sin(angle - incr) },
        { x: width * 0.4 * cos(angle + incr), y: width * 0.4 * sin(angle + incr) },
        { x: width * 0.6 * cos(angle), y: width * 0.6 * sin(angle) }]

        var connectionPoints = findCBezPoints(cBez1);
        for (bz of connectionPoints) {
            stroke("blue");
            strokeWeight(2)
            point(bz.x, bz.y);
        }
        strokeWeight(4)

        print(connectionPoints.length)
        //connectionPoints are ready. Start drawing circles...
        for (rep = 0; rep < 17; rep++) {
            conX = connectionPoints[rep].x
            conY = connectionPoints[rep].y
            rad = dist(0, 0, conX, conY)
            dia = 2 * rad;

            //calc the angle of the point of Bez to the center of the circle
            //theta = Math.atan2(conY - y, conX - x);
            theta = sT[cir]
            endTheta = eT[cir]
            if (theta < 0) { theta += TAU };
            stroke('white')
            arc(0, 0, dia, dia, theta, endTheta);
            // //convert the endpoint to cartesian
            xEnd = rad * cos(endTheta)
            yEnd = rad * sin(endTheta)
            point(xEnd, yEnd)
            endPts[cir].push([trans[0] + xEnd, trans[1] + yEnd]);
            startPts[cir].push([trans[0] + rad * cos(theta), trans[1] + rad * sin(theta)]);
        }
        pop();
    }
    strokeWeight(4)

    //line connections
    numLines = startPts[0].length
    stroke("white");
    for (l = 0; l < numLines - 1; l++) {
        connect('SE', 0, 1, l);
        connect('SE', 1, 2, l);
        connect('SE', 2, 3, l);
        connect('SE', 3, 0, l, lineoffset = 1);
    }

    connect('SE', 0, 1, 16, 0);
    connect('SE', 1, 2, 16, 0);
    connect('SE', 2, 3, 16, 0);


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


//Creates a list of points along the Bezier Curve
//Specified by b0..b3
function findCBezPoints(b) {
    var numSlices = 40;
    var startPt = b[0];
    var controlPt1 = b[1];
    var controlPt2 = b[2];
    var endPt = b[3];
    var pts = [b[0]];
    var lastPt = b[0];
    for (var t = 0; t <= numSlices; t++) {
        // calc another point along the curve
        var pt = getCubicBezierXYatPercent(startPt, controlPt1, controlPt2, endPt, t / numSlices);
        // add the pt if it's not already in the pts[] array
        var dx = pt.x - lastPt.x;
        var dy = pt.y - lastPt.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        var dInt = parseInt(d);
        if (dInt > 0 || t == numSlices) {
            lastPt = pt;
            pts.push(pt);
        }
    }
    return (pts);
}



