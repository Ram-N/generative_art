// Daily Sketch for 2021-05-22
// Ram Narasimhan.
/*

display one segment... at the lower border 

Keywords: Grid points, Lego shapes, segments

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

    // for (var row = 0; row < grid.rows; row += 1) {
    //     for (var col = 0; col < grid.cols; col += 1) {
    //         prep_diagonal_segments(row, col)
    //     }
    // }


    for (const [index, s] of grid.segments.entries()) {
        attachNeighboringSegments(s, grid)
        s.rotating = -1 //not rotating
        s.radius = 10;
        s.color = 250
        s.seq = index;
    }

    // activateSeg(5, grid.rows, 1, 0)

    initializeSegments(grid)
    print(grid.segments.length, 'num segs')
    chosen = random(palette)
    displayAllSegments(grid, chosen, rot, sw = 6)
}

const numFramesPer90 = 10;

function draw() {
    background(params.bgColor);
    // drawAllDiagonalSegments(grid);

    displayAllSegments(grid, chosen, rot, sw = 6)
    if ((frameCount % numFramesPer90) == 1) {
        //print('update', frameCount)
        grabTerritory(grid)
        //updateSegmentRotations(grid)
        rot = 0; // reset!!
        //noLoop();
    }
    draw_border(clr = 150, sw = 20); //rn_utils.js
    rot += PI / 2 / numFramesPer90;
    if (frameCount > 3200) {
        noLoop();
    }
}


function grabTerritory(grid) {
    /* Pick an active rnd seg.
    Check its 4 neighbors... if horiz..."front 2" or "back 2" 
    if Vert if "east 2" or "west 2" nSegs are free... can enchroch.
    Activate 3 nsegs..., deactivate 1...plus3Minus1
    */
    nUpdates = 0;
    attempts = 0;
    while ((nUpdates < 2) && (attempts < 100)) {
        attempts += 1
        rnd = int(random(grid.segments.length))
        //rnd = 111
        seg = grid.segments[rnd]
        if (seg.active) {
            success = encroach(seg)
            //print('success', success)
            if (success) {
                nUpdates++
            }
        }
    }
}

function plus3Minus1(seg, nA, nB, bridge, grid) {
    /*  TBD: randomize up versus down...
        have to code for vertical seg as well 
    */
    nA.active = 1
    nA.start.active = 1
    nA.end.active = 1
    nB.active = 1
    nB.start.active = 1
    nB.end.active = 1
    bridge.active = 1
    seg.active = 0
    //rect(seg.start.x, seg.start.y, grid.xStep, grid.yStep)
}

function encroach(seg) {

    // if (seg.orientation != 0) { // horiz
    //front means 0 & 2
    if (random() < 0.5) {
        if ((seg.n00) && (seg.n10)) {
            //grid.displayGPt(seg.n00.end, 'white')
            if ((!seg.n00.start.active) && (!seg.n10.start.active)) {
                //get the upper bridge seg...
                bridge = grid.getSegment(seg.n00.start, seg.n10.start)
                if (bridge && (!bridge.active)) {
                    plus3Minus1(seg, seg.n00, seg.n10, bridge, grid);
                    return 1
                }
            }
        }
    } else {  // random
        if ((seg.n01) && (seg.n11)) { // down
            if ((!seg.n01.end.active) && (!seg.n11.end.active)) {
                // bridge that is step down. below orig seg...
                bridge = grid.getSegment(seg.n01.end, seg.n11.end)
                if (bridge && (!bridge.active)) {
                    plus3Minus1(seg, seg.n01, seg.n11, bridge, grid);
                    return 1
                }
            }
        }
    }

    return 0
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
                if ((se.active) && (se.start) && (se.end)) {
                    push()
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


function activateSegmentRect(startCol, startRow, endCol, endRow) {

    //activate columns, vert segs
    for (col of [startCol, endCol]) {
        for (row = startRow; row < endRow; row++) {
            activateSeg(col, row, 0, 1)
        }
    }

    // activate 2 rows, horiz segs
    for (row of [startRow, endRow]) {
        for (col = startCol; col < endCol; col++) {
            activateSeg(col, row, 1, 0)
        }
    }

}


function initializeSegments(grid) {

    activateSegmentRect(0, 0, grid.cols, grid.rows)

    //inner rect
    activateSegmentRect(10, 10, 20, 20)

}

function activateSeg(col, row, cAdj, rAdj) {

    st = grid.getGPt(col, row)
    en = grid.getGPt(col + cAdj, row + rAdj)
    se = grid.getSegment(st, en)
    if (se) {
        if (se.start) {
            se.start.active = 1
        }
        if (se.end) {
            se.end.active = 1
        }
        if ((se.start) && (se.end)) {
            se.active = 1
        }
        //print(se)
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
