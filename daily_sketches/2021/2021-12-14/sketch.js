// Daily Sketch for 2021-12-14
// Ram Narasimhan.

/*
Desc: Draw segments randomly, but keep growing them to adjacent segments, such that they cannot circle back on themselves.
*/

let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}

const params = {
    xStep: 30,
    yStep: 30,
    bgColor: [210, 50, 80],
    blkColor: [0, 0, 0],
    moves: 1000
}

let chosen;
let rot = 0;
let shapeRings;


function setup() {

    createCanvas(960, 960);
    colorMode(HSB);
    background(params.blkColor);
    print(params.bgColor)
    palette2 = random(HSBpalList)
    palette = random(HSBpalList)
    palette = replicate(palette, 100)
    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(params.blkColor);


    grid = new Grid(params.xStep, params.yStep, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin, createSegs = true);
    for (const [index, s] of grid.segments.entries()) {
        attachNeighboringSegments(s, grid)
        s.seq = index;
        s.free = 1;
    }

    numSeeds = 1;
    segLen = grid.segments.length;
    stepSize = int(segLen / numSeeds)
    for (it = 0; it < numSeeds; it++) {
        rn = int(random(segLen))
        //rn = it * stepSize
        colr = random(palette2)
        currSeg = grid.segments[rn];
        count = 0
        le = 1;

        while (currSeg) {
            count += 1
            newS = findAFreeNeighbor(currSeg);
            newSeg = newS.seg;
            if (newSeg) {
                print(newSeg.id)
                newSeg.display(colr, sw = (count % 10) + 4);
                newSeg.free = 0;
                newSeg.start.free = 0;
                newSeg.end.free = 0;
            } else {
                print('no FREE neigh for', currSeg.id, currSeg, newSeg)
            }
            currSeg = newSeg
        }
    }



    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}


function findAFreeNeighbor(currSeg) {

    if (currSeg.incoming) {
        for (attempt = 0; attempt < 10; attempt++) {
            nrand = random([0, 1, 2])
            neigh = currSeg.incoming[nrand]
            if (freeIncomingNeighbor(currSeg, neigh)) {
                print("InComing")

                return { seg: neigh }
            }
        }
    }
    if (currSeg.outgoing) {
        for (attempt = 0; attempt < 10; attempt++) {
            nrand = random([0, 1, 2])
            neigh = currSeg.outgoing[nrand]
            if (freeOutgoingNeighbor(currSeg, neigh)) {
                return { seg: neigh }
            }
        }
    }


    return { seg: null, le: 0 }
}

function freeIncomingNeighbor(currSeg, neigh) {
    if (neigh) {
        if (currSeg.incoming.includes(neigh)) {
            if (neigh.start.free) { return 1 }
        }
    }
    return 0
}

function freeOutgoingNeighbor(currSeg, neigh) {
    if (neigh) {
        if (currSeg.outgoing.includes(neigh)) {
            if (neigh.end.free) { return 1 }
        }
    }
    return 0
}

function displayAllSegments(grid, rot = 0, sw = 1) {
    //noFill();
    for (se of grid.segments) {
        strokeWeight(sw)
        stroke(se.color);
        let rmult = 1;
        let xMult = 1;
        if ((se.start) && (se.end)) {
            if (se.rotating != -1) {
                push();
                if (se.rotating < 2) {
                    translate(se.start.x, se.start.y) // anchor at start
                } else {
                    translate(se.end.x, se.end.y) // anchor at end
                }
                if ([0, 3].includes(se.rotating) && (se.orientation != 0)) {
                    rmult = -1
                }
                if ([1, 2].includes(se.rotating) && (!se.orientation)) { // vertical
                    rmult = -1
                }
                if ([2, 3].includes(se.rotating)) {
                    xMult = -1
                }
                //print(rot * mult)
                rotate(rot * rmult);
                if (se.orientation != 0) {
                    line(0, 0, grid.xStep * xMult, 0)
                } else {
                    line(0, 0, 0, grid.yStep * xMult)
                }
                stroke(255);
                strokeWeight(3);
                if (se.orientation != 0) { //horiz
                    circle(grid.xStep * xMult, 0, 10)
                } else { //vert
                    circle(0, grid.xStep * xMult, 10);
                }
                fill(200)
                circle(0, 0, 12)
                pop();

            } else { // regular segment , non rotating
                if ((se.shapeBorder) && (se.start) && (se.end)) {
                    push();
                    stroke(se.color);
                    strokeWeight(3);
                    line(se.start.x, se.start.y, se.end.x, se.end.y)
                    fill(se.color)
                    //circle(se.start.x, se.start.y, se.radius)
                    //circle(se.end.x, se.end.y, 10)
                    pop();
                }
            }
        }
    }
}


function prep_diagonal_segments(row, col) {
    gpt = grid.getGPt(col, row);
    if (row % 2) {
        gpt.sw = random([3]);
    } else {
        gpt.sw = random([4]);
    }
    gpt.pal = random(palette2);
    gpt._dir = random(4);
}

function draw_diagonal_segments(row, col) {

    gpt = grid.getGPt(col, row);

    xStep = grid.xStep;
    yStep = grid.yStep;
    x = gpt.x;
    y = gpt.y;

    strokeWeight(gpt.sw)
    stroke(gpt.pal);
    if (gpt._dir < 1) {
        line(x, y, x + xStep, y + yStep); // \
        grid.getGPt(col + 1, row + 1).shapeBorder = 1;
    }
    else if (gpt._dir < 2) {
        line(x, y + yStep, x + xStep, y); // /
        //        grid.getGPt(col, row + 1).shapeBorder = 1;
        //        grid.getGPt(col + 1, row).shapeBorder = 1;
    }

}

function drawAllDiagonalSegments(grid) {
    for (var row = 0; row < grid.rows; row += 1) {
        for (var col = 0; col < grid.cols; col += 1) {
            draw_diagonal_segments(row, col);
        }
    }
}


