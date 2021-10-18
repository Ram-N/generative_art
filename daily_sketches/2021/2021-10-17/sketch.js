// Daily Sketch for 2021-10-17
// Ram Narasimhan.

/*
Keywords: shapes, tiles

Desc: An assorted tile Grid array of assorted shapes
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
    bgColor: (50, 20, 50),
    blkColor: (0, 0, 0),
}



function setup() {
    createCanvas(960, 960);
    colorMode(HSB);
    background(params.bgColor);
    palette = Hblue_green; //colors.js
    palette = replicate(palette, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(params.blkColor);
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);

    tg = new TileGrid(20, 20, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin)
    //tg.renderTileGrid(200)

    atg = createAssortedTileGrid(tg)

    maxSize = 4;
    for (sz = maxSize; sz > 1; sz--) {
        fill(random(palette));
        for (t of atg[sz]) {
            bigtilew = tg.width * t.active;
            rect(t.x, t.y, bigtilew, bigtilew);
            populateTile(t.x + bigtilew / 2, t.y + bigtilew / 2, bigtilew)
        }
    }

    for (t of tg.tiles) {
        if (t.active == 1) {
            populateTile(t.cx, t.cy, tg.width)
        }
    }


    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}


function populateTile(x, y, stepSize) {

    pers = "Below"
    view = "L"
    clen = stepSize * 0.8;
    cw = stepSize * 0.3;
    ch = stepSize * 0.8;
    radius1 = stepSize * 0.5;
    radius2 = radius1 * 0.6;
    mult = random(0.3, 1)

    toss = random()
    if (toss < 0.3) {
        colr = random(Htake5);
        cuboid(x, y, clen, cw, ch,
            _perspective = random(['Above', 'Below']),
            view = random(['L']),
            colr = colr); //rn_shapes.js
    }
    else if (toss < 0.5) {
        colr = random(Hred_orange);
        fill(colr);
        stroke(10, 0, 50)
        cyl(x, y, radius1 = stepSize * mult, repeat = 8);
    }
    else if (toss < 0.7) {
        colr = random(HrainbowDash);
        fill(colr)
        rot = PI / 7 * int(random(5))
        push();
        stroke(10, 0, 50)
        points = int(random(3, 6))
        star(x, y, radius1, radius2, points, rot, curved = true, repeat = 5)
        pop();
    }

}


function squareCanFit(sz, col, row, tg) {

    //print('trying at', col, row, sz)
    if (col + sz >= tg.cols) { return (0) }
    if (row + sz >= tg.rows) { return (0) }
    for (ys = 0; ys < sz; ys++) {
        for (xs = 0; xs < sz; xs++) {
            tile = tg.getTileFromCR(col + xs, row + ys)
            if (tile.active != 1) {
                return (0)
            }
        }
    }


    return (1) // yes location is good
}


function createAssortedTileGrid(tg) {

    maxSize = 4;
    var tileDict = {};
    var assortedTileDict = {};
    tileDict[4] = 1;
    tileDict[3] = 3;
    tileDict[2] = 5;


    for (sz = maxSize; sz > 1; sz--) {
        assortedTileDict[sz] = [];
        numRandoms = tileDict[sz]
        for (td = 0; td < numRandoms; td++) {
            //print('attempting', td, 'of', numRandoms, 'of size', sz)
            numAttempts = 0;
            found = 0;
            while ((!found) && (numAttempts < 100)) {
                numAttempts += 1;
                //get a random tile.
                col = int(random(tg.cols))
                row = int(random(tg.rows))
                //see if its neighbors are free to allow a square of size SZ to be created.
                //if yes, add to the global assortedTileDict
                //make those neighbors inactive.
                //print(col, row, 'xy')
                nwTile = tg.getTileFromCR(col, row) // the NW tile 
                //print(nwTile, 'attempt', col, row)
                if (squareCanFit(sz, col, row, tg)) {
                    for (ys = 0; ys < sz; ys++) {
                        for (xs = 0; xs < sz; xs++) {
                            tile = tg.getTileFromCR(col + xs, row + ys)
                            tile.active = 0;
                        }
                    }
                    nwTile.active = sz // the NW tile's activity number is 4 or 3                
                    found = 1;
                    assortedTileDict[sz].push(nwTile)
                }

            }
        }
    }

    return (assortedTileDict)
}
