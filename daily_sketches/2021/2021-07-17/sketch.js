// Daily Sketch for 2021-07-17
// Ram Narasimhan.

/*
Keywords: Lines, Edge Connect

Desc: Use Noise to get a series of mid-points. Connect horizontal and vertical lines to it.
With halfway splits...
    */


let palette = []
let grid;
const cnv = {
    xMargin: 50,
    yMargin: 50,
}

const params = {
    bgColor: "#0f0f0f", //black
}


function setup() {
    createCanvas(660, 660);
    background(params.bgColor);
    draw_border(20);
    palette2 = purples;
    palette2 = replicate(palette2, 100)
    palette = red_brown_orange; //colors.js
    palette = cappuccino; //colors.js
    palette = replicate(palette, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    bg = random(palette2)
    displayBgRect(bg)

    numEcho = 50
    yStep = cnv.height / (numEcho + 10)
    xStep = cnv.width / numEcho
    xOffset = 60
    yOffset = 100
    aX = cnv.xMargin + xOffset
    yStart = yOffset + cnv.yMargin;
    // draw a series of descending dots
    strokeWeight(4);
    bX = aX + xStep;
    bYOffset = 40;
    cYOffset = 30;

    for (y = 0; y <= numEcho; y++) {
        beginShape()
        fill(random(palette))
        if (y == numEcho) {
            fill(bg)
        }

        aX += random(xStep)
        aY = yStep * y + yStart

        bX = aX + xStep
        bY = aY - bYOffset

        cY = bY
        cX = bX + 5 * xStep

        dY = cY - cYOffset
        dX = cX + 3 * xStep
        vertex(0, height)
        vertex(0, aY)
        vertex(aX, aY)
        vertex(bX, bY)
        vertex(cX, cY)
        vertex(dX, dY)
        vertex(width, dY)
        vertex(width, height)
        endShape(CLOSE)
    }


    draw_border(clr = 20, sw = 50); //rn_utils.js
}





function prepBgRect() {
    return (random(palette2));
}

function displayBgRect(rectBg) {
    fill(rectBg);
    rect(0, 0, width, height);
}

