//P5, GEOMETRY-related objects, functions and utilities
// Ram Narasimhan 
// Updated on 2021-08-07

//August: Added a rectangle class
// function: Is pt inside rectangle


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
