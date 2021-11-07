// Daily Sketch for 2021-11-05
// Ram Narasimhan.

/*
Keywords: Bezier

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

    push()
    translate(width / 2, height / 2)
    angle = 0;
    r = width * 0.6;
    incr = TAU / 12
    for (rep = 0; rep < 1; rep++) {
        angle += 6 * incr
        var cBez1 = [{ x: 0, y: 0 },
        { x: width * 0.2 * cos(angle - incr), y: width * 0.2 * sin(angle - incr) },
        { x: width * 0.4 * cos(angle + incr), y: width * 0.4 * sin(angle + incr) },
        { x: width * 0.8 * cos(angle), y: width * 0.8 * sin(angle) }]
        var connectionPoints = findCBezPoints(cBez1);
        for (bz of connectionPoints) {
            stroke("black");
            strokeWeight(4)
            point(bz.x, bz.y)
        }

    }
    x = -20;
    y = 20;
    //connectionPoints are ready. Start drawing circles...
    point(x, y)
    gap = 1.5
    for (rep = 0; rep < connectionPoints.length - 1; rep++) {
        conX = connectionPoints[rep].x
        conY = connectionPoints[rep].y
        rad = dist(x, y, conX, conY)
        dia = 2 * rad;

        //calc the angle of the point of Bez to the center of the circle
        theta = Math.atan2(conY - y, conX - x);
        if (theta < 0) { theta += TAU };
        print(theta)
        stroke('white')
        offset = 0
        arc(x, y, dia, dia, theta + offset, 2 * PI);
        strokeWeight(4)
        //convert the endpoint to cartesian
        xEnd = x + rad * cos(TAU)
        yEnd = y + rad * sin(TAU)
        if (theta > gap) {
            arc(x, y, dia, dia, 0, theta + offset - gap);
            xEnd = x + rad * cos(theta + offset - gap)
            yEnd = y + rad * sin(theta - gap)
        }
        stroke('white')
        line(xEnd, yEnd, connectionPoints[rep + 1].x, connectionPoints[rep + 1].y)

    }

    pop();
    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}

//Creates a list of points along the Bezier Curve
//Specified by b0..b3
function findCBezPoints(b) {
    var numSlices = 50;
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



