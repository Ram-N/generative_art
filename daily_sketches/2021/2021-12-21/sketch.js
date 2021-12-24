// Daily Sketch for 2021-12-21
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
_str = ['assets/gandhi2.jpg']
function preload() {
    for (i = 0; i < numImages; i++) {
        imgs[i] = loadImage(_str[i]);
    }
}

function setup() {

    createCanvas(960, 960);
    //colorMode(HSB);
    background(params.blkColor);
    print(params.bgColor)
    palette2 = random(HSBpalList)
    palette = random(HSBpalList)
    palette = replicate(palette, 100)
    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(params.blkColor);


    iW = imgs[0].width
    iH = imgs[0].height

    print(iW, iH)

    let steps = 2
    makeDithered(imgs[0], 1);
    image(imgs[0], (width - iW) / 2, (height - iH) / 2);
    // Apply gray filter to the whole canvas
    filter(GRAY);



    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}


