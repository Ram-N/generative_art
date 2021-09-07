// Daily Sketch for 2021-09-05
// Ram Narasimhan

/*
Octagonal Design
printed petals
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

class Polygon {
    constructor(n, x, y, _radius) {
        this.n = n; // number of sides
        this.x = x;
        this.y = y;
        this.radius = _radius;
        let results = this.getPolygonLatticePoints(_radius)
        this.vertices = results.vertices;
        this.empts = results.empts;
        this.midspokes = results.midspokes;
        this.midapothems = results.midapothem;

    }

    //this class method returns the vertices, midspokes and the Edge midpoints of the polygon
    getPolygonLatticePoints(radius) {
        let vertices = [];
        let empts = []; //edge midpoints
        let midspokes = [];
        let midapothem = [];
        for (let i = 0; i < this.n; i++) {
            let angle = TAU / this.n * i;
            let cx = radius * cos(angle);
            let cy = radius * sin(angle);
            let nx = radius * cos(angle + PI / 4);
            let ny = radius * sin(angle + PI / 4);
            let v = createVector(cx, cy)
            vertices.push(v);
            midspokes.push(createVector(cx / 2, cy / 2))
            v.nx = nx
            v.ny = ny
            let midx = (cx + nx) / 2
            let midy = (cy + ny) / 2
            empts.push(createVector(midx, midy)) // edge mid points
            midapothem.push(createVector(empts[i].x / 2, empts[i].y / 2))

        }

        return ({
            vertices: vertices,
            empts: empts,
            midspokes: midspokes,
            midapothems: midapothem
        })
    }

    renderPolygrid() {

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
    palette2 = random(palList)
    //palette = flame;
    palette = replicate(palette, 100)
    palette2 = replicate(palette2, 100)


    r = 310;
    octa = new Polygon(8, width / 2, height / 2, r);
    print(octa)


    //create apothems and spoke lattice points
    apothem = []
    spoke = []

    for (a of [1, 2, 3, 4]) { // each spoke and apothem is cut into 4
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


    //render shapes
    renderPetal();
    palette2 = random(palList)
    //palette = flame;
    palette2 = replicate(palette2, 100)
    renderPetal();

    octa.renderPolygrid();



    draw_border(clr = params.bgColor, sw = 50); //rn_utils.js
}


function renderPetal() {
    rad2 = 1 + int(random(4))
    rad3 = 1 + int(random(4))
    rad4 = 1 + int(random(4))
    fourthpoint = random() < 0.5;
    touchOrigin = random() < 0.5;
    spoke2 = int(random(11))
    spoke3 = int(random(11))
    print(rad4, fourthpoint, touchOrigin)
    for (i = 0; i < octa.n; i++) {
        push();
        translate(width / 2, height / 2)
        n1i = (i + 1) % 8
        p1i = (i + 7) % 8
        n2i = (i + 2) % 8
        n3i = (i + 3) % 8
        n6i = (i + 6) % 8
        n7i = (i + 7) % 8

        spokeOptions = [p1i, i, n1i, n2i, n3i, n6i, n7i, 4, 5, 6, 7]
        s2 = spokeOptions[spoke2]
        s3 = spokeOptions[spoke3]
        fill(palette2[i % 4])// + int(random(octa.n))])
        beginShape();

        if (touchOrigin) { // optional vertex
            vertex(0, 0);
        }

        vertex(spoke[rad3][s3].x, spoke[rad3][s3].y)
        vertex(apothem[rad2][s2].x, apothem[rad2][s2].y)

        // print(fourthpoint, n2i, n1i, i % 4)
        if (fourthpoint) { // optional vertex
            vertex(spoke[rad4][n2i].x, spoke[rad4][n2i].y)
        }
        endShape(CLOSE);
        pop();
    }

}






