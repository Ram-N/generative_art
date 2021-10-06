// Daily Sketch for 2021-10-05
// Ram Narasimhan.

/*
Keywords: Single Line, 45-degree-angles-only

Desc: Draw a single line that twists and turns in 45 degree angles. It forms clusters and then jumps to a different area

Ideas to Try:
Steer away from outOfBounds moves

Transmission jump should be longer...
Integral distances...
Strokewidth (cluster vs Transmission line)
Bounce off of edges
Zonal clusters, one color per cluster...(go to all the zones for uniform coverage)
*/


let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}

const params = {
    xStep: 25,
    yStep: 25,
    bgColor: "#d3d3d3",
    blkColor: "#0f0f0f",
}



function setup() {
    createCanvas(960, 960);
    background(params.bgColor);
    palette = cappuccino; //colors.js
    palette = rainbowDash; //colors.js
    palette = replicate(palette, 100)
    palette2 = random(palList)
    palette2 = replicate(palette2, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(params.blkColor);
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);

    //grid = new Grid(params.xStep, params.yStep, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin);

    numJumps = 150;
    numClusters = 10;
    pt = new Point(int(width / 2), int(height / 20));
    pt.dir = 0; //directions go from 0..7
    fill(255)
    circle(pt.x, pt.y, 10)
    for (cl = 0; cl < numClusters; cl++) {
        strokeWeight(random([3, 3]))
        palette2 = random(palList)
        pt = makeCluster(pt, numJumps, minDist = 25, maxDist = 50)
        pt = makeCluster(pt, 1, minDist = 200, maxDist = 300)
    }
    fill(255)
    circle(pt.x, pt.y, 10)
    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js

}


function makeCluster(pt, numJumps, minDist, maxDist) {
    stroke(random(palette2)) //pick a color from the palette
    for (i = 0; i < numJumps; i++) {
        pt = move45(pt, minDist, maxDist); //move and update
    }
    return (pt)
}


/*
take a point
move to a new position (45 degrees)
draw the line
*/
function move45(pt, minDist, maxDist) {

    d = random(minDist, maxDist)
    newDir = int(random(8))
    angle = newDir * PI / 4;
    newPt = pt
    if ((newDir % 4) != (pt.dir % 4)) {
        newX = pt.x + d * cos(angle)
        newY = pt.y + d * sin(angle)
        newPt = new Point(newX, newY)
        newPt.dir = newDir;
        if (!outOfBounds(newPt)) {
            line(pt.x, pt.y, newX, newY)
            return (newPt)
        }
    }
    return (pt) // return the original
}

function outOfBounds(newPt) {
    if ((newPt.x > cnv.xMargin + cnv.width) || (newPt.x < cnv.xMargin)) {
        return (1)
    }
    if ((newPt.y > cnv.yMargin + cnv.height) || (newPt.y < cnv.yMargin)) {
        return (1)
    }
    return (0)// not ooB
}

