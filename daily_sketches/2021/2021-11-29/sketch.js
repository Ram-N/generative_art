// Daily Sketch for 2021-11-29
// Ram Narasimhan.

/*
Keywords: images
Desc: Borrowed square patches from other images
Desc: Load a bunch of images. Use a layer as the BG, and patch squares in
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


    for (r = 0; r < 600; r++) {
        x = random(width)
        y = random(height)
        rndi = random([0, 1, 2])
        c = imgs[rndi].get(x, y, 50, 50);
        image(c, x, y);
    }




    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}

