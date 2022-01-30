//P5, GEOMETRY-related objects, functions and utilities
// Ram Narasimhan 
// Updated on 2021-09-24

/*
List of functions available

isPtInsideCircle
isPtInsideRect
ptDistanceToLine
getInbetweenPtOnLine - given two points, get a pt on this line, distance fraction m away.

  returns the x,y or the intersection point, if they exist.display
intersectionPtOf2Lines(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) 


*/



class Rectangle { // give NW corner, w and h
    constructor(x, y, _width, _height) {
        this.x = x;
        this.y = y;
        this.w = _width;
        this.h = _height;
        this.minX = x;
        this.maxX = x + _width;
        this.minY = y;
        this.maxY = y + _height;
    }

    display() {
        noFill();
        rect(this.x, this.y, this.w, this.h)
    }

}




function isPtInsideCircle(pt, centerX, centerY, radius) {
    if (dist(pt.x, pt.y, centerX, centerY) > radius) {
        return 0
    }
    return 1
}


function isPtInsideRect(pt, rect) {
    if (pt.x < rect.minX) { return 0 }
    if (pt.x > rect.maxX) { return 0 }
    if (pt.y < rect.minY) { return 0 }
    if (pt.y > rect.maxY) { return 0 }
    return 1
}


//https://stackoverflow.com/questions/849211/shortest-distance-between-a-point-and-a-line-segment
function ptDistanceToLine(x, y, x1, y1, x2, y2) {

    var A = x - x1;
    var B = y - y1;
    var C = x2 - x1;
    var D = y2 - y1;

    var dot = A * C + B * D;
    var len_sq = C * C + D * D;
    var param = -1;
    if (len_sq != 0) //in case of 0 length line
        param = dot / len_sq;

    var xx, yy;

    if (param < 0) {
        xx = x1;
        yy = y1;
    }
    else if (param > 1) {
        xx = x2;
        yy = y2;
    }
    else {
        xx = x1 + param * C;
        yy = y1 + param * D;
    }

    var dx = x - xx;
    var dy = y - yy;
    return Math.sqrt(dx * dx + dy * dy);
}


/* Return 1 if Line between p1p2 intersects a given circle
          0 otherwise
    based on dist of line between p1-p2 to circle 
    This only works for GridPoints.
*/
function lineIntersectsCircle(p1, p2, circlePts) {
    for (c of circlePts) {
        d = ptDistanceToLine(c.col, c.row, p1.col, p1.row, p2.col, p2.row)
        if (d < 1) {
            return 1 // line intersects
        }
    }
    return 0 //does not intersect
}


/*Given 2 lines: l1Startx... l2endY.
The following function returns the x,y or the intersection point, if they exist.display
https://jsfiddle.net/justin_c_rounds/Gd2S2/light/
*/
function intersectionPtOf2Lines(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
    // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
    var denominator, a, b, numerator1, numerator2, result = {
        x: null,
        y: null,
        onLine1: false,
        onLine2: false
    };
    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
    if (denominator == 0) {
        return result;
    }
    a = line1StartY - line2StartY;
    b = line1StartX - line2StartX;
    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    // if we cast these lines infinitely in both directions, they intersect here:
    result.x = line1StartX + (a * (line1EndX - line1StartX));
    result.y = line1StartY + (a * (line1EndY - line1StartY));
    /*
            // it is worth noting that this should be the same as:
            x = line2StartX + (b * (line2EndX - line2StartX));
            y = line2StartX + (b * (line2EndY - line2StartY));
            */
    // if line1 is a segment and line2 is infinite, they intersect if:
    if (a > 0 && a < 1) {
        result.onLine1 = true;
    }
    // if line2 is a segment and line1 is infinite, they intersect if:
    if (b > 0 && b < 1) {
        result.onLine2 = true;
    }
    // if line1 and line2 are segments, they intersect if both of the above are true
    return result;
};



