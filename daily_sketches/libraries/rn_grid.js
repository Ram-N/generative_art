//P5, Grid-related objects, functions and utilities
// Ram Narasimhan 
// Updated on 2021-06-15


class HexGrid {
    /**
     * Create and Return a grid object
     * @param  {Integer} nRows Number of rows
     * @param  {Integer} nCols Number of columns
     */
    constructor(cWidth, cHeight, canvasXMargin, canvasYMargin, triangleHt) {
        this.width = cWidth; // usable width
        this.height = cHeight; // usable ht
        this.xMargin = canvasXMargin;
        this.yMargin = canvasYMargin;
        this.triangleHt = triangleHt;
        //this.xStep = cWidth / nCols;
        //this.yStep = cHeight / nRows;
        //print('x y step:', this.xStep, this.yStep)
        this.points = this.createHexGridPoints(); // stored col by col array of arrays
        this.triangles = this.createIsoTriangles();
    }

    createHexGridPoints() {
        let th = this.triangleHt
        let tw = th * sqrt(3) / 2; // pointy topped grid
        let num_cols = int(this.width / tw)
        let num_rows = int(2 * this.height / th)
        this.rows = num_rows + 5;
        this.cols = num_cols //+ 2;

        print(th, tw, this.rows, 'cols', this.cols, this.width, this.height, "th, tw, rows, cols wi he")
        let dots = [];

        for (let col = 0; col < this.cols; col++) {
            let odd_col_dots = [];
            let even_col_dots = [];
            //let yOffset = this.yMargin;
            let yOffset = -th / 2;

            for (let row = 0; row < this.rows; row++) {
                let xOffset = this.xMargin + tw;
                if (row % 2) {
                    xOffset = this.xMargin;
                }
                let x = col * tw * 2 + xOffset;
                let y = row * th / 2 + yOffset;
                let p = createVector(x, y)
                p.row = row;
                p.col = col;
                if (row % 2) {//odd
                    odd_col_dots.push(p);
                } else {
                    even_col_dots.push(p);
                }
            }
            dots.push(odd_col_dots);
            dots.push(even_col_dots);
        }

        return dots;
    }

    getGlobalCoords(gCol, gRow) {
        let tw = this.triangleHt * sqrt(3) / 2; // pointy topped grid
        let yOffset = this.yMargin;
        let xOffset = this.xMargin + tw;
        if (gRow % 2) {
            xOffset = this.xMargin;
        }

        let px = gCol * tw * 2 + xOffset;
        let py = gRow * this.triangleHt / 2 + yOffset;
        return ({
            x: px,
            y: py
        })
    }


    /* given LOCAL GCol and gRow, get the gpt object */
    getGPt(gCol, gRow) {
        for (let co of this.points) {
            for (let g of co) {
                if ((g.col == gCol) && (g.row == gRow)) {
                    return (g)
                }
            }
        }
        //print('Unable to find Grid point col row', gCol, gRow, this.cols, this.rows)
        return (null)
    }


    getTriangle(col, row, orient) {
        for (let t of this.triangles) {
            //print(t.col)
            if ((t.col == col) && (t.row == row) && (t.orientation == orient)) {
                return t
            }
        }
        return null
    }


    /* 
      Creates 2 Triangles for each grid point. Each one with a different orientation
    */
    createIsoTriangles() {
        let triangles = [];
        let tri;

        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.cols; col++) {
                //g = this.points[col][row]
                tri = new IsoTriangle(col, row, this.triangleHt, this, 0)
                triangles.push(tri)
                tri = new IsoTriangle(col, row, this.triangleHt, this, 1)
                triangles.push(tri)
            }
        }
        // for (let co of this.points) {
        //     print('length of column', co.length)
        //     for (let g of co) {
        //     }
        // }
        return triangles
    }

    /*
    Gets the Neighboring 3 triangles for all the iso triangles.
    */
    getTriangleNeighbors() {

        let colOffset = 0;
        let sideOffset = 0;
        let flip;

        for (let t of this.triangles) {
            colOffset = 0;
            sideOffset = 0;
            flip = t.orientation == 1 ? 0 : 1

            if (t.orientation == 0) {
                if (t.col % 2) {
                    if (t.row % 2) {
                        sideOffset = -1
                        colOffset = -1
                    } else {
                        sideOffset = -1
                    }
                } else {
                    if (t.row % 2) {
                        sideOffset = -1
                        colOffset = -1
                    } else {
                        sideOffset = -1
                    }

                }
            } else { // orient = 1 for this triangle
                if (t.col % 2) {
                    if (t.row % 2) {
                        sideOffset = 1
                    } else {
                        sideOffset = 1
                        colOffset = 1
                    }
                } else {
                    if (t.row % 2) {
                        sideOffset = 1
                    } else {
                        sideOffset = 1
                        colOffset = 1
                    }
                }
            }
            t.up = this.getTriangle(t.col + colOffset, t.row - 1, flip)
            t.down = this.getTriangle(t.col + colOffset, t.row + 1, flip)
            t.side = this.getTriangle(t.col + sideOffset, t.row, flip)
        }
    }


}

