// Daily Sketch for 2021-10-27
// Ram Narasimhan.

/*
Keywords: tiles, truchet
Desc: An assorted colorful tile grid of truchet tiles, with stepped lines and 
Desc: random connects. (Any two per point)
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

    tg = new TileGrid(10, 10, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin)
    //tg.renderTileGrid(200)
    //tg.print();


    for (t of tg.tiles) {
        print('-----')
        jx = jitter(0);
        jy = jitter(0);

        push();
        toss = getCandidate(t)
        t.toss = toss
        print('current tile Col', t.col, 'Row', t.row, toss)
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
    jx = jitter(0);
    jy = jitter(0);
    strokeWeight(5);
    makeTile(toss, x + jx, y + jy, stepSize);

}


patternDict = {
    6: [[-2, 1, 1], [-1, 2, 0]],
    24: [[2, 1, 1], [1, 2, 0]],
    96: [[2, -1, 1], [1, -2, 0]],
    129: [[-2, -1, 1], [-1, -2, 0]],
}

compositeTile = {
    0: [],
    6: [6],
    24: [24],
    96: [96],
    129: [129],
    30: [6, 24],
    120: [24, 96],
    225: [96, 129],
    135: [6, 129],
    102: [6, 96],
    153: [129, 24],
    255: [6, 24, 96, 129],
    249: [24, 96, 129],
    231: [6, 96, 129],
    159: [6, 24, 129],
    126: [6, 24, 96],
}


function tilePattern(patternNum, x, y, stepSize) {


    //6 has 2 points. -2,1 & -1, 2
    //24 has 2 points. 2,-1 & 1, -2
    qstep = stepSize * 0.25
    push();
    translate(x, y);
    //print(patternNum, patternDict[patternNum], x, y)
    for (elem of compositeTile[patternNum]) {
        for (jn of patternDict[elem]) {
            steppedLine(jn[0] * qstep, jn[1] * qstep, 0, 0, hStart = jn[2]);
        }
    }
    pop();
}


function makeTile(tnum, x, y, stepSize) {

    pal = random([Hblue_green, Hred_orange, Htake5])
    selected = random(pal);
    fill(selected);
    stroke(selected);
    eps = stepSize / 8;
    eps = 0;
    if (tnum == 0) {
    }

    //SINGLE Side in the entire TILE...
    s4 = stepSize / 4;
    s2 = stepSize / 2;
    tilePattern(tnum, x, y, stepSize);
    return
}



