// Daily Sketch for 2022-02-01
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
_str = ['base0.png', 'img2.jpg']
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


    baseImg = TextArray();
    baseImg.loadPixels(); //keep in memory in the offscreen buffer

    img2 = imgs[0] //photo
    img2.loadPixels();

    //overlay img2 on top of baseImage
    print(baseImg.pixels.length)
    // use the buffer as a guide for altering the image
    maskColor = 0;
    for (var i = 0; i < baseImg.pixels.length; i += 4) {
        if ((img2.pixels[i] != maskColor) && (img2.pixels[i + 1] != maskColor) && (img2.pixels[i + 2] != maskColor)) {
            for (let k = 0; k < 4; k++) {
                img2.pixels[i + k] = baseImg.pixels[i + k];
            }
        }
    }

    img2.updatePixels();
    image(img2, 0, 0);

    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}




function TextArray() {

    xOff = width / 300;
    pg = createGraphics(width, height);
    pg.background(palette[1]);

    for (let index = 0; index < 300; index++) {
        push();
        pg.textStyle(BOLD);
        pg.fill(random(palette));

        pg.textSize(int(random(30, 100)));
        x = xOff * index
        y = int(random(height))
        pg.text("Self", x, y)

        pop();
    }

    return pg
}