class IsoTriangle {
    constructor(col, row, triangleHt, grid, orientation) {
        this.row = row;
        this.col = col;
        this.side = triangleHt
        this.orientation = orientation;
        this.vertices = this.getVertices(grid)
        this.view = 0 // 1 = top, 2 = left 3 = right view.
        this.random = 0
    }

    getVertices(grid) { // GRID COORDS
        let vertices = [];
        let v0, v1, v2;
        let cOff = 0;
        if (this.orientation) {
            if (this.row % 2) {
                cOff = 0;
            }
            else {
                cOff = 1;
            }

        } else { // left pointing
            if (this.row % 2) {
                cOff = -1
            }
            else {
                cOff = 0
            }

        }

        v0 = grid.getGPt(this.col, this.row);
        v1 = grid.getGPt(this.col + cOff, this.row + 1);
        v2 = grid.getGPt(this.col + cOff, this.row - 1);

        if (v0 && v1 && v2) {
            vertices.push(v2)
            vertices.push(v0)
            vertices.push(v1)
            return vertices
        }

        return null
    }

    display(_clr) {
        strokeWeight(3)

        fill(_clr)
        if (this.vertices) {
            beginShape()
            for (let gpt of this.vertices) {
                if (gpt.col % 2) {
                }
                vertex(gpt.x, gpt.y)
            }
            endShape();
        }
        noStroke();
    }

    displayNeighbors(grid) {
        this.display("green")
        if (this.up) {
            this.up.display("red")
        }

        if (this.down) {
            this.down.display("brown")
        }

        if (this.side) {
            this.side.display("orange")
        }
    }
}


class Point { // A point on the Grid
    constructor(x, y, col, row) {
        this.x = x;
        this.y = y;
        this.col = col;
        this.row = row;
        this.free = true;
    }

    display(colr, sw = 1) {
        strokeWeight(sw)
        if (colr) {
            stroke(colr);
            fill(colr);
        }
        circle(this.x, this.y, 10)
    }


}


class Segment { // A segment between two GPts
    constructor(startPt, endPt, orientation) {
        let orient;
        this.start = startPt;
        this.end = endPt;
        this.orientation = orientation; // axis 0 means vertical. ax 1 means horiz
        if (orientation) { orient = 'H' } else { orient = 'V' }
        if ((startPt) && (endPt)) {
            this.id = orient + "_" + String(startPt.col) +
                "_" + String(startPt.row) + "_" +
                String(endPt.col) + "_" + String(endPt.row);
        }
        this.active = 0
    }

    display(colr, sw = 1) {
        print('disp', this)
        strokeWeight(sw)
        if (colr) {
            stroke(colr);
        }
        if ((this.start) && (this.end)) {
            line(this.start.x, this.start.y, this.end.x, this.end.y)
        }
    }


}


function displaySegments(grid, colr = 255, sw = 1) {
    for (se of grid.segments) {
        se.display(colr, sw = sw)
    }
}

/*
Given any segment, this function will attach its 4 neighboring segments, if they exist.
Else the neighbor is none
*/
function attachNeighboringSegments(seg, grid) {

    if ((!seg.start) || (!seg.end)) {
        return
    }
    // see if current seg is vert or horiz
    if (seg.orientation) { //horizontal segment
        seg.n00 = grid.getSegment(seg.start, grid.getGPt(seg.start.col, seg.start.row - 1))
        seg.n01 = grid.getSegment(seg.start, grid.getGPt(seg.start.col, seg.start.row + 1))
        seg.n10 = grid.getSegment(seg.end, grid.getGPt(seg.end.col, seg.end.row - 1))
        seg.n11 = grid.getSegment(seg.end, grid.getGPt(seg.end.col, seg.end.row + 1))
    } else { // vertical
        seg.n00 = grid.getSegment(seg.start, grid.getGPt(seg.start.col - 1, seg.start.row))
        seg.n01 = grid.getSegment(seg.start, grid.getGPt(seg.start.col + 1, seg.start.row))
        seg.n10 = grid.getSegment(seg.end, grid.getGPt(seg.end.col - 1, seg.end.row))
        seg.n11 = grid.getSegment(seg.end, grid.getGPt(seg.end.col + 1, seg.end.row))
    }

    seg.neighbors = [seg.n00, seg.n01, seg.n10, seg.n11]
}


