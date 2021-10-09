// Daily Sketch for 2021-10-08
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


    tg = new TileGrid(20, 20, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin)
    //tg.renderTileGrid(200)
    //tg.print();

    for (t of tg.tiles) {
        t.score = 0
    }

    numClusters = 30;
    clusterSize = 30; //points per cluster
    crowdThreshold = 1;
    numBlockers = 10
    makeCircles(numBlockers, green_yellow);
    makeCircles(numBlockers, red_orange);
    makeCircles(numBlockers, purples);
    drawMetro(palette2)
    drawMetro(palette)
    drawMetro(purples)

    fill(255)
    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js

    // for (t of tg.tiles) {
    //     print(t.score, t.row, t.col, t.score)
    // }

}

function makeCircles(numBlockers, pal) {
    fill(random(pal)) //pick a color from the palette
    for (i = 0; i < numBlockers; i++) {
        pt = new Point(int(random(cnv.xMargin, cnv.xMargin + cnv.width - 1)),
            int(random(cnv.yMargin, cnv.yMargin + cnv.height - 1)));
        tile = tg.getTile(pt.x, pt.y)
        if (tile.score <= crowdThreshold) {
            tile.score += 1;
            circle(tile.cx, tile.cy, tg.width)
        }
    }
}

// draws 45-degree metro maps with different colored palettes
// A "cluster" is a series of short jumps
// Sometimes, jump a longer distance and form a cluster there
function drawMetro(pal) {

    for (cl = 0; cl < numClusters; cl++) {
        pt = new Point(int(random(cnv.xMargin, cnv.xMargin + cnv.width - 1)),
            int(random(cnv.yMargin, cnv.yMargin + cnv.height - 1)));
        pt.dir = 0; //directions go from 0..7
        print('ptA', pt.x, pt.y)
        if (isPointValid(pt)) {
            pt = makeCluster(pt, clusterSize, minDist = 5, maxDist = 5, pal)
        }
        //pt = makeCluster(pt, 1, minDist = 20, maxDist = 30, pal)
    }
    //endCap(pt);

}


function endCap(pt) {
    push();
    stroke(255);
    strokeWeight(1);
    //noStroke();
    circle(pt.x, pt.y, 10)
    pop();
}



function makeCluster(pt, clusterSize, minDist, maxDist, pal) {
    colr = random(pal)
    stroke(colr); //pick a color from the palette
    fill(colr);
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

    stepSize = 20
    d = int(random(minDist, maxDist)) * stepSize;
    newDir = int(random(8))
    angle = newDir * PI / 4;
    newPt = pt
    if ((newDir % 4) != (pt.dir % 4)) {
        newX = pt.x + d * cos(angle)
        newY = pt.y + d * sin(angle)
        newPt = new Point(newX, newY)
        newPt.dir = newDir;
        print(newX, newY, 'new')
        if (isPointValid(newPt)) {
            strokeWeight(random([9]));
            line(pt.x, pt.y, newX, newY);

            push();
            stroke(params.blkColor);
            strokeWeight(random([2]));
            line(pt.x, pt.y, newX, newY);
            endCap(pt)
            pop();
            return (newPt)
        }
    }
    return (pt) // return the original
}

function isPointValid(newPt) {
    if (outOfBounds(newPt)) {
        return (0)
    }
    //Check for Tile Level Congestion
    //Don't want any tile to get overcrowded above a threshold
    tile = tg.getTile(newPt.x, newPt.y)
    //print(tile, newPt)
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

