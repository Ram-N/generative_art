// Daily Sketch for 2021-11-23
// Ram Narasimhan.

/*
Desc: 3x3 Backgrounds inside panel boxes
Neon Circloids 
Satellites of satellites
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
    palette2 = random(HSBpalList)
    palette = replicate(palette, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(params.blkColor);
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);
    pgrid = createSquareGrid(5);

    buffers = []; //off-screen tile buffers
    for (p of pgrid.panels) {
        push();
        _box = new Bbox(p.x, p.y, p.w, p.h);
        BgParams.numLayers = random([0, 2, 3]);
        BgParams.palette = palette2;
        coloredWall(_box, BgParams)
        pop();
        buffers.push(createGraphics(p.w, p.h))
    }


    //create the mini-canvases as buffers, and paint them as images 
    for (const [index, p] of pgrid.panels.entries()) {
        print('new Panel', index)
        drawCircloids(buffers[index])
        image(buffers[index], p.x, p.y);
    }

    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}

radii = [15, 12, 10, 5]

function drawCircloids(buf) {
    buf.colorMode(HSB);
    coords = []
    //buf.background(255, 100, 255);
    buf.fill(0, 0, 0);
    bw2 = buf.width / 2;
    bh2 = buf.height / 2;
    bigRadius = buf.width * 0.5;
    bigX = random(buf.width / 4, buf.width * 0.75)
    bigY = buf.height - (1 / 4 * bigRadius)
    coords.push(new Circ(bigX, bigY, bigRadius))

    //medium satellites
    prevRadius = bigRadius;
    prevX = bigX
    prevY = bigY;
    for (ang in [0, 1]) {
        for (c in [0, 1]) {
            var rad = random(radii) + buf.width / 4
            angle = random(PI + PI / 2 * ang, 3 / 2 * PI + PI / 2 * ang)
            x = prevX + rad * cos(angle)
            y = prevY + rad * sin(angle)
            coords.push(new Circ(x, y, rad))
        }
    }

    //tiny
    tiny = []
    num = 8;
    for (c in Array.from(Array(num).keys())) {
        angle = PI + PI / num * c;
        rad = buf.width / 12;
        extension = buf.width / 5
        x = bigX + (bigRadius / 2 + extension) * cos(angle)
        y = bigY + (bigRadius / 2 + extension) * sin(angle)
        //if for overlaps. Add if no overlaps
        cTiny = new Circ(x, y, rad);
        valid = 1;
        for (existing of coords) {
            if (overlap(cTiny, existing)) {
                valid = 0;
            }
        }
        if (valid) {
            tiny.push(cTiny)
        }
    }


    //do the actual rendering
    buf.noStroke()
    for (outline in [0, 1, 2, 3]) {
        buf.fill(140, 100 - 10 * outline, 100 - 10 * outline);
        sc = (1 - outline * 0.15)
        for (co of coords) {
            buf.circle(co.x, co.y, co.radius * sc);
        }
    }

    buf.fill(0, 0, random(0, 50)); //black
    for (t of tiny) {
        buf.circle(t.x, t.y, t.radius);
    }

}


function overlap(cTiny, existing) {
    if (dist(cTiny.x, cTiny.y, existing.x, existing.y) < (cTiny.radius + existing.radius) / 2) {
        return 1// overlap detected
    }
    return 0
}

class Circ { // Coords of a cirlce
    constructor(x, y, r) {
        this.x = x; // center x
        this.y = y; //center y
        this.radius = r;
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
