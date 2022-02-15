// Daily Sketch for 2022-02-14
// Ram Narasimhan.


/*
Half disks with corner spikes
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
    palette = gen2;
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

    pgrid.createSpiralPanelsList()
    print(pgrid.cols)

    numC = 0
    //First draw the corner lines
    for (p of pgrid.spiral) {
        if (numC < 104) {
            stroke(random(palette))
            strokeWeight(3)
            cornerX = p.x < width / 2 ? cnv.xMargin : width - cnv.xMargin;
            cornerY = p.y < height / 2 ? cnv.yMargin : height - cnv.yMargin
            line(p.x, p.y, cornerX, cornerY)
            numC++;
        }
    }

    numC = 0
    for (p of pgrid.spiral) {
        if (numC < 104) {
            push();
            stroke(random(palette))
            fill(random(palette))
            strokeWeight(3)
            translate(p.x, p.y)
            circle(0, 0, p.w * 1.0)
            fill(random(palette))
            circle(0, 0, p.w * 0.6)
            fill(random(palette))
            circle(0, 0, p.w * 0.4)
            pop();
            numC++;
        }
    }


    draw_border(clr = params.blkColor, sw = 50); //rn_utils.js
}

