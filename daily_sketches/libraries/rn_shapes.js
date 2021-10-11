// A JS utility library to use with p5.js sketches. 
//Ram Narasimhan

// Updated: October 2021

//Functions in this library
// cuboid - Draws a cuboid of given dimensions at x, y
//dimensions: cw, ch, clen. NW corner is x,y
function cuboid(x, y, clen, cw, ch, pal = Hgreen_yellow, dir = 'R') {

    let hu = 0; let sa = 0; let br = 0;
    let angle = PI / 4;
    push();
    translate(x, y)

    flip = 1
    if (dir == 'L') {
        flip = -1
    }

    xnwb = cw * cos(angle) * flip
    ynwb = cw * sin(angle) * -1
    xswb = xnwb;
    yswb = ynwb + ch;

    xneb = xnwb + clen;
    yneb = ynwb;
    xnef = clen;
    ynef = 0;
    xseb = xneb;
    yseb = yneb + ch;
    xsef = clen;
    ysef = ch;
    xswf = 0;
    yswf = ch;
    hu = 0; sa = 0; br = 0;
    [hu, sa, br] = random(pal);
    fill(hu, sa, br);
    rect(0, 0, clen, ch) // front plate
    hu = 0; sa = 0; br = 0;
    [hu, sa, br] = random(pal);
    fill(hu, sa * 0.7, br);
    quad(0, 0, xnwb, ynwb, xneb, yneb, xnef, ynef) // top lid

    hu = 0; sa = 0; br = 0;
    [hu, sa, br] = random(pal);
    fill(hu, sa, br * 0.7);

    if (dir == 'L') {
        quad(0, 0, xnwb, ynwb, xswb, yswb, xswf, yswf) // side wall
    } else {
        quad(xnef, ynef, xneb, yneb, xseb, yseb, xsef, ysef) // side wall
    }
    pop();
}

