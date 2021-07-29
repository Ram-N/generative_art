// Daily Sketch for 2021-07-27
// Ram Narasimhan

/*
Keywords: complex valued functions, color mapping

https://gist.github.com/zmic/17c67e397ce3a9a3c6ff30ffc4cf885c

Desc: For every x,y in the Cartesian plane, have an f(x,y) that yields numeric values.
Desc: Map these numeric values to a color scale and render.
Desc: Squares
    */


let palette = []
let grid;
const cnv = {
    xMargin: 50,
    yMargin: 50,
}

const params = {
    bgColor: "#0f0f0f", //black
    numColors: 20
}

function prepBgRect() {
    return (random(palette2));
}

function displayBgRect(rectBg) {
    fill(150);
    rect(0, 0, cnv.width, cnv.height);
}

function setup() {
    createCanvas(660, 660);
    background(params.bgColor);
    draw_border(20);
    palette2 = purples;
    palette2 = replicate(palette2, 100)
    palette = red_brown_orange; //colors.js
    // palette = cappuccino; //colors.js
    // palette = take5;
    //palette = ['lightblue', 'blue', 'black', 'orange', 'brown', 'green']
    palette = [[239, 6, 109], [0, 0, 0], [157, 67, 137], [0, 0, 0], [31, 163, 223], [0, 0, 0],
    [163, 147, 242], [0, 0, 0], [239, 6, 109], [0, 0, 0], [157, 67, 137], [0, 0, 0], [31, 163, 223],
    [163, 147, 242], [0, 0, 0], [239, 6, 109], [0, 0, 0], [157, 67, 137], [0, 0, 0], [31, 163, 223],
    [163, 147, 242], [0, 0, 0], [239, 6, 109], [0, 0, 0], [157, 67, 137], [0, 0, 0], [31, 163, 223],
    [163, 147, 242], [0, 0, 0]]
    palette = replicate(palette, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    bg = random(palette2)
    //    displayBgRect(bg)

    mm = get_fxy_min_max()
    currMin = mm[0]
    currMax = mm[1]
    rangeStep = (currMax - currMin) / params.numColors * 1.2
    print('Cm', currMin, currMax)
    range = []
    range[0] = -1e9
    for (i = 1; i <= params.numColors; i++) {
        range[i] = rangeStep * i
    }
    range[i] = 1e9

    // PAINT IT
    for (x = cnv.xMargin; x < cnv.xMargin + cnv.width; x += 10) {
        for (y = cnv.yMargin; y < cnv.width + cnv.yMargin; y += 3) {
            fxy = complex_valued(x, y)
            cmap = color_map(fxy, x, y)
            stroke(palette[cmap])
            fill(palette[cmap])
            ellipse(x, y, 5, 5)
        }
    }

    draw_border(clr = 20, sw = 50); //rn_utils.js
}

// We try to find the max and min values that our complex value func
// will take in our grid of x and y values. Rather than polling all of it 
// computationally too expensive, we jump a few pixels at a time
function get_fxy_min_max() {
    currMax = -1e10
    currMin = 1e10
    xStep = int(cnv.width / 100)
    xStep = 1
    yStep = int(cnv.height / 100)
    for (x = 0; x < cnv.width; x += xStep) {
        for (y = 0; y < cnv.height; y += yStep) {
            cv = complex_valued(x, y)
            if (cv > currMax) {
                currMax = cv
            }
            if (cv < currMin) {
                currMin = cv
            }
        }
    }
    print(currMin, currMax)
    return ([currMin, currMax])
}

function complex_valued(x, y, verbose = false) {

    r1 = (cos(3 * x) + sin(3 * y))
    r2 = -3.35 + cos(4 * y)
    r3 = r1 / r2

    fxy = r3
    if (verbose) {
        print('Verbose')
        print(r1)
        print(r2)
        print(r3)
    }
    return fxy
}

function color_map(v) {
    for (i = 0; i < range.length - 1; i++) {
        if ((v > range[i]) && (v < range[i + 1])) {
            return i
        }
    }
    print('Range Error', v, x, y)
    fxy = complex_valued(x, y, true)
    print(fxy, 'error')
    print(range, 'range')
}



