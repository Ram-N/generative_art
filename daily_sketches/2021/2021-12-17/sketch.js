// Daily Sketch for 2021-12-17
// Ram Narasimhan.

/*
Keywords: flow field

Desc: Draw segments randomly, in a flow-field. Gearing up towards a Fidenza
Variation: each strand continues from where the previous one left off
*/

let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}

const params = {
    xStep: 60,
    yStep: 60,
    bgColor: [210, 50, 80],
    blkColor: [0, 0, 0],
    moves: 1000
}

let chosen;
let rot = 0;
let shapeRings;


function setup() {

    createCanvas(960, 960);
    colorMode(HSB);
    background(params.blkColor);
    print(params.bgColor)
    palette2 = random(HSBpalList)
    palette = random(HSBpalList)
    palette = replicate(palette, 100)
    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(params.blkColor);

    //grid = new Grid(params.xStep, params.yStep, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin, createSegs = true);

    tg = new TileGrid(params.xStep, params.yStep, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin)

    fill(random(palette2))
    for (col = 0; col < tg.cols; col++) {
        for (row = 0; row < tg.rows; row++) {
            tile = tg.getTileFromCR(col, row, verbose = false);
            angle = (col / (2 * tg.cols)) * PI
            tile.angle = angle //store the flow field
        }
    }


    for (i = 0; i < 1000; i++) {
        strokeWeight(random([8, 4, 6]))
        x = cnv.xMargin + random(cnv.width)
        y = cnv.yMargin + random(cnv.height)
        //draw a strand...which could have 1 to 4 segments
        numSegs = random([1, 2, 3, 4])
        for (s = 0; s < numSegs; s++) {
            stroke(random(palette2))
            tile = tg.getTile(x, y)
            step = tg.height * random([1, 1.5, 2, 1.8])
            if (tile) {
                xEnd = x + step * cos(tile.angle)
                yEnd = y + step * sin(tile.angle)
                line(x, y, xEnd, yEnd)
                x = xEnd; y = yEnd;
            }
        }
    }



    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}

