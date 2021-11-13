// Daily Sketch for 2021-10-25
// Ram Narasimhan.

/*
Keywords: tiles, truchet

Desc: An assorted tile Grid (varying square sizes) of assorted truchet tiles.
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
    bgColor: [210, 50, 80],
    blkColor: [0, 0, 0],
}


south2 = { //1 means it projects out, 0 ow
    0: 0,
    6: 1,
    24: 0,
    30: 1,
    96: 0,
    102: 1,
    120: 0,
    126: 1,
    129: 1,
    153: 0,
    159: 1,
    225: 0,
    231: 0,
    249: 0,
    255: 1,
};

east1 = { //1 means it projects out, 0 ow
    0: 0,
    6: 0,
    24: 0,
    30: 0,
    96: 1,
    102: 1,
    120: 1,
    126: 1,
    129: 0,
    153: 0,
    159: 0,
    225: 1,
    231: 1,
    249: 1,
    255: 1,
};

belowCandidate = {
    0: [6, 24, 30],
    6: [129, 153, 159],
    24: [96, 102, 126],
    30: [225, 231, 249, 255],
    96: [6, 24],
    102: [129, 153, 159],
    120: [96, 102, 120, 126],
    126: [120, 231, 249, 255],
    129: [6, 24, 30],
    135: [126, 159, 231, 249, 255],
    153: [96, 102, 126],
    159: [113, 231, 249, 255],
    225: [6, 24, 30],
    231: [129, 159],
    249: [96, 102, 126],
    255: [225, 231, 249, 255],

};
rightCandidate = {
    0: [96, 24, 120],
    6: [24, 96, 120],
    24: [6, 30, 102, 126],
    30: [6, 30, 102, 126],
    96: [129, 153, 225, 249],
    102: [129, 153, 225, 249],
    120: [135, 159, 231, 255],
    126: [135, 159, 231, 255],
    129: [24, 96, 120],
    135: [24, 96, 120],
    153: [6, 30, 102, 126],
    159: [6, 30, 126, 249],
    225: [129, 153, 225, 249],
    231: [129, 153, 225, 249],
    249: [135, 159, 231, 255],
    255: [135, 159, 231, 255],

};


function setup() {
    createCanvas(960, 960);
    colorMode(HSB);
    background(params.bgColor);
    print(params.bgColor)
    palette = Hblue_green; //colors.js
    palette = replicate(palette, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(params.blkColor);
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);

    tg = new TileGrid(8, 8, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin)
    //tg.renderTileGrid(200)
    //tg.print();


    for (t of tg.tiles) {
        print('-----')
        print('current tile Col', t.col, 'Row', t.row)
        jx = jitter(0);
        jy = jitter(0);

        push();
        toss = getCandidate(t)
        t.toss = toss
        populateTile(t.cx + jx, t.cy + jy, tg.width, toss)
        pop();

    }

    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}


function getCandidate(t) {
    above = tg.getTileFromCR(t.col, t.row - 1)
    left = tg.getTileFromCR(t.col - 1, t.row)
    leftbelow = tg.getTileFromCR(t.col - 1, t.row + 1)

    candidates = [0, 0, 0, 0, 6, 24, 30, 96, 102, 120, 126, 129, 135, 153, 159, 231, 249, 255];
    if (left && left.toss) {
        candidates = rightCandidate[left.toss]
    }
    if (left && left.toss) {
    }

    //keep only those cands whose south2 and LB's east1 match
    if (leftbelow && leftbelow.toss) {
        newCandidates = candidates
        candidates = [];
        for (cand of newCandidates) {
            if (south2[cand] == east1[leftbelow.toss]) { //keep this
                candidates.push(cand)
            }
        }
    }


    if (above && above.toss) {
        leftCandidates = candidates
        //print('Above', t.col, t.row, 'is', above.toss)
        belowCandidates = belowCandidate[above.toss] //list
        //print('Below Candidates for', above.toss, belowCandidates)

        //candidates = leftCandidates.filter(value => belowCandidates.includes(value));
        var candidates = intersect(leftCandidates, belowCandidates)
    }

    //print('cands after considering ABove', candidates)

    return random(candidates)
}

//https://stackoverflow.com/a/1885766/918215
function intersect(a, b) {
    var d = {};
    var results = [];
    for (var i = 0; i < b.length; i++) {
        d[b[i]] = true;
    }
    for (var j = 0; j < a.length; j++) {
        if (d[a[j]])
            results.push(a[j]);
    }
    return results;
}


function populateTile(x, y, stepSize, toss = 0) {

    noStroke();
    push();
    makeTile(toss, x, y, stepSize);
    pop();
}

function makeTile(tnum, x, y, stepSize) {




    pal = random([Hblue_green, Hred_orange, Htake5])
    selected = random(pal);
    fill(selected);
    stroke(selected);
    strokeWeight(4);

    if (tnum == 0) {
    }

    //SINGLE POINT in the entire TILE...
    s4 = stepSize / 4
    s2 = stepSize / 2;
    if (tnum == 6) { //sw1    '00000110'

        steppedLine(x - s2, y + s4, x, y);
        steppedLine(x - s4, y + s2, x, y);
    }
    if (tnum == 24) { //se1    '0001 1000'
        steppedLine(x + s2, y + s4, x, y);
        steppedLine(x + s4, y + s2, x, y);
    }
    if (tnum == 96) { //sw1    '01100000'
        steppedLine(x + s2, y - s4, x, y);
        steppedLine(x + s4, y - s2, x, y);
    }
    if (tnum == 129) { //nw,1    '10000001'
        steppedLine(x - s2, y - s4, x, y);
        steppedLine(x - s4, y - s2, x, y);
    }


    if (tnum == 30) { //ne,1, sw1    00011110
        steppedLine(x - s2, y + s4, x, y);
        steppedLine(x - s4, y + s2, x, y);
        steppedLine(x + s2, y + s4, x, y);
        steppedLine(x + s4, y + s2, x, y);
    }

    if (tnum == 102) { //ne,1, sw1    01100110
        steppedLine(x - s2, y + s4, x, y);
        steppedLine(x - s4, y + s2, x, y);
        neqCircle(x + stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
    }
    if (tnum == 113) { //nw,1, ne1    '1110001'
        neqCircle(x + stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
        nwqCircle(x - stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
    }
    if (tnum == 120) { //ne,1, se1    '1110001'
        neqCircle(x + stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
        steppedLine(x + s2, y + s4, x, y);
        steppedLine(x + s4, y + s2, x, y);

    }
    if (tnum == 153) { //nw,1, se1    '10011001'
        steppedLine(x + s2, y + s4, x, y);
        steppedLine(x + s4, y + s2, x, y);

        nwqCircle(x - stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
    }
    if (tnum == 135) { //nw,1, se1
        nwqCircle(x - stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
        steppedLine(x - s2, y + s4, x, y);
        steppedLine(x - s4, y + s2, x, y);
    }
    if (tnum == 225) { //nw,1, ne1
        neqCircle(x + stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
        nwqCircle(x - stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
    }

    //3 sides
    if (tnum == 126) { //-nw    '01111110'
        steppedLine(x + s2, y + s4, x, y);
        steppedLine(x + s4, y + s2, x, y);

        swqCircle(x - stepSize / 2, y + stepSize / 2, stepSize, repeat = 1);
        neqCircle(x + stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
    }
    if (tnum == 249) { //-sw,1    '11111001'
        nwqCircle(x - stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
        steppedLine(x + s2, y + s4, x, y);
        steppedLine(x + s4, y + s2, x, y);

        neqCircle(x + stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
    }
    if (tnum == 159) { //-ne    '10011111'
        nwqCircle(x - stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
        steppedLine(x + s2, y + s4, x, y);
        steppedLine(x + s4, y + s2, x, y);

        swqCircle(x - stepSize / 2, y + stepSize / 2, stepSize, repeat = 1);
    }
    if (tnum == 231) { //-se    '11100111'
        nwqCircle(x - stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
        swqCircle(x - stepSize / 2, y + stepSize / 2, stepSize, repeat = 1);
        neqCircle(x + stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
    }

    //4 Sides, 8 points
    if (tnum == 255) { //nw,1    '11111111'
        steppedLine(x - s2, y + s4, x, y);
        steppedLine(x - s4, y + s2, x, y);
        steppedLine(x + s2, y + s4, x, y);
        steppedLine(x + s4, y + s2, x, y);
        steppedLine(x + s2, y - s4, x, y);
        steppedLine(x + s4, y - s2, x, y);
        steppedLine(x - s2, y - s4, x, y);
        steppedLine(x - s4, y - s2, x, y);
    }

}



