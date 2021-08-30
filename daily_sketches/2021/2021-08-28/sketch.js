// Daily Sketch for 2021-08-28
// Ram Narasimhan

/*
Geometric Design using Circles
*/


const cnv = {
    xMargin: 30,
    yMargin: 30,
}

let palette = []
const params = {
    bgColor: "#0f0f0f", //black
}

sqSize = 660;

function setup() {
    createCanvas(sqSize, sqSize);
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

    palette2 = red_brown_orange; //colors.js
    palette = flame;
    palette = replicate(palette, 100)
    palette2 = replicate(palette2, 100)

    rMax = 300;
    rMin = 100;
    rStep = 25;
    j = 0;
    for (r = rMax; r > rMin; r -= rStep) {
        push();
        fill(random(palette))
        translate(width / 2, height / 2);
        circle(0, 0, r);
        j += 2
        for (i = 0; i < 8; i++) {
            fill(palette2[i + j])
            angle = PI / 4 * i;
            cx = r * cos(angle);
            cy = r * sin(angle);
            circle(cx, cy, r)
        }
        pop();
    }

    draw_border(clr = params.bgColor, sw = 50); //rn_utils.js
}







