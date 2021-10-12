// Daily Sketch for 2021-10-12
// Ram Narasimhan.

/*
Cuboid shapes
*/


let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}

const params = {
    xStep: 25,
    yStep: 25,
    bgColor: (50, 20, 50),
    blkColor: (0, 0, 0),
}



function setup() {
    createCanvas(960, 960);
    colorMode(HSB);
    background(params.bgColor);
    palette = Hgreen_yellow; //colors.js
    palette = replicate(palette, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(params.blkColor);
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);

    numIterations = 5;
    numCubes = 150;
    for (it = 1; it < numIterations; it++) {
        pal = random([Hred_orange, HrainbowDash, Htake5, Hflame])
        for (c = 0; c < numCubes; c++) {
            x = int(random(width / 5)) * 5 - 5;
            y = int(random(height / 5)) * 5 - 5;

            if ((x <= width / 2) && (y <= height / 2)) {
                pers = "Below"
                view = "L"
            } else if ((x > width / 2) && (y <= height / 2)) {
                pers = "Below"
                view = "R"
            } else if ((x <= width / 2) && (y > height / 2)) {
                pers = "Above"
                view = "L"
            } else if ((x > width / 2) && (y > height / 2)) {
                pers = "Above"
                view = "R"
            }

            clen = int(random(120 / it, 200 / it));
            cw = int(random(50 / it, 200 / it));
            ch = int(random(50 / it, 100 / it));

            cuboid(x, y, clen, cw = int(random(80 / it)), ch,
                _perspective = pers,
                view = view,
                pal = pal); //rn_shapes.js
        }
    }

    print('cub')
    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}



