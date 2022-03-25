// Daily Sketch for 2021-03-19
// Ram Narasimhan

/*
Keywords: space
Desc: The Space between two generated buildings...leads to outer space with an orange planet
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

const BgParams = {
    size: "medium",
    rows: 10,
    columns: 10,
    color: "red",
    sw: 3,
    numLayers: 3,
    pal: ['salmon', 'green', 'lightblue', 'white'],

}

function preload() {
    img_texture = loadImage('assets/orange.jfif');
    brick_texture = loadImage('assets/brick.jpg');
}

function setup() {

    stepSlider = createSlider(10, 100, 10, 5).parent(sliderPos);
    //stepSlider.position(1060, 10);
    stepSlider.style('width', '200px');
    stepSlider.changed(redraw);

    radio = createRadio().parent(sliderPos);
    radio.option("0", 'purples');
    radio.option("1", 'melons');
    radio.option("2", 'Cappuccino');
    radio.style('width', '300px');
    radio.selected("2");
    radio.changed(redraw);

    createCanvas(960, 960, WEBGL).parent(canvasPos);
    let button = createButton("reset sketch");
    button.mousePressed(resetSketch);
}

function draw() {
    background(params.blkColor);
    palette2 = random(RGBPalList)
    palette = random(RGBPalList)
    palette = replicate(palette, 100)
    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(params.blkColor);

    let topColor = color("#FF8300");//color(11, 18, 39);
    let bottomColor = color("#209AEE");
    skyGradient(-width / 2, -height / 2, width / 2, height / 2, topColor, bottomColor);

    drawPlanet(stepSlider.value());
    skyline();


    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
    noLoop();
}




function drawPlanet(_size) {

    stroke(0);
    push()
    translate(0, -height / 5, 0);
    normalMaterial();
    ambientLight(250, 250, 250);
    texture(img_texture);

    push();
    rotateY(PI);
    sphere(_size);
    pop();

    pop();


}

function skyline() {
    //noStroke();
    push();
    rotateY(10.1)
    //rotateX(-0.05)
    ambientLight(250, 250, 250);
    //ambientMaterial(230, 230, 230);
    fill(palette[int(random(5))]);

    rect(50, -100, 600, 800); //left bldg
    pop();

    push();
    fill(palette[int(random(5))]);
    rotateY(5.2)
    rect(50, -100, 600, 800); // right bldg
    pop();

    building3();
    building4();
    leftPanes();
    rightPanes();
    //Right building panes
    push();
    fill(150, 118, 84);
    translate(0, 0, -30)
    rotateY(5)
    for (b = 0; b < 5; b++) {
        fill(150 + b * 5, 118, 84);
        translate(11, b * 70)
        plane(5000, 50)
    }
    pop();

    //left building panes
    push();
    rotateY(-4.9)
    translate(0, 0, -30)
    for (b = 0; b < 5; b++) {
        fill(150 + b * 5, 118, 84);
        translate(300, b * 60, 0)
        plane(5000, 50)
    }
    pop();


}

function leftPanes() {
    push();
    rotateY(-5.1)
    translate(10, -300, -70)
    clr = palette[0]
    for (b = 0; b < 4; b++) {
        fill(palette[int(random(5))]);
        translate(300, b * 20, 0)
        plane(5000, 15)
    }
    pop();
}

function rightPanes() {
    push();
    rotateY(5.1)
    translate(10, -350, -70)
    for (b = 0; b < 4; b++) {
        fill(palette[int(random(5))]);
        translate(300, b * 20, 0)
        plane(5000, 15)
    }
    pop();
}



function building3() {
    push();
    translate(0, -450, -50)
    fill(palette[int(random(5))]);
    //texture(brick_texture)
    rotateY(3.7)
    rect(0, 0, 600, 800);
    pop();

}


function building4() {
    push();
    translate(0, -450, -50)
    fill(palette[int(random(5))]);
    //texture(brick_texture)
    rotateY(5.7)
    //rotateX(-0.02)
    rect(0, 0, 600, 800);
    pop();

}

function skyGradient(xs, ys, xe, ye, c1, c2) {

    noFill();
    for (let i = ys; i <= ye; i++) {
        let inter = map(i, ys, ye, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(xs, i, xe, i);
    }

}