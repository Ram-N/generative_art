//P5, Grid-related objects, functions and utilities
// Ram Narasimhan 
// Updated on 2021-12-25


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

    display(_clr = 255) {
        fill(_clr)
        stroke(_clr)
        if (this.vertices) {
            beginShape()
            for (let gpt of this.vertices) {
                if (gpt.col % 2) {
                }
                vertex(gpt.x, gpt.y)
            }
            endShape();
        }
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
    constructor(x, y, col = 0, row = 0) {
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
        strokeWeight(sw)
        if (colr) {
            stroke(colr);
        }
        //print('st', this.start, this.start != null)
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
The 4 neighbors are: 00, 01, 10, 11
Else the neighbor is none
*/
function attachNeighboringSegments(seg, grid) {

    // 0: POinting East, 1: pointing S, 2: pointing W, 3: pointing N
    if ((!seg.start) || (!seg.end)) {
        return
    }
    // see if current seg is vert or horiz
    if (seg.orientation) { //horizontal segment
        seg.n01 = grid.getSegment(seg.start, grid.getGPt(seg.start.col, seg.start.row + 1)) // v--
        seg.n02 = grid.getSegment(grid.getGPt(seg.start.col - 1, seg.start.row), seg.start) // <--
        seg.n03 = grid.getSegment(grid.getGPt(seg.start.col, seg.start.row - 1), seg.start) // ^--
        seg.n13 = grid.getSegment(seg.end, grid.getGPt(seg.end.col, seg.end.row - 1)) //--^
        seg.n12 = grid.getSegment(seg.end, grid.getGPt(seg.end.col + 1, seg.end.row)) // -->
        seg.n11 = grid.getSegment(seg.end, grid.getGPt(seg.end.col, seg.end.row + 1)) //--v
        seg.startNeighbors = [seg.n03, seg.n02, seg.n01] //03 should start with END
        seg.startJn = [0, 0, 1]
        seg.endNeighbors = [seg.n11, seg.n12, seg.n13] //13 is incoming
        seg.endJn = [1, 1, 0]

        seg.incoming = [seg.n02, seg.n03, seg.n13] // clockwise: from west, from north/west, from north/east 
        seg.outgoing = [seg.n12, seg.n11, seg.n01] //clockwise: end to east, end to S, start to S
        seg.neighbors = [seg.n01, seg.n02, seg.n03, seg.n11, seg.n12, seg.n13]
    } else { // vertical
        seg.n02 = grid.getSegment(seg.start, grid.getGPt(seg.start.col - 1, seg.start.row))
        seg.n00 = grid.getSegment(seg.start, grid.getGPt(seg.start.col + 1, seg.start.row))
        seg.n03 = grid.getSegment(grid.getGPt(seg.start.col, seg.start.row - 1), seg.start)
        seg.n12 = grid.getSegment(seg.end, grid.getGPt(seg.end.col - 1, seg.end.row))
        seg.n10 = grid.getSegment(seg.end, grid.getGPt(seg.end.col + 1, seg.end.row))
        seg.n11 = grid.getSegment(seg.end, grid.getGPt(seg.end.col, seg.end.row + 1))
        seg.incoming = [seg.n12, seg.n02, seg.n03] // clockwise: West to end, west to start, north to start
        seg.outgoing = [seg.n00, seg.n10, seg.n11] //clockwise: start to east, end to east, end to S
        seg.neighbors = [seg.n00, seg.n02, seg.n03, seg.n10, seg.n11, seg.n12]
        seg.startNeighbors = [seg.n00, seg.n03, seg.n02] //02 is outgoing
        seg.startJn = [1, 0, 0]
        seg.endNeighbors = [seg.n10, seg.n11, seg.n12] //default is Endnode, except 12 is incoming
        seg.endJn = [1, 1, 0]
    }

}


class Grid {
    /**
     * Create and Return a grid object
     * @param  {Integer} nRows Number of rows
     * @param  {Integer} nCols Number of columns
     */
    constructor(nRows, nCols, cWidth, cHeight, canvasXMargin, canvasYMargin, createSegs = false) {
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

        if (createSegs) { this.segments = this.createSegments(); } // optional
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
                p.free = 1;
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


class TileGrid {
    /**
     * Create and Return a grid object
     * @param  {Integer} nRows Number of rows
     * @param  {Integer} nCols Number of columns
     * @param  {Integer} gridWidth Width of the entire TG.
     */
    constructor(nRows, nCols, gridWidth, cHeight, canvasXMargin, canvasYMargin) {
        this.rows = nRows;
        this.cols = nCols;
        this.width = gridWidth / nCols;
        this.height = cHeight / nRows;
        this.tiles = this.createTiles(gridWidth, cHeight, canvasXMargin, canvasYMargin);
    }

    createTiles(cWidth, cHeight, canvasXMargin, canvasYMargin) {
        // generates a tile grid of m by n, and returns their centers...
        let tiles = [];
        for (let tx = 0; tx < this.cols; tx++) {
            for (let ty = 0; ty < this.rows; ty++) {
                let x = this.width * tx + cnv.xMargin
                let y = this.height * ty + cnv.yMargin
                let tile = new Point(x, y)
                tile.row = ty;
                tile.col = tx;
                tile.cx = x + this.width / 2;
                tile.cy = y + this.height / 2;
                tile.active = 1;
                tile.width = this.width;
                tile.height = this.height;
                tiles.push(tile)
            }
        }
        return tiles
    }

    //Find tile at given Col and Row CR
    getTileFromCR(tCol, tRow, verbose = false) {
        for (let tile of this.tiles) {
            if ((tile.col == tCol) && (tile.row == tRow)) {
                return (tile)
            }
        }
        if (verbose) {
            print('Unable to find tile', tCol, tRow)
        }
        return (null)
    }

    getTile(xloc, yloc, verbose = true) {
        // get the tile that any point belongs to
        let tCol = int((xloc - cnv.xMargin) / this.width)
        let tRow = int((yloc - cnv.yMargin) / this.height)

        //print('getTile', xloc, yloc, tCol, tRow)

        for (let tile of this.tiles) {
            // if (verbose) {
            //     print(seg.start, seg.end, 'seg s e')
            // }
            if ((tile.col == tCol) && (tile.row == tRow)) {
                return (tile)
            }
        }
        if (verbose) {
            print('Unable to find tile', tCol, this.cols, tRow, this.rows, xloc, yloc)
        }
        return (null)
    }

    renderTileGrid(colr) {
        noFill();
        if (colr != null) {
            stroke(colr);
        }
        for (let t of this.tiles) {
            rect(t.x, t.y, this.width, this.height)
        }
    }

    print() {
        for (let t of this.tiles) {
            print(t)
        }
    }

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


class PanelGrid {
    /**
     * Create and Return a Panel object
     * @param: cnv - has cnv.x, cnv.y, cnv.width, height, xMargin, yMargin
     * @param  {Integer} colVector
     * @param  {Integer} rowVector - fractions of how to split cnv.height
     **/
    constructor(cnv, colSplit, rowSplit, margin = 10) {
        this.panels = this.createPanels(cnv, colSplit, rowSplit, margin);
    }


    createPanels(cnv, colSplit, rowSplit, margin) {
        let panels = [];

        let vec = this.makePanelVectors(colSplit, rowSplit);
        let colVector = vec.colVector;
        let rowVector = vec.rowVector;
        let rowCount = rowVector.length
        let colCount = colVector.length
        let usableWidth = cnv.width - (colCount + 1) * margin
        let usableHeight = cnv.height - (rowCount + 1) * margin

        //rowVector and colVector total to 1.0 and are fractions.
        let cumulative_x = cnv.xMargin + margin;
        let col = -1
        let row = -1;
        for (let px of colVector) { // could be [0.2, 0.6, 0.2]
            let pw = px * usableWidth
            let cumulative_y = cnv.yMargin + margin;
            col += 1
            row = -1
            for (let py of rowVector) {
                row += 1
                let ph = py * usableHeight;
                let x = cumulative_x;
                let y = cumulative_y;
                let panel = createVector(x, y);
                panel.x = x;
                panel.y = y;
                panel.w = pw;
                panel.h = ph;
                panel.cx = x + pw / 2;
                panel.cy = y + ph / 2;
                panel.row = row
                panel.col = col
                panels.push(panel)

                cumulative_y += ph + margin
            }
            cumulative_x += pw + margin
        }

        this.cols = col;
        this.rows = row; //number of rows in pgrid
        return panels
    }

    display(colr) {
        this.render(colr)
    }

    render(colr = 'white') {
        if (colr != null) {
            stroke(colr);
            fill(colr)
        }
        for (let p of this.panels) {
            rect(p.x, p.y, p.w, p.h)
        }
    }


    //Find Panel at given Col and Row CR
    getPanelFromCR(tCol, tRow, verbose = false) {
        for (let tile of this.panels) {
            if ((tile.col == tCol) && (tile.row == tRow)) {
                return (tile)
            }
        }
        if (verbose) {
            print('Unable to find Panel', tCol, tRow)
        }
        return (null)
    }


    getRandomPtfromCR(col, row) {
        //find the correct panel//
        let panel = this.getPanelFromCR(col, row)
        //print(col, row, panel)
        let x = panel.x + random(panel.w)
        let y = panel.y + random(panel.h)
        return createVector(x, y)
    }

    /* function takes in any vector, and returns fractions to help in splitting
    */
    makePanelVectors(colSplit, rowSplit) {
        let rv = [];
        let cv = [];

        var colSum = colSplit.reduce(function (a, b) { return a + b; }, 0);
        var rowSum = rowSplit.reduce(function (a, b) { return a + b; }, 0);
        if (colSum == 1) {
            cv = colSplit
        }
        if (colSum < 1) {
            cv = colSplit;
            cv.push(1 - colSum)
        }
        if (colSum > 1) {
            cv = colSplit.map(function (x) { return x / colSum });
        }

        if (rowSum == 1) {
            rv = rowSplit;
        }
        if (rowSum < 1) {
            rv = rowSplit;
            rv.push(1 - rowSum)
        }
        if (rowSum > 1) {
            rv = rowSplit.map(function (x) { return x / rowSum });
        }


        return ({
            colVector: cv,
            rowVector: rv
        })
    }


    getPanel(xloc, yloc) {
        // get the tile that any point belongs to
        let tx = int((xloc - cnv.xMargin) / this.width)
        let ty = int((yloc - cnv.yMargin) / this.height)
        return ({ tx: tx, ty: ty })
    }


    //Creates a list of panels in Spiral order from center, emanating outward
    createSpiralPanelsList() {

        let spiral = []

        let g = 1;
        let w = 0; //width of the spiral
        let cx = int(this.cols / 2); //center tile
        let cy = cx
        for (let n = 0; n < (cx + 1); n++) {
            let p0 = { x: n * (g + w), y: -(g + w) * n + 1 }
            let p1 = { x: n * (g + w), y: (g + w) * n + 1 }
            let p2 = { x: -(g + w) * n, y: (g + w) * n }
            let p3 = { x: -(g + w) * n, y: -(g + w) * n - 1 };

            fill(palette[n])
            //p0 to p1. (go South)
            for (let sqy = p0.y; sqy < p1.y; sqy++) {
                let pnl = pgrid.getPanelFromCR(cx + p0.x, cy + sqy)
                if (pnl) {
                    spiral.push(pnl);
                }
            }

            //p1 to p2 
            for (let sqx = p1.x; sqx > p2.x; sqx--) {
                let pnl = pgrid.getPanelFromCR(cx + sqx, cy + p2.y)
                if (pnl) {
                    spiral.push(pnl);
                }
            }

            //p2 to p3. 
            for (let sqy = p2.y; sqy > p3.y; sqy--) {
                let pnl = pgrid.getPanelFromCR(cx + p2.x, cy + sqy)
                if (pnl) {
                    spiral.push(pnl);
                }
            }

            //p3 to p0
            for (let sqx = p3.x; sqx <= p0.x + 1; sqx++) {
                let pnl = pgrid.getPanelFromCR(cx + sqx, cy + p3.y)
                if (pnl) {
                    spiral.push(pnl);
                }
            }
        }
        this.spiral = spiral;
    }

    renderPanelGrid(sw = 1, _color = "white") {
        // noFill();
        fill(_color)
        push();
        // drawingContext.shadowOffsetX = 5;
        // drawingContext.shadowOffsetY = -5;
        // drawingContext.shadowBlur = 10;
        for (let p of this.panels) {
            // let from = color(random(palette));
            // let to = color(random(palette2));
            // colorMode(HSB); // Try changing to HSB.
            // let interB = lerpColor(from, to, 0.66);
            // fill(interB)
            // drawingContext.shadowColor = random(palette);
            strokeWeight(sw);
            // stroke(params.bgColor)
            rect(p.x, p.y, p.w, p.h)
        }
        pop();

    }


}

//A convenience function to create an NxN panel grid
function createSquareGrid(rowCount, margin = 10) {
    //Custom Tiling
    colSplit = Array(rowCount).fill(1)
    pgrid = new PanelGrid(cnv, colSplit, colSplit, margin = margin);
    return pgrid
}

//A convenience function to create an 6x7 panel grid
function createMonthGrid(margin = 10) {
    rowSplit = Array(6).fill(1)
    colSplit = Array(7).fill(1)
    pgrid = new PanelGrid(cnv, colSplit, rowSplit, margin = margin);
    return pgrid
}

