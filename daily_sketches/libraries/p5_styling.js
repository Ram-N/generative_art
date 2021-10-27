// A JS utility library to use with p5.js sketches. 
//Ram Narasimhan

// Updated: October 2021

//Functions in this library

/*

*/
// cuboid - Draws a cuboid of given dimensions at x, y
//dimensions: cw, ch, clen. Center face is x,y

function steppedLine(x0, y0, x1, y1, numSteps = 3, hStart = 1) {

    xStep = (x1 - x0) / numSteps
    yStep = (y1 - y0) / numSteps

    cx = x0; cy = y0;
    for (s = 0; s < numSteps; s++) {
        nx = cx + xStep;
        ny = cy + yStep;

        if (hStart) {
            line(cx, cy, nx, cy);//horiz first
            line(nx, cy, nx, ny);//vert
        } else {
            line(nx, cy, nx, ny);//vert
            line(cx, cy, nx, cy);//horiz
        }
        cx = nx; cy = ny;
    }
}
