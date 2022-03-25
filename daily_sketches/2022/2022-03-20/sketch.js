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

    r = 250;
    r2 = r / 2;
    r3 = 3 / 2 * r2;

    main_octa = createOctagon(r);

    v0 = vertices[0]
    side = dist(v0.x, v0.y, v0.nx, v0.ny);
    s2 = side / 2;
    print(side, s2)
    print(main_octa)

    render_octagrid(main_octa, width / 2, height / 2, 1);

    palette = random(RGBPalList);
    palette = replicate(palette, 100)

    for (i = 0; i < 8; i++) {
        print(i)
        sc = 0.25
        rDist = r * 1.25
        tx = width / 2 + rDist * cos(PI / 4 * i + PI / 8)
        ty = width / 2 + rDist * sin(PI / 4 * i + PI / 8)
        render_octagrid(main_octa, tx, ty, sc);
    }


    draw_border(clr = params.bgColor, sw = 50); //rn_utils.js
    noLoop();
}



// Returns three sets of points
//Vertices, EDGEmipts and mispokes.
//NOTE: These are all relative to origin (0,0)
function createOctagon(r) {
    vertices = [];
    mpts = []; //midpoints
    midspokes = [];

    for (i = 0; i < 8; i++) {
        angle = PI / 4 * i;
        cx = r * cos(angle);
        cy = r * sin(angle);
        nx = r * cos(angle + PI / 4);
        ny = r * sin(angle + PI / 4);
        v = createVector(cx, cy) // Vertices of Octagon
        v.nx = nx //next vertex
        v.ny = ny
        v.midx = (cx + nx) / 2
        v.midy = (cy + ny) / 2
        mpts.push(createVector(v.midx, v.midy))
        midspokes.push(createVector(mpts[i].x / 2, mpts[i].y / 2))
        vertices.push(v);
    }

    return { vertices: vertices, mpts: mpts, midspokes: midspokes }

}

function render_octagrid(oct, transX, transY, sc) {
    push();
    noFill();
    stroke(222)
    translate(transX, transY);
    scale(sc);
    for (let i = 0; i < 8; i++) {
        n1i = (i + 1) % 8
        n2i = (i + 2) % 8
        n3i = (i + 3) % 8
        n4i = (i + 4) % 8

        strokeWeight(20)

        stroke(palette[1])
        line(oct.mpts[i].x, oct.mpts[i].y, oct.mpts[n4i].x, oct.mpts[n4i].y)
        stroke(palette[2])
        line(oct.vertices[i].x, oct.vertices[i].y, oct.vertices[n3i].x, oct.vertices[n3i].y)
        strokeWeight(7)
        stroke(palette[7])
        line(oct.mpts[i].x, oct.mpts[i].y, oct.mpts[n2i].x, oct.mpts[n2i].y)

        stroke(palette[1])
        strokeWeight(20)
        line(oct.vertices[i].x, oct.vertices[i].y, oct.vertices[n1i].x, oct.vertices[n1i].y)
    }
    pop();


}
