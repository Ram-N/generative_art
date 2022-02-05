// Daily Sketch for 2022-02-05
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
_str = ['x.png']
function preload() {
    for (i = 0; i < 1; i++) {
        imgs[i] = loadImage("assets/" + _str[i]);
    }
}


var numCircles
var vertexDia = 10


function setup() {

    createCanvas(960, 960);
    let button = createButton("reset sketch");
    button.mousePressed(resetSketch);

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


    numH = 10
    helixYgap = height / numH
    for (let index = 0; index < numH; index++) {
        baseline = helixYgap * index
        boxw = width * 0.5;
        boxh = width * 0.5
        xStart = random(width);
        bbox = new Bbox(xStart, baseline, boxw, boxh);
        palette = random(RGBPalList)
        numC = int(random(5, 15))
        helixParams = {
            numCircles: numC, amplitude: 0.20, frequency: 1.5 * PI,
            cosOffset: 3 / 4, vertexDia: 40, strand1Color: random(palette),
            strand2Color: random(palette), rung1Color: 230, rung2Color: 200,
        }
        drawDoubleHelix(bbox, helixParams)

    }


    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}



function drawDoubleHelix(bbox, hParams) {

    baseStep = bbox.w / hParams.numCircles;
    shift = int(hParams.numCircles / 2)

    hAmp = hParams.amplitude * bbox.h

    theta = hParams.frequency / hParams.numCircles
    push();
    translate(bbox.x + bbox.w / 2, bbox.y + bbox.h / 2) //center of the box

    strand1 = [];
    strand2 = [];
    for (i = 0; i < hParams.numCircles; i++) {
        var base = (i - shift) * baseStep;
        strand1.push({ y: base, x: hAmp * sin(theta * i) })
        strand2.push({ y: base, x: hAmp * cos(PI * hParams.cosOffset + theta * i) })
    }

    for (i = 0; i < hParams.numCircles; i++) {
        var base = (i - shift) * baseStep;
        //rungs
        strokeWeight(2);
        stroke(hParams.rung1Color);
        line(strand1[i].x, strand1[i].y, strand2[i].x, strand2[i].y)

        push();
        fill(hParams.strand1Color);
        noStroke();
        ellipse(strand1[i].x, strand1[i].y, hParams.vertexDia, hParams.vertexDia);
        fill(hParams.strand2Color);
        ellipse(strand2[i].x, strand2[i].y, hParams.vertexDia, hParams.vertexDia);
        pop();
    }

    pop();
}






function resetSketch() {
    window.location.reload();
}
