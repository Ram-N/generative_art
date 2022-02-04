// Daily Sketch for 2022-02-04
// Ram Narasimhan.

let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}

const params = {
    tw: 80, // triangle width within the Hexgrid
    xStep: 5,
    yStep: 5,
    bgColor: [210, 50, 80],
    blkColor: [0, 0, 0],
}


let imgs = [];
_str = ['base.jpg']
function preload() {
    for (i = 0; i < 1; i++) {
        imgs[i] = loadImage("assets/" + _str[i]);
    }
}



function setup() {

    createCanvas(960, 960);
    background(params.blkColor);
    print(params.bgColor)
    palette = gen2
    palette = replicate(palette, 100)
    palette2 = random(palList)
    palette2 = replicate(palette2, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(params.blkColor);
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);

    img = imgs[0] //photo
    img.loadPixels();


    xStep = 15;
    yStep = 15;
    geFlag = 0;
    for (y = 0; y < img.height; y += yStep) {
        for (x = 0; x < img.width; x += xStep) {
            patch = img.get(x, y, xStep, yStep)
            rgba = getPatchAvgRGBA(patch);
            if (rgba.r > 128) {
                if (random() < 0.05) {
                    colr = color(rgba.r, rgba.g, rgba.b)
                    stroke(colr);
                    fill(colr);
                    textStyle(BOLD);
                    textSize(15);
                    text('GE', x, y)
                    geFlag = 1; // to avoid consecutive and overwriting GE text
                } else {
                    if (!geFlag) {
                        textStyle(ITALIC);
                        _directions = { 'rgba': rgba, 'stepSize': 10 }
                        renderStamp(x, y, _directions)
                    } else { geFlag = 0 }
                }
            }
        }
    }



    // _directions = { 'brightness': 222 }
    // imgHeatMap(img, _directions);
    //image(img, 0, 0)

    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}



