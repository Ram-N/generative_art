// Daily Sketch for 2021-07-22
// Ram Narasimhan

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
    palette = cappuccino; //colors.js
    palette = take5;
    //    palette = ['red', 'yellow', 'maroon', 'orange', 'brown']
    palette = replicate(palette, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    // bg = random(palette2)
    // displayBgRect(bg)

    mm = get_fxy_min_max()
    currMin = mm[0]
    currMax = mm[1]
    numColors = 7;
    rangeStep = (currMax - currMin) / numColors * 1.5
    print('Cm', currMin, currMax)
    range = []
    range[0] = -1e6
    for (i = 1; i <= numColors; i++) {
        range[i] = rangeStep * i
    }

    for (x = cnv.xMargin; x < cnv.xMargin + cnv.width; x += 2) {
        for (y = cnv.yMargin; y < cnv.width + cnv.yMargin; y += 1) {
            fxy = complex_valued(x, y)
            cmap = color_map(fxy, x, y)
            stroke(palette[cmap])
            circle(x, y, 4)
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
    comp1 = y * cos(x) * sin(x)
    comp2 = (x - 3 * y) / 100 + x
    comp3 = - abs(0.02 * Math.sqrt(x)) + 4 * y
    fxy = comp1 - comp2 + comp3
    if (verbose) {
        print('Verbose')
        print(comp1)
        print(comp2)
        print(comp3)
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



