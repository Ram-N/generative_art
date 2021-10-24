// Daily Sketch for 2021-10-23
// Ram Narasimhan.

/*
Keywords: tiles, truchet

Desc: An assorted tile Grid (varying square sizes) of assorted truchet tiles.

Working on matching sides... right[tileno] & below[tile]

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

    tg = new TileGrid(15, 15, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin)
    //tg.renderTileGrid(200)
    //tg.print();

    //    atg = createAssortedTileGrid(tg)

    orientationAbove = 8;
    S2Pos = [6, 24, 30, 102, 126, 129, 159, 255];
    S2Neg = [96, 113, 153, 231, 249];
    S2 = { //1 means it projects out, 0 ow
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


    //for left below
    E1Pos = [113, 129, 153, 159, 231, 249, 255];
    E1Neg = [6, 30, 24, 96, 126, 102];

    E1 = { //1 means it projects out, 0 ow
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

    for (t of tg.tiles) {
        print('-----')
        print('current tile Col', t.col, 'Row', t.row)
        jx = jitter(0);
        jy = jitter(0);
        push();


        //toss = random([6, 24, 30, 96, 102, 113, 126, 129, 153, 159, 231, 249, 255]);
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
        print("LEFT is", left.toss)
    }
    print('LEFT Compatible cands', candidates)

    //keep only those cands whose S2 and LB's E1 match
    if (leftbelow && leftbelow.toss) {
        newCandidates = candidates
        candidates = [];
        for (cand of newCandidates) {
            if (S2[cand] == E1[leftbelow.toss]) { //keep this
                candidates.push(cand)
            }
        }
    }

    print('surviving Candidates after Lbelow', candidates)
    if (leftbelow && leftbelow.toss) { print('LB', leftbelow.toss) }

    if (above && above.toss) {
        leftCandidates = candidates
        print('Above', t.col, t.row, 'is', above.toss)
        belowCandidates = belowCandidate[above.toss] //list
        print('Below Candidates for', above.toss, belowCandidates)

        //candidates = leftCandidates.filter(value => belowCandidates.includes(value));
        var candidates = intersect(leftCandidates, belowCandidates)
    }

    print('cands after considering ABove', candidates)

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

    _alpha = 0.5;
    radius1 = stepSize * 0.25;
    radius2 = radius1 * 0.6;

    clr = Hcappuccino[1];
    clr2 = Hcappuccino[4];
    _alpha = 1;
    colr = color(clr[0], clr[1], clr[2], _alpha);
    colr2 = color(clr2[0], clr2[1], clr2[2], _alpha);
    noStroke();

    switch (toss) {
        case 17:
            //print('A')
            fill(colr);
            seqCircle(x + stepSize / 2, y + stepSize / 2, stepSize, repeat = 1);
            if (random() < 0.5) {
                nwqCircle(x - stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
            }
            // fill(colr2);
            // seqCircle(x + stepSize / 2, y + stepSize / 2, stepSize / 2, repeat = 1);
            // nwqCircle(x - stepSize / 2, y - stepSize / 2, stepSize / 2, repeat = 1);

            break;
        case 1:
            //print('B')

            fill(colr);
            swqCircle(x - stepSize / 2, y + stepSize / 2, stepSize, repeat = 1);
            if (random() < 0.5) {
                neqCircle(x + stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
            }
            // fill(colr2);
            // swqCircle(x - stepSize / 2, y + stepSize / 2, stepSize / 2, repeat = 1);
            // neqCircle(x + stepSize / 2, y - stepSize / 2, stepSize / 2, repeat = 1);

            break;
        case 2:
            //print('RB')
            fill(colr);
            rect(x - stepSize / 2, y - stepSize / 2, stepSize, stepSize)
            fill(params.blkColor)
            swqCircle(x - stepSize / 2, y + stepSize / 2, stepSize, repeat = 1);
            if (random() < 0.5) {

                neqCircle(x + stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
            }
            // fill(colr2);
            // seqCircle(x + stepSize / 2, y + stepSize / 2, stepSize / 2, repeat = 1);
            // nwqCircle(x - stepSize / 2, y - stepSize / 2, stepSize / 2, repeat = 1);


            break;
        case 3:
            //print('RA')
            fill(colr);
            rect(x - stepSize / 2, y - stepSize / 2, stepSize, stepSize)
            fill(params.blkColor)
            seqCircle(x + stepSize / 2, y + stepSize / 2, stepSize, repeat = 1);
            if (random() < 0.5) {

                nwqCircle(x - stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
            }
            // fill(colr2);
            // swqCircle(x - stepSize / 2, y + stepSize / 2, stepSize / 2, repeat = 1);
            // neqCircle(x + stepSize / 2, y - stepSize / 2, stepSize / 2, repeat = 1);
            break;

        default:
            makeTile(toss, x, y, stepSize);
            break;

    }

}

function makeTile(tnum, x, y, stepSize) {

    pal = random([Hblue_green, Hred_orange, Htake5])
    fill(random(pal));

    if (tnum == 0) {
    }
    if (tnum == 6) { //sw1    '00000110'
        swqCircle(x - stepSize / 2, y + stepSize / 2, stepSize, repeat = 1);
    }
    if (tnum == 24) { //se1    '0001 1000'
        seqCircle(x + stepSize / 2, y + stepSize / 2, stepSize, repeat = 1);
    }
    if (tnum == 96) { //sw1    '01100000'
        neqCircle(x + stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
    }
    if (tnum == 129) { //nw,1    '10000001'
        nwqCircle(x - stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
    }


    if (tnum == 30) { //ne,1, sw1    00011110
        seqCircle(x + stepSize / 2, y + stepSize / 2, stepSize, repeat = 1);
        swqCircle(x - stepSize / 2, y + stepSize / 2, stepSize, repeat = 1);
    }

    if (tnum == 102) { //ne,1, sw1    01100110
        swqCircle(x - stepSize / 2, y + stepSize / 2, stepSize, repeat = 1);
        neqCircle(x + stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
    }
    if (tnum == 113) { //nw,1, ne1    '1110001'
        neqCircle(x + stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
        nwqCircle(x - stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
    }
    if (tnum == 120) { //ne,1, se1    '1110001'
        neqCircle(x + stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
        seqCircle(x + stepSize / 2, y + stepSize / 2, stepSize, repeat = 1);
    }
    if (tnum == 153) { //nw,1, se1    '10011001'
        seqCircle(x + stepSize / 2, y + stepSize / 2, stepSize, repeat = 1);
        nwqCircle(x - stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
    }
    if (tnum == 135) { //nw,1, se1
        nwqCircle(x - stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
        swqCircle(x - stepSize / 2, y + stepSize / 2, stepSize, repeat = 1);
    }
    if (tnum == 225) { //nw,1, ne1
        neqCircle(x + stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
        nwqCircle(x - stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
    }

    //3 sides
    if (tnum == 126) { //-nw    '01111110'
        seqCircle(x + stepSize / 2, y + stepSize / 2, stepSize, repeat = 1);
        swqCircle(x - stepSize / 2, y + stepSize / 2, stepSize, repeat = 1);
        neqCircle(x + stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
    }
    if (tnum == 249) { //-sw,1    '11111001'
        nwqCircle(x - stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
        seqCircle(x + stepSize / 2, y + stepSize / 2, stepSize, repeat = 1);
        neqCircle(x + stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
    }
    if (tnum == 159) { //-ne    '10011111'
        nwqCircle(x - stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
        seqCircle(x + stepSize / 2, y + stepSize / 2, stepSize, repeat = 1);
        swqCircle(x - stepSize / 2, y + stepSize / 2, stepSize, repeat = 1);
    }
    if (tnum == 231) { //-se    '11100111'
        nwqCircle(x - stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
        swqCircle(x - stepSize / 2, y + stepSize / 2, stepSize, repeat = 1);
        neqCircle(x + stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
    }
    if (tnum == 255) { //nw,1    '11111111'
        nwqCircle(x - stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
        seqCircle(x + stepSize / 2, y + stepSize / 2, stepSize, repeat = 1);
        swqCircle(x - stepSize / 2, y + stepSize / 2, stepSize, repeat = 1);
        neqCircle(x + stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);
    }

}



