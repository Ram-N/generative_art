// Daily Sketch for 2021-06-23
// Ram Narasimhan.

/*
MANDALA - 5
SYMMETRY CONCENTRIC Circles

palList = [rainbowDash, take5, cappuccino, purples, melons, 
    red_brown_orange, red_orange, greys]
    */


let palette = []
let grid;
const cnv = {
    xMargin: 50,
    yMargin: 50,
}

const params = {
    layers: 5,
    petals: 8,
    bgColor: "#0f0f0f", //black
}


function setup() {
    createCanvas(660, 660);
    background(params.bgColor);
    //background("#0F0F0F");
    draw_border(20); //rn_utils.js
    palette2 = take5;
    palette2 = replicate(palette2, 100)
    palette = red_brown_orange; //colors.js
    palette = replicate(palette, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    rectBg = random(palette2);
    fill(rectBg);
    //rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);
    rect(0, 0, width, height);

    angleMode(DEGREES);
    numP = params.petals;
    radius = 320;
    strokeWeight(3)
    push();
    translate(width / 2, height / 2);
    rectMode(CENTER)
    incr = 40;
    let alphaValue = 100;
    for (layer = 7; layer >= 1; layer--) {
        stroke(rectBg)
        strokeWeight(10)
        c = color(random(palette2));
        c.setAlpha(alphaValue);
        fill(c);
        displayLayer(radius, layer, numP)
        radius -= incr
    }
    pop();

    draw_border(clr = 20, sw = 50); //rn_utils.js

}

//r: radius
// ratio: tells you how to connect to other layers
function displayLayer(r, layerNumber, numPetals) {

    angleOffset = 0
    let halfInc = 360 / numPetals / 2;
    if (layerNumber % 2) {
        angleOffset = halfInc;
    }

    r_inner = r - (incr / 2 * layerNumber)
    nPointedStar(r, r_inner, numPetals, angleOffset);

}

/* 
rUpper and rLower: Floats that specify two radii.
(Typically rUpper > rLower)
numPoints = n points along a circle, that form the n-pointed star
startAngle: The orientation of the first point in the Star
*/
function nPointedStar(rUpper, rLower, numPoints, startAngle) {

    let angleIncr = 360 / numPoints;
    let halfInc = angleIncr / 2;

    fill(random(palette))
    beginShape()
    for (petal = 0; petal < numPoints; petal++) {
        angle = startAngle + petal * angleIncr
        // circle(r * cos(angle), r * sin(angle), 5);
        // circle(r_inner * cos(angle + halfInc), r_inner * sin(angle + halfInc), 10);
        vertex(rUpper * cos(angle), rUpper * sin(angle));
        vertex(rLower * cos(angle + halfInc), rLower * sin(angle + halfInc));
    }
    endShape(CLOSE)
    print(rUpper, incr, rLower)

}