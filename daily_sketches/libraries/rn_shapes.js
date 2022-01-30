// A JS utility library to use with p5.js sketches. 
//Ram Narasimhan

// Updated: October 2021

//Functions in this library

/*
CYL
star()
Usage: star(x, y, radius1, radius2, npoints, rot = 0, curved = false, repeat = 1)

PRISM
cuboid

*/
// cuboid - Draws a cuboid of given dimensions at x, y
//dimensions: cw, ch, clen. Center face is x,y

function swqCircle(x, y, radius1, repeat = 1) {
    for (r = 0; r < repeat; r += 1) {
        push();
        translate(x + r, y + r);
        arc(0, 0, radius1, radius1, 1.5 * PI, 0)
        pop();
    }
}

function seqCircle(x, y, radius1, repeat = 1) {
    for (r = 0; r < repeat; r += 1) {
        push();
        translate(x + r, y + r);
        arc(0, 0, radius1, radius1, PI, 1.5 * PI)
        pop();
    }
}


function nwqCircle(x, y, radius1, repeat = 1) {
    for (r = 0; r < repeat; r += 1) {
        push();
        translate(x + r, y + r);
        arc(0, 0, radius1, radius1, 0, PI / 2)
        pop();
    }
}

function neqCircle(x, y, radius1, repeat = 1) {
    for (r = 0; r < repeat; r += 1) {
        push();
        translate(x + r, y + r);
        arc(0, 0, radius1, radius1, PI / 2, PI)
        pop();
    }
}


function cyl(x, y, radius1, repeat = 1, incr = 2) {
    for (r = 0; r < repeat; r += incr) {
        push();
        translate(x + r, y + r);
        circle(0, 0, radius1)
        pop();
    }
}



//from p5js.org, and modified
function star(x, y, radius1, radius2, npoints, rot = 0, curved = false, repeat = 1) {
    for (r = 0; r < repeat; r += 1) {
        let angle = TWO_PI / npoints;
        let halfAngle = angle / 2.0;
        push();
        translate(x + r, y + r);
        rotate(rot);
        beginShape();
        for (let a = 0; a < TWO_PI; a += angle) {
            let sx = cos(a) * radius2;
            let sy = sin(a) * radius2;
            if (curved) {
                curveVertex(sx, sy);
            } else {
                vertex(sx, sy);
            }
            sx = cos(a + halfAngle) * radius1;
            sy = sin(a + halfAngle) * radius1;
            if (curved) {
                curveVertex(sx, sy);
            } else {
                vertex(sx, sy);
            }
        }
        endShape(CLOSE);
        pop();
    }
}



function prism(x, y, plen, pw, ph, _perspective = 'Above', view = 'L', colr = [0, 100, 70]) {

    let angle = PI / 6;

    xnera = clen * cos(angle) //left above
    ynera = clen * sin(angle) * -1
    xsera = pw / 2 + plen * cos(angle)
    ysera = ph - plen * sin(angle)

    push();
    translate(x, y);
    fill(colr)
    triangle(0, 0, -pw / 2, ph, pw / 2, ph)
    hu = colr[0];
    sa = colr[1];
    br = colr[2];
    fill(hu, sa, br * 0.7);
    quad(0, 0, xnera, ynera, xsera, ysera, pw / 2, ph)

    pop();
}



