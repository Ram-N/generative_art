// Daily Sketch for 2022-01-31
// Ram Narasimhan.

/*
    Desc: Negative Space and Tiling
*/

let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}


const params = {
    tw: 40, // triangle width of the hexg,
    xStep: 20,
    yStep: 20,
    bgColor: "#d3d3d3",
    blkColor: "#0f0f0f",
}



function setup() {
    createCanvas(960, 960);
    //colorMode(HSB);
    background(params.blkColor);

    palette = random(RGBPalList);
    palette = replicate(palette, 100)
    palette2 = random(RGBPalList);
    palette2 = replicate(palette2, 100)
    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width


    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);
    pgrid = createSquareGrid(5, margin = 0);
    //pgrid.display()

    a = int(random(palette.length)) //number
    b = int(random(palette.length)) //number
    while (a == b) {
        b = int(random(palette.length)) //number
    }


    buffers = createPanelBuffers(pgrid);
    renderTiles(pgrid, buffers, a, b);

    cnv.xMargin += p.w
    cnv.yMargin += p.h
    cnv.height = p.w * 3;
    cnv.width = p.w * 3;
    colSplit = Array(9).fill(1)
    innerGrid = new PanelGrid(cnv, colSplit, colSplit, margin = 0)

    buffers = createPanelBuffers(innerGrid);
    renderTiles(innerGrid, buffers, a, b);

    draw_border(clr = params.bgColor, sw = 50); //rn_utils.js
}


//create the mini-canvases as buffers, and paint them as images 
function renderTiles(pgrid, buffers) {

    for (const [index, p] of pgrid.panels.entries()) {
        _colr = palette[a]; strokeColor = palette[b]
        if (index % 2) { _colr = palette[b]; strokeColor = palette[a] }
        drawTileBase(p, _colr)
        drawTruchet(buffers[index], strokeColor);
        image(buffers[index], p.x, p.y);
    }
}


//Creates one off-screen buffer for each panel.
//This could even become part of the Panel object as a method inside it.
function createPanelBuffers(pgrid) {
    buffers = [];
    for (p of pgrid.panels) {
        bf = createGraphics(p.w, p.h)
        bf.rect = new Rectangle(p.x, p.y, p.w, p.h);
        buffers.push(bf)//off-screen tile buffers
    }
    return buffers
}


function drawTileBase(pnl, _colr) {
    push();
    translate(pnl.x, pnl.y)
    fill(_colr)
    noStroke();
    rect(0, 0, pnl.w, pnl.h)
    pop();
}


function drawTruchet(buf, _colr) {

    toss = random();
    buf.strokeWeight(25)
    buf.stroke(_colr)
    buf.noFill();
    if (toss < 0.5) {
        buf.push();
        buf.translate(0, 0)
        renderQC(1, buf);
        buf.pop();
    } else {
        buf.push();
        buf.translate(0, 0) //SE
        renderQC(2, buf);
        buf.pop();
    }




}

function renderQC(pnltype, buf) {

    rad = buf.width
    if (pnltype == 1) {
        buf.arc(0, 0, rad, rad, 0, PI / 2)
        buf.arc(buf.width, buf.height, rad, rad, PI, 3 * PI / 2)
    }
    if (pnltype == 2) {
        buf.arc(buf.width, 0, rad, rad, PI / 2, PI) //NE
        buf.arc(0, buf.height, rad, rad, 3 * PI / 2, TAU)
    }

}