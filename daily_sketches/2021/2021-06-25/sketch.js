// Daily Sketch for 2021-06-25
// Ram Narasimhan.

/*
The MANDALA Machine
SYMMETRY CONCENTRIC Circles

There is a director() which handles the randomizations.
and the displayMandala() simply renders it.
draw() is included

Draw Circles...
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
    layers: 6,
    petals: 8,
    bgColor: "#0f0f0f", //black
}

let layerColor = [];
let cFlag = [];
let ratioMult = [];

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
    angleMode(DEGREES);
    rectBg = random(palette2);

    for (layer = 0; layer < params.layers + 1; layer++) {
        layerColor[layer] = random(palette2)
        cFlag[layer] = 0
        if (random() < 0.3) {
            cFlag[layer] = 1
        }
        ratioMult[layer] = random([2, 3, 4]);
    }
}


function draw() {

    if (!(frameCount % 40)) {
        rectBg = prepBgRect();
    }
    displayBgRect(rectBg);

    numP = params.petals;
    radius = 360;
    strokeWeight(3)
    push();
    translate(width / 2, height / 2);
    rectMode(CENTER)
    incr = 60;
    let alphaValue = 100;
    for (layer = params.layers; layer >= 1; layer--) {
        stroke(rectBg)
        strokeWeight(10)
        alphaFill(layerColor[layer], alphaValue)
        displayLayer(radius, layer, numP, ratioMult[layer], cFlag[layer])
        radius -= incr
    }
    pop();

    draw_border(clr = 20, sw = 50); //rn_utils.js
    //noLoop();
}

function prepBgRect() {
    return (random(palette2));
}

function displayBgRect(rectBg) {
    fill(rectBg);
    rect(0, 0, width, height);
}

//r: radius
// ratio: tells you how to connect to other layers
function displayLayer(r, layerNumber, numPetals, rFactor, circleFlag) {

    angleOffset = 0
    let halfInc = 360 / numPetals / 2;
    if (layerNumber % 2) {
        angleOffset = halfInc;
    }

    r_inner = r - (incr / rFactor * layerNumber)
    //alphaFill(random(palette), 100)
    nPointedStar(r, r_inner, numPetals, angleOffset, circleFlag);

}

/* 
rUpper and rLower: Floats that specify two radii.
(Typically rUpper > rLower)
numPoints = n points along a circle, that form the n-pointed star
startAngle: The orientation of the first point in the Star
*/
function nPointedStar(rUpper, rLower, numPoints, startAngle, circleFlag) {

    let angleIncr = 360 / numPoints;
    let halfInc = angleIncr / 2;


    beginShape()
    for (petal = 0; petal < numPoints; petal++) {
        angle = startAngle + petal * angleIncr
        // circle(r * cos(angle), r * sin(angle), 5);
        // circle(r_inner * cos(angle + halfInc), r_inner * sin(angle + halfInc), 10);
        vertex(rUpper * cos(angle), rUpper * sin(angle));
        vertex(rLower * cos(angle + halfInc), rLower * sin(angle + halfInc));
    }
    endShape(CLOSE)
    if (circleFlag) {
        strokeWeight(7)
        noFill();
        circle(0, 0, 2 * rUpper)
    }

}

