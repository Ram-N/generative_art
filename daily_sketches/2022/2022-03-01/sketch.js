// Daily Sketch for 2022-03-01
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
    tw: 20, // triangle width of the hexg,
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


    for (csize = 5; csize >= 3; csize--) {
        let n = csize
        palette = random(RGBPalList);
        for (rep = 0; rep <= hg.cols; rep += 5) {
            for (rep2 = 0; rep2 <= hg.rows; rep2 += 7) {
                startRow = rep2;
                startCol = rep;
                if (random() < 0.6) {
                    pyramid3D(startCol, startRow, n, hg)
                }
            }
        }
    }


    draw_border(clr = params.blkColor, sw = 50); //rn_utils.js
}



