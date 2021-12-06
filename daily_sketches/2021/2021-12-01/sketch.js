// Daily Sketch for 2021-12-01
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
_str = ['assets/hitler2.jpg', 'assets/gandhi2.jpg']
function preload() {
    for (i = 0; i < 2; i++) {
        imgs[i] = loadImage(_str[i]);
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

    for (i = 0; i < 2; i++) {
        print(imgs[i].width)
        imgs[i].resize(0, 960);
        imgs[i].loadPixels();
    }


    sWd = 60;
    numStrips = int(width / sWd) + 1;
    for (j = 0; j < numStrips; j++) {
        for (i = 0; i < numStrips; i++) {
            rndi = (i + j) % 2
            x = i * sWd;
            y = j * sWd;
            c = imgs[rndi].get(x, y, sWd, sWd);
            image(c, x, y);
        }
    }



    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}

