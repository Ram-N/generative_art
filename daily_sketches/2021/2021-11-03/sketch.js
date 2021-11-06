// Daily Sketch for 2021-11-03
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

    //noFill();
    strokeWeight(2);

    push()
    translate(width / 2, height / 2)
    angle = 0;
    r = width * 0.6;
    incr = TAU / 12
    for (rep = 0; rep <= 12; rep++) {
        //rotate(TAU / 12)
        angle += incr
        var cBez1 = [{ x: 0, y: 0 },
        { x: width * 0.2 * cos(angle - incr), y: width * 0.2 * sin(angle - incr) },
        { x: width * 0.4 * cos(angle + incr), y: width * 0.4 * sin(angle + incr) },
        { x: width * 0.6 * cos(angle), y: width * 0.6 * sin(angle) }]
        var cPoints = findCBezPoints(cBez1);
        for (bz of cPoints) {
            colr = [20 * rep + jitter(30), 90 + jitter(5), 90]
            stroke(colr);
            rad = noise(bz.x * 0.01, bz.y * 0.01)
            circle(bz.x, bz.y, 200 * rad)
        }

    }
    pop();


    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}

//Creates a list of points along the Bezier Curve
//Specified by b0..b3
function findCBezPoints(b) {
    var startPt = b[0];
    var controlPt1 = b[1];
    var controlPt2 = b[2];
    var endPt = b[3];
    var pts = [b[0]];
    var lastPt = b[0];
    var numSlices = 225;
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



