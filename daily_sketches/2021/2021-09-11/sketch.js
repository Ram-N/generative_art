// Daily Sketch for 2021-09-11
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
    palette = random(palList);
    //palette = cappuccino; //colors.js
    //palette = rainbowDash; //colors.js
    palette = replicate(palette, 100)
    palette2 = take5; //colors.js
    palette2 = replicate(palette2, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width

    r1 = params.r1
    r2 = params.r2
    strokeWeight(3)

    //Custom Tiling
    colSplit = [1]
    rowSplit = [1]
    pgrid = new PanelGrid(cnv, colSplit, rowSplit)

    angleMode(DEGREES);
    for (panel of pgrid.panels) {

        let from = color(random(palette2));
        let to = color(random(palette2));
        let interB = lerpColor(from, to, 0.66);
        fill(interB)
        rect(panel.x, panel.y, panel.pw, panel.ph)
        pcount = 0;
        for (ph = 0; ph < 0.1; ph += 0.1) {
            pcount += 1;
            sp1(ph);
        }
    }
    draw_border(clr = 20, sw = 20); //rn_utils.js


}

function sp1(phase) {
    push();
    translate(panel.cx, panel.cy);
    stroke(random(palette));
    r1 = panel.pw / 3
    r2 = panel.ph / (5 + int(random(1, 20)))
    print(r1, r2)
    renderSpiro(r1, r2, phase)
    pop();
}


function renderSpiro(r1, r2, phase = 0) {
    n1 = 1
    n2 = 30;
    let px = 0;
    let py = 0;
    //px = r1 + r2
    //py = 0;
    aStep = 1;
    a2 = 0;
    px = r1 * cos(n1 * 0) + r2 * cos(n2 * a2)
    py = r1 * sin(n1 * 0) + r2 * sin(n2 * a2)
    for (a = phase; a <= 360 + phase; a += aStep) {
        a2 += 3;
        r2 = 20 + (a % 4) * 35
        x = r1 * cos(n1 * a) + r2 * cos(n2 * a2)
        y = r1 * sin(n1 * a) + r2 * sin(n2 * a2)
        line(px, py, x, y)
        px = x;
        py = y;
    }

}

