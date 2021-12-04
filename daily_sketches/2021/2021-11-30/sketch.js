// Daily Sketch for 2021-11-30
// Ram Narasimhan.

/*
Keywords: images
Desc: Composite image made up of vertical strips of 3 images
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
}


let imgs = [];

function preload() {
    for (i = 0; i < 3; i++) {
        coda = '.jpg'
        if (i == 2) { coda = '.png' }
        _str = 'assets/image' + i + coda
        print(_str)
        imgs[i] = loadImage(_str);
    }
}

function setup() {

    createCanvas(960, 960);
    colorMode(HSB);
    background(params.blkColor);
    print(params.bgColor)
    palette2 = random(HSBpalList)
    palette = replicate(palette, 100)
    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(params.blkColor);

    for (i = 0; i < 3; i++) {
        print(imgs[i].width)
        imgs[i].resize(0, 960);
        imgs[i].loadPixels();
    }


    stripWidth = 20;
    numStrips = int(width / stripWidth) + 1;
    for (i = 0; i < numStrips; i++) {
        rndi = i % 3
        x = i * stripWidth;
        c = imgs[rndi].get(x, 0, 50, height);
        image(c, x, 0);
    }




    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}

