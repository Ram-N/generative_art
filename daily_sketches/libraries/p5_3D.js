// A JS utility library to use with p5.js sketches. 
//Ram Narasimhan

// Updated: March 2022
//Please note that this script requires rn_grid and p5.js loaded 


//Functions in this library
/*
Tip: Use Cntl-F ^.*(word1|word2|word3).*\n? and then ALT-Enter to select the lines
Then Cntl-C and paste again and edit as needed
function drawCube(startCol, startRow, n, hg) 
function renderCubeLayer(fOrig, n) 
function tetrisT(colIndex, row, hg) 
function YdirCubes(nCubes, colIndex, row, hg) 
function XdirCubes(nCubes, colIndex, row, hg) 
function ZdirCubes(nCubes, colIndex, row, hg) 
function displayTriHex(col, row, hg) 
function displayHexUpNE(col, row, hg) 
function displayHexUpNW(col, row, hg) 
function displayHexDownSE(col, row, hg) 
function displayHexSideW(col, row, hg) 
function tRHex(tR) 
*/


function pyramid3D(startCol, startRow, n, hg) {
    let fy = getFace(startCol, startRow, hg)
    for (stack = 0; stack < n; stack++) {
        renderCubeLayer(fy, n - stack)
        if (fy) {
            fy = fy.getAboveFace()
        }
    }
}


function drawCube(startCol, startRow, n, hg) {
    let fy = getFace(startCol, startRow, hg)
    for (stack = 0; stack < n; stack++) {
        renderCubeLayer(fy, n)
        if (fy) {
            fy = fy.getAboveFace()
        }
    }
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

