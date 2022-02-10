// Daily Sketch for 2022-02-09
// Ram Narasimhan.


/*
Rotating squares
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

    for (let rep = 0; rep < 19; rep++) {
        startX = random(width)
        baseY = rep * 50
        strokeWeight(int(random(4, 10)))
        stroke('white')
        //        line(startX, 100, startX, 800)
        drawAdjSquares(startX, baseY)
        print('after 1', startX + side)
        newX = drawAdjSquares(startX + side, baseY)
        // print('after 2', newX)
    }
    //    line(startX, 100, startX, 800)

    draw_border(clr = params.bgColor, sw = 50); //rn_utils.js
}

function drawAdjSquares(startX, baseY) {


    line(-100, baseY, 400, baseY)

    theta = PI / int(random(4, 10))

    verts = []
    r = side / 2 * Math.sqrt(2)
    for (angleMult of [1, 3, 5, 7]) {
        xRot = r * cos(-angleMult * PI / 4 + theta)
        yRot = r * sin(-angleMult * PI / 4 + theta)
        verts.push({ x: xRot, y: yRot })
    }
    vXmax = 0; vXmin = width;
    for (v of verts) {
        if (v.x > vXmax) { vXmax = v.x }
        if (v.x < vXmin) { vXmin = v.x }
    }
    print(vXmax, vXmin)

    //first square
    push();
    translate(startX + vXmin, baseY)
    beginShape()
    for (v of verts) {
        vertex(v.x, v.y)
    }
    endShape(CLOSE);
    pop();

    //second square
    push();
    translate(startX + vXmin + vXmax, baseY - side / 2)
    rect(0, 0, side, side)
    pop();
    vXmax = startX + vXmax

    print('came in with Startx', startX)
    print('ending with', vXmax)
    return vXmax
}