// 4 _perspectives: RAbove, Rbelow, LAbove, LBelow
// 2 View: Left view or Right View .. where the camera is placed
//x and y are the center of the front face of the cuboid.
function cuboid(x, y, clen, cw, ch, cubecolor, _perspective = 'Above', view = 'L') {

    let hu = 0; let sa = 0; let br = 0;
    let angle = PI / 4;
    push();
    //go to the nw corner
    translate(x - clen / 2, y - ch / 2)

    flip = 1
    if (view == 'L') {
        flip = -1
    }

    //back faces Left ABOVE
    xnwla = cw * cos(angle) * flip //left above
    ynwla = cw * sin(angle) * -1
    xswla = xnwla;
    yswla = ynwla + ch;
    xnela = xnwla + clen;
    ynela = ynwla;
    xsela = xnela;
    ysela = ynela + ch;

    //Right Above
    xnwra = cw * cos(angle);
    ynwra = -cw * sin(angle);
    xnera = xnwra + clen;
    ynera = ynwra;
    xsera = xnwra + clen;
    ysera = ynera + ch;

    //Left BELOW
    xnwlb = -cw * cos(angle) //left below
    ynwlb = cw * sin(angle)
    xswlb = xnwlb;
    yswlb = ynwlb + ch;
    xnelb = xnwlb + clen;
    ynelb = ynwlb;
    xselb = xnelb;
    yselb = ynelb + ch;





    //front face is easier
    xnwf = 0;
    ynwf = 0;
    xnef = clen;
    ynef = 0;
    xsef = clen;
    ysef = ch;
    xswf = 0;
    yswf = ch;


    // hu = colr[0];
    // sa = colr[1];
    // br = colr[2];
    fill(cubecolor.face)
    rect(0, 0, clen, ch) // front plate

    //fill(hu, sa * 0.7, br * 0.4);
    fill(cubecolor.top)
    if (view == 'L') {
        if (_perspective == 'Above') {
            //top wall or bottom plate depending on A or B view
            quad(0, 0, xnwla, ynwla, xnela, ynela, xnef, ynef) // top lid
        } else { // Left Below
            quad(0, ch, xswlb, yswlb, xselb, yselb, xsef, ysef) // bottom plate

        }
    } else { //RIGHT VIEW
        if (_perspective == 'Above') {
            //top wall or bottom plate depending on A or B view
            quad(0, 0, xnwra, ynwra, xnera, ynera, xnef, ynef) // top lid
        } else { // Below
            //RIGHT BELOW
            xnwrb = cw * cos(angle) //left below
            ynwrb = cw * sin(angle)
            xswrb = xnwrb;
            yswrb = ynwrb + ch;
            xnerb = xnwrb + clen;
            ynerb = ynwrb;
            xserb = xnerb;
            yserb = ynerb + ch;
            quad(0, ch, xswrb, yswrb, xserb, yserb, xsef, ysef) // bottom plate
        }
    }

    //fill(hu, 50, br);
    fill(cubecolor.side)
    if (view == 'L') {
        if (_perspective == 'Above') {
            quad(0, 0, xnwla, ynwla, xswla, yswla, xswf, yswf) // side wall
        } else { //Below
            quad(xnwf, ynwf, xnwlb, ynwlb, xswlb, yswlb, xswf, yswf) // side wall
        }
    } else { //RIGHT VIEW
        if (_perspective == 'Above') {
            quad(xnef, ynef, xnera, ynera, xsera, ysera, xsef, ysef) // side wall
        } else {
            quad(xnef, ynef, xnerb, ynerb, xserb, yserb, xsef, ysef) // side wall

        }
    }
    pop();
}


//Modified and built from: https://www.dariomazzanti.com/uncategorized/fun-with-polygons-p5-js/

class Polygon {
    constructor(_x, _y, _n, _size, _col) {
        this.posX = _x;
        this.posY = _y;
        // this.speedX = random(-0.1, 0.1);
        // this.speedY = random(-0.1, 0.1);
        this.nSides = _n;
        this.rotAngle = 0.0;
        this.col = _col;
        this.dim = _size; //radius
        // this.startDim = this.dim;
        // this.dimMult = 1.0;
        // this.thickness = 5;
        // this.timeOffset = random(1000);
        // this.pulseSpeed = random(0.01, 0.02);
        // this.rotSpeed = random(0.001, 0.003);
        this.polyAngle = TWO_PI / this.nSides;
        this.dir = random([[0, 3], [1, 4], [2, 5]]) // choose one
        this.vertices = this.vertices()
    }

    vertices() {
        let verts = [];
        for (var a = 0; a < TWO_PI - 0.001; a += this.polyAngle) {
            var sx = cos(a) * this.dim;
            var sy = sin(a) * this.dim;
            verts.push(createVector(sx, sy));
        }
        return verts; // coordinates relative to the center
    }

    renderVertices() {
        push();
        translate(this.posX, this.posY);
        rotate(this.rotAngle);
        stroke(this.col);
        for (let v of this.vertices) {
            point(v.x, v.y);
        }
        pop();
    }

    renderSpokes() {
        push();
        translate(this.posX, this.posY);
        rotate(this.rotAngle);
        stroke(this.col);
        for (let v of this.vertices) {
            line(0, 0, v.x, v.y);
        }
        pop();
    }


