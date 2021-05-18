// Daily Sketch for 2021-05-17
// Ram Narasimhan.
/*

4. Put circles only around Anchor points...
5. If a thick semgment has a "free" neighboring point, it swings there.
6. 10 swings per draw frame

## 7. Each Seg shd have 6 Neighbors, not 4 as currently implemented.

Keywords: Grid points, Lego shapes, segments


*/


let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}

const params = {
    xStep: 35,
    yStep: 35,
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

    for (s of grid.segments) {
        attachNeighboringSegments(s, grid)
        s.rotating = -1 //not rotating
        s.radius = 1 + int(random(10))
    }

    initializeActiveSegments(grid)
    print(grid.segments.length, 'num segs')
    chosen = random(palette)
}

const numFramesPer90 = 20;
function draw() {
    background(params.bgColor);

    //drawAllDiagonalSegments(grid);

    displayAllSegments(grid, chosen, rot, sw = 6)
    if ((frameCount % numFramesPer90) == 0) {
        updateActiveSegment(grid)
    }
    draw_border(clr = 20, sw = 20); //rn_utils.js
    rot += PI / 2 / numFramesPer90;
}


function displayAllSegments(grid, colr = 255, rot = 0, sw = 1) {
    //noFill();
    for (se of grid.segments) {
        strokeWeight(sw)
        stroke(colr);
        let mult = 1;
        let xMult = 1;
        if ((se.active) && (se.start) && (se.end)) {
            if (se.rotating != -1) {
                push();
                if (se.rotating < 2) {
                    translate(se.start.x, se.start.y) // anchor at start
                } else {
                    translate(se.end.x, se.end.y) // anchor at end
                }
                if ([0, 3].includes(se.rotating)) {
                    mult = -1
                }
                if ([2, 3].includes(se.rotating)) {
                    xMult = -1
                }
                //print(rot * mult)
                rotate(rot * mult);
                if (se.orientation != 0) {
                    line(0, 0, grid.xStep * xMult, 0)
                } else {
                    line(0, 0, 0, grid.yStep * xMult)
                }
                stroke(255);
                strokeWeight(3);
                circle(0, 0, 10)
                if (se.orientation != 0) { //horiz
                    circle(grid.xStep * xMult, 0, 10)
                } else { //vert
                    circle(0, grid.xStep * xMult, 10);
                }
                pop();

            } else { // regular segment , non rotating
                push()
                if ((se.start) && (se.end)) {
                    line(se.start.x, se.start.y, se.end.x, se.end.y)
                }
                stroke(255);
                strokeWeight(3);
                circle(se.start.x, se.start.y, 10 * se.radius)
                circle(se.end.x, se.end.y, 10)
                pop()
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


function drawAllDiagonalSegments(grid) {
    for (var row = 0; row < grid.rows; row += 1) {
        for (var col = 0; col < grid.cols; col += 1) {
            draw_diagonal_segments(row, col);
        }
    }
}

arrangements = [[0, 1, 2, 3], [0, 1, 3, 2],
[0, 2, 1, 3], [0, 2, 3, 1], [0, 3, 1, 2], [0, 3, 2, 1], [1, 0, 2, 3], [1, 0, 3, 2],
[1, 2, 0, 3], [1, 2, 3, 0],
[1, 3, 0, 2], [1, 3, 2, 0],
[2, 0, 1, 3], [2, 0, 3, 1], [2, 1, 0, 3], [2, 1, 3, 0], [2, 3, 0, 1], [2, 3, 1, 0],
[3, 0, 1, 2], [3, 0, 2, 1], [3, 1, 0, 2], [3, 1, 2, 0], [3, 2, 0, 1], [3, 2, 1, 0]]

function updateActiveSegment(grid) {
    attempts = 0;
    nUpdates = 0;
    for (seg of grid.segments) {
        seg.rotating = -1
    }
    while ((nUpdates < 20) && attempts < 100) {
        attempts += 1
        rnd = int(random(grid.segments.length))
        se = grid.segments[rnd]
        if (se.active) {
            seq = random(arrangements) // one permutation
            for (a of seq) {
                nseg = se.neighbors[a]
                //find an inactive neighbor
                if (nseg && (!nseg.active)) {
                    nseg.active = 1
                    se.active = 0
                    se.rotating = a // neighbor that this seg is rotating towards...
                    nUpdates += 1
                    attempts = 0
                    //print('done')
                }
            }
        }
    }

    //print('attempts', attempts)
}

function initializeActiveSegments(grid) {
    for (se of grid.segments) {
        if (random() < 0.1) {
            if (se.start) {
                se.start.active = 1
            }
            if (se.end) {
                se.end.active = 1
            }
            if ((se.start) && (se.end)) {
                se.active = 1
            }
        }
    }
}



function draw_diagonal_segments(row, col) {
    gpt = grid.getGPt(col, row);
    xStep = grid.xStep;
    yStep = grid.yStep;
    x = gpt.x;
    y = gpt.y;
    if (row % 2) {
        strokeWeight(random([3]));
    } else {
        strokeWeight(random([4]));
    }
    stroke(random(palette2));

    let _dir = random(4)
    if (_dir < 1) {
        line(x, y, x + xStep, y + yStep); // \
        gpt.active = 1
        grid.getGPt(col + 1, row + 1).active = 1;
    }
    else if (_dir < 2) {
        line(x, y + yStep, x + xStep, y); // /
        grid.getGPt(col, row + 1).active = 1;
        grid.getGPt(col + 1, row).active = 1;
    }

}
