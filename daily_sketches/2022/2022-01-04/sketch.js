// Daily Sketch for 2022-01-04
// Ram Narasimhan

/*
Keywords: flow-field

The next fidenza

Place a circle.
Tiles are either, INTERNAL (inside the circle), BORDER, outside.
No flow can start from INSIDE tiles or even BORDER tiles.
AT BORDER tiles, the flow goes AROUND the globe.
*/

let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}


// xStep: 90,
// yStep: 90,

const params = {
    xStep: 90,
    yStep: 90,
    bgColor: [210, 50, 80],
    blkColor: [0, 0, 0],
    moves: 1000
}



function setup() {

    createCanvas(960, 960);
    colorMode(HSB);
    background(params.blkColor);
    print(params.bgColor)
    let palette2 = Hred_orange;
    palette = Hblue_green
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
                //print(col, row, angle)
                tile.angle = angle //store the flow field
            }
        }
    }

    tg.renderStandardFlowField = function () {
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
        // scale down x and y
        _scale = 0.005;
        x = (col - tg.cols / 2);
        y = (row - tg.rows / 2);
        angle = (col / (2 * tg.cols)) * PI // diverging from the SE corner
        return angle;
    }



    tg.createFlowField()
    cir = { x: width / 2, y: height / 2, radius: 50 }
    categorizeTilesType(cir, tg)
    //colorTiles(tg); //for visual debugging purpose
    fill('white')
    stroke('white')
    circle(cir.x, cir.y, cir.radius * 1.6);

    adjustBorderTileAngles(tg)
    //tg.renderStandardFlowField()

    //RENDER the Field
    step = tg.height * 4
    strokeWeight(random([10]))

    visualizeFidenza(tg, palette2)

    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}

function visualizeFidenza(tg, palette2) {
    for (x = 0; x < cnv.width; x += 25) {
        drawStrand(x, cnv.yMargin, tg, palette2)
    }
    for (y = 0; y < cnv.height; y += 25) {
        drawStrand(cnv.xMargin, y, tg, palette2)
    }

    for (i = 0; i < 300; i++) {
        x = cnv.xMargin + random(cnv.width)
        y = cnv.yMargin + random(cnv.height)
        drawStrand(x, y, tg, palette2)
    }

}




function drawStrand(x, y, tg, palette2) {
    //draw a strand...which could have 1 to 4 segments
    numSegs = random([1, 2, 4, 8, 10])
    //Draw a single strand made up of Segments
    for (s = 0; s < numSegs; s++) {
        tile = tg.getTile(x, y)
        if (tile && (!tile.type)) {
            //if (!s) { circle(x, y, 10) }
            stroke(random(palette2))
            if (numSegs == 8 && (s == 0 || s == 7)) { // all longer strands are one of 2 colors
                stroke(palette[3])
            }
            if (numSegs == 2) { stroke(240, 10, 100) }
            xEnd = x + step * cos(tile.angle) * random(0.8, 1.2)
            yEnd = y + step * sin(tile.angle)
            tileEnd = tg.getTile(xEnd, yEnd)
            if (tileEnd && (!tileEnd.type)) {
                //strokeCap(SQUARE);

                line(x, y, xEnd, yEnd)
            }
            x = xEnd; y = yEnd; //Chaining for continuity
        }
    }

}

function colorTiles(tg) {
    for (t of tg.tiles) {
        if (t.type == 1) {
            fill('blue')
            if (t.row == 15) { fill('brown') }
            rect(t.x, t.y, tg.width, tg.height)
            print(t.angle, 'border angle')
        }
        // if (t.type == 2) {
        //     fill('orange')
        //     rect(t.x, t.y, tg.width, tg.height)
        // }
    }
}

//ONLY for the tiles in the circle border, we
//recalculate the tile angles to flow around the circle.
function adjustBorderTileAngles(tg) {

    maxCol = 0;
    minCol = tg.cols;
    maxRow = 0;
    minRow = tg.rows;
    for (t of tg.tiles) {
        if (t.type == 1) {
            if (t.col < minCol) { minCol = t.col }
            if (t.col > maxCol) { maxCol = t.col }
            if (t.row < minRow) { minRow = t.row }
            if (t.row > maxRow) { maxRow = t.row }
            print(t.angle, 'border angle')
        }
    }
    print("max", minCol, maxCol, minRow, maxRow)
    midCol = (minCol + maxCol) / 2
    midRow = (minRow + maxRow) / 2
    maxColDelta = maxCol - midCol
    maxRowDelta = maxRow - midRow
    print('mid', midCol, midRow, maxColDelta, maxRowDelta)


    for (t of tg.tiles) {
        if (t.type == 1) {
            print(t.row, midRow, t.col, midCol)
            if (t.row <= midRow && t.col >= midCol) {
                print('changing from', t.angle)
                t.angle = (t.col - midCol) / maxColDelta * PI / 2
                print('to', t.angle)
            }
            if (t.row > midRow && t.col >= midCol) {
                print('changing from', t.angle)
                t.angle = (midCol - t.col) / maxColDelta * PI / 2
                print('to', t.angle)
            }
            if (t.row <= midRow && t.col < midCol) {
                print('NW changing from', t.angle)
                t.angle = (midCol - t.col) / maxColDelta * PI / 2
                print('to', t.angle)
            }
            if (t.row > midRow && t.col < midCol) {
                print('SW changing from', t.angle)
                t.angle = (midCol - t.col) / maxColDelta * PI / 2
                print('to', t.angle)
            }
            print(t.angle, 'border angle', t.col, t.row)
        }
    }


}


//Tiles can be INTERIOR, BORDER or EXTERIOR
function categorizeTilesType(cir, tg) {

    for (t of tg.tiles) {
        t.type = 0 //0 means SAFE and EXTERIOR to the circle cir
    }

    // //MARK INTERIOR TILES AS INTERIOR
    // for (i = 0; i < 200; i++) {
    //     r = random(cir.radius - 0.1)
    //     theta = random(0, TAU)
    //     x = cir.x + r * cos(theta)
    // }

    numSpokes = 36

    rads = [0, cir.radius / 4, cir.radius / 2, cir.radius * 0.75, cir.radius - 0.2]
    for (r of rads) {
        for (spoke = 0; spoke < numSpokes; spoke++) {
            angle = TAU / numSpokes * spoke
            x = cir.x + r * cos(angle)
            y = cir.y + r * sin(angle)
            tile = tg.getTile(x, y)
            if (tile) {
                tile.type = 2 //INTERIOR TILE
                if (r == rads[4]) {
                    tile.type = 1 //BORDER TILE
                    print('spoke', spoke, 'original angle', tile.angle, "Spoke angle", angle, tile.row, tile.col, 'row col')
                    //col / (2 * tg.cols)) * PI
                }
            }
        }
    }
}

