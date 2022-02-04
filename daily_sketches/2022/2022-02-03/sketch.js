// Daily Sketch for 2022-02-03
// Ram Narasimhan.

//https://editor.p5js.org/YuanHau/sketches/HyaTKXHhb

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
        baseline = index * helixYgap + 50;
        boxw = width * random(0.5, 1);
        boxh = helixYgap;
        xStart = random(width / 2);
        bbox = new Bbox(xStart, baseline, boxw, boxh);
        palette = random(RGBPalList)
        helixParams = {
            numCircles: 30, amplitude: 0.25, frequency: 1.5 * PI,
            cosOffset: 3 / 4, vertexDia: 10, strand1Color: random(palette),
            strand2Color: random(palette), rungColor: 'white'
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
    for (i = 0; i < hParams.numCircles; i++) {
        var base = (i - shift) * baseStep;


        //rungs
        strokeWeight(2);
        stroke(hParams.rungColor);
        line(base, hAmp * sin(theta * i),
            base, hAmp * cos(PI * hParams.cosOffset + theta * i))

        fill(hParams.strand1Color);
        noStroke();
        ellipse(base, hAmp * sin(theta * i), hParams.vertexDia, hParams.vertexDia);
        fill(hParams.strand2Color);
        ellipse(base, hAmp * cos(PI * hParams.cosOffset + theta * i), hParams.vertexDia, hParams.vertexDia);



    }

    pop();
}






function resetSketch() {
    window.location.reload();
}
