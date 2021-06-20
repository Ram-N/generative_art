// Daily Sketch for 2021-06-21
// Ram Narasimhan.

/*
MANDALA
SYMMETRY
CONCENTRIC Circles and Squares...

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
    petals: 6,
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
    fill(random(palette2));
    //rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);
    rect(0, 0, width, height);

    angleMode(DEGREES);
    numP = params.petals;
    side = 280 * 2;
    strokeWeight(3)
    push();
    translate(width / 2, height / 2);
    rectMode(CENTER)
    mult = Math.sqrt(2);
    ratio = 1 / mult;
    let alphaValue = 100;
    for (layer = 5; layer >= 1; layer--) {
        mult *= ratio
        stroke(20)
        c = color(random(palette2));
        c.setAlpha(alphaValue);
        fill(c);
        rect(0, 0, side * mult, side * mult)
        c = color(random(palette2));
        c.setAlpha(alphaValue);
        fill(c);
        radius = side * mult / 2
        displayLayer(radius, layer, numP)
    }
    pop();

    draw_border(clr = 20, sw = 50); //rn_utils.js

}

//r: radius
// ratio: tells you how to connect to other layers
function displayLayer(r, layerNumber, numPetals) {

    let increment = 360 / numPetals;
    let halfInc = increment / 2;
    angleOffset = 0
    if (layerNumber % 2) {
        angleOffset = halfInc;
    }

    r_inner = r * ratio
    inner_angle = increment + angleOffset
    fill(random(palette))
    beginShape()
    for (petal = 0; petal < numPetals; petal++) {
        push();
        angle = angleOffset + petal * increment
        rotate(angle);
        circle(r, 0, 10)
        line(r, 0, r_inner * cos(halfInc), r_inner * sin(halfInc))
        line(r, 0, r_inner * cos(-halfInc), r_inner * sin(-halfInc))
        vertex(r_inner * cos(angle + halfInc), r_inner * sin(angle + halfInc));
        vertex(r * cos(angle), r * sin(angle));
        vertex(r_inner * cos(angle - halfInc), r_inner * sin(angle - halfInc));
        pop();
    }
    endShape(CLOSE)
}