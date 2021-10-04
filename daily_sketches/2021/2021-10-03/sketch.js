// Daily Sketch for 2021-10-03
// Ram Narasimhan.

/*
Keywords: Single Line, 45-degree-angles-only

Desc: Draw a single line that twists and turns in 45 degree angles. It forms clusters and then jumps to a different area

Ideas:
Cluster colors, and then a new colors
Strokewidth (cluster vs Transmission line)
Bounce off of edges
Zonal clusters

functions needed:
outOfBounds() 
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

    //Custom Tiling
    // colSplit = Array(10).fill(1)
    // rowSplit = Array(10).fill(1)
    // pgrid = new PanelGrid(cnv, colSplit, rowSplit, margin = 0)
    // pgrid.renderPanelGrid(1);

    numJumps = 500
    numClusters = 40;
    pt = new Point(int(width / 2), int(height / 2));
    pt.angle = 0;
    for (cl = 0; cl < numClusters; cl++) {
        strokeWeight(random([1, 2]))
        palette2 = random(palList)
        pt = makeCluster(pt, numJumps)
    }
    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js

}


function makeCluster(pt, numJumps) {
    for (i = 0; i < numJumps; i++) {
        stroke(random(palette2))
        pt = move45(pt, 10, 20); //move and update
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
    angle = int(random(8)) * PI / 4;
    newPt = pt
    if (angle != pt.angle) {
        newX = pt.x + d * cos(angle)
        newY = pt.y + d * sin(angle)
        newPt = new Point(newX, newY)
        newPt.angle = angle;
        if (!outOfBounds(newPt)) {
            line(pt.x, pt.y, newX, newY)
        }
    }
    return (newPt)
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

