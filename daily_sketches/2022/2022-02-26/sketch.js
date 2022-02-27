// Daily Sketch for 2022-02-26
// Ram Narasimhan.

/*
ISOMETRIC
Fix the upper layers...
*/

let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}


const params = {
    tw: 50, // triangle width of the hexg,
    xStep: 20,
    yStep: 20,
    bgColor: "#d3d3d3",
    blkColor: "#0f0f0f",
}



function setup() {
    createCanvas(900, 900);
    let button = createButton("reset sketch");
    button.mousePressed(resetSketch);
    //colorMode(HSB);
    background(params.blkColor);

    palette = random(RGBPalList);
    palette = replicate(palette, 100)
    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width


    hg = new HexGrid(cnv.width, cnv.height, cnv.xMargin, cnv.yMargin, params.tw);
    hg.getTriangleNeighbors() // 3 neighbors get attached to each triangle
    hg.createFaceList(); //store "faces"

    for (rep = 0; rep <= 80; rep++) {
        n = int(random(5))
        n = 2;
        palette = random(RGBPalList);
        startCol = int(random(hg.cols));
        startRow = int(random(hg.rows));
        let fy = getFace(startCol, startRow, hg)
        for (stack = 0; stack < n; stack++) {
            renderCubeLayer(fy, n)
            if (fy) {
                fy = fy.getAboveFace()
            }
        }
    }
    draw_border(clr = params.blkColor, sw = 50); //rn_utils.js
}


function renderCubeLayer(fOrig, n) {
    fy = fOrig;
    for (cy = 0; cy < n; cy++) {
        if (fy) {
            fx = fy
            for (ccol = 0; ccol < n; ccol++) {
                if (fx) {
                    h = new TriHex(fx.col, fx.row, hg);
                    h.display(palette[0])
                    fx = fx.xP
                }
            }
            fy = fy.yN
        }
    }
}


class TriHex {
    /**
     * Create and Return a grid object
     * @param  {Integer} nRows Number of rows
     * @param  {Integer} nCols Number of columns
     */
    constructor(col, row, hg) {

        this.tL = hg.getTriangle(col, row, 1) //< Triangle
        this.tR = hg.getTriangle(col + 1, row, 0) //> Triangle
        this.top = getFace(col, row, hg) // < >
    }


    display(_topclr = 'white') {
        if (this) {
            if (this.top) { this.top.display(_topclr) }
            if (this.tL) {
                if (this.tL.down) {
                    this.tL.down.display(palette[2])  // Side T1
                    if (this.tL.down.down) { this.tL.down.down.display(palette[2]) } // side T2
                }
            }
            if (this.tR) {
                if (this.tR.down) {
                    this.tR.down.display(palette[3])  // Front T1
                    if (this.tR.down.down) { this.tR.down.down.display(palette[3]) } // Front T2
                }
            }

        }
    }

}





//complex shapes
function tetrisT(colIndex, row, hg) {
    displayHexUpNE(colIndex, row, hg)
    displayHexUpNW(colIndex, row, hg)
    displayTriHex(colIndex, row, hg)
    displayHexDownSE(colIndex, row, hg)
}


//Series of cubes that extend in the X director (from left to right)
function YdirCubes(nCubes, colIndex, row, hg) {
    for (let c = 0; c < nCubes; c++) {
        displayTriHex(colIndex, row - 2 * c, hg)
    }
}


//Series of cubes that extend in the X director (from left to right)
function XdirCubes(nCubes, colIndex, row, hg) {
    for (let c = 0; c < nCubes; c++) {
        cAdd = Math.floor(c / 2)
        rAdd = cAdd * 2
        displayTriHex(colIndex + cAdd, row + rAdd, hg)

        //don't add Hex if N is odd and the last one.
        if (!((c == nCubes - 1) && (nCubes % 2))) {
            displayHexDownSE(colIndex + cAdd, row + rAdd, hg)
        }

        // fill("white")
        // hg.getTriangle(colIndex, row, 0).display()


    }
}


//Series of cubes that extend in the Z direction (from right to SW)
function ZdirCubes(nCubes, colIndex, row, hg) {
    for (let c = 0; c < nCubes; c++) {
        cAdd = Math.floor(c / 2)
        rAdd = cAdd * 2
        displayTriHex(colIndex - cAdd, row + rAdd, hg)

        //don't add Hex if N is odd and the last one.
        if (!((c == nCubes - 1) && (nCubes % 2))) {
            displayHexSideW(colIndex - cAdd, row + rAdd, hg)
        }
    }
}



//simple Hexagons
function displayTriHex(col, row, hg) {
    tR = hg.getTriangle(col, row, 0) //top
    tRHex(tR);
    //tL = hg.getTriangle(col - 1, row, 1)
    //tL.display('white')
}


function displayHexUpNE(col, row, hg) {
    t00 = hg.getTriangle(col, row, 0) //top
    if (t00 && (t00.up) && (t00.up.side)) {
        tR = t00.up.side
    }
    tRHex(tR)
}

function displayHexUpNW(col, row, hg) {
    t00 = hg.getTriangle(col, row, 0) //top
    if (t00 && (t00.side) && (t00.side.up)) {
        tR = t00.side.up
    }
    tRHex(tR)
}

function displayHexDownSE(col, row, hg) {
    t00 = hg.getTriangle(col, row, 0) //top
    if (t00 && (t00.down) && (t00.down.side)) {
        tR = t00.down.side
    }
    tRHex(tR)
}


//Hexagon that is half off Col and the southwest
function displayHexSideW(col, row, hg) {
    t00 = hg.getTriangle(col, row, 0) //top
    if (t00 && (t00.side) && (t00.side.down)) {
        tR = t00.side.down
    }
    tRHex(tR)
}


//Displays a Hexagon made up of 3 rhombuses
function tRHex(tR) {
    if (!tR) { return }
    tL = tR.side
    if (!tL) { return }
    if (!tL.down) { return }
    if (!tL.down.down) { return }
    if (!tR.down) { return }
    if (!tR.down.down) { return }
    tR.display(palette[1])
    tL.display(palette[1])
    tL.down.display(palette[2])
    tL.down.down.display(palette[2])
    tR.down.display(palette[3]) //side
    tR.down.down.display(palette[3]) //side
}