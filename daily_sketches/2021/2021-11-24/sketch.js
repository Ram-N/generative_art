// Daily Sketch for 2021-11-24
// Ram Narasimhan.

/*
Desc: 3x3 Backgrounds inside panel boxes
Neon Circloids 
Satellites of satellites
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


const BgParams = {
    size: "medium",
    rows: 10,
    columns: 10,
    color: "red",
    sw: 3

}

bidirection = 0.5
nscale = 0.008  //# scale of the noise
step_size = 20  //# how fast the particles move
offset = 100  //# offset in the noise input to get a different x & y velocities

function setup() {

    createCanvas(960, 960);
    colorMode(HSB);
    background(params.blkColor);
    print(params.bgColor)
    palette2 = HrainbowDash; //colors.js
    //palette2 = Hcappuccino; //colors.js
    palette2 = random(HSBpalList)
    palette = replicate(palette, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(params.blkColor);

    angle = PI / 4;
    incr = TAU / 10 * int(random(1, 10))
    var cBez1 = [{ x: 0, y: 1.5 * height / 2 },
    { x: width * 0.2 * cos(angle - incr), y: width * 0.2 * sin(angle - incr) },
    { x: width * 0.4 * cos(angle + incr), y: width * random(0.4, 0.7) * sin(angle + incr) },
    { x: width, y: width * sin(angle) }]
    var connectionPoints = findCBezPoints(cBez1);

    colr = random(palette2)
    for (bz of connectionPoints) {
        stroke(colr);
        strokeWeight(4)
        point(bz.x, bz.y)
    }


    nums = Array.from(Array(connectionPoints.length).keys())
    shuffle(nums); //rn_utils.js

    for (var p = 0; p < nums.length; p += 2) {
        noFill();
        pt1 = connectionPoints[p]
        pt2 = connectionPoints[p + 1]
        drawPartialSquares(pt1, pt2)
    }

    //occlude
    fill(params.blkColor)
    noStroke();
    beginShape();
    vertex(0, cnv.height);
    for (bz of connectionPoints) {
        vertex(bz.x, bz.y)
    }
    vertex(cnv.width, cnv.height);
    endShape();

    rtangle = new Rectangle(0, 0,
        cnv.width,
        cnv.height,
    )

    stroke(colr);
    strokeWeight(4)

    for (bz of connectionPoints) {
        fp = new FlowPoint(bz.x, bz.y)
        for (i = 0; i < 1000; i++) {
            fp.update(rtangle)
        }

    }




    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}



class FlowPoint { // A flow point
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.active = true;
    }

    update(containing_rect) { // update its location
        if (this.active) {
            let x_perturb = noise(nscale * this.x, nscale * this.y) - bidirection
            let y_perturb = noise(offset + nscale * this.x, offset + nscale * this.y) - bidirection
            let dx = step_size * x_perturb
            let dy = step_size * y_perturb

            let oldX = this.x;
            let oldY = this.y;
            // fp gets displaced slightly.Store its new location
            this.x += dx
            this.y += dy
            if (out_of_bounds(this, containing_rect)) {
                this.active = false;
            } else { //  # draw a tiny line from prev position to updated position
                strokeWeight(3)
                //print(x, y, this.x, this.y)
                line(oldX, oldY, this.x, this.y)
            }
        }

    }

    display(colr, sw = 1) {
        strokeWeight(sw)
        if (colr) {
            stroke(colr);
            fill(colr);
        }
        circle(this.x, this.y, 10)
    }

}


function isPtInsideRect(pt, rect) {
    if (pt.x < rect.minX) { return 0 }
    if (pt.x > rect.maxX) { return 0 }
    if (pt.y < rect.minY) { return 0 }
    if (pt.y > rect.maxY) { return 0 }
    return 1
}


function out_of_bounds(fp, containing_rect) {

    //check if fp is inside containing rect, but OUTSIDE the smaller rect

    if (isPtInsideRect(fp, containing_rect)) {
        return 0 //fine
    }
    return 1 //OoB
}



//Draw partial Squares based on 2 points...
function drawPartialSquares(pt1, pt2) {
    S = max(random(100, 500), Math.abs(pt1.x - pt2.x), Math.abs(pt2.y - pt1.y))
    rect(pt1.x, pt2.y - S, S, S)
}


//Creates a list of points along the Bezier Curve
//Specified by b0..b3
function findCBezPoints(b) {
    var numSlices = 75;
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


