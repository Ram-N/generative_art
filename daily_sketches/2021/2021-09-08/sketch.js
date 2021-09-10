// Daily Sketch for 2021-09-08
// Ram Narasimhan.
/*

Keywords: Spirograph
http://www.eddaardvark.co.uk/python_patterns/spirograph.htm

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
    r1: 80,
    r2: 60,
}


function setup() {
    createCanvas(960, 960);
    background("#d3d3d3");
    //background("#0F0F0F");
    fill("#0f0f0f");
    draw_border(20); //rn_utils.js
    palette = cappuccino; //colors.js
    palette = rainbowDash; //colors.js
    palette = replicate(palette, 100)
    palette2 = take5; //colors.js
    palette2 = replicate(palette2, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width

    r1 = params.r1
    r2 = params.r2
    strokeWeight(2)

    //Custom Tiling
    colSplit = [1, 1, 1,]
    rowSplit = [3, 3, 3,]
    pgrid = new PanelGrid(cnv, colSplit, rowSplit)

    pcount = 0;
    for (panel of pgrid.panels) {
        push();
        translate(panel.cx, panel.cy);
        renderSpiro(r1, r2)
        pop();
        pcount += 1;
    }
    draw_border(clr = 20, sw = 20); //rn_utils.js


}


function renderSpiro(r1, r2) {
    n1 = 1;
    n2 = 1 + pcount;
    let px = 0;
    let py = 0;
    px = r1 * cos(0) + r2 * cos(n2 * 0)
    py = r1 * sin(0) + r2 * sin(n2 * 0)
    //px = r1 + r2
    //py = 0;
    a_step = 0.01
    a2 = 0;
    for (a = 0; a <= TAU; a += a_step) {
        a2 += 0.05;
        x = r1 * cos(n1 * a) + r2 * cos(n2 * a2)
        y = r1 * sin(n1 * a) + r2 * sin(n2 * a2)
        line(px, py, x, y)
        px = x;
        py = y;
    }

}

