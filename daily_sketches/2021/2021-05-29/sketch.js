// Daily Sketch for 2021-05-29
// Ram Narasimhan.
/*

Small perturbation makes it look like hand-drawn.

*/


let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}

const params = {
    xStep: 50,
    yStep: 50,
    bgColor: "#0f0f0f", //black
    moves: 1000
}

let chosen;
let rot = 0;
let shapeRings;

function setup() {
    createCanvas(960, 960);
    background(params.bgColor);
    //background("#0F0F0F");
    fill("#0f0f0f");
    draw_border(20); //rn_utils.js
    palette = cappuccino; //colors.js
    //palette = rainbowDash; //colors.js
    palette = replicate(palette, 100)
    palette2 = take5; //colors.js
    palette2 = replicate(palette2, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);
    grid = new Grid(params.xStep, params.yStep, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin);

    for (const [index, s] of grid.segments.entries()) {
        attachNeighboringSegments(s, grid)
        s.rotating = -1 //not rotating
        s.radius = 3;
        s.color = 250
        s.seq = index;
    }

    shapeRings = initializeSegments(grid)
    print(grid.segments.length, 'num segs')
    chosen = random(palette)

    // form the shapes
    for (drw = 0; drw < params.moves; drw++) {
        grabTerritory(grid)
    }

    // render it on the canvas
    chosen = random(palette2)
    displayAllSegments(grid, chosen, rot, sw = 3)

    renderRings(shapeRings)
    //print(shapeRings[4])

    draw_border(clr = 220, sw = 20); //rn_utils.js

}


function renderRings(shapeRings) {
    col_seq = ["#7bc043", "#f4a261", "#fdf498", "#ee4035", "#0392cf"]
    col_seq = [cappuccino[3], 'tan', cappuccino[2], cappuccino[1], cappuccino[4]]
    stroke(20)

    for ([index, ring] of shapeRings.entries()) {
        fill(col_seq[index])
        beginShape();
        for (gpt of ring) {
            vertex(gpt.x + irpm(3), gpt.y + irpm(3)) //irpm is in utlis.js - integer random plus minus
        }
        endShape(CLOSE);
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
    nA.active = 1
    nA.color = seg.color
    nA.start.active = 1
    nA.end.active = 1
    nB.active = 1
    nB.color = seg.color
    nB.start.active = 1
    nB.end.active = 1
    bridge.active = 1
    bridge.color = seg.color
    seg.active = 0
    noFill();
    rect(nA.start.x, nA.start.y, grid.xStep, grid.yStep)

    // push();
    // bridge.display("red", 10)
    // circle(bridge.start.x, bridge.start.y, 10)
    // print('seg', seg.id)
    // seg.display("red", 10)
    // circle(seg.start.x, seg.start.y, 10)
    // circle(seg.end.x, seg.end.y, 15)
    // print('bridge', bridge.id, bridge)
    // pop();

    for (ring of shapeRings) {
        for (const [index, rpt] of ring.entries()) {
            if (index < ring.length) {
                nextPt = ring[index + 1];
            } else if (index == ring.length) {
                nextPt = ring[0]
            }
            if ((seg.start == rpt) && (seg.end == nextPt)) {
                //insert and break out
                ring.splice(index + 1, 0, bridge.end);
                ring.splice(index + 1, 0, bridge.start);
                return
            }
            if ((seg.end == rpt) && (seg.start == nextPt)) { // reversed seg. 
                // Aiming for [... SegE BridgeE BridgeS SegS ...]
                ring.splice(index + 1, 0, bridge.start);
                ring.splice(index + 1, 0, bridge.end);
                return
            }

        }
    }

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
                    push();
                    stroke(se.color);
                    line(se.start.x, se.start.y, se.end.x, se.end.y)
                    strokeWeight(3);
                    fill(se.color)
                    //circle(se.start.x, se.start.y, se.radius)
                    //circle(se.end.x, se.end.y, 10)
                    pop();
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


/* A shapering is comprised of GPts, not segments. */
function activateSegmentRect(startCol, startRow, endCol, endRow, colr = null) {

    var shapeRing = [];

    //activate columns, vert segs in the West Wall
    for (row = startRow; row < endRow; row++) {
        se = activateSeg(startCol, row, 0, 1, colr)
        shapeRing.push(se.start)
    }

    for (col = startCol; col < endCol; col++) { // south wall
        se = activateSeg(col, endRow, 1, 0, colr)
        shapeRing.push(se.start)
    }

    for (row = endRow - 1; row >= startRow; row--) { // east Wall
        se = activateSeg(endCol, row, 0, 1, colr)
        shapeRing.push(se.end)
    }

    for (col = endCol - 1; col >= startCol; col--) { // North Wall
        se = activateSeg(col, startRow, 1, 0, colr)
        shapeRing.push(se.end)
    }

    return shapeRing

}


function initializeSegments(grid) {

    shapeRings = [];

    chosen = "#f4a261"
    shapeRings.push(
        activateSegmentRect(0, 0, grid.cols, grid.rows, chosen)
    )
    print('outer color', chosen)

    //inner rects
    sq1s = int(grid.cols * 1 / 7)
    sq1e = int(grid.cols * 3 / 7)
    sq2s = int(grid.cols * 4 / 7)
    sq2e = int(grid.cols * 6 / 7)
    print("xy xy", sq1s, sq1e, sq2s, sq2e)
    chosen = random(palette)
    shapeRings.push(
        activateSegmentRect(sq1s, sq1s, sq1e, sq1e, colr = "#fdf498")
    )
    print(chosen)
    shapeRings.push(
        activateSegmentRect(sq2s, sq1s, sq2e, sq1e, colr = "#ee4035")
    )
    shapeRings.push(
        activateSegmentRect(sq1s, sq2s, sq1e, sq2e, colr = "#7bc043")
    )
    shapeRings.push(
        activateSegmentRect(sq2s, sq2s, sq2e, sq2e, colr = "#0392cf")
    )

    return shapeRings
}


function activateSeg(col, row, cAdj, rAdj, colr = null) {

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
        if (colr) {
            se.color = colr
        }
        return se
    }
    return null
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


