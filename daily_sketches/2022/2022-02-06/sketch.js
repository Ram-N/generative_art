// Daily Sketch for 2022-02-06
// Ram Narasimhan.


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


function setup() {

    createCanvas(960, 960);
    colorMode(HSB);
    background(params.blkColor);
    print(params.bgColor)
    palette2 = HrainbowDash; //colors.js
    //palette2 = Hcappuccino; //colors.js
    palette2 = random(palList)
    palette = replicate(palette, 100)

    vegPalette = getVegPalette();

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(params.blkColor);
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);
    pgrid = createSquareGrid(12);


    for (p of pgrid.panels) {
        push();
        _box = new Bbox(p.x, p.y, p.w, p.h);
        colr = random(vegPalette);
        drawLeaf(_box, colr)
        pop();
    }

    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}


function drawLeaf(_box, colr) {

    push();
    translate(_box.cx, _box.cy)
    rotate(PI)
    rotate(random(-0.2, 0.2))
    stroke(colr);
    fill(colr);
    strokeWeight(3);
    au = _box.w / 16

    baseY = au * random([1, 2, 3]) * 2
    baseX = au * random([0, 1, 2])
    mid1X = au * random([1, 2, 3, 4, 5])
    mid2X = au * random([1, 2, 3, 4, 5])
    for (const flip of [1, -1]) {
        push();
        base = { x: baseX, y: baseY }
        tip = { x: baseX, y: _box.h / 4 * -1 }
        mid1 = { x: flip * mid1X, y: _box.h / 8 }
        mid2 = { x: flip * mid2X, y: -1 * _box.h / 4 }
        bezier(base.x, base.y, mid1.x, mid1.y, mid2.x, mid2.y, tip.x, tip.y)
        pop();
    }

    pop();

}

function getVegPalette() {
    pal = []
    for (rep = 0; rep < 10; rep++) {
        h = int(random(110, 130));
        s = int(random(5, 10)) * 10;
        b = int(random(5, 10)) * 10;
        pal.push([h, s, b])
    }
    return pal
}




