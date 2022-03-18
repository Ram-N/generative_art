// Daily Sketch for 2021-03-16
// Ram Narasimhan

/*
Keywords: dithering

Basic dithering. Take a base image and push its colors to a reduced palette.

*/

let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}

const params = {
    xStep: 60,
    yStep: 60,
    bgColor: [210, 50, 80],
    blkColor: [0, 0, 0],
    moves: 1000
}


let numImages = 1;
let imgs = [];
_str = ['assets/base_image.png']
function preload() {
    for (i = 0; i < numImages; i++) {
        imgs[i] = loadImage(_str[i]);
    }
}

function setup() {

    stepSlider = createSlider(1, 20, 10, 1).parent(sliderPos);
    //stepSlider.position(1060, 10);
    stepSlider.style('width', '200px');
    stepSlider.changed(redraw);

    createCanvas(960, 960).parent(canvasPos);
    let button = createButton("reset sketch");
    button.mousePressed(resetSketch);
    // //colorMode(HSB);
    background(params.blkColor);
    print(params.bgColor)
    palette2 = random(RGBPalList)
    palette = random(RGBPalList)
    palette = replicate(palette, 100)
    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(params.blkColor);

    print('text')
    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}

function draw() {

    rules = { noRed: false, noBlue: false, noGreen: false, stepSize: stepSlider.value(), steps: 2 }
    print(rules)
    createDithered(imgs[0], rules);
    noLoop();
}



function createDithered(img, rules) {
    img.loadPixels();
    iW = imgs[0].width
    iH = imgs[0].height
    print(iW, iH, 'base image')

    yStep = rules.stepSize;
    print(yStep)
    for (let y = 0; y < img.height; y += yStep) {
        for (let x = 0; x < img.width; x += yStep) {
            let existingClr = getColorAtindex(img, x, y);

            let newClr = getDiffcolor(existingClr, rules);
            setColorAtIndex(img, x, y, newClr);
            fill(newClr)
            noStroke();
            rect(x, y, yStep, yStep);

            //but we are not done.
            //take residual error and "push" it to 4 neighboring pixels 
            //to the right and below the current xy pixel
            let errR = red(existingClr) - red(newClr);
            let errG = green(existingClr) - green(newClr);
            let errB = blue(existingClr) - blue(newClr);

            distributeError(img, x, y, errR, errG, errB);
        }
    }

    img.updatePixels();
}


function getDiffcolor(existingClr, rules) {
    let oldR = red(existingClr);
    let oldG = green(existingClr);
    let oldB = blue(existingClr);
    steps = rules.steps;
    // convert pixel to its closest color from a subset
    let newR = closestDiscreteValue(oldR, steps, 255);
    let newG = closestDiscreteValue(oldG, steps, 255);
    let newB = closestDiscreteValue(oldB, steps, 255);
    if (rules.noRed) { newR = 0; }
    if (rules.noBlue) { newB = 0; }
    if (rules.noGreen) { newG = 0; }
    return color(newR, newG, newB);

}

//Say R goes from 0-255. Chop into 4 intervals...0, 64, 128, 196, 255
function closestDiscreteValue(value, steps, max) {
    return round((value - 1) / (max / steps)) * round(max / steps);
}



