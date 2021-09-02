// Daily Sketch for 2021-09-02
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
            strokeWeight(2)
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


    r = 250;
    r2 = r / 2;
    r3 = 3 / 2 * r2;

    octa = new Octagon(width / 2, height / 2, 250);

    print(octa)

    apoR3s = []; //apothem rib3. The 8 points where apothem's intersect Rib3
    R4s = []

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

    for (i = 0; i < 8; i++) {
        fill(50 + 200 * (i % 2))
        push();
        translate(width / 2, height / 2)
        n1i = (i + 1) % 8
        p1i = (i + 7) % 8
        n2i = (i + 2) % 8

        //draw 8 squares. ApoR3 and R4s and MPTS
        beginShape();
        vertex(octa.empts[i].x, octa.empts[i].y)
        vertex(R4s[i].x, R4s[i].y)
        vertex(apoR3s[i].x, apoR3s[i].y)
        vertex(R4s[n1i].x, R4s[n1i].y)
        endShape(CLOSE);

        fill(palette[(i) % 4 + 4])
        //central diamonds
        beginShape();
        vertex(0, 0)
        vertex(apoR3s[i].x, apoR3s[i].y)
        vertex(R4s[n1i].x, R4s[n1i].y)
        vertex(apoR3s[n1i].x, apoR3s[n1i].y)
        endShape(CLOSE);

        fill(palette2[i % 4])
        //horizontal diamonds
        beginShape();
        vertex(octa.vertices[i].x, octa.vertices[i].y)
        vertex(octa.empts[i].x, octa.empts[i].y)
        vertex(R4s[i].x, R4s[i].y)
        print(p1i)
        vertex(octa.empts[p1i].x, octa.empts[p1i].y)
        endShape(CLOSE);



        pop();

    }


    // v0 = octa.vertices[0]
    // side = dist(v0.x, v0.y, v0.nx, v0.ny);
    // s2 = side / 2;
    // print(side, s2)


    octa.renderOctagrid();




    draw_border(clr = params.bgColor, sw = 50); //rn_utils.js
}







