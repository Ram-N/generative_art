// Daily Sketch for 2021-10-07
// Ram Narasimhan.

/*
Keywords: Single Line, 45-degree-angles-only

Desc: Draw a single line that twists and turns in 45 degree angles. It forms clusters and then jumps to a different area

Ideas to Try:
Implement Pt to Point jumps.. to direct it to jump somewhere
Zonal clusters, one color per cluster...(go to all the zones for uniform coverage)

Integral distances...Done
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
    palette = green_yellow; //colors.js
    //palette = rainbowDash; //colors.js
    palette = replicate(palette, 100)
    palette2 = random(palList)
    palette2 = red_orange;
    palette2 = replicate(palette2, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(params.blkColor);
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);


    tg = new TileGrid(10, 10, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin)
    //tg.renderTileGrid(200)
    //tg.print();

    for (t of tg.tiles) {
        t.score = 1
    }
    drawMetro(palette2)
    drawMetro(palette)
    drawMetro(purples)

    fill(255)
    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js

}


// draws 45-degree metro maps with different colored palettes
// A "cluster" is a series of short jumps
// Sometimes, jump a longer distance and form a cluster there
function drawMetro(pal) {

    numClusters = 80;
    clusterSize = 10; //points per cluster
    crowdThreshold = 4;

    pt = new Point(int(width / 2), int(height / 20));
    pt.dir = 0; //directions go from 0..7
    fill(255)
    for (cl = 0; cl < numClusters; cl++) {
        endCap(pt);
        pt = makeCluster(pt, clusterSize, minDist = 5, maxDist = 8, pal)
        endCap(pt)
        pt = makeCluster(pt, 1, minDist = 40, maxDist = 60, pal)
    }
    endCap(pt);

}


function endCap(pt) {
    push();
    fill(255)
    noStroke();
    circle(pt.x, pt.y, 10)
    pop();
}

function makeCluster(pt, clusterSize, minDist, maxDist, pal) {
    stroke(random(pal)) //pick a color from the palette
    for (i = 0; i < clusterSize; i++) {
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

    stepSize = 10
    d = int(random(minDist, maxDist)) * stepSize;
    newDir = int(random(8))
    angle = newDir * PI / 4;
    newPt = pt
    if ((newDir % 4) != (pt.dir % 4)) {
        newX = pt.x + d * cos(angle)
        newY = pt.y + d * sin(angle)
        newPt = new Point(newX, newY)
        newPt.dir = newDir;
        if (isNewPointValid(newPt)) {
            strokeWeight(random([18]));
            line(pt.x, pt.y, newX, newY);
            push();
            stroke(params.blkColor);
            strokeWeight(random([3]));
            line(pt.x, pt.y, newX, newY);
            pop();
            return (newPt)
        }
    }
    return (pt) // return the original
}

function isNewPointValid(newPt) {
    if (outOfBounds(newPt)) {
        return (0)
    }
    //Check for Tile Level Congestion
    //Don't want any tile to get overcrowded above a threshold
    tile = tg.getTile(newPt.x, newPt.y)
    if (tile.score < crowdThreshold) {
        tile.score += 1;
        return (1)
    }
    return (0)
}

//check if NewPoint is leaving the canvas
function outOfBounds(newPt) {
    if ((newPt.x > cnv.xMargin + cnv.width) || (newPt.x < cnv.xMargin)) {
        return (1)
    }
    if ((newPt.y > cnv.yMargin + cnv.height) || (newPt.y < cnv.yMargin)) {
        return (1)
    }
    return (0)// not ooB
}

