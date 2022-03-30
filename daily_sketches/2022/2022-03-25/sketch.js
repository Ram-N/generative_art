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

    stepSlider = createSlider(200, 300, 250, 25).parent(sliderPos);
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
    r = stepSlider.value();
    r2 = r / 2;
    r3 = 3 / 2 * r2;

    main_octa = createPolygon(r, n);
    print(main_octa)

    v0 = vertices[0]
    side = dist(v0.x, v0.y, v0.nx, v0.ny);
    s2 = side / 2;
    print(side, s2)

    palette = random(RGBPalList);
    palette = replicate(palette, 100)

    render_polygon(main_octa, width / 2, height / 2, 1);

    //satellites
    for (i = 0; i < n; i++) {
        print(i)
        sc = 0.25
        rDist = r * 1.25
        tx = width / 2 + rDist * cos(TAU / n * i + PI / 8)
        ty = width / 2 + rDist * sin(TAU / n * i + PI / 8)
        render_polygon(main_octa, tx, ty, sc);
    }


    draw_border(clr = params.bgColor, sw = 50); //rn_utils.js
    noLoop();
}



// Returns three sets of points
//Vertices, EDGEmipts and mispokes.
//NOTE: These are all relative to origin (0,0)
function createPolygon(r, numSides) {
    vertices = [];
    mpts = []; //midpoints
    midspokes = [];

    deltaA = TAU / numSides;
    eps = TAU / numSides / 2;
    for (i = 0; i < numSides; i++) {
        angle = deltaA * i;
        cx = r * cos(angle + eps);
        cy = r * sin(angle);
        nx = r * cos(angle + deltaA + eps);
        ny = r * sin(angle + deltaA + eps);
        v = createVector(cx, cy) // Vertices of polygon
        v.nx = nx; //next vertex
        v.ny = ny;
        v.midx = (cx + nx) / 2
        v.midy = (cy + ny) / 2
        mpts.push(createVector(v.midx, v.midy))
        midspokes.push(createVector(mpts[i].x / 2, mpts[i].y / 2))
        vertices.push(v);
    }

    return { vertices: vertices, mpts: mpts, midspokes: midspokes }

}

function render_polygon(poly, transX, transY, sc) {
    push();
    noFill();
    stroke(222)
    translate(transX, transY);
    scale(sc);

    numSides = poly.vertices.length
    for (let i = 0; i < numSides; i++) {
        n1i = (i + 1) % numSides
        n2i = (i + 2) % numSides
        n3i = (i + 3) % numSides
        n4i = (i + 6) % numSides

        strokeWeight(5)

        stroke(palette[1])
        line(poly.mpts[i].x, poly.mpts[i].y, poly.mpts[n4i].x, poly.mpts[n4i].y)
        stroke(palette[2])
        line(poly.vertices[i].x, poly.vertices[i].y, poly.vertices[n3i].x, poly.vertices[n3i].y)
        strokeWeight(7)
        stroke(palette[7])
        line(poly.mpts[i].x, poly.mpts[i].y, poly.mpts[n2i].x, poly.mpts[n2i].y)

        stroke(palette[1])
        strokeWeight(7)
        line(poly.vertices[i].x, poly.vertices[i].y, poly.vertices[n1i].x, poly.vertices[n1i].y)
    }
    pop();


}
