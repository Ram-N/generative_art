// Daily Sketch for 2021-05-20
// Ram Narasimhan.
/*

Make an animated revolving segments piece.

0. Come up with Names for each segment...
1. Chain reaction test.. horiz, rotate 0, vert, rotate 0. 

Keywords: Grid points, Lego shapes, segments

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
    bgColor: "#0f0f0f", //black
}

let chosen;
let rot = 0;
function setup() {
    createCanvas(960, 960);
    background(params.bgColor);
    //background("#0F0F0F");
    fill("#0f0f0f");
    draw_border(20); //rn_utils.js
    palette = cappuccino; //colors.js
    palette = rainbowDash; //colors.js
    palette = replicate(palette, 100)
    palette2 = take5; //colors.js
    palette2 = replicate(palette2, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);
    grid = new Grid(params.xStep, params.yStep, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin);

    for (var row = 0; row < grid.rows; row += 1) {
        for (var col = 0; col < grid.cols; col += 1) {
            prep_diagonal_segments(row, col)
        }
    }


    for (s of grid.segments) {
        attachNeighboringSegments(s, grid)
        s.rotating = -1 //not rotating
        s.radius = 10;
        s.color = "orange"
    }

    // seg = grid.segments[41]
    // seg.display("yellow", sw = 10)
    // seg.rotating = 0
    // i = 0
    // for (n of seg.neighbors) {
    //     n.display(palette[i], (i + 1) * 2)
    //     i++
    // }
    // print(seg.neighbors)

    initializeActiveSegments(grid)
    print(grid.segments.length, 'num segs')
    chosen = random(palette)
}

const numFramesPer90 = 10;

function draw() {
    background(params.bgColor);

    drawAllDiagonalSegments(grid);

    displayAllSegments(grid, chosen, rot, sw = 6)
    if ((frameCount % numFramesPer90) == 1) {
        print('update', frameCount)
        updateSegmentRotations(grid)
        rot = 0; // reset!!
        //noLoop();
    }
    draw_border(clr = 150, sw = 20); //rn_utils.js
    rot += PI / 2 / numFramesPer90;
    if (frameCount == 560) {
        noLoop();
    }
    //    print(frameCount, 'S70', grid.segments[70].active, grid.segments[70].id, grid.segments[70].rotating)
    //    print(frameCount, 'N28', grid.segments[28].active, grid.segments[28].id, grid.segments[28].rotating)
}


function displayAllSegments(grid, colr = 255, rot = 0, sw = 1) {
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
                push()
                if ((se.active) && (se.start) && (se.end)) {
                    line(se.start.x, se.start.y, se.end.x, se.end.y)
                    stroke(255);
                    strokeWeight(3);
                    circle(se.start.x, se.start.y, se.radius)
                    circle(se.end.x, se.end.y, 10)
                    pop()
                }
            }
        }
    }
}

function displayCircles(grid) {
    stroke(255);
    strokeWeight(3);
    for (seg of grid.segments) {
        if (seg.active) {
            for (g of [seg.start, seg.end]) {
                // if ((g.col) && (g.row)) {
                //     if ((g.col != grid.cols) && (g.row != grid.rows)) {
                circle(g.x, g.y, 10)
                //     }
                // }
            }
        }
    }
}

arrangements = [[0, 1, 2, 3], [0, 1, 3, 2],
[0, 2, 1, 3], [0, 2, 3, 1], [0, 3, 1, 2], [0, 3, 2, 1], [1, 0, 2, 3], [1, 0, 3, 2],
[1, 2, 0, 3], [1, 2, 3, 0],
[1, 3, 0, 2], [1, 3, 2, 0],
[2, 0, 1, 3], [2, 0, 3, 1], [2, 1, 0, 3], [2, 1, 3, 0], [2, 3, 0, 1], [2, 3, 1, 0],
[3, 0, 1, 2], [3, 0, 2, 1], [3, 1, 0, 2], [3, 1, 2, 0], [3, 2, 0, 1], [3, 2, 1, 0]]

function updateSegmentRotations(grid) {
    print('fc', frameCount)
    attempts = 0;
    nUpdates = 0;

    // Stop the rotating segments, activate that particular neighbor
    for (seg of grid.segments) {
        if (seg.rotating != -1) {
            n = seg.rotating
            nseg = seg.neighbors[n] // nseg is the one that seg is rotating towards...
            seg.active = 0;
            nseg.active = 1
            seg.rotating = -1
            // print('In Update')
            // print('stopping', seg.id, seg.active)
            // print('Activating', nseg.id)
        }
    } // all rotations stopped

    while ((nUpdates < 20) && (attempts < 100)) {
        attempts += 1
        rnd = int(random(grid.segments.length))
        se = grid.segments[rnd]
        if (se.active) {
            // print(rnd, 'random', se.id)
            // print('in stage 2 active', se.id)
            seq = random(arrangements) // one permutation
            //seq = [1, 0, 2, 3]
            for (a of seq) { // deciding the next direction of travel...
                nseg = se.neighbors[a]
                //find an inactive neighbor
                if (nseg && (!nseg.active)) {
                    // print('Current', se.neighbors, "A", a)
                    // print('From', se.id, 'to Neighbor', nseg.id, 'will rotate next')

                    se.active = 1
                    se.rotating = a // neighbor that this seg is rotating towards...
                    // print(se.rotating, "seg rotating at..and active turned off.")
                    nUpdates += 1
                    attempts = 0
                    break;
                    //print('done')
                }
            }
        }
    }

    //print('attempts', attempts)
}

function initializeActiveSegments(grid) {
    //rnd = int(random(grid.segments.length))
    for (se of grid.segments) {
        if (random() < 0.1) {
            if (se.start) {
                se.start.active = 1

                if (se.end) {
                    se.end.active = 1
                }
                if ((se.start) && (se.end)) {
                    se.active = 1
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
        grid.getGPt(col + 1, row + 1).active = 1;
    }
    else if (gpt._dir < 2) {
        line(x, y + yStep, x + xStep, y); // /
        //        grid.getGPt(col, row + 1).active = 1;
        //        grid.getGPt(col + 1, row).active = 1;
    }

}

function drawAllDiagonalSegments(grid) {
    for (var row = 0; row < grid.rows; row += 1) {
        for (var col = 0; col < grid.cols; col += 1) {
            draw_diagonal_segments(row, col);
        }
    }
}
