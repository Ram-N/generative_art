// A JS utility library to use with p5.js sketches. 
//Ram Narasimhan

// Updated: November 2021

//Functions in this library
//steppedLine() // staircase effect
// linearGradient(x1, y1, x2, y2, col1, col2)
//radialGradient(x, y, rStart, rStop, col1, col2)
//shadow(x, y, blur, col)
//noShadow()
/*

*/

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


//functions courtesy of u/stntoulouse
//found these in: https://www.reddit.com/r/generative/comments/qx98qn/comment/hl95qe5/?utm_source=share&utm_medium=web2x&context=3

// Set a linear gradient
function linearGradient(x1, y1, x2, y2, col1, col2) {
    let grad = drawingContext.createLinearGradient(x1, y1, x2, y2);
    grad.addColorStop(0, col1);
    grad.addColorStop(1, col2);
    drawingContext.fillStyle = grad;
}

// Set a radial gradient
function radialGradient(x, y, rStart, rStop, col1, col2) {
    let grad = drawingContext.createRadialGradient(x, y, rStart, x, y, rStop);
    grad.addColorStop(0, col1);
    grad.addColorStop(1, col2);
    drawingContext.fillStyle = grad;
}

// Set a shadow effect
function shadow(x, y, blur, col) {
    drawingContext.shadowOffsetX = x;
    drawingContext.shadowOffsetY = y;
    drawingContext.shadowBlur = blur;
    drawingContext.shadowColor = col;
}

// Cancel the shadow effect
function noShadow() {
    drawingContext.shadowOffsetX = null;
    drawingContext.shadowOffsetY = null;
    drawingContext.shadowBlur = null;
    drawingContext.shadowColor = null;
}
