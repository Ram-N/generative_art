// Daily Sketch for 2021-09-09
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
    //palette = rainbowDash; //colors.js
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

        let from = color(random(palette2));
        let to = color(random(palette2));
        let interB = lerpColor(from, to, 0.66);
        fill(interB)
        rect(panel.x, panel.y, panel.pw, panel.ph)


        pcount += 1;
        push();
        translate(panel.cx, panel.cy);
        stroke(palette[pcount]);
        r1 = panel.pw / 3
        r2 = panel.ph / 7
        print(panel, r1)
        renderSpiro(r1, r2)
        pop();
    }
    draw_border(clr = 20, sw = 20); //rn_utils.js


}


function renderSpiro(r1, r2) {
    n1 = 5
    n2 = 7;
    let px = 0;
    let py = 0;
    //px = r1 + r2
    //py = 0;
    a_step = 0.01
    a2 = 0.02;
    px = r1 * cos(n1 * 0) + r2 * cos(n2 * a2)
    py = r1 * sin(n1 * 0) + r2 * sin(n2 * a2)
    for (a = 0; a <= TAU; a += a_step) {
        a2 += 0.02 * pcount;
        x = r1 * cos(n1 * a) + r2 * cos(n2 * a2)
        y = r1 * sin(n1 * a) + r2 * sin(n2 * a2)
        line(px, py, x, y)
        px = x;
        py = y;
    }

}

