// Daily Sketch for 2021-07-19
// Ram Narasimhan.

/*

Keywords: complex valued functions, color mapping

https://gist.github.com/zmic/17c67e397ce3a9a3c6ff30ffc4cf885c

Desc: For every x,y in the Cartesian plane, have an f(x,y) that yields numeric values.
Desc: Map these numeric values to a color scale and render.

    */


let palette = []
let grid;
const cnv = {
    xMargin: 50,
    yMargin: 50,
}

const params = {
    bgColor: "#0f0f0f", //black
}

function prepBgRect() {
    return (random(palette2));
}

function displayBgRect(rectBg) {
    fill(rectBg);
    rect(0, 0, width, height);
}

function setup() {
    createCanvas(660, 660);
    background(params.bgColor);
    draw_border(20);
    palette2 = purples;
    palette2 = replicate(palette2, 100)
    palette = red_brown_orange; //colors.js
    //palette = cappuccino; //colors.js
    palette = ['red', 'black', 'white', 'red', 'green']
    palette = replicate(palette, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    bg = random(palette2)
    displayBgRect(bg)

    four_corners()

    for (x = cnv.xMargin; x < cnv.xMargin + cnv.width; x++) {
        for (y = cnv.yMargin; y < cnv.width + cnv.yMargin; y++) {
            fxy = complex_valued(x, y)
            cmap = color_map(fxy, x, y)
            stroke(palette[cmap])
            point(x, y)
        }
    }

    draw_border(clr = 20, sw = 50); //rn_utils.js
}

function four_corners() {
    for (cor of [[cnv.xMargin, cnv.yMargin],
    [cnv.xMargin, cnv.height + cnv.yMargin],
    [cnv.xMargin + cnv.width, cnv.yMargin],
    [cnv.width + cnv.xMargin, cnv.height + cnv.yMargin]
    ]) {
        cv = complex_valued(cor[0], cor[1])
        print(cor, cv)
    }
}

function complex_valued(x, y, verbose = false) {
    comp1 = y * 3 * abs(sin(x))
    comp2 = (x * y) / 300
    comp3 = - abs(sin(2 * x))
    fxy = comp1 + comp2 + comp3
    if (verbose) {
        print('Verbose')
        print(comp1)
        print(comp2)
        print(comp3)
    }
    return fxy
}

function color_map(v) {
    range = [-1000, 20, 30, 40, 50, 60, 300, 100000]
    for (i = 0; i < range.length - 1; i++) {
        if ((v > range[i]) && (v < range[i + 1])) {
            return i
        }
    }
    print('Range Error', v, x, y)
    fxy = complex_valued(x, y, true)
    print(fxy, 'error')
}



