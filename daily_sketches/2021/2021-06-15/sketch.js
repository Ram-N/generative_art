// Daily Sketch for 2021-06-15
// Ram Narasimhan.

/*
    Subset GPt Circle (center, radius) - Added to rn_grid.js

palList = [rainbowDash, take5, cappuccino, purples, melons, 
    red_brown_orange, red_orange, greys]
    */


let palette = []
let grid;
const cnv = {
    xMargin: 50,
    yMargin: 50,
}

const params = {
    xStep: 100,
    yStep: 100,
    bgColor: "#0f0f0f", //black
}

const colorWheel = {
    'N': 0,
    'E': 1,
    'S': 2,
    'W': 3
}

function setup() {
    createCanvas(660, 660);
    background(params.bgColor);
    //background("#0F0F0F");
    draw_border(20); //rn_utils.js
    palette2 = cappuccino;
    palette2 = replicate(palette2, 100)
    palette = red_brown_orange; //colors.js
    palette = replicate(palette, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(random(palette));
    //rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);
    rect(0, 0, width, height);
    grid = new Grid(params.xStep, params.yStep, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin);

    edgePts = getEdgeGridPoints(grid);
    for (e of edgePts) {
        e.display()
    }

    // For a fixed center of a circle, do 3 iterations
    // In each iteration, reduce the radius and chance colors
    center = 2436
    cpt = grid.points[center]
    for (iter = 0; iter < 3; iter++) {
        radius = int(20 + iter * 8)
        circlePts = getCircleGPts(grid, grid.points[center], radius);

        clr = random(palette);
        //displayCircle(circlePts, clr)
        //circle(cpt.x, cpt.y, radius)
        print(cpt.col, cpt.row, 'rc')
        drawEdgeLinesWithAHole(circlePts, clr, iter);

    }
    draw_border(clr = 20, sw = 50); //rn_utils.js

}

function displayCircle(circlePts, clr) {
    fill(random(palette))
    for (c of circlePts) {
        c.display()
    }
}

function drawEdgeLinesWithAHole(circlePts, clr, iter) {
    // for each edge point, connect to a non-same wall (other)
    // if the line doesn't intersect circle...
    for (l = 0; l < 3 - iter; l++) {
        for (const [index, e] of edgePts.entries()) {
            strokeWeight(1)
            stroke(clr)
            pt1 = getAnotherPoint(e, "other")
            if (!lineIntersectsCircle(e, pt1, circlePts)) {
                line(e.x, e.y, pt1.x, pt1.y)
            }
        }
    }

    for (l = 0; l < 200 - 50 * iter; l++) {
        e = random(edgePts)
        pt1 = getAnotherPoint(e, "other")
        if (!lineIntersectsCircle(e, pt1, circlePts)) {
            line(e.x, e.y, pt1.x, pt1.y)
        }

    }

}


/* Return 1 if Line between p1p2 intersects a given circle
    0 otherwise
    based on dist of line between p1-p2 to circle 
*/
function lineIntersectsCircle(p1, p2, circlePts) {
    for (c of circlePts) {
        d = ptDistanceToLine(c.col, c.row, p1.col, p1.row, p2.col, p2.row)
        if (d < 1) {
            return 1 // line intersects
        }
    }
    return 0 //does not intersect
}


/*
    @params: direction can be ['other', 'opposite', 'adjacent', 'right']
*/
function getAnotherPoint(pt0, direction) {

    if (direction == 'other') {//get a random point from a different wall
        done = 0
        while (!done) {
            pt1 = random(edgePts)
            if (pt1.wall != pt0.wall) {
                done = 1
            }
        }
        return pt1
    }
}

function renderEdgeLine(edgePts) {
    pt0 = random(edgePts)
    pt1 = random(edgePts)
    line(pt0.x, pt0.y, pt1.x, pt1.y)

}

