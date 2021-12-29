// Daily Sketch for 2021-12-25
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

    tg = new TileGrid(12, 12, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin)
    //tg.renderTileGrid(200)
    //tg.print();

    //    atg = createAssortedTileGrid(tg)

    orientationAbove = 8;
    for (t of tg.tiles) {
        print('-----')
        print('current tile Col', t.col, 'Row', t.row)
        jx = jitter(0);
        jy = jitter(0);
        push();
        toss = random([0, 1, 2, 3])
        above = tg.getTileFromCR(t.col, t.row - 1)
        left = tg.getTileFromCR(t.col - 1, t.row)
        if (above) {
            print('above tile', above.row, above.col)
            //print(above)
            orientationAbove = above.toss
            if (above.toss == 0) {
                toss = random([1, 3])
            }
            if (above.toss == 1) {
                toss = random([0, 2])
            }
            if (above.toss == 2) {
                toss = random([1, 3])
            }
            if (above.toss == 3) {
                toss = random([0, 2])
            }
        } else {
            orientationAbove = null;
        }
        if (left) {
            print('left tile', left.row, left.col)
            //print(above)
            if (left.toss == 0) {
                toss = random([1, 3])
            }
            if (left.toss == 1) {
                toss = random([0, 2])
            }
            if (left.toss == 2) {
                toss = random([1, 3])
            }
            if (left.toss == 3) {
                toss = random([0, 2])
            }
        } else {
            orientationAbove = null;
        }
        t.toss = toss
        //print(t.col, t.row, 'above', orientationAbove, 'current', toss);
        populateTile(t.cx + jx, t.cy + jy, tg.width, toss)
        pop();
    }

    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}


function populateTile(x, y, stepSize, toss = 0) {

    pers = "Below"
    view = "L"
    _alpha = 0.5;
    clen = stepSize * 0.8;
    cw = stepSize * 0.3;
    ch = stepSize * 0.8;
    radius1 = stepSize * 0.25;
    radius2 = radius1 * 0.6;

    clr = random([[0, 100, 90], [120, 100, 90]]);
    clr2 = [100, 0, 100];
    _alpha = 1;
    colr = color(clr[0], clr[1], clr[2], _alpha);
    colr2 = color(clr2[0], clr2[1], clr2[2], _alpha);
    noStroke();

    switch (toss) {
        case 0:
            //print('A')
            fill(colr);
            seqCircle(x + stepSize / 2, y + stepSize / 2, stepSize, repeat = 1);
            nwqCircle(x - stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);

            fill(colr2);
            seqCircle(x + stepSize / 2, y + stepSize / 2, stepSize / 2, repeat = 1);
            nwqCircle(x - stepSize / 2, y - stepSize / 2, stepSize / 2, repeat = 1);

            break;
        case 1:
            //print('B')

            fill(colr);
            swqCircle(x - stepSize / 2, y + stepSize / 2, stepSize, repeat = 1);
            neqCircle(x + stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);

            fill(colr2);
            swqCircle(x - stepSize / 2, y + stepSize / 2, stepSize / 2, repeat = 1);
            neqCircle(x + stepSize / 2, y - stepSize / 2, stepSize / 2, repeat = 1);

            break;
        case 2:
            //print('RB')
            fill(colr);
            rect(x - stepSize / 2, y - stepSize / 2, stepSize, stepSize)
            fill(params.blkColor)
            swqCircle(x - stepSize / 2, y + stepSize / 2, stepSize, repeat = 1);
            neqCircle(x + stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);

            fill(colr2);
            seqCircle(x + stepSize / 2, y + stepSize / 2, stepSize / 2, repeat = 1);
            nwqCircle(x - stepSize / 2, y - stepSize / 2, stepSize / 2, repeat = 1);


            break;
        case 3:
            //print('RA')
            fill(colr);
            rect(x - stepSize / 2, y - stepSize / 2, stepSize, stepSize)
            fill(params.blkColor)
            seqCircle(x + stepSize / 2, y + stepSize / 2, stepSize, repeat = 1);
            nwqCircle(x - stepSize / 2, y - stepSize / 2, stepSize, repeat = 1);

            fill(colr2);
            swqCircle(x - stepSize / 2, y + stepSize / 2, stepSize / 2, repeat = 1);
            neqCircle(x + stepSize / 2, y - stepSize / 2, stepSize / 2, repeat = 1);


            break;
        default:
            print('CYL')
            clr = random(Hred_orange);
            _alpha = random();
            colr = color(clr[0], clr[1], clr[2], _alpha);
        // fill(colr);
        // //stroke(10, 0, 50)
        // cyl(x, y, radius1 = stepSize * mult, repeat = 1);

    }

}



