// Daily Sketch for 2021-10-13
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

    numIterations = 10;
    numCubes = 20;
    for (it = 1; it < numIterations; it++) {
        pal = random([Hred_orange, HrainbowDash, Htake5, Hflame]);
        for (c = 0; c < numCubes; c++) {

            x = -100 + c * 40 + 70 * it
            y = -100 + 35 * it + 20 * c

            // if ((x <= width / 2) && (y <= height / 2)) {
            pers = "Below"
            view = "L"
            // } else if ((x > width / 2) && (y <= height / 2)) {
            //     pers = "Below"
            //     view = "R"
            // } else if ((x <= width / 2) && (y > height / 2)) {
            //     pers = "Above"
            //     view = "L"
            // } else if ((x > width / 2) && (y > height / 2)) {
            //     pers = "Above"
            //     view = "R"
            // }
            clen = 150 + c * 85 + it * 30;
            cw = 10 + c * 40 + 6 * it
            cw = 40 + c * 30 + 6 * it
            ch = 15 + 3 * c + 10 * it
            colr = Hred_orange[c % 5];
            colr[2] -= 1

            cuboid(x, y, clen, cw, ch,
                _perspective = pers,
                view = view,
                colr = colr); //rn_shapes.js
        }
    }

    print('cub')
    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}



