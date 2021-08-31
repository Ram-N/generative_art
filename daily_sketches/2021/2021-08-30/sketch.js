// Daily Sketch for 2021-08-30
// Ram Narasimhan

/*
Octagonal Design
*/


const cnv = {
    xMargin: 30,
    yMargin: 30,
}

let palette = []
const params = {
    bgColor: "#0f0f0f", //black
}

sqSize = 660;

function setup() {
    createCanvas(sqSize, sqSize);
    //colorMode(HSB);
    background(0, 0, 0);

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    print(cnv)
    xstart = cnv.xMargin
    ystart = cnv.yMargin
    xend = cnv.xMargin + cnv.width
    yend = cnv.yMargin + cnv.height
    midX = width / 2
    midY = height / 2

    palette2 = red_brown_orange; //colors.js
    palette = flame;
    palette = replicate(palette, 100)
    palette2 = replicate(palette2, 100)

    vertices = [];
    mpts = []; //midpoints
    midspokes = [];

    r = 250;
    r2 = r / 2;
    r3 = 3 / 2 * r2;

    createOctagon(r);

    v0 = vertices[0]
    side = dist(v0.x, v0.y, v0.nx, v0.ny);
    s2 = side / 2;
    print(side, s2)


    render_octagrid();




    draw_border(clr = params.bgColor, sw = 50); //rn_utils.js
}


function createOctagon(r) {
    for (i = 0; i < 8; i++) {
        angle = PI / 4 * i;
        cx = r * cos(angle);
        cy = r * sin(angle);
        nx = r * cos(angle + PI / 4);
        ny = r * sin(angle + PI / 4);
        v = createVector(cx, cy)
        v.nx = nx
        v.ny = ny
        v.midx = (cx + nx) / 2
        v.midy = (cy + ny) / 2
        mpts.push(createVector(v.midx, v.midy))
        midspokes.push(createVector(mpts[i].x / 2, mpts[i].y / 2))
        vertices.push(v);
    }

}

function render_octagrid() {
    push();
    noFill();
    stroke(222)
    translate(width / 2, height / 2);
    for (i = 0; i < 8; i++) {
        n1i = (i + 1) % 8
        n2i = (i + 2) % 8
        n3i = (i + 3) % 8
        n4i = (i + 4) % 8
        stroke("white")
        strokeWeight(20)
        line(vertices[i].x, vertices[i].y, vertices[n1i].x, vertices[n1i].y)
        line(mpts[i].x, mpts[i].y, mpts[n2i].x, mpts[n2i].y)
        strokeWeight(7)
        stroke("lightblue")
        line(mpts[i].x, mpts[i].y, mpts[n4i].x, mpts[n4i].y)
        line(vertices[i].x, vertices[i].y, vertices[n3i].x, vertices[n3i].y)
        //circle(midspokes[i].x, midspokes[i].y, 10);
    }
    pop();


}




