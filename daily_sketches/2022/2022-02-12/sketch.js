// Daily Sketch for 2022-02-12
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

    sqSide = 15
    pgrid = createSquareGrid(sqSide)
    //pgrid.display()

    g = 1;
    w = 0; //width of the spiral

    cx = int(sqSide / 2);
    cy = cx;
    for (let n = 0; n < cx; n++) {

        fill(palette[n])
        p0 = { x: n * (g + w), y: -(g + w) * n }
        p1 = { x: n * (g + w), y: (g + w) * n }
        p2 = { x: -(g + w) * n, y: (g + w) * n }
        p3 = { x: -(g + w) * n, y: -(g + w) * n - 1 };

        //p0 to p1. 
        for (let sqy = p0.y; sqy < p1.y; sqy++) {
            pnl = pgrid.getPanelFromCR(cx + p0.x, cy + sqy)
            rect(pnl.x, pnl.y, pnl.w, pnl.h)
        }

        //p1 to p2 
        for (let sqx = p1.x; sqx > p2.x; sqx--) {
            pnl = pgrid.getPanelFromCR(cx + sqx, cy + p2.y)
            rect(pnl.x, pnl.y, pnl.w, pnl.h)
        }



        //p2 to p3. 
        for (let sqy = p2.y; sqy > p3.y; sqy--) {
            pnl = pgrid.getPanelFromCR(cx + p2.x, cy + sqy)
            rect(pnl.x, pnl.y, pnl.w, pnl.h)
        }

        //p3 to p0
        for (let sqx = p3.x; sqx < p0.x; sqx++) {
            pnl = pgrid.getPanelFromCR(cx + sqx, cy + p3.y)
            rect(pnl.x, pnl.y, pnl.w, pnl.h)
        }


    }


    // for (p of pgrid.panels) {
    //     push();
    //     stroke(random(palette))
    //     fill(random(palette))
    //     strokeWeight(3)
    //     translate(p.x + 45, p.y + 40)
    //     circle(0, 0, p.w * 2.4)
    //     fill(random(palette))
    //     circle(0, 0, p.w * 1.8)
    //     fill(random(palette))
    //     circle(0, 0, p.w * 1.2)
    //     pop();
    // }

    draw_border(clr = params.bgColor, sw = 50); //rn_utils.js
}

