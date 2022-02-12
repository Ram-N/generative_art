// Daily Sketch for 2022-02-11
// Ram Narasimhan.


/*
Half disks
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
    base = 960
    createCanvas(base, base);
    //colorMode(HSB);
    background(params.blkColor);

    palette = random(RGBPalList);
    palette = replicate(palette, 100)
    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width

    noFill();

    side = 100

    baseY = 0
    stroke('white')

    strokeWeight(int(random(3)))

    pgrid = createSquareGrid(10)
    //pgrid.display()

    for (p of pgrid.panels) {
        push();
        stroke(random(palette))
        fill(random(palette))
        strokeWeight(3)
        translate(p.x + 45, p.y + 40)
        circle(0, 0, p.w * 2.4)
        fill(random(palette))
        circle(0, 0, p.w * 1.8)
        fill(random(palette))
        circle(0, 0, p.w * 1.2)
        pop();
    }

    draw_border(clr = params.bgColor, sw = 50); //rn_utils.js
}

