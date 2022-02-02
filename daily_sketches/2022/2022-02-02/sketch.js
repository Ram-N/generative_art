// Daily Sketch for 2022-02-02
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

    numH = 5
    helixYgap = height / numH
    for (let index = 0; index < numH; index++) {
        yStart = index * helixYgap + 50;
        helixParams = {
            yStart: yStart, numCircles: 100, amplitude: 50, frequency: 50,
            cosOffset: 3 / 4, vertexDia: 10, strand1Color: random(palette),
            strand2Color: random(palette)
        }
        drawDoubleHelix(helixParams)

    }


    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}

function drawDoubleHelix(hParams) {
    xStep = width / hParams.numCircles;
    for (i = 0; i < hParams.numCircles; i++) {
        var x = i * xStep;
        fill(hParams.strand1Color);
        noStroke();
        ellipse(x, hParams.yStart + hParams.amplitude * sin(hParams.frequency * i), hParams.vertexDia, hParams.vertexDia);
        fill(hParams.strand2Color);
        ellipse(x, hParams.yStart + hParams.amplitude * cos(PI * hParams.cosOffset + hParams.frequency * i), hParams.vertexDia, hParams.vertexDia);

        strokeWeight(0.5);
        stroke(255);
        line(x, hParams.yStart + hParams.amplitude * sin(hParams.frequency * i),
            x, hParams.yStart + hParams.amplitude * cos(PI * hParams.cosOffset + hParams.frequency * i))


    }

}






function resetSketch() {
    window.location.reload();
}
