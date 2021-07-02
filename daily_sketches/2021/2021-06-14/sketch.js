// Daily Sketch for 2021-06-14
// Ram Narasimhan.

/*
1. Subset GPt Circle (center, radius) - Added to rn_grid.js

2. Check intersection with circle:
    if distance of line to any point in circle is < epsilon, 
        then intersecting, else not intersecting.
    Added to rn_geometry.js

3. Consider Border to Border lines.
    If not intersecting Circle, draw.
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

    center = int(random(grid.points.length))
    radius = int(random(grid.cols) / 2)
    circlePts = getCircleGPts(grid, grid.points[center], radius);

    // for (e of circlePts) {
    //     e.display()
    // }


    // for each edge point, connect to a non-same wall (other)
    // if the line doesn't intersect circle...
    for (l = 0; l < 3; l++) {
        for (const [index, e] of edgePts.entries()) {
            strokeWeight(1)
            stroke(palette[colorWheel[e.wall]])
            pt1 = getAnotherPoint(e, "other")
            if (!lineIntersectsCircle(e, pt1, circlePts)) {
                line(e.x, e.y, pt1.x, pt1.y)
            }
        }
    }

    for (l = 0; l < 1000; l++) {
        e = random(edgePts)
        pt1 = getAnotherPoint(e, "other")
        stroke(palette[colorWheel[e.wall]])
        if (!lineIntersectsCircle(e, pt1, circlePts)) {
            line(e.x, e.y, pt1.x, pt1.y)
        }

    }


    draw_border(clr = 20, sw = 50); //rn_utils.js

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
