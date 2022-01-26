// Daily Sketch for 2022-01-25
// Ram Narasimhan.

let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}

const params = {
    tw: 80, // triangle width within the Hexgrid
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
    palette = random(palList)
    palette = replicate(palette, 100)
    palette2 = random(palList)
    palette2 = replicate(palette2, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(params.blkColor);
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);

    //pick a vanishing point
    let x = random(0.3, 0.8) * width
    let y = 0.4 * height
    vp = createVector(x, y)

    drawGridlines(vp);
    //drawVertLine(vp, 100);
    numPerSide = 150;
    for (rep = 0; rep <= numPerSide; rep++) {
        frac = random(1, 10) * 0.1
        ht = int(random(30, 100))
        drawPerspRect(vp, ht, frac, palette);
    }

    //blockRect(vp);

    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}


function blockRect(vp) {
    fill(params.blkColor)
    rdim = 50;
    noStroke();
    rect(vp.x - rdim / 2, vp.y - rdim / 2, rdim, rdim)
}

function drawPerspRect(vp, lineht, frac, palette) {

    x = random(width);
    y = random(height);
    ptU = createVector(x, y)
    ptV = createVector(x, y + lineht)

    viaU = p5.Vector.lerp(ptU, vp, frac);
    viaV = p5.Vector.lerp(ptV, vp, frac);
    push();
    noStroke();
    //stroke(random(palette))
    stroke(0, 0, 0)
    fill(random(palette))
    if (ptU.y > vp.y) {
        fill(random(palette2))
    }
    quad(ptV.x, ptV.y, ptU.x, ptU.y,
        viaU.x, viaU.y, viaV.x, viaV.y)
    pop();

}


function drawVertLine(vp, lineht) {
    fill(200, 10, 100)
    stroke("red")

    x = random(width / 2);
    y = random(height / 4);
    ptU = createVector(x, y)
    ptV = createVector(x, y + lineht)

    numPerSide = 10;
    for (rep = 0; rep <= numPerSide; rep++) {
        frac = rep * 0.1;
        viaU = p5.Vector.lerp(ptU, vp, frac);
        viaV = p5.Vector.lerp(ptV, vp, frac);
        print(viaU.x, viaV.x)
        line(viaU.x, viaU.y, viaV.x, viaV.y)

    }


}

function drawGridlines(vp) {
    fill(200, 10, 100)
    stroke(200, 10, 80)
    //circle(vp.x, vp.y, 10)
    numPerSide = 10;
    for (rep = 0; rep <= numPerSide; rep++) {
        y = height / numPerSide * rep;
        line(0, y, vp.x, vp.y)
        line(width, y, vp.x, vp.y)
        line(y, 0, vp.x, vp.y)
        line(y, height, vp.x, vp.y)

    }


}


