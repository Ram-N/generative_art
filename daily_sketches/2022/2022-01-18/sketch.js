// Daily Sketch for 2022-01-18
// Ram Narasimhan.



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


let numImages = 2;
let imgs = [];
_str = ['img1.jpg', 'img2.png',]
function preload() {
    for (i = 0; i < numImages; i++) {
        imgs[i] = loadImage('assets/' + _str[i]);
    }
}

function setup() {

    createCanvas(w = 760, 480);
    //background(params.blkColor);
    //colorMode(HSB);

    palette = random(RGBPalList);
    palette = ['blue', 'white', 'purple']
    palette = replicate(palette, 100)
    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width

    t = 0;
}


function draw() {
    if (frameCount % 2 == 0) {
        let img = createGraphics(760, 480);
        img.background(255);
        img = base_image();
        img = vhs_image(img, t);

        img = draw_color_glitch(img, 3);
        //img = draw_noise(img);
        img = draw_vhs_smear(img, 10);
        img = draw_scanlines(img);

        //image(img, 100, 100, w - 200, w - 380);
        image(img, 0, 0, 760, 580);

        noFill();
        stroke('white')
        strokeWeight(50);
        ra = 50;
        rect(0, 0, width, height, ra, ra, ra, ra)
        //image(imgs[1], 0, 0, 760, 480) //add frame
        //draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js    
    }
    t++;
}




function base_image() {
    let img = createGraphics(w, w * 0.8);
    img.image(imgs[1], 0, 0)//, 0, 0, imgs[0].width, imgs[0].height)
    return img
}


function vhs_image(img0, t) {

    let img = createGraphics(img0.width, img0.height);
    img.background(0);
    img.image(img0, 0, 0);

    let size = height / 5;
    img.push();
    img.colorMode(HSB);
    img.stroke(100);
    img.strokeWeight(w / 100);

    let xPos = t * 3 % img.width
    img.line(xPos, size, xPos, size * 3);
    img.pop();


    return img
}

/* from: https://openprocessing.org/sketch/1445256 */
function draw_scanlines(img) {
    let gp = createGraphics(img.width, img.height);
    gp.background(0);
    gp.image(img, 0, 0);

    img.push();
    img.stroke(0, 50);
    img.strokeWeight(1);
    for (let i = 0; i < height; i += height / 200) {
        img.line(0, i, width, i);
    }
    img.pop();

    return img;
}


function draw_noise(img) {
    let gp = createGraphics(img.width, img.height);
    gp.background(0);
    gp.image(img, 0, 0);
    let noise_size = 5;

    gp.push();
    gp.strokeWeight(0);
    for (let i = 0; i < img.width; i += noise_size) {
        for (let j = 0; j < img.height; j += noise_size) {
            if (random() < 0.1) {
                gp.fill(random([0, 255]), 100 * noise(i, j));
                gp.rect(i, j, noise_size);
            }
        }
    }
    gp.pop();

    return gp;
}

function draw_vhs_smear(img, shift_size) {
    let gp = createGraphics(img.width, img.height);
    gp.background(0);
    gp.image(img, 0, 0);

    for (let i = 0; i < 100; i++) {
        let dWidth = random(img.width * 0.5);
        let dHeight = random(img.height * 0.05);
        let x = random(img.width - dWidth * 0.5);
        let y = random(img.height - dHeight * 0.5);
        let dx = x + random(-1, 1) * shift_size;
        let dy = y;
        gp.image(img, dx, dy, dWidth, dHeight, x, y, dWidth, dHeight);
    }

    return gp;
}

/* Function created by gin_graphic: 
from: https://openprocessing.org/sketch/1445256 */
function draw_color_glitch(img, shift_size) {
    let gp = createGraphics(img.width, img.height);
    gp.background(0);

    let right_color = color(255, 0, 0);
    let left_color = color(0, 255, 255);

    gp.push();
    gp.blendMode(ADD);

    gp.tint(left_color);
    gp.image(img, -shift_size, 0);

    gp.tint(right_color);
    gp.image(img, shift_size, 0);
    gp.pop();

    return gp;
}