//xt, yt = (((1 - t) * x0 + t * x1), ((1 - t) * y0 + t * y1))
//give 2 points p0 and p1, find a third pt that is t (0<t<1) away
function getInbetweenPtOnLine(x0, y0, x1, y1, t) {

    xt = (1 - t) * x0 + t * x1
    yt = (1 - t) * y0 + t * y1
    return ({ x: xt, y: yt })
}



//Creates a list of points along the Bezier Curve
//Specified by bCurve
function findBezierPoints(bCurve) {
    var numSlices = bCurve.numSlices;
    var startPt = bCurve.start;
    var controlPt1 = bCurve.control1;
    var controlPt2 = bCurve.control2;
    var endPt = bCurve.end;
    var pts = [startPt];
    var lastPt = startPt;
    for (var t = 0; t <= numSlices; t++) {
        // calc another point along the curve
        var pt = getCubicBezierXYatPercent(startPt, controlPt1, controlPt2, endPt, t / numSlices);
        // add the pt if it's not already in the pts[] array
        var dx = pt.x - lastPt.x;
        var dy = pt.y - lastPt.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        var dInt = parseInt(d);
        if (dInt > 0 || t == numSlices) {
            lastPt = pt;
            pts.push(pt);
        }
    }
    return (pts);
}



//https://stackoverflow.com/questions/34681457/html5-canvas-bezier-curve-get-all-the-points
// Given the Start, EndPt and 2 control points on a Bezier curve 
// get x,y at interval T along the curve (0<=T<=1)
// The curve starts when T==0 and ends when T==1
function getCubicBezierXYatPercent(startPt, controlPt1, controlPt2, endPt, percent) {
    var x = CubicN(percent, startPt.x, controlPt1.x, controlPt2.x, endPt.x);
    var y = CubicN(percent, startPt.y, controlPt1.y, controlPt2.y, endPt.y);
    return ({
        x: x,
        y: y
    });
}

// cubic helper formula
function CubicN(T, a, b, c, d) {
    var t2 = T * T;
    var t3 = t2 * T;
    return a + (-a * 3 + T * (3 * a - a * T)) * T + (3 * b + T * (-6 * b + b * 3 * T)) * T + (c * 3 - c * 3 * T) * t2 + d * t3;
}

//draws a rectilinear SPIRAL
function drawRectSpiral(count, stepX, stepY) {
    let xSE1 = 0;
    let ySE1 = 0;
    let xSW2 = 0;
    let ySW2 = 0;
    let xNW3 = 0;
    let yNW3 = 0;
    let xNE4 = 0;
    let yNE4 = 0;
    let station = 0;
    for (let i = 0; i < count; i++) {
        xSE1 += stepX;
        xSW2 -= stepX;
        xNW3 -= stepX;
        xNE4 += stepX;
        ySE1 += stepY;
        ySW2 += stepY;
        yNW3 -= stepY;
        yNE4 -= stepY;
        push();
        fill('white')
        translate(width / 2, height / 2);
        //line(xSE1, ySE1, xSW2 - stepX, ySW2) // South Wall
        station += 1
        if (!(station % 5)) { drawSquares(xSE1, ySE1, i); }
        //line(xSW2 - stepX, ySW2, xNW3 - stepX, yNW3 - stepY); //West Wall
        station += 1
        if (!(station % 5)) { drawSquares(xSW2 - stepX, ySW2, i); }
        //line(xNW3 - stepX, yNW3 - stepY, xNE4 + stepX, yNE4 - stepY); //N wall
        station += 1
        if (!(station % 5)) { drawSquares(xNW3 - stepX, yNW3 - stepY, i); }
        //line(xNE4 + stepX, yNE4 - stepY, xSE1 + stepX, ySE1 + stepY); //East wall
        station += 1
        if (!(station % 5)) { drawSquares(xNE4 + stepX, yNE4 - stepY, i); }
        pop();
    }
}
