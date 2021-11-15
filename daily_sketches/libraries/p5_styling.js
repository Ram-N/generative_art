// A JS utility library to use with p5.js sketches. 
//Ram Narasimhan

// Updated: October 2021

//Functions in this library

/*

*/
// cuboid - Draws a cuboid of given dimensions at x, y
//dimensions: cw, ch, clen. Center face is x,y

/* hStart is a flag that determines the direction of the line emanating
from x0,y0 */
function steppedLine(x0, y0, x1, y1, hStart = 1, numSteps = 3) {

    xStep = (x1 - x0) / numSteps
    yStep = (y1 - y0) / numSteps
    //print('xstep ystep', xStep, yStep);

    cx = x0; cy = y0;
    for (s = 0; s < numSteps; s++) {
        nx = cx + xStep;
        ny = cy + yStep;
        //print('cx cy nx ny', cx, cy, nx, ny)
        if (hStart) {
            line(cx, cy, nx, cy);//horiz first
            line(nx, cy, nx, ny);//vert
        } else {
            line(cx, cy, cx, ny);//vert
            line(cx, ny, nx, ny);//horiz
        }
        cx = nx; cy = ny;
    }
}
