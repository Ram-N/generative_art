// Daily Sketch for 2021-07-03
// Ram Narasimhan.

/*
SYMMETRY CONCENTRIC Circles
Multiple Mandalas

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
    petals: 13,
    bgColor: "#0f0f0f", //black
    largestRadius: 300,
}

let layerColor = [];
let cFlag = [];
let ratioMult = [];
let petalsInLayer = [];

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
    rectBg = palette2[1];

    petals = params.petals
    for (layer = 0; layer < params.layers + 1; layer++) {
        layerColor[layer] = random(palette)
        cFlag[layer] = 0
        if (random() < 0.3) {
            cFlag[layer] = 1
        }
        ratioMult[layer] = random(4, 5);
        petalsInLayer[layer] = petals;
        petals -= 1;

    }
}


function draw() {

    displayBgRect(rectBg);
    //radius = params.largestRadius;
    radius = 100
    incr = 20;
    strokeWeight(1)

    mandX = [width / 4, width / 4, 3 * width / 4, 3 * width / 4]
    mandY = [width / 4, 3 * width / 4, width / 4, 3 * width / 4]
    gridMax = 4
    gX = width / (gridMax)
    gY = height / (gridMax)
    for (mandX = 0; mandX < gridMax; mandX++) {
        for (mandY = 0; mandY < gridMax; mandY++) {
            push();
            translate(gX * mandX + (gX / 2), gY * mandY + (gY / 2))
            renderMandala(radius, incr);
            pop();
        }
    }
    draw_border(clr = 20, sw = 50); //rn_utils.js
    noLoop();
}

function renderMandala(radius, incr) {
    rectMode(CENTER)

    attribToModify = random(['circle', 'color', 'ratio', 'numPetals'])
    if (attribToModify == 'circle') {
        cFlag = updateCircleFlag(cFlag)
    }
    if (attribToModify == 'ratio') {
        ratioMult = updateRatio(ratioMult)
    }
    if (attribToModify == 'color') { // layercolor will change
        layerColor = updateLayerColor(layerColor)
    }
    if (attribToModify == 'numPetals') {
        petalsInLayer = updateAttrib(petalsInLayer)
    }

    let alphaValue = 100;
    for (layer = params.layers; layer >= 1; layer--) {
        //stroke(rectBg)
        stroke(222)
        strokeWeight(2)
        alphaFill(layerColor[layer], alphaValue)
        displayLayer(radius, layer, petalsInLayer[layer],
            ratioMult[layer], cFlag[layer])
        radius -= incr
    }
}

function updateRatio(ratioMult) {
    layerToChange = int(random(ratioMult.length))
    direction = chooseOne([1, 0.5, -0.5, -1])
    ratioMult[layerToChange] += direction // alter it slightly
    return ratioMult
}

function updateAttrib(_list) {
    layerToChange = int(random(_list.length))
    direction = chooseOne([1, -1])
    _list[layerToChange] += direction // alter it slightly
    return _list
}


function updateCircleFlag(cFlag) {
    cirToToggle = int(random(cFlag.length))
    if (cFlag[cirToToggle] == 1) {
        cFlag[cirToToggle] = 0
    } else {
        cFlag[cirToToggle] = 1
    }
    return cFlag
}

function updateLayerColor(_list) {
    layerToChange = int(random(_list.length))
    _list[layerToChange] = random(palette2) // change its property
    return _list
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
    //nPointedStar(r, r_inner, numPetals, angleOffset, circleFlag); //shape
    nPointedCurvedStar(r, r_inner, numPetals, angleOffset, circleFlag); //shape

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
        strokeWeight(2)
        noFill();
        circle(0, 0, 2 * rUpper)
    }

}

/* 
rUpper and rLower: Floats that specify two radii.
(Typically rUpper > rLower)
numPoints = n points along a circle, that form the n-pointed star
startAngle: The orientation of the first point in the Star
*/
function nPointedCurvedStar(rUpper, rLower, numPoints, startAngle, circleFlag) {

    let angleIncr = 360 / numPoints;
    let halfInc = angleIncr / 2;

    //circle(rUpper, 0, 20);
    //stroke(10)
    //circle(rLower * cos(startAngle + halfInc), rLower * sin(startAngle + halfInc), 20);

    beginShape()
    curveVertex(rUpper, 0)
    for (petal = 0; petal <= numPoints; petal++) {
        angle = startAngle + petal * angleIncr
        curveVertex(rUpper * cos(angle), rUpper * sin(angle));
        curveVertex(rLower * cos(angle + halfInc), rLower * sin(angle + halfInc));
    }

    //curveVertex(rUpper, 0)
    endShape()
    if (circleFlag) {
        strokeWeight(2)

        noFill();
        circle(0, 0, 2 * rUpper)
    }

}
