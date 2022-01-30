// A JS utility library to use with p5.js sketches. 
//Ram Narasimhan

// Updated: December 2021

//Functions in this library
/*
*/



function initializeSegments(grid) {

    chosen = random(palette);

    shapeRings = [];
    shapeRings.push(
        activateSegmentRect(0, 0, grid.cols, grid.rows, chosen)
    )
    print('outer color', chosen)

    //inner rects
    // sq1s = int(grid.cols * 1 / 7)
    // sq1e = int(grid.cols * 3 / 7)
    // sq2s = int(grid.cols * 4 / 7)
    // sq2e = int(grid.cols * 6 / 7)
    // print("xy xy", sq1s, sq1e, sq2s, sq2e)
    // chosen = random(palette)
    // shapeRings.push(
    //     activateSegmentRect(sq1s, sq1s, sq1e, sq1e, colr = palette[1])
    // )
    // print(chosen)
    // shapeRings.push(
    //     activateSegmentRect(sq2s, sq1s, sq2e, sq1e, colr = palette[2])
    // )
    // shapeRings.push(
    //     activateSegmentRect(sq1s, sq2s, sq1e, sq2e, colr = palette[3])
    // )
    // shapeRings.push(
    //     activateSegmentRect(sq2s, sq2s, sq2e, sq2e, colr = palette[4])
    // )

    return shapeRings
}

function addSegToShapeBorder(col, row, cAdj, rAdj, colr = null) {

    st = grid.getGPt(col, row)
    en = grid.getGPt(col + cAdj, row + rAdj)
    se = grid.getSegment(st, en) //this is the seg of interest
    if (se) {
        if (se.start) {
            se.start.shapeBorder = 1
        }
        if (se.end) {
            se.end.shapeBorder = 1
        }
        if ((se.start) && (se.end)) {
            se.shapeBorder = 1
        }

        if (colr) {
            se.color = colr
        }
        return se
    }
    return null
}

/* A shapeRing is comprised of GPts, not segments. */

//This function "activates" a rectangle in the grid. Activating means that
// those GPts are now in the Border and can expand of contract
function activateSegmentRect(startCol, startRow, endCol, endRow, colr = null) {

    var shapeRing = [];

    //activate columns, vert segs in the West Wall
    for (row = startRow; row < endRow; row++) {
        se = addSegToShapeBorder(startCol, row, 0, 1, colr)
        shapeRing.push(se.start)
    }

    for (col = startCol; col < endCol; col++) { // south wall
        se = addSegToShapeBorder(col, endRow, 1, 0, colr)
        shapeRing.push(se.start)
    }

    for (row = endRow - 1; row >= startRow; row--) { // east Wall
        se = addSegToShapeBorder(endCol, row, 0, 1, colr)
        shapeRing.push(se.end)
    }

    for (col = endCol - 1; col >= startCol; col--) { // North Wall
        se = addSegToShapeBorder(col, startRow, 1, 0, colr)
        shapeRing.push(se.end)
    }

    return shapeRing

}

function encroach(seg) {

    // if (seg.orientation != 0) { // horiz
    //front means 0 & 2
    if (random() < 0.5) {
        if ((seg.n00) && (seg.n10)) {
            //grid.displayGPt(seg.n00.end, 'white')
            if ((!seg.n00.start.shapeBorder) && (!seg.n10.start.shapeBorder)) {
                //get the upper bridge seg...
                bridge = grid.getSegment(seg.n00.start, seg.n10.start)
                if (bridge && (!bridge.shapeBorder)) {
                    plus3Minus1(seg, seg.n00, seg.n10, bridge, grid);
                    return 1
                }
            }
        }
    } else {  // random
        if ((seg.n01) && (seg.n11)) { // down
            if ((!seg.n01.end.shapeBorder) && (!seg.n11.end.shapeBorder)) {
                // bridge that is step down. below orig seg...
                bridge = grid.getSegment(seg.n01.end, seg.n11.end)
                if (bridge && (!bridge.shapeBorder)) {
                    plus3Minus1(seg, seg.n01, seg.n11, bridge, grid);
                    return 1
                }
            }
        }
    }

    return 0 //unsuccessful in Expanding or contracting
}

/**
 * Add two numbers together
 * @param  {Number} shapeRings list of shapeRings
 * @param  {Number} jit amount of jitter to vertex 
 * @return {}      Nothing returned. Draws on screen
 */
function renderRings(shapeRings, jit = 0) {
    for ([index, ring] of shapeRings.entries()) {
        fill(random(palette2))
        print(palette2)
        stroke(palette[2])
        //noStroke();
        beginShape();
        for (gpt of ring) {
            vertex(gpt.x + jitter(jit), gpt.y + jitter(jit))
        }
        endShape(CLOSE);
    }
}


/**
    Pick an active random seg
Active means on the "Border" or "edge" of the shape

Check its 4 neighbors... 
    if horiz && if "front 2" or "back 2" are free, can grab
    if Vert && if "east 2" or "west 2" nSegs are free... can enchroch.
Activate 3 nsegs..., deactivate 1...
The function plus3Minus1 does this
*/
function grabTerritory(grid) {
    nUpdates = 0;
    attempts = 0;
    while ((nUpdates < 2) && (attempts < 100)) {
        attempts += 1
        rnd = int(random(grid.segments.length))
        seg = grid.segments[rnd]
        if (seg.shapeBorder) {
            success = encroach(seg)
            //print('success', success)
            if (success) {
                nUpdates++
            }
        }
    }
}

function plus3Minus1(seg, nA, nB, bridge, grid) {
    nA.shapeBorder = 1
    nA.color = seg.color
    nA.start.shapeBorder = 1
    nA.end.shapeBorder = 1
    nB.shapeBorder = 1
    nB.color = seg.color
    nB.start.shapeBorder = 1
    nB.end.shapeBorder = 1
    bridge.shapeBorder = 1
    bridge.color = seg.color
    seg.shapeBorder = 0
    noFill();
    rect(nA.start.x, nA.start.y, grid.xStep, grid.yStep)

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
