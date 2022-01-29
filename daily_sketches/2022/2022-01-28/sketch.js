// Daily Sketch for 2022-01-28
// Ram Narasimhan.


/*
Self portrait
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


let imgs = [];
numImages = 1;
function preload() {
    for (let i = 0; i < numImages; i++) {
        imgs[i] = loadImage("assets/base0.png");
    }
}

function setup() {
    createCanvas(960, 960);
    //colorMode(HSB);
    background(params.blkColor);

    palette = random(RGBPalList);
    palette = replicate(palette, 100)
    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width

    let dotsize = 10
    let numDots = 20
    numRings = 21;
    circleCount = 0;

    print(imgs[0].width)
    img = imgs[0]
    //imgs[i].resize(0, 960);
    img.loadPixels();

    //cut into N=4 slices
    nSlices = 6;
    sliceHt = img.height / nSlices;

    for (let slice = 0; slice < nSlices; slice++) {
        colorMode(RGB)
        xStep = 10;
        yStep = 10;
        yStart = sliceHt * slice
        if (slice == 0) { xStep = 20; yStep = 20; }
        if (slice == 3) { colorMode(HSB) }
        if (slice == 1) { xStep = 10; yStep = 10; }
        if (slice == 4) { xStep = 30; yStep = 30; }

        for (x = 0; x < img.width; x += xStep) {
            for (y = 0; y < sliceHt; y += yStep) {
                ys = yStart + y
                patch = img.get(x, ys, xStep, yStep)
                rgba = getPatchAvgRGBA(patch);
                if (slice == 1) {
                    _directions = { 'rgba': rgba, 'stepSize': 10 }
                    renderStamp(x, ys, _directions)//p5.ImageUtils
                }
                if (slice == 3) {
                    _directions = { 'colorMode': 'HSB', 'rgba': rgba, 'stepSize': 50, "rotateRandom": true }
                    renderStamp(x, ys, _directions)//p5.ImageUtils
                }
                if (slice == 4) { // RGB_Max: the biggest value gets rendered.
                    _directions = { 'colorMode': 'RGB_Max', 'rgba': rgba, 'stepSize': 25, "shape": 'circle' }
                    renderStamp(x, ys, _directions)
                }
                if (slice == 5) {
                    _directions = { 'colorMode': 'BW', 'rgba': rgba, 'stepSize': 50, "rotateRandom": true }
                    renderStamp(x, ys, _directions)
                }
                if (slice == 0 || slice == 2) {
                    paintPatch(x, ys, rgba, xStep - 1); //p5.ImageUtils
                }
            }
        }
    }

    draw_border(clr = params.bgColor, sw = 50); //rn_utils.js
}