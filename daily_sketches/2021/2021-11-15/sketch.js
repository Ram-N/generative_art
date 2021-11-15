// Daily Sketch for 2021-11-15
// Ram Narasimhan.

/*
Desc: 3x3 Backgrounds inside panel boxes. (SineBg, brickBg etc.)
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
}


const BgParams = {
    type: "sine",
    size: "medium",
    rows: 10,
    columns: 10
}

function setup() {
    createCanvas(960, 960);
    colorMode(HSB);
    background(params.blkColor);
    print(params.bgColor)
    palette2 = HrainbowDash; //colors.js
    palette = Hcappuccino; //colors.js
    palette = replicate(palette, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(params.blkColor);
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);



    //Custom Tiling
    rowCount = 3
    colCount = rowCount;
    colSplit = Array(rowCount).fill(1)
    rowSplit = colSplit
    pgrid = new PanelGrid(cnv, colSplit, rowSplit)
    pcount = 0;
    for (p of pgrid.panels) {
        push();
        colr = random(palette);
        _box = new Bbox(p.x, p.y, p.w, p.h)
        //_box.display(colr)
        BgParams.color = random(palette2)
        BgParams.rows = int(random(5, 15))
        BgParams.sw = 3;
        BgParams.size = random(['small', 'medium', 'large'])
        BgLayer(_box, BgParams)
        //bubblesLayer(_box, 70, palette2)
        pop();
        pcount += 1;
    }

    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}

class Bbox { // A bounding box
    constructor(x, y, w, h) {
        this.x = x; // nw corner x
        this.y = y; //nw y
        this.h = h;
        this.w = w;
    }

    display(colr, sw = 1) {
        strokeWeight(sw)
        if (colr) {
            stroke(colr);
            fill(colr);
        }
        rect(this.x, this.y, this.w, this.h)
    }


}
