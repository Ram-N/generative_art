// Daily Sketch for 2021-11-27
// Ram Narasimhan.

/*
Keywords: Bezier, Flow Field

Desc: Contrast between two halves, leading to a grid meltdown
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


bidirection = 0.5
nscale = 0.008  //# scale of the noise
step_size = 10  //# how fast the particle moves
offset = 100  //# offset in the noise input to get a different x & y velocities

function setup() {

    createCanvas(960, 960);
    colorMode(HSB);
    background(params.blkColor);
    print(params.bgColor)
    palette2 = random(HSBpalList)
    palette = replicate(palette, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(params.blkColor);

    // divide canvas into two using a bezier
    angle = PI / 4;
    incr = TAU / 10 * 3;
    var cBez1 = [{ x: 0, y: height / 6 },
    { x: width * 0.2, y: width * 0.2 },
    { x: width * 0.4, y: width * 0.4 * sin(angle + incr) },
    { x: width, y: width }]
    var connectionPoints = findCBezPoints(cBez1);


    //shuffle numbers 1..N for all the Bezier points
    //We are going to create squares out of adjacent ones
    nums = Array.from(Array(connectionPoints.length).keys())
    print('pre', nums)
    shuffleArray(nums); //rn_utils.js
    print(nums)

    strokeWeight(4)
    colorArray = [];

    for (var p = 0; p < nums.length; p += 2) {
        colr = random(palette2)
        noFill();
        stroke(colr);
        print('nums', nums[p], nums[p + 1])
        pt1 = connectionPoints[nums[p]]
        pt2 = connectionPoints[nums[p + 1]]
        drawPartialSquares(pt1, pt2)
        colorArray[nums[p]] = colr
        colorArray[nums[p + 1]] = colr
    }

    //occlude using the bg color
    fill(params.blkColor)
    noStroke();
    beginShape();
    vertex(0, cnv.height + cnv.yMargin);
    for (bz of connectionPoints) {
        vertex(bz.x, bz.y)
    }
    vertex(cnv.width, cnv.height + cnv.yMargin);
    endShape();

    for (bz of connectionPoints) {
        strokeWeight(10)
        point(bz.x, bz.y)
    }

    //this is the bounding box for the flow field
    rtangle = new Rectangle(0, 0,
        cnv.width,
        cnv.height,
    )

    stroke(colr);
    strokeWeight(4)

    for (var pnum = 0; pnum < nums.length; pnum++) {
        bz = connectionPoints[pnum]
        colr = colorArray[pnum];
        stroke(colr)
        fp = new FlowPoint(bz.x, bz.y)
        for (i = 0; i < 2000; i++) {
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

            if (random() < 0.3) {
                dx = -(this.x / cnv.width) * step_size * 0.3;
                dy = (height - this.y) / cnv.height * step_size * 0.3;
            }

            let oldX = this.x;
            let oldY = this.y;
            // fp gets displaced slightly.Store its new location
            this.x += dx
            this.y += dy
            if (out_of_bounds(this, containing_rect)) {
                this.active = false;
            } else { //  # draw a tiny line from prev position to updated position
                line(oldX, oldY, this.x, this.y)
            }
        }

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
    print('hoping to make a sq between', pt1, pt2)
    S = max(Math.abs(pt1.x - pt2.x), Math.abs(pt2.y - pt1.y))
    if ((pt2.y < pt1.y) && (pt2.x > pt1.x)) {
        rect(pt1.x, pt2.y, S, S)
    }
    if ((pt2.y < pt1.y) && (pt2.x < pt1.x)) {
        rect(pt2.x, pt2.y, S, S)
        print('origin case')
        print(pt2.x, pt2.y, S)
    }
    else {
        rect(pt1.x, pt2.y - S, S, S)
        print('x', pt1.x, 'y', pt2.y, 'rect Y', pt2.y - S, "Side", S)
    }

}


//Creates a list of points along the Bezier Curve
//Specified by b0..b3
function findCBezPoints(b) {
    var numSlices = 49;
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


