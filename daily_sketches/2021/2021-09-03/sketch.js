// Daily Sketch for 2021-09-03
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

class Octagon {
    constructor(x, y, _radius) {
        this.x = x;
        this.y = y;
        this.radius = _radius;
        let results = this.getOctagonPoints(_radius)
        this.vertices = results.vertices;
        this.empts = results.empts;
        this.midspokes = results.midspokes;

    }

    getOctagonPoints(radius) {
        let vertices = [];
        let empts = []; //edge midpoints
        let midspokes = [];
        for (let i = 0; i < 8; i++) {
            let angle = PI / 4 * i;
            let cx = radius * cos(angle);
            let cy = radius * sin(angle);
            let nx = radius * cos(angle + PI / 4);
            let ny = radius * sin(angle + PI / 4);
            let v = createVector(cx, cy)
            v.nx = nx
            v.ny = ny
            let midx = (cx + nx) / 2
            let midy = (cy + ny) / 2
            empts.push(createVector(midx, midy))
            midspokes.push(createVector(empts[i].x / 2, empts[i].y / 2))
            vertices.push(v);
        }

        return ({
            vertices: vertices,
            empts: empts,
            midspokes: midspokes
        })
    }

    renderOctagrid() {

        let vertices = this.vertices;
        let empts = this.empts;
        print(vertices)

        push();
        noFill();
        stroke(222)
        translate(this.x, this.y);
        for (let i = 0; i < 8; i++) {
            let n1i = (i + 1) % 8
            let n2i = (i + 2) % 8
            let n3i = (i + 3) % 8
            let n4i = (i + 4) % 8
            stroke("white")
            strokeWeight(4)
            line(vertices[i].x, vertices[i].y, vertices[n1i].x, vertices[n1i].y)
            //line(empts[i].x, empts[i].y, empts[n2i].x, empts[n2i].y)
            strokeWeight(2)
            stroke("lightblue")
            // line(empts[i].x, empts[i].y, empts[n4i].x, empts[n4i].y)
            // line(vertices[i].x, vertices[i].y, vertices[n3i].x, vertices[n3i].y)
        }
        pop();
    }


}


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


    r = 310;
    r2 = r / 2;
    r3 = 3 / 2 * r2;

    octa = new Octagon(width / 2, height / 2, r);
    print(octa)

    apoR3s = []; //apothem rib3. The 8 points where apothem's intersect Rib3
    R4s = []

    //create apothems and spoke lattice points
    apothem = []
    spoke = []

    for (a of [1, 2, 3, 4]) {
        apothem[a] = [];
        spoke[a] = [];
        for (i = 0; i < 8; i++) {
            x = octa.empts[i].x * a / 4
            y = octa.empts[i].y * a / 4
            apothem[a].push(createVector(x, y))
            x = octa.vertices[i].x * a / 4
            y = octa.vertices[i].y * a / 4
            spoke[a].push(createVector(x, y))
        }
    }

    for (i = 0; i < 8; i++) {
        n1i = (i + 1) % 8
        n2i = (i + 2) % 8
        n6i = (i + 6) % 8
        n7i = (i + 7) % 8
        result = checkLineIntersection(0, 0, octa.empts[i].x, octa.empts[i].y, octa.vertices[n2i].x, octa.vertices[n2i].y, octa.vertices[n7i].x, octa.vertices[n7i].y)
        apoR3s.push(createVector(result.x, result.y))
        print(i, 8 - i)
        result = checkLineIntersection(octa.empts[i].x, octa.empts[i].y,
            octa.empts[n6i].x, octa.empts[n6i].y,
            octa.empts[n1i].x, octa.empts[n1i].y,
            octa.empts[n7i].x, octa.empts[n7i].y,
        )
        R4s.push(createVector(result.x, result.y))

    }


    //render shapes
    for (i = 0; i < 8; i++) {
        push();
        translate(width / 2, height / 2)
        n1i = (i + 1) % 8
        p1i = (i + 7) % 8
        n2i = (i + 2) % 8

        fill(palette[(i) % 4 + 4])
        beginShape();
        vertex(0, 0);
        vertex(apothem[2][p1i].x, apothem[2][p1i].y)
        vertex(spoke[2][i].x, spoke[2][i].y)
        vertex(spoke[4][p1i].x, spoke[4][p1i].y)
        vertex(apothem[4][n2i].x, apothem[4][n2i].y)
        endShape(CLOSE);
        pop();
    }


    octa.renderOctagrid();




    draw_border(clr = params.bgColor, sw = 50); //rn_utils.js
}







