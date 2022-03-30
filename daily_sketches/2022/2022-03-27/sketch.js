// Daily Sketch for 2021-03-25
// Ram Narasimhan

/*
Geometric shapes
Stagger a bit
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
    bgColor: "#d3d3d3",
    blkColor: [0, 0, 0],
    moves: 1000
}


function setup() {

    stepSlider = createSlider(1, 20, 5).parent(sliderPos);
    stepSlider.style('width', '200px');
    stepSlider.changed(redraw);

    slider2 = createSlider(3, 20, 6, 1).parent(sliderPos);
    slider2.style('width', '200px');
    slider2.changed(redraw);


    radio = createRadio().parent(sliderPos);
    radio.option("0", 'purples');
    radio.option("1", 'melons');
    radio.option("2", 'Cappuccino');
    radio.style('width', '300px');
    radio.selected("2");
    radio.changed(redraw);

    createCanvas(960, 960).parent(canvasPos);
    let button = createButton("reset sketch");
    button.mousePressed(resetSketch);

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    print(cnv)
    xstart = cnv.xMargin
    ystart = cnv.yMargin
    xend = cnv.xMargin + cnv.width
    yend = cnv.yMargin + cnv.height
    midX = width / 2
    midY = height / 2

    palette = purples;
    palette = replicate(palette, 100)
    palette2 = red_brown_orange; //colors.js
    palette2 = replicate(palette2, 100)


}

function draw() {
    background(params.blkColor);
    background(0, 0, 0);

    n = slider2.value();
    ropeWidth = stepSlider.value();


    for (let rep = 0; rep <= 10; rep++) {
        palette = random(RGBPalList);
        palette = replicate(palette, 100)
        cBez1 = [{ x: -100 + 60 * rep, y: -100 + 100 * rep }, { x: 200 + 50 * rep, y: (-400 - 50 * rep) }, { x: 210 + 50 * rep, y: height * 1.5 }, { x: width * 1.2, y: height - 400 * rep }]
        renderBezier(cBez1);
    }



    draw_border(clr = params.bgColor, sw = 50); //rn_utils.js
    noLoop();
}


function renderBezier(cBez1) {
    for (rep = 0; rep < 2; rep++) {
        var cPoints = findCBezPoints(cBez1, 150)
        for (bz = 0; bz < cPoints.length - 1; bz++) {
            colr = random(palette)
            v1 = cPoints[bz];
            v2 = cPoints[bz + 1];
            stroke(colr);
            noFill();
            drawHalfMoons(createVector(v1.x, v1.y), createVector(v2.x, v2.y), ropeWidth)
        }
    }

}


//given 2 points V1 and v2, draws several half-moons that are tangential to v1, v2
function drawHalfMoons(v1, v2, w) {

    angle = (v2.copy().sub(v1)).heading()
    for (rep = 0; rep < 10; rep++) {
        inbetPt = p5.Vector.lerp(v1, v2, random(0.2, 0.8));
        r = random(50 * w) //jitter
        px = inbetPt.x + r / 2 * cos(angle + 3 * PI / 2)
        py = inbetPt.y + r / 2 * sin(angle + 3 * PI / 2)

        arc(px, py, r, r, angle + PI / 4, angle + PI - PI / 4)

    }
}


function findCBezPoints(bez, numPts) {
    //returns coordinates of points along a specified Bezier curve
    var startPt = bez[0];
    var controlPt1 = bez[1];
    var controlPt2 = bez[2];
    var endPt = bez[3];
    var pts = [bez[0]];
    var lastPt = bez[0];
    var tests = 100;
    for (var t = 0; t <= numPts; t++) {
        // calc another point along the curve
        var pt = getCubicBezierXYatPercent(startPt, controlPt1, controlPt2, endPt, t / numPts);
        // add the pt if it's not already in the pts[] array
        var dx = pt.x - lastPt.x;
        var dy = pt.y - lastPt.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        var dInt = parseInt(d);
        if (dInt > 0 || t == tests) {
            lastPt = pt;
            pts.push(pt);
        }
    }
    return (pts);
}
