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

    let p = 0
    numIterations = 12;
    numCubes = 2;
    //    for (it = 1; it < numIterations; it++) {
    for (y = cnv.yMargin; y < cnv.yMargin + cnv.height; y += 30) {
        for (x = cnv.xMargin; x < cnv.xMargin + cnv.width; x += 30) {

            pers = "Below"
            view = "L"
            p += 1;
            clen = 15;
            cw = 40
            ch = 15
            colr = Hred_orange[p % 6];

            toss = random()
            if (toss < 0.4) {
                prism(x, y, clen, cw, ch,
                    _perspective = pers,
                    view = view,
                    colr = colr); //rn_shapes.js
            }
            else if (toss < 0.6) {
                colr = Hgreen_yellow[p % 6];
                cuboid(x, y, clen, cw, ch,
                    _perspective = random(['Above', 'Below']),
                    view = random(['L', 'R']),
                    colr = colr); //rn_shapes.js
            }
            else if (toss < 0.8) {
                fill(colr)
                push();
                for (c = 0; c < 9; c += 2) {
                    circle(x + c, y + c, 20);
                }
                pop();
            }
        }
    }
    //  
    print('cub')
    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}



