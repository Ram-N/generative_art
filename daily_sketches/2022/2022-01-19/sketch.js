// Daily Sketch for 2022-01-19
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

function preload() {
    // Ensure the .ttf or .otf font
    // is loaded before setup() and draw() are called
    font = loadFont('assets/SourceSansPro-Regular.otf');
}


let font;
let fontsize = 40;

let img;
let pg;
function preload() {
    img = loadImage("assets/img0.png");
}

function setup() {
    createCanvas(img.width, img.height);
    noLoop();


    palette = random(RGBPalList);
    palette = ['blue', 'white', 'purple']
    palette = replicate(palette, 100)
    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width


}

//Text Masking Idea based on:
//https://discourse.processing.org/t/mask-image-with-text/27122
function draw() {
    img.loadPixels();

    // create a p5.Graphics: offscreen graphics buffer
    pg = createGraphics(width, height);
    pg.textAlign(CENTER, CENTER);
    pg.textStyle(BOLD);
    pg.background(0);
    // draw text to buffer in white
    pg.fill(255);
    pg.textSize(110);
    pg.text("порождающий", width / 2, height / 4);

    str2 = 'ஜெனுவரி'
    push();
    pg.textSize(150);
    pg.text(str2, width * 0.5, height - 200);
    pg.textSize(160);
    pg.text("生成的な1月", width * 0.5, height - 500);
    pop();


    pg.loadPixels();
    // use the buffer as a guide for altering the image
    for (var i = 0; i < img.pixels.length; i += 4) {
        // if buffer pixel is not white (red is not 255) blacken the image pixel 
        if (pg.pixels[i] != 255) {
            img.pixels[i] = 0;
            img.pixels[i + 1] = 0;
            img.pixels[i + 2] = 0;
        }
    }
    img.updatePixels();
    image(img, 0, 0);

    draw_border(clr = 120, sw = 50); //rn_utils.js
}


