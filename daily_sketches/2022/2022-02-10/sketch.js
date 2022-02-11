// Daily Sketch for 2022-02-10
// Ram Narasimhan.


/*
Rotating squares that touch
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

    highestY = 0
    for (let repY = 0; repY < 8; repY++) {
        startX = 0
        baseY += highestY + side / 2
        print('baseY', baseY, repY)
        for (let rep = 0; rep < 5; rep++) {
            fill(random(palette))
            res = drawAdjSquares(startX, baseY)
            startX = res.startX;
            maxY = res.maxY;
            print(maxY, 'Y', repY, rep)
            if (maxY > highestY) { highestY = maxY }
            print(`after ${rep} ${startX} ${highestY}`)
        }
    }

    draw_border(clr = params.bgColor, sw = 50); //rn_utils.js
}

function drawAdjSquares(startX, baseY) {

    theta = PI / int(random(4, 10))

    verts = []
    r = side / 2 * Math.sqrt(2)
    for (angleMult of [1, 3, 5, 7]) {
        xRot = r * cos(-angleMult * PI / 4 + theta)
        yRot = r * sin(-angleMult * PI / 4 + theta)
        verts.push({ x: xRot, y: yRot })
    }
    vXmax = 0; vXmin = width;
    vYmax = 0;
    for (v of verts) {
        if (v.x > vXmax) { vXmax = v.x }
        if (v.x < vXmin) { vXmin = v.x }
        if (v.y > vYmax) { vYmax = v.y }
    }

    //first square
    cX = startX - vXmin;
    push();
    translate(cX, baseY);
    beginShape()
    for (v of verts) {
        vertex(v.x, v.y)
    }
    endShape(CLOSE);
    pop();

    //second square
    push();
    translate(cX + vXmax, baseY - side / 2)
    rect(0, 0, side, side)
    pop();
    vXmax = cX + vXmax + side

    return { startX: vXmax, maxY: vYmax }
}