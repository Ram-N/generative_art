// Daily Sketch for 2021-10-15
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

    let p = 0;
    let cl = 0;
    stepSize = 50;
    for (y = cnv.yMargin; y < cnv.yMargin + cnv.height; y += stepSize) {
        for (x = cnv.xMargin; x < cnv.xMargin + cnv.width; x += stepSize) {

            pers = "Below"
            view = "L"
            p += 1;
            clen = stepSize;
            cw = stepSize
            ch = stepSize

            toss = random()
            if (toss < 0.5) {
                colr = Hgreen_yellow[p % 6];
                cuboid(x, y, clen, cw, ch,
                    _perspective = random(['Above', 'Below']),
                    view = random(['L', 'R']),
                    colr = colr); //rn_shapes.js
            }
            else if (toss < 0.7) {
                colr = Hred_orange[cl % 6];
                cl += 1
                fill(colr)
                push();
                for (c = 0; c < 9; c += 2) {
                    circle(x + c, y + c, stepSize * 0.8);
                }
                pop();
            }
        }
    }
    //  
    print('cub')
    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}