class Grid {
    /**
     * Create and Return a grid object
     * @param  {Integer} nRows Number of rows
     * @param  {Integer} nCols Number of columns
     */
    constructor(nRows, nCols, cWidth, cHeight, canvasXMargin, canvasYMargin) {
        this.rows = nRows;
        this.cols = nCols;
        this.width = cWidth;
        this.height = cHeight;
        this.xMargin = canvasXMargin;
        this.yMargin = canvasYMargin;
        this.xStep = cWidth / nCols;
        this.yStep = cHeight / nRows;
        print('x y step:', this.xStep, this.yStep)
        this.points = this.createGridPoints();
        this.segments = this.createSegments(); // optional
    }


    /**
         * Create and Return a grid of horiz and vertical segments covering the canvas
         */
    createSegments() {
        let segments = [];
        let row;
        let col;
        for (row = 0; row <= this.rows; row++) {
            for (col = 0; col <= this.cols; col++) { //horiz, axis 1
                segments.push(new Segment(this.getGPt(col, row), this.getGPt(col + 1, row), 1))
            }
        }

        for (col = 0; col <= this.cols; col++) {
            for (row = 0; row <= this.rows; row++) { //vertical, axis 0
                segments.push(new Segment(this.getGPt(col, row), this.getGPt(col, row + 1), 0))
            }
        }



        return segments
    }

    /**
     * Create and Return a grid of points covering the canvas
     * @param  {Integer} nRows Number of rows
     * @param  {Integer} nCols Number of columns
     */
    createGridPoints() {
        let gridPts = [];
        for (let row = 0; row <= this.rows; row++) {
            for (let col = 0; col <= this.cols; col++) {
                let px = this.xMargin + this.xStep * col;
                let py = this.yMargin + this.yStep * row;
                let p = new Point(px, py, col, row)
                gridPts.push(p);
            }
        }
        return gridPts;
    }

    /* Given gCol and gRow, convert to Global Coords
    */
    getGlobalCoords(gCol, gRow) {
        let px = this.xMargin + this.xStep * gCol;
        let py = this.yMargin + this.yStep * gRow;
        return ({
            x: px,
            y: py
        })
    }

    /* given LOCAL GCol and gRow, get the gpt object */
    getGPt(gCol, gRow, verbose = false) {
        for (let g of this.points) {
            if ((g.col == gCol) && (g.row == gRow)) {
                return (g)
            }
        }
        if (verbose) {
            print('Unable to find Grid point col row', gCol, gRow)
        }
        return (null)
    }

    getSegment(startPt, endPt, verbose = false) {
        if ((!startPt) || (!endPt)) {
            return (null)
        }
        for (let seg of this.segments) {
            // if (verbose) {
            //     print(seg.start, seg.end, 'seg s e')
            // }
            if ((seg.start == startPt) && (seg.end == endPt)) {
                return (seg)
            }
            if ((seg.start == endPt) && (seg.end == startPt)) {
                return (seg)
            }
        }
        if (verbose) {
            print('Unable to find Grid Segment', startPt, endPt)
        }
        return (null)
    }


    getGPtsBetween(g1, g2) {
        let inbetween = [];
        if (g1.col == g2.col) {
            if (g2.row > g1.row) {
                for (let d = 0; d < g2.row - g1.row; d++) {
                    inbetween.push(this.getGPt(g1.col, g1.row + d))
                }
            } else {
                for (let d = 0; d < g1.row - g2.row; d++) {
                    inbetween.push(this.getGPt(g1.col, g2.row + d))
                }
            }
        }
        if (g1.row == g2.row) {
            if (g2.col > g1.col) {
                for (let d = 0; d < g2.col - g1.col; d++) {
                    inbetween.push(this.getGPt(g1.col + d, g1.row))
                }
            } else {
                for (let d = 0; d < g1.col - g2.col; d++) {
                    inbetween.push(this.getGPt(g2.col + d, g1.row))
                }
            }
        }
        return inbetween;
    }



