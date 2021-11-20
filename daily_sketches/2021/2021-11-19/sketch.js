// Daily Sketch for 2021-11-19
// Ram Narasimhan.

/*
Desc: 3x3 Backgrounds inside panel boxes
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
    size: "medium",
    rows: 10,
    columns: 10,
    color: "red",
    sw: 3

}


function setup() {

    createCanvas(960, 960);
    colorMode(HSB);
    background(params.blkColor);
    print(params.bgColor)
    palette2 = HrainbowDash; //colors.js
    //palette2 = Hcappuccino; //colors.js
    palette = replicate(palette, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(params.blkColor);
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);
    pgrid = createSquareGrid(3);

    buffers = []; //off-screen tile buffers
    for (p of pgrid.panels) {
        push();
        _box = new Bbox(p.x, p.y, p.w, p.h);
        diagWall(_box, BgParams);
        pop();
        buffers.push(createGraphics(p.w, p.h))
    }


    for (const [index, p] of pgrid.panels.entries()) {
        drawBuffer(buffers[index])
        // Paint the off-screen buffers onto the main canvas
        image(buffers[index], p.x, p.y);
    }

    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}

radii = [65, 80, 120, 60]

function drawBuffer(buf) {
    //buf.background(255, 100, 255);
    buf.fill(0, 0, 0);
    for (c in [0, 1, 2, 3]) {
        bw2 = buf.width / 2;
        bh2 = buf.height / 2;
        x = bw2 + 15 * c + jitter(30);
        y = bh2 + 20 * c + jitter(30);
        //print(buf.width, buf.height, x, y)
        buf.circle(x, y, random(radii));

    }
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
