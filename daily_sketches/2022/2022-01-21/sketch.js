// Daily Sketch for 2022-01-21
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


let imgs = [];
numImages = 2;
function preload() {
    for (let i = 0; i < numImages; i++) {
        imgs[i] = loadImage("assets/img" + str(i) + ".png");
    }
}
function setup() {
    createCanvas(imgs[0].width, imgs[0].height);
    noLoop();


    palette = random(RGBPalList);
    palette = ['blue', 'white', 'purple']
    palette = replicate(palette, 100)
    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width


}

//https://discourse.processing.org/t/mask-image-with-text/27122
function draw() {

    img = imgs[0]; //base image
    img1 = imgs[1]; // image that will be overlaid
    img.loadPixels();
    img1.loadPixels();

    pg = drawBuffer();//offscreen prep
    pg.loadPixels(); //keep in memory in the offscreen buffer

    img = squareDisarray(img)
    img.loadPixels();
    //img.updatePixels();

    print(img.pixels.length)
    // use the buffer as a guide for altering the image
    for (var i = 0; i < img.pixels.length; i += 4) {
        // if buffer pixel is white (red is not 255) overlay new image... 
        if (pg.pixels[i] == 255) {
            img.pixels[i] = img1.pixels[i];
            img.pixels[i + 1] = img1.pixels[i + 1];
            img.pixels[i + 2] = img1.pixels[i + 2];
            img.pixels[i + 3] = img1.pixels[i + 3];

        }
    }
    img.updatePixels();
    image(img, 0, 0);




    draw_border(clr = params.blkColor, sw = 50); //rn_utils.js
}


function squareDisarray(img) {
    buffer = createGraphics(img.width, img.height);
    buffer.background(0);

    squareSize = 50;
    size = width;
    for (let i = squareSize; i <= size - squareSize; i += squareSize) {
        for (let j = squareSize; j <= size - squareSize; j += squareSize) {
            const amt = map(j, squareSize, size, 0, 1);
            const clr = lerpColor(color(240, 20, 20), color(0, 0, 244), amt);
            stroke(clr);
            buffer = renderStamp(buffer, i, j, size, img);
        }
    }

    return buffer
}


const rotateMultiplier = 1;
const randomDisplacement = 5;

function renderStamp(buf, x, y, size, baseImg) {
    plusOrMinus = random() < 0.5 ? -1 : 1;
    const rotateAmt = (y / size) * plusOrMinus * random() * rotateMultiplier;

    plusOrMinus = random() < 0.5 ? -1 : 1;
    const translateAmt = (y / size) * plusOrMinus * random() * randomDisplacement;

    buf.push();
    buf.translate(x + translateAmt, y);
    buf.rotate(rotateAmt);
    buf.translate(-x, -y);
    buf.image(baseImg, x, y, squareSize, squareSize, x, y, squareSize, squareSize)
    buf.pop();

    return buf
}



function drawBuffer() {
    // create a p5.Graphics: offscreen graphics buffer
    pg = createGraphics(width, height);
    pg.background(0);
    // draw text to buffer in white
    push();
    pg.stroke(255);
    pg.noFill();
    pg.translate(width / 2, height / 2)
    pg.strokeWeight(25);
    for (var i = 0; i < 8; i++) {
        pg.circle(0, 0, 100 + 100 * i)
    }
    //fill only the center circle
    pg.fill(255);
    pg.circle(0, 0, 100)

    pop();

    return pg
}

