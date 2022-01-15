// Daily Sketch for 2022-01-12
// Ram Narasimhan.

/*
Keywords: fractals
Addition: Add a stopping criteria for shapes that are too small...
*/

let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}

const BgParams = {
    size: "medium",
    rows: 10,
    columns: 10,
    color: "red",
    sw: 3,
}

const params = {
    xStep: 20,
    yStep: 20,
    bgColor: "#d3d3d3",
    blkColor: "#0f0f0f",
}

let numImages = 6;
let imgs = [];
_str = 'assets/gun'
function preload() {
    for (i = 0; i < numImages; i++) {
        imgs[i] = loadImage(_str + str(i + 1) + ".png");
    }
}


function setup() {

    createCanvas(960, 960);
    background(params.bgColor);
    palette = random(RGBPalList);
    palette = replicate(palette, 100)
    palette2 = random(palList)
    palette2 = replicate(palette2, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    push();
    translate(width / 2, height / 2)
    for (rep = 0; rep < 7; rep++) {
        fill('white')
        if (rep % 2) {
            fill(params.bgColor)
        }
        circle(0, 0, (7 - rep) * 80)
    }

    fill('red')
    circle(0, 0, 80)

    pop();


    panelsPerSide = 5
    ppSide = panelsPerSide
    pgrid = createSquareGrid(panelsPerSide, margin = 5);
    for (panel of pgrid.panels) {
        if ((panel.col == 0) || (panel.row == 0) || (panel.col == ppSide - 1) || (panel.row == ppSide - 1)) {
            push();
            fill(random(palette))
            rect(panel.x, panel.y, panel.w, panel.h);
            // BgParams.numLayers = random([0, 2, 3]);
            // BgParams.pal = RGBPalList[0];
            // diagWall(_box, BgParams);

            translate(panel.x, panel.y);
            image(imgs[2], 0, 0, panel.w, panel.h * 0.8);
            print(panel)
            pop();
        }
    }
    r = 150;
    numSpokes = 10;
    for (i = 0; i < numSpokes; i++) {
        push();
        translate(width / 2, height / 2);
        angle = i * TAU / numSpokes;
        rotate(angle);
        image(imgs[3], r, 0, 50, 50)
        rotate(TAU / numSpokes / 2)
        image(imgs[0], r * 1.5, 0, 60, 60)
        pop()
    }

    wt = 250;
    image(imgs[5], width / 2 - 120, height / 2 - 50, wt, wt / 2)


    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}


