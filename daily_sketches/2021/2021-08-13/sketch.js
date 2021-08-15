// Daily Sketch for 2021-08-13
// Ram Narasimhan

/*
Custom Tiling
*/


const cnv = {
    xMargin: 30,
    yMargin: 30,
}

let palette = []
const params = {
    //    bgColor: "#F1E0EA",
    //bgColor:"#EAB6AB"
    bgColor: "#0f0f0f", //black
    //    bgColor: '#ab3977', //black
    numLeaves: 400,

}


function setup() {
    createCanvas(660, 660);
    colorMode(HSB);
    background(0, 0, 0);

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    print(cnv)
    xstart = cnv.xMargin
    ystart = cnv.yMargin
    xend = cnv.xMargin + cnv.width
    yend = cnv.yMargin + cnv.height
    midX = width / 2
    midY = height / 2

    palette = red_brown_orange; //colors.js
    palette = replicate(palette, 100)

    //Custom Tiling
    colSplit = [0.5]
    rowSplit = [0.33]

    colVector = [0.2, 0.2, 0.2, 0.2, 0.2]
    rowVector = [0.25, 0.25, 0.25, 0.25]

    tiles = createTiles(cnv, colVector, rowVector)
    print(tiles)
    renderTileGrid(tiles)
    draw_border(clr = 20, sw = 50); //rn_utils.js
}

function renderTileGrid(tiles) {
    // noFill();
    for (let t of tiles) {
        fill(random(palette))
        rect(t.x, t.y, t.tw, t.th)
        strokeWeight(5);
        stroke(params.bgColor)
        rect(t.x, t.y, t.tw, t.th)
    }

}


function createTiles(cnv, colVector, rowVector) {
    let tiles = [];
    cumulative_x = cnv.xMargin;
    for (let tx of colVector) {
        let tw = tx * cnv.width
        cumulative_y = cnv.yMargin;
        for (let ty of rowVector) {
            let th = ty * cnv.height
            let x = cumulative_x;
            let y = cumulative_y;
            tile = createVector(x, y);
            tile.tw = tw;
            tile.th = th;
            tiles.push(tile)
            cumulative_y += th
        }
        cumulative_x += tw
    }
    return tiles
}

