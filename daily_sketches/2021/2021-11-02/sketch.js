// Daily Sketch for 2021-11-02
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
    strokeWeight(2);
    for (rep = 0; rep <= 20; rep++) {
        var cBez1 = [{ x: rep * 100, y: 0 }, { x: 20 * rep, y: -40 }, { x: 40 * rep, y: height * 0.5 }, { x: 80 * rep, y: height }]
        var cPoints = findCBezPoints(cBez1);
        for (bz of cPoints) {
            colr = [12 * rep + jitter(30), 90 + jitter(5), 90]
            stroke(colr);
            rad = noise(bz.x * 0.01, bz.y * 0.01)
            circle(bz.x, bz.y, 50 * rad)
        }
    }

    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}

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



