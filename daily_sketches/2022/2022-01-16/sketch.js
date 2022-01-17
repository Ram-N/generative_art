// Daily Sketch for 2022-01-16
// Ram Narasimhan.


/*
Color gradients gone wrong...
*/

let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}


const params = {
    xStep: 20,
    yStep: 20,
    bgColor: "#d3d3d3",
    blkColor: "#0f0f0f",
}



function setup() {

    createCanvas(960, 960);
    background(params.blkColor);
    colorMode(HSB);

    palette = random(RGBPalList);
    palette = replicate(palette, 100)
    palette2 = random(palList)
    palette2 = replicate(palette2, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width

    coloredSquares();
    push();
    translate(width / 2, height / 2)

    xStart = 300;
    strokeWeight(5)
    for (i = 0; i < 360; i++) {
        rotate(TAU / 360);
        stroke(i, 100, 100, 0.5)
        line(xStart, jitter(-20, 20), xStart + 70, 0);
        stroke(360 - i + jitter(-50, 50), 100, 100, 0.4)
        line(xStart + jitter(-10, 10), jitter(-3, 3), xStart + 70 + jitter(-30, 30), jitter(-3, 10));
        stroke(240 - i + jitter(-50, 50), 80, 100, 0.6)
        line(xStart + 50 + jitter(-10, 10), jitter(-3, 3), xStart + 220 + jitter(-30, 30), jitter(-3, 10));

    }


    xStart = 50;
    strokeWeight(20);
    for (i = 0; i < 36; i++) {
        r = 200;
        rotate(TAU / 36);
        stroke(i + jitter(100), 100, 100, 0.5)
        line(r * cos(0), r * sin(0), r * cos(TAU / 36), r * sin(TAU / 36));
        stroke((i * i + jitter(100)) % 90, 100, 100, 0.5)
        r += 35;
        line(r * cos(0), r * sin(0), r * cos(TAU / 36), r * sin(TAU / 36));
        stroke(200 + (i + jitter(100)) % 21, 100, 100, 0.5)
        if (random() < 0.05) {
            stroke(i + jitter(10), 100, 100, 0.5)
        }
        r += 35;
        line(r * cos(0), r * sin(0), r * cos(TAU / 36), r * sin(TAU / 36));
    }
    pop();


    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}


function coloredSquares() {
    push();
    translate(width / 2, height / 2)
    for (y = 0; y < 18; y++) {
        row = y * 20 - 180
        for (x = 0; x < 18; x++) {
            col = x * 20 - 180
            fill(int(random(100, 120)) + (y * 36 + x * x) % 200 + jitter(-19, 19), random(50, 80), 100, 0.5)
            rect(col, row, 35, 30)
        }
    }

    pop();

}