// A JS utility library to use with p5.js sketches. 
//Ram Narasimhan

// Updated: November 2021

//Functions in this library

//gradientLine
//steppedLine() // staircase effect
// linearGradient(x1, y1, x2, y2, col1, col2)
//radialGradient(x, y, rStart, rStop, col1, col2)
//shadow(x, y, blur, col)
//noShadow()
/*

*/



//source: https://erraticgenerator.com/blog/gradient-lines-and-brushes-in-p5js/

// c1 is the start color
// c2 is the ending color
// sz is the size of the line/ellipse
function gradientLine(x1, y1, x2, y2, c1, c2, sz) {
    const d = dist(x1, y1, x2, y2)
    for (let i = 0; i < d; i++) {
        const step = map(i, 0, d, 0, 1)
        const x = lerp(x1, x2, step)
        const y = lerp(y1, y2, step)
        const c = lerpColor(c1, c2, step)
        fill(c)
        ellipse(x, y, sz, sz)
    }
}



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


//Usage:         
// curve1 = new SquigglyLine(start, end, numPoints = 200)
//curve1.display()
// Adapted from: https://stackoverflow.com/a/69389801/918215
class SquigglyLine { // Creates a squiggly line between two points

    constructor(start, end, numPoints = 100) {
        this.start = start;
        this.end = end;
        this.numPoints = numPoints;
        this.pts = this.createSquigglyLineBetween2Points(start, end, this.numPoints);
    }

    display() {
        beginShape();
        for (let pt of this.pts) {
            curveVertex(pt.x, pt.y)
        }
        endShape();
    }

    createSquigglyLineBetween2Points(start, end, numPoints) {

        // The level of detail in the line in number of pixels between each point.
        //all these have to be parametrized
        const pixelsPerSegment = 3;
        const noiseScale = 160;
        const noiseFrequency = 0.01;

        let lineLength = start.dist(end);

        // Determine the number of segments, and make sure there is at least one.
        let segments = max(1, round(lineLength / pixelsPerSegment));
        // Determine the number of points, which is the number of segments + 1
        let points = numPoints;

        // We need to know the angle of the line so that we can determine the x
        // and y position for each point along the line, and when we offset based
        // on noise we do so perpendicular to the line.
        let angle = atan2(end.y - start.y, end.x - start.x);

        var pts = [];


        // for each point that is neither the start nor end point
        for (let i = 1; i < points - 1; i++) {
            // let x = start.x + xInterval * i;
            // let y = start.y + yInterval * i;

            // determine the x and y positions along the straight line from start to end
            let x = lerp(start.x, end.x, i / points);
            let y = lerp(start.y, end.y, i / points);

            // calculate the offset distance using noice
            let offset =
                // The bigger this number is the greater the range of offsets will be
                noiseScale *
                (noise(
                    // The bigger the value of noiseFrequency, the more erretically
                    // the offset will change from point to point.
                    i * pixelsPerSegment * noiseFrequency
                ) - 0.5);

            // Translate offset into x and y components based on angle - 90°
            // (or in this case, PI / 2 radians, which is equivalent)
            let xOffset = offset * cos(angle - PI / 2);
            let yOffset = offset * sin(angle - PI / 2);
            pts.push(createVector(x + xOffset, y + yOffset));

        }

        //pts.push(createVector(end.x, end.y));
        return pts;

    }

}