    renderStripes(sw = 1, stripeDensity = 0.25) {
        let _dir;
        let epa;
        let epb;
        push();
        translate(this.posX, this.posY);
        rotate(this.rotAngle);
        stroke(this.col);
        strokeWeight(sw);
        _dir = this.dir;
        for (let _frac = 0; _frac <= 1; _frac += stripeDensity) {
            epa = this.getPtsOnEdge(_dir[0], _frac)[0]
            epb = this.getPtsOnEdge(_dir[1], 1 - _frac)[0]
            line(epa.x, epa.y, epb.x, epb.y)
        }
        pop();
    }


    render() {
        push();
        translate(this.posX, this.posY);
        rotate(this.rotAngle);
        beginShape();
        for (var a = 0; a < TWO_PI; a += this.polyAngle) {
            var vx = cos(a) * this.dim;
            var vy = sin(a) * this.dim;
            vertex(vx, vy);
        }
        endShape(CLOSE);
        pop();
    }

    //@param: vSet= 012 for top. [0, 1, 2]
    renderSlice(vSet) {

        push();
        translate(this.posX, this.posY);
        rotate(this.rotAngle);
        beginShape();
        vertex(0, 0)
        for (var v of vSet) {
            vertex(this.vertices[v].x, this.vertices[v].y);
        }
        endShape(CLOSE);


        pop();
    }



    // updating current rotation angle (radians)
    rotate(rotAngle) {
        this.rotAngle += rotAngle;
    }
    // scaling the shape over time
    pulsate() {
        this.dimMult = sin(this.pulseSpeed * (frameCount + this.timeOffset));
        this.dim = (this.dimMult * this.startDim + this.startDim) * 0.5;
        if (this.dim <= 1) {
            this.posX = random(width);
            this.posY = random(height);
            this.speedX = random(-0.1, 0.1);
            this.speedY = random(-0.1, 0.1);
            this.col = color(palette[int(random(maxColNum))]);
        }
    }
    // moving around randomly
    move() {
        this.posX += this.speedX * deltaTime;
        this.posY += this.speedY * deltaTime;
    }
    // calling some functions...
    animate() {
        this.rotate();
        this.pulsate();
        this.move();
    }


    getPtsOnEdge(edge, dist_frac) {
        /*
        Given a Edgenum[0 - 5] return a point(x, y) distance from vert away on the edge
        
        Parameters
        ----------
        
          edge: int or None
        edge is the edge - number from 0..5.If it is None, all 6 edges are included.
        
          dist_frac : float
        distance from the hexagon vertex, in hexagon - size units.Note: This is not absolute distance.Typically
          `dist` goes from 0 to 1, and gets multiplied by the`size` of the hexagon. 
            0 is closest to the starting vertex, 1 is the next vertex.
        
          Returns
        -------
          list
        List of new points, in [(x1, y1), (x2, y2) ...] format  
        */

        let edgePts = [];
        let e;
        let theta_offset = 30;
        if (dist_frac == null) {
            dist_frac = random(0, 1)
        }
        let _dist = dist_frac * this.dim
        let pt;

        if (edge == null) { // get from all edges
            for (pt of this.vertices) {
                edgePts.push(
                    createVector(
                        pt.x + _dist * sin((-60 * (edge + 1) + theta_offset) * PI / 180),
                        pt.y + _dist * cos((-60 * (edge + 1) + theta_offset) * PI / 180)
                    )
                )
            }

        } else { // single edge

            pt = this.vertices[edge]
            edgePts.push(
                createVector(
                    pt.x + _dist * sin((-60 * (edge + 1) + theta_offset) * PI / 180),
                    pt.y + _dist * cos((-60 * (edge + 1) + theta_offset) * PI / 180)
                )
            )

        }
        return edgePts;
    }
} //Polygon Class 

/////////////////////////

function get_vertices(x, y, radius, npoints) {
    let vertices = [];
    let angle = TWO_PI / npoints;
    let a = PI / 2;
    for (let i = 0; i < npoints; i++) {
        a += angle;
        let sx = x + cos(a) * radius;
        let sy = y + sin(a) * radius;
        vertices.push(createVector(sx, sy));
    }

    return vertices;

}

function render_poly(verts) {
    beginShape();
    for (v of verts) {
        vertex(v.x, v.y);
    }
    endShape(CLOSE);
}

function Npolygon(x, y, radius, npoints) {
    let angle = TWO_PI / npoints;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = x + cos(a) * radius;
        let sy = y + sin(a) * radius;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}
