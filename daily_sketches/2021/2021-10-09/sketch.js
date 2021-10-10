// Daily Sketch for 2021-10-09
// Ram Narasimhan.

/*

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
    bgColor: (50, 20, 50),
    blkColor: (0, 0, 0),
}



function setup() {
    createCanvas(960, 960);
    colorMode(HSB);
    background(params.bgColor);
    palette = Hgreen_yellow; //colors.js
    palette = replicate(palette, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(params.blkColor);
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);

    numIterations = 5;
    numCubes = 350;
    for (it = 1; it < numIterations; it++) {
        for (c = 0; c < numCubes; c++) {
            x = int(random(width / 5)) * 5;
            y = int(random(height / 5)) * 5;
            cuboid(x, y, clen = int(random(200 / it)), cw = int(random(100 / it)), ch = int(random(500 / it)), pal = Hgreen_yellow);
        }
    }

    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js

}

//dimensions: cw, ch, clen
function cuboid(x, y, clen, cw, ch, pal) {

    let hu = 0; let sa = 0; let br = 0;

    push();
    translate(x, y)
    xnwb = cw * cos(PI / 4)
    ynwb = cw * sin(PI / 4) * -1
    xneb = xnwb + clen;
    yneb = ynwb;
    xnef = clen;
    ynef = 0;
    xseb = xneb;
    yseb = yneb + ch;
    xsef = clen;
    ysef = ch;
    hu = 0; sa = 0; br = 0;
    [hu, sa, br] = random(pal);
    fill(hu, sa, br);
    rect(0, 0, clen, ch) // front plate
    hu = 0; sa = 0; br = 0;
    [hu, sa, br] = random(pal);
    fill(hu, sa * 0.7, br);
    quad(0, 0, xnwb, ynwb, xneb, yneb, xnef, ynef) // top lid

    hu = 0; sa = 0; br = 0;
    [hu, sa, br] = random(pal);
    fill(hu, sa, br * 0.7);

    quad(xnef, ynef, xneb, yneb, xseb, yseb, xsef, ysef) // side wall
    pop();
}