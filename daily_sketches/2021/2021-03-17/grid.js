//P5, Grid-related objects, functions and utilities

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

function getGridCoords(gCol, gRow) {
    px = cnv.xMargin + xStep * gCol;
    py = cnv.yMargin + yStep * gRow;
    return ({
        x: px,
        y: py
    })
}

//GRID RELATED FUNCTION
function outOfBounds(pt) {
    if (pt.x < cnv.xMargin) { return 1 }
    if (pt.x > width - cnv.xMargin) { return 1 }
    if (pt.y < cnv.yMargin) { return 1 }
    if (pt.y > height - cnv.yMargin) { return 1 }
    return 0
}

function renderGridPoints(grid) {
    strokeWeight(3);
    for (p of grid) {
        point(p.x, p.y);
    }
}

function createGrid(nRows, nCols) {
    let grid = [];
    xStep = (width - 2 * cnv.xMargin) / nCols;
    yStep = (height - 2 * cnv.yMargin) / nRows;
    for (row = 0; row < nRows; row++) {
        for (col = 0; col < nCols; col++) {
            px = cnv.xMargin + xStep * col
            py = cnv.yMargin + yStep * row
            let v = createVector(px, py);
            v.free = true;
            grid.push(v);
        }
    }
    return (grid)
}

function get4NearestGridPoints(hpt) {
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

