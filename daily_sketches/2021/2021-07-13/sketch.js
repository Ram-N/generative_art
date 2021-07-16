// Daily Sketch for 2021-07-13
// Ram Narasimhan.

/*
Keywords: Lines, Edge Connect

Desc: Use Noise to get a series of mid-points. Connect horizontal and vertical lines to it.
    */


let palette = []
let grid;
const cnv = {
    xMargin: 50,
    yMargin: 50,
}

const params = {
    layers: 3,
    petals: 10,
    bgColor: "#0f0f0f", //black
}


function setup() {
    createCanvas(660, 660);
    background(params.bgColor);
    draw_border(20);
    palette2 = purples;
    palette2 = replicate(palette2, 100)
    palette = red_brown_orange; //colors.js
    palette = replicate(palette, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    displayBgRect(random(palette))

    numSteps = 50
    yStep = cnv.height / numSteps
    xStep = cnv.width / numSteps
    currX = cnv.xMargin
    // draw a series of descending dots
    for (y = 0; y < numSteps; y++) {
        currX += random(xStep) * 2
        currY = yStep * y + cnv.yMargin
        line(0, currY, currX, currY)
        line(currX, 0, currX, currY)

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

