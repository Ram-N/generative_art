// Daily Sketch for 2021-06-18
// Ram Narasimhan.

/*
Bounce lines off of 4 walls.display


palList = [rainbowDash, take5, cappuccino, purples, melons, 
    red_brown_orange, red_orange, greys]
    */


let palette = []
let grid;
const cnv = {
    xMargin: 50,
    yMargin: 50,
}

const params = {
    xStep: 40,
    yStep: 40,
    numBounces: 500,
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
    palette2 = take5;
    palette2 = replicate(palette2, 100)
    palette = red_brown_orange; //colors.js
    palette = replicate(palette, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(random(palette2));
    //rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);
    rect(0, 0, width, height);
    grid = new Grid(params.xStep, params.yStep, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin);

    edgePts = getEdgeGridPoints(grid);

    // for (const [index, e] of edgePts.entries()) {
    //     e.display(colr = index * 10)
    // }
    numE = edgePts.length
    offset = 1
    currIndex = int(random(numE))
    numE4 = int((numE + 2) / 4) + offset
    pt0 = edgePts[currIndex]

    print(numE, numE4)
    //palette = ['black', 'red', (240, 240, 240, 200)]

    for (l = 0; l < numE; l++) {
        pt0 = edgePts[l]
        pt1 = edgePts[(l + numE4) % numE]
        print('l lnext', l, (l + numE4) % numE)
        stroke(palette[colorWheel[pt1.wall] + 4])
        line(pt0.x, pt0.y, pt1.x, pt1.y)
    }


    // for (l = 0; l < numE4; l++) {
    //     nextPtIndex = (currIndex + distance) % numE
    //     pt1 = edgePts[nextPtIndex]
    //     stroke(palette[colorWheel[pt1.wall] + 4])
    //     line(pt0.x, pt0.y, pt1.x, pt1.y)
    //     pt0 = pt1
    //     currIndex = nextPtIndex
    //     distance++//= int(random(3));
    // }
    draw_border(clr = 20, sw = 50); //rn_utils.js

}

/*    @params: direction can be ['other', 'opposite', 'adjacent', 'right']*/
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
