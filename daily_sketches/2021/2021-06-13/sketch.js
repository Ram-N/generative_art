// Daily Sketch for 2021-06-13
// Ram Narasimhan.

/*
Connect "opposites"
Perturb: +, 0, - 
Color and draw

*/


let palette = []
let grid;
const cnv = {
    xMargin: 50,
    yMargin: 50,
}

const params = {
    xStep: 100,
    yStep: 100,
    bgColor: "#0f0f0f", //black
}

const colorWheel = {
    'N': 0,
    'E': 1,
    'S': 2,
    'W': 3
}

function setup() {
    createCanvas(660, 660);
    background(params.bgColor);
    //background("#0F0F0F");
    draw_border(20); //rn_utils.js
    palette2 = cappuccino;
    palette2 = replicate(palette2, 100)
    palette = purples; //colors.js
    palette = replicate(palette, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(random(palette));
    //rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);
    rect(0, 0, width, height);
    grid = new Grid(params.xStep, params.yStep, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin);

    edgePts = getEdgeGridPoints(grid);

    for (e of edgePts) {
        e.display()
    }

    // for each edge point, connect to a non-same wall (other)
    for (const [index, e] of edgePts.entries()) {
        strokeWeight(1)
        stroke(palette[colorWheel[e.wall]])
        //        stroke(palette2[index])
        pt1 = getAnotherPoint(e, "other")
        line(e.x, e.y, pt1.x, pt1.y)

    }



    draw_border(clr = 20, sw = 50); //rn_utils.js

}

/*
    @params: direction can be ['other', 'opposite', 'adjacent', 'right']
*/
function getAnotherPoint(pt0, direction) {

    if (direction == 'other') {//get a random point from a different wall
        done = 0
        while (!done) {
            pt1 = random(edgePts)
            if (pt1.wall != pt0.wall) {
                done = 1
            }
        }
        return pt1
    }
}

function renderEdgeLine(edgePts) {
    pt0 = random(edgePts)
    pt1 = random(edgePts)
    line(pt0.x, pt0.y, pt1.x, pt1.y)

}

