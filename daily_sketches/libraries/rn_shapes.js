// A JS utility library to use with p5.js sketches. 
//Ram Narasimhan

// Updated: October 2021

//Functions in this library

/*
CYL
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


function cyl(x, y, radius1, repeat = 1) {
    for (r = 0; r < repeat; r += 1) {
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
function cuboid(x, y, clen, cw, ch, _perspective = 'Above', view = 'L', colr = [0, 100, 70]) {

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


    hu = colr[0];
    sa = colr[1];
    br = colr[2];
    fill(hu, sa, br);
    rect(0, 0, clen, ch) // front plate

    hu = colr[0];
    sa = colr[1];
    br = colr[2];
    fill(hu, sa * 0.7, br * 0.4);
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

    fill(hu, 50, br);
    if (view == 'L') {
        if (_perspective == 'Above') {
            quad(0, 0, xnwla, ynwla, xswla, yswla, xswf, yswf) // side wall
        } else { //Below
            quad(xnwf, ynwf, xnwlb, ynwlb, xswlb, yswlb, xswf, yswf) // side wall
            // push();
            // strokeWeight(3);
            // line(xnwf, ynwf, xswlb, yswlb)
            // //            line(xnwlb, ynwlb, xswf, yswf)
            // pop();
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

