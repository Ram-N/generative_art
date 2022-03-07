// Daily Sketch for 2022-03-06
// Ram Narasimhan

/*
Keywords: flow field

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
    bgColor: [210, 50, 80],
    blkColor: [0, 0, 0],
    moves: 1000
}



function setup() {

    createCanvas(960, 960);
    let button = createButton("reset sketch");
    button.mousePressed(resetSketch);
    colorMode(HSB);
    background(params.blkColor);
    print(params.bgColor)
    palette2 = random(palList)
    palette = random(palList)
    palette = replicate(palette, 100)
    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(params.blkColor);

    var tg = new TileGrid(params.xStep, params.yStep, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin)

    print(tg.rows, tg.cols, 'row cols')
    tg.createFlowField = function () {
        for (col = 0; col < this.cols; col++) {
            for (row = 0; row < this.rows; row++) {
                tile = this.getTileFromCR(col, row, verbose = false);
                angle = getAngle(col, row)
                tile.angle = angle //store the flow field
            }
        }
    }

    tg.renderFlowField = function () {
        strokeWeight(2);
        stroke('white')
        for (col = 0; col < this.cols; col++) {
            for (row = 0; row < this.rows; row++) {
                tile = this.getTileFromCR(col, row, verbose = false);
                xEnd = tile.x + tg.width * cos(tile.angle)
                yEnd = tile.y + tg.height * sin(tile.angle)
                line(tile.x, tile.y, xEnd, yEnd)
                //circle(tile.x, tile.y, 10)
            }
        }
    }

    function getAngle(col, row) {
        x = (col / tg.cols);
        y = (row / tg.rows);

        angle = (cos(3 * y) / cos(0.01 * x + 10)) * PI / 4

        // // find angle from old to new. that's the value.
        // return Math.atan2(y1 - y, x1 - x);
        return angle;
    }


    tg.createFlowField()
    //tg.renderFlowField()


    //RENDER the Field
    push();
    translate(width / 2, height / 2);

    for (i = 0; i < 300; i++) {
        strokeWeight(random([10, 7]))
        x = cnv.xMargin + random(cnv.width / 2)
        y = cnv.yMargin + random(cnv.height / 2)
        //draw a strand...which could have 1 to 4 segments
        numSegs = random([1, 2, 3])
        colorNum = int(map(x, 0, cnv.width / 2, 0, 6))
        stroke(palette[colorNum]);
        // if (numSegs == 3) { // all longer strands are one of 2 colors
        //     stroke(palette2[random([4, 1])])
        // }
        for (s = 0; s < numSegs; s++) {
            tile = tg.getTile(x, y)
            step = tg.height
            if (tile) {
                xEnd = x + step * cos(tile.angle)
                yEnd = y + step * sin(tile.angle)
                for (sc of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
                    push();
                    scale(sc);
                    line(x, y, xEnd, yEnd)
                    pop();
                }
                x = xEnd; y = yEnd;
            }
        }
    }
    pop();

    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}


