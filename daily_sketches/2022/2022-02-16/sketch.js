// Daily Sketch for 2022-02-16
// Ram Narasimhan.


/*
ISOMETRIC
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
    hg.getTriangleNeighbors() // 3 neighbors get attached to each triangle.



    row = 13;
    colIndex = 4;
    // hg.getTriangle(colIndex, index, 0).display('white')
    // //    displayHexUpNE(colIndex, index, hg)
    // //    displayHexUpNW(colIndex, index, hg)
    // displayTriHex(colIndex, row = index, hg)
    // displayHexDownSE(colIndex, index, hg)

    // displayHexDownSE(colIndex, index + 1, hg)
    // //    displayHexDownSE(colIndex, index + 1, hg)
    // displayHexUpNW(colIndex + 1, index + 3, hg)
    // hg.getTriangle(colIndex, index, 0).display('white')

    for (let rep = 0; rep < 100; rep++) {
        col = int(random(hg.cols))
        row = int(random(hg.rows))
        if (random() < 0.5) {
            nCubes = random([2, 4, 8])
            ZdirCubes(nCubes, col, row, hg)
        } else {
            nCubes = random([3, 4, 5, 6, 7, 8, 9])
            YdirCubes(nCubes, col, row, hg)
        }
    }

    // displayTriHex(colIndex, row, hg)
    // displayHexSideW(colIndex, row, hg)
    // displayTriHex(colIndex - 1, row + 2, hg)


    stroke(255)
    print(hg.points.length) // columns. each one is a column of points
    noStroke();

    draw_border(clr = params.bgColor, sw = 50); //rn_utils.js
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
        displayTriHex(colIndex - cAdd, row + rAdd, hg)

        //don't add Hex if N is odd and the last one.
        if (!((c == nCubes - 1) && (nCubes % 2))) {
            displayHexDownSE(colIndex - cAdd, row + rAdd, hg)
        }
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