// Daily Sketch for 2021-09-12
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
    palette = red_brown_orange;
    //palette = cappuccino; //colors.js
    //palette = rainbowDash; //colors.js
    palette = replicate(palette, 100)
    palette2 = take5; //colors.js
    palette2 = replicate(palette2, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width

    r1 = params.r1
    r2 = params.r2

    //Custom Tiling
    colSplit = [1, 1, 1, 1, 1]
    rowSplit = [1, 1, 1, 1, 1]
    pgrid = new PanelGrid(cnv, colSplit, rowSplit)

    angleMode(DEGREES);
    strokeWeight(3)
    stroke(palette[2]);
    pcount = 0;
    for (panel of pgrid.panels) {

        let from = color(random(palette2));
        let to = color(random(palette2));
        let interB = lerpColor(from, to, 0.66);
        fill(interB)
        rect(panel.x, panel.y, panel.pw, panel.ph)
        for (ph = 0; ph < 0.1; ph += 0.1) {
            pcount += 2;
            sp1(ph, pcount);
        }
    }
    draw_border(clr = 20, sw = 20); //rn_utils.js


}

function sp1(phase, pcount) {
    push();
    translate(panel.cx, panel.cy);
    r2 = int(random(1, 10));
    r1 = r2 * int(random(12, 22));
    r2 = 4;
    r1 = 48;
    p = int(random(5, 15));
    p = pcount + 1;
    print(r1, r2, p)
    renderSpiro(r1, r2, p, phase)
    pop();
}


// These are the correct equations: https://linuxgazette.net/133/luana.html
//    x(t,R,r,p) = (R-r)*cos(t) + p*cos((R-r)*t/r)
//   y(t,R,r,p) = (R-r)*sin(t) - p*sin((R-r)*t/r)

function renderSpiro(r1, r2, p, phase = 0) {
    let px = 0;
    let py = 0;

    aStep = 1;
    a = 0;
    px = (r1 - r2) * cos(a) + p * cos((r1 - r2) * a / r2)
    py = (r1 - r2) * sin(a) + p * sin((r1 - r2) * a / r2)
    for (a = phase; a <= 360 + phase; a += aStep) {
        x = (r1 - r2) * cos(a) + p * cos((r1 - r2) * a / r2)
        y = (r1 - r2) * sin(a) + p * sin((r1 - r2) * a / r2)
        line(px, py, x, y)
        px = x;
        py = y;
    }

}

