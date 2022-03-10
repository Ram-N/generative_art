// Daily Sketch for 2022-03-10
// Ram Narasimhan

/*
Keywords: Spiral

*/


let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}

const params = {
    xStep: 25,
    yStep: 25,
    bgColor: "#d3d3d3",
    blkColor: "#0f0f0f",
}



function setup() {

    radiusSlider = createSlider(0, 600, 500);
    radiusSlider.position(1060, 10);
    radiusSlider.style('width', '200px');
    radiusSlider.changed(redraw);

    createCanvas(960, 960);
    colorMode(HSB);
    let button = createButton("reset sketch");
    button.mousePressed(resetSketch);
    palette2 = random(palList)
    palette = random(palList)
    palette = replicate(palette, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(random(palette2));
    fill(params.blkColor);
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);

    for (c = 25; c > 0; c--) {
        fill(180 + 2 * c, 50, 30 - c)
        noStroke();
        circle(width / 2, height / 2, c * 45)
    }

    var _rad = radiusSlider.value();
    print('slide value', _rad)
    stroke(random(palette))


}

function draw() {
    background(params.blkColor);

    _radius = radiusSlider.value();

    drawSpiralofSquares(_radius);
    draw_border(clr = params.bgColor, sw = 30 + cnv.xMargin); //rn_utils.js

    noLoop();
}


function drawSpiralofSquares(_radius) {

    var angle = 0.89;
    var offset = 0;
    var speed = 1.41;

    prevX = 0; prevY = 0;
    print('init rad', _radius)
    for (let r = 25; r > 0; r--) {
        incrRadius = 12 + Math.floor(r / 2) + Math.floor(r / 3) - Math.floor(r / 9) + 2 * Math.floor(r / 27);

        push();

        fixX = width / 2 - 20;
        fixY = height / 2 - 10;
        translate(fixX, fixY);

        var x = offset + cos(angle) * _radius;
        var y = offset + sin(angle) * _radius;

        drawSquares(x, y, r, angle);
        print('rad', _radius)

        angle += speed;
        _radius -= incrRadius;
        prevX = x; prevY = y;
        pop();

    }

}


function drawSquares(x, y, numPerSide, angle) {
    /* 
    Draws numPerSide x numPerSide small squares, centered at (x,y)
    */
    push();
    print('drawing', numPerSide)
    step = 9
    squareOffset = numPerSide * step / 2
    translate(x - squareOffset, y - squareOffset)

    //strokeWeight(2)
    hstart = numPerSide * 5;

    for (let i = 0; i < numPerSide; i++) {
        for (let j = 0; j < numPerSide; j++) {
            if (random() < 0.4) {
                //h = (hstart + i * numPerSide) % 360;
                h = map(angle % TAU, 0, TAU, 0, 360)
                fill([h, 100, 100])
                rect(i * step, j * step, 7, 7)
                stroke([h, 100, 100])
                if (random() < 0.3) {
                    line(i * step, j * step, squareOffset - x, squareOffset - y)
                }
            }
        }
    }


    pop();
}




//check if NewPoint is leaving the canvas
function outOfBounds(newPt) {
    if ((newPt.x > cnv.xMargin + cnv.width) || (newPt.x < cnv.xMargin)) {
        return (1)
    }
    if ((newPt.y > cnv.yMargin + cnv.height) || (newPt.y < cnv.yMargin)) {
        return (1)
    }
    return (0)// not ooB
}

