// Daily Sketch for 2022-02-22
// Ram Narasimhan.

/*
ISOMETRIC
Creating methods .xR,.xL .yR .yL .zR .zL
*/

let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}


const params = {
    tw: 40, // triangle width of the hexg,
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

    startCol = int(random(hg.cols));
    startRow = int(random(hg.rows));

    hg.FaceList = [];
    for (col = 0; col <= hg.cols; col++) {
        for (row = 0; row <= hg.rows; row++) {
            f1 = new Face(col, row, hg)
            hg.FaceList.push(f1)
        }
    }


    for (f1 of hg.FaceList) {
        f1.xP = f1.getxP();
        f1.yP = f1.getyP();
        f1.xN = f1.getxN();
        f1.yN = f1.getyN();
    }



    for (rep = 0; rep <= 100; rep++) {
        startCol = int(random(hg.cols));
        startRow = int(random(hg.rows))
        f1 = getFace(startCol, startRow, hg)
        f = f1;
        SE = (rep % 2) ? true : false
        for (n = 0; n <= 10; n++) {
            if (f) {
                f.display(random(palette))
                if (SE) {
                    f = f.xP
                } else {
                    f = f.yN
                }
            }
        }
    }

    draw_border(clr = params.blkColor, sw = 50); //rn_utils.js
}

function getFace(_col, _row, hg) {
    for (f of hg.FaceList) {
        if ((f.col == _col) && (f.row == _row)) {
            return f
        }
    }
    return null
}



class Face {

    constructor(col, row, hg) {
        this.col = col;
        this.row = row;
        this.tL = hg.getTriangle(col, row, 1) //< Triangle
        this.tR = hg.getTriangle(col + 1, row, 0) //> Triangle
    }


    getxP() {
        let x;
        if (this.row % 2) {
            x = getFace(this.col, this.row + 1, hg) // South East Face
            return x
        } else { // row number is even            
            return getFace(this.col + 1, this.row + 1, hg) // South East Face
        }
    }

    getxN() {
        if (this.row % 2 == 0) {
            return getFace(this.col, this.row - 1, hg) // NW Face
        } else {
            return getFace(this.col - 1, this.row - 1, hg) // NW Face
        }
    }

    getyP() {
        if (this.row % 2) { //odd row
            return getFace(this.col, this.row - 1, hg) // South East Face
        } else { //row number is even
            return getFace(this.col + 1, this.row - 1, hg) // South East Face
        }
    }

    getyN() {
        if (this.row % 2 == 0) {
            return getFace(this.col, this.row + 1, hg) // NW Face
        } else { //odd row
            return getFace(this.col - 1, this.row + 1, hg)
        }
    }


    display(_clr = 'white') {
        if (this) {
            if (this.tL) { this.tL.display(_clr) }
            if (this.tR) { this.tR.display(_clr) }
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
        //this.tR
        // tR.display(palette[1])
        // tL.display(palette[1])
        // tL.down.display(palette[2])
        // tL.down.down.display(palette[2])
        // tR.down.display(palette[3]) //side
        // tR.down.down.display(palette[3]) //side
    }

    xR() {

    }

    display(_clr = 'white') {
        if (this) {
            if (this.tL) { this.tL.display(_clr) }
            if (this.tR) { this.tR.display(_clr) }
        }

    }

}




function twoBytwoCube(col, row, hg) {

    print(`trying ${col}${row}`)
    if (row % 2) { row += 1 }
    palette = random(RGBPalList);
    palette = replicate(palette, 100)
    print(col, row, "CR")
    YdirCubes(2, col + 1, row - 1, hg)
    YdirCubes(2, col, row, hg)
    YdirCubes(2, col + 1, row, hg)
    YdirCubes(2, col + 1, row + 1, hg)

    fill("white")
    //hg.getTriangle(col, row, 0).display()

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