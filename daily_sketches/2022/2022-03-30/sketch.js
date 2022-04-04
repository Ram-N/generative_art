// Daily Sketch for 2021-03-30
// Ram Narasimhan

/*
connected circles...
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

    colorMode(HSB);

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
    n = slider2.value();
    n2 = stepSlider.value();

    background(params.blkColor);
    // cEnd = color(220, 0, 100)
    // cStart = color(220, 30, 70)
    // skyGradient(0, 0, width, height, cStart, cEnd)

    noFill();

    numEchoes = n
    echoStep = n;

    //set up coloring
    colr = []
    base = int(random(360));
    for (cl = 0; cl < numEchoes; cl++) {
        h = (base + cl * 10) % 360;
        colr.push([h, 100, 100]);
    }

    cir = -1;
    //Custom Tiling
    rCount = n2;
    colCount = rCount;
    colSplit = Array(rCount).fill(1)
    rowSplit = colSplit
    numCircles = rCount * colCount
    startPts = [];
    endPts = [];
    for (c = 0; c < numCircles; c++) {
        startPts.push([])
        endPts.push([])
    }

    strokeWeight(3);
    pgrid = new PanelGrid(cnv, colSplit, rowSplit)
    pcount = 0;
    for (panel of pgrid.panels) {
        push();
        translate(panel.cx, panel.cy);
        renderCir(panel);
        pop();
        pcount += 1;
    }

    //line connections
    for (l = 2; l < numEchoes; l++) {
        stroke(colr[l])
        for (i = 0; i < numCircles - rCount; i++) {
            // connect('SE', cirConnects[i], cirConnects[i + 1], l);
            connect('EE', i, i + rCount, l);
        }
    }

    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
    noLoop();
}


function renderCir(panel) {
    cir += 1

    push();
    theta = random(0, PI / 2);
    endTheta = theta + PI + random(0, PI / 6);

    //print('cir', cir, theta, endTheta)
    for (rep = 0; rep < numEchoes; rep++) {
        rad = echoStep * rep;
        dia = rad * 2;
        h = rep * 2;
        stroke(colr[rep])
        arc(0, 0, dia, dia, theta, endTheta);
        //convert the endpoint to cartesian
        //These endpts and startpts are needed to draw connecting lines
        xEnd = rad * cos(endTheta)
        yEnd = rad * sin(endTheta)
        point(xEnd, yEnd)
        endPts[cir].push([panel.cx + xEnd, panel.cy + yEnd]);
        startPts[cir].push([panel.cx + rad * cos(theta), panel.cy + rad * sin(theta)]);
    }
    pop();
}



function connect(sym, cirA, cirB, l, lineoffset = 0) {
    //SE: Start to End connections
    //EE: End to end connections
    if (sym == "SE") {
        //print(cirA, cirB, l)
        line(startPts[cirA][l][0], startPts[cirA][l][1], endPts[cirB][l + lineoffset][0], endPts[cirB][l + lineoffset][1])
    }
    if (sym == "EE") {
        line(endPts[cirA][l][0], endPts[cirA][l][1], endPts[cirB][l][0], endPts[cirB][l][1])
    }

}