    /* return GP objects given Col and Row
        Note that this does not take xy Coords as the input
        Just pass in row and column numbers*/
    get4NearestGridPoints(gCol, gRow) {
        let neigh = [];
        if (gCol < this.cols) {
            neigh.push(this.getGPt(gCol + 1, gRow));
        }
        if (gCol > 0) {
            neigh.push(this.getGPt(gCol - 1, gRow));
        }
        if (gRow < this.rows) {
            neigh.push(this.getGPt(gCol, gRow + 1));
        }
        if (gRow > 0) {
            neigh.push(this.getGPt(gCol, gRow - 1));
        }

        return neigh;
    }

    displayGPt(p, colr) {
        push();
        if (colr) {
            stroke(colr);
        }
        strokeWeight(3);
        circle(p.x, p.y, 5);
        pop();
    }

    displayGridPoints(colr) {
        push();
        if (colr) {
            stroke(colr);
        }
        print(colr)
        strokeWeight(3);
        for (let p of this.points) {
            point(p.x, p.y);
        }
        pop();
    }
} // end of Grid Class


function createTileGrid(n, cnv) {
    // generates a tile grid of n by n, and returns their centers...
    tiles = [];
    for (tx = 0; tx < n; tx++) {
        for (ty = 0; ty < n; ty++) {
            x = (1 / (n * 2) + tx / (n)) * cnv.width + cnv.xMargin
            y = (1 / (n * 2) + ty / n) * cnv.height + cnv.yMargin
            tile = createVector(x, y)
            tiles.push(tile)
        }
    }
    return tiles
}


function getCoords(v) {
    px = cnv.xMargin + xStep * v.x;
    py = cnv.yMargin + yStep * v.y;
    return (createVector(px, py))
}

//GRID RELATED FUNCTION


function outOfBounds(pt) {
    if (pt.x < cnv.xMargin) { return 1 }
    if (pt.x > width - cnv.xMargin) { return 1 }
    if (pt.y < cnv.yMargin) { return 1 }
    if (pt.y > height - cnv.yMargin) { return 1 }
    return 0
}

function _get4NearestGridPoints(hpt) {
    //each hpt has 4 grid points around it. Find them.
    gpts = [];
    hx = hpt.x
    hy = hpt.y
    xStep = (width - 2 * cnv.xMargin) / nCols;
    yStep = (height - 2 * cnv.yMargin) / nRows;
    gx = Math.floor((hx - cnv.xMargin) / xStep)
    gy = Math.floor((hy - cnv.yMargin) / yStep)
    //print(gx, gy, xStep, yStep)
    gpt = getGridCoords(gx, gy)
    for (g of grid) {
        if ((g.x == gpt.x) && (g.y == gpt.y)) {
            gpts.push(g)
        }
        if ((g.x == gpt.x) && (g.y == gpt.y + yStep)) {
            gpts.push(g)
        }
        if ((g.x == gpt.x + xStep) && (g.y == gpt.y)) {
            gpts.push(g)
        }
        if ((g.x == gpt.x + xStep) && (g.y == gpt.y + yStep)) {
            gpts.push(g)
        }
    }
    //print(hpt.x, gpts.length, 'gpts')
    return (gpts)
}

/**
 * Return a subset of gridPoints on the Edge
 * @param  {Integer} nRows Number of rows
 * @param  {Integer} nCols Number of columns
 */
function getEdgeGridPoints(grid) {
    let edgePts = [];


    //North Wall
    for (let col = 1; col <= grid.cols; col++) {
        pt = grid.getGPt(col, 0)
        pt.wall = 'N'
        edgePts.push(pt)
    }

    //East Wall
    for (let row = 1; row <= grid.rows; row++) {
        pt = grid.getGPt(grid.cols, row)
        edgePts.push(pt)
        pt.wall = 'E'
    }

    //South Wall
    for (let col = grid.cols - 1; col >= 0; col--) {
        pt = grid.getGPt(col, grid.rows)
        edgePts.push(pt)
        pt.wall = 'S'
    }

    //West Wall
    for (let row = grid.rows - 1; row >= 0; row--) {
        pt = grid.getGPt(0, row)
        edgePts.push(pt)
        pt.wall = 'W'
    }

    return edgePts;
}

/**
 * Return a subset of gridPoints within a Specified Circle
 * @param  {GridPt} centerPt the center of the circle
 * @param  {Integer or Float} radius in grid units
 */
function getCircleGPts(grid, centerPt, radius) {
    let circlePts = [];

    //radius is in Grid coordinates, not real world xy coords
    for (gpt of grid.points) {
        d = dist(gpt.col, gpt.row, centerPt.col, centerPt.row)
        if (d < radius) {
            circlePts.push(gpt)
            pt.circle = 'true'
        }
    }
    return circlePts;
}

