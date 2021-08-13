// Daily Sketch for 2021-08-12
// Ram Narasimhan

/*
Overlaid leaves...shades of alpha

*/


const cnv = {
    xMargin: 50,
    yMargin: 50,
}

let palette = []
const params = {
    //    bgColor: "#F1E0EA",
    //bgColor:"#EAB6AB"
    bgColor: "#0f0f0f", //black
    //    bgColor: '#ab3977', //black
    numLeaves: 400,

}


function setup() {
    createCanvas(660, 660);
    colorMode(HSB);
    background(0, 0, 0);

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    print(cnv)
    xstart = cnv.xMargin
    ystart = cnv.yMargin
    xend = cnv.xMargin + cnv.width
    yend = cnv.yMargin + cnv.height
    midX = width / 2
    midY = height / 2

    color_vary = 20;
    alpha = 0.5;
    for (leaf = 0; leaf < params.numLeaves; leaf++) {
        fill(120 - int(leaf / 3) + random(-color_vary, color_vary),
            random(50, 60), random(68, 70), leaf / params.numLeaves);
        render_leaf(random(width), random(height))
    }

    draw_border(clr = 20, sw = 50); //rn_utils.js
}


function render_leaf(x, y) {
    leafLen = random(30, 120)
    yTilt = random(-20, 20);

    yOffset = leafLen / 3.0
    noStroke();
    for (mult of [1, -1]) {
        push();
        translate(x, y)
        beginShape();
        curveVertex(0, 0);
        curveVertex(leafLen / 2, yTilt - yOffset * mult);
        curveVertex(leafLen, yTilt);
        endShape(CLOSE);
        pop();
    }
}


