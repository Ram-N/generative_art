// Daily Sketch for 2021-09-21
// Ram Narasimhan.

/*
Keywords: Grid points, shapes

*/


let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}

const params = {
    xStep: 25,
    yStep: 25,
    bgColor: "#d3d3d3",
    blkColor: "#0f0f0f",
}

class Shingle { // A roughly rectangular shape, made up of 4 points...
    constructor(nw, ne, se, sw) {
        this.nw = nw; // a point with x and y
        this.ne = ne;
        this.se = se;
        this.sw = sw;
        this.due = 1; // still due to get split
        //print(nw, ne, se, sw)
    }

    display(colr, swt = 1) {
        strokeWeight(swt)
        if (colr) {
            fill(colr);
        }
        stroke(20);

        beginShape()
        vertex(this.nw.x, this.nw.y);
        vertex(this.ne.x, this.ne.y);
        vertex(this.se.x, this.se.y);
        vertex(this.sw.x, this.sw.y);
        endShape(CLOSE);

    }


}




function setup() {
    createCanvas(960, 960);
    background(params.bgColor);
    palette = cappuccino; //colors.js
    palette = rainbowDash; //colors.js
    palette = replicate(palette, 100)
    palette2 = random(palList)
    palette2 = replicate(palette2, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill("#0f0f0f");
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);

    grid = new Grid(params.xStep, params.yStep, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin);

    strokeWeight(3);
    // for (row = 0; row <= grid.rows; row += 1) {
    //     for (col = 0; col <= grid.cols; col += 1) {
    //         createShape(row, col);
    //     }
    // }

    let shingleList = [];
    let nw = new Point(cnv.xMargin, cnv.yMargin)
    let ne = new Point(cnv.xMargin + cnv.width, cnv.yMargin)
    let se = new Point(cnv.xMargin + cnv.width, cnv.yMargin + cnv.height)
    let sw = new Point(cnv.xMargin, cnv.yMargin + cnv.height)

    let sh = new Shingle(nw, ne, se, sw);
    shingleList.push(sh);

    numSubdivisions = 30
    for (s = 0; s < numSubdivisions; s += 1) {
        subdivide(shingleList);
    }


    for (sh of shingleList) {
        sh.display(random(palette2), 3);
    }

    draw_border(clr = params.bgColor, sw = 29 + cnv.xMargin); //rn_utils.js
    draw_border(clr = 20, sw = 20); //rn_utils.js


}


/*
To "process" a shingle is to 
a. subdivide it into 4
b. add the 4 new into the list
c. mark the original as done.
*/
function subdivide(shingleList) {

    let sh0 = random(shingleList);

    if (sh0.due) { // untouched, so go ahead and subdivide
        let midX = (sh0.nw.x + sh0.ne.x) / 2
        let midY = (sh0.nw.y + sh0.sw.y) / 2

        //NW SHINGLE
        let nw = sh0.nw
        let ne = new Point(midX, nw.y);
        let se = new Point(midX, midY);
        let sw = new Point(nw.x, midY);
        let sh = new Shingle(nw, ne, se, sw);
        shingleList.push(sh);

        //NE shingle
        nw = new Point(midX, sh0.ne.y);
        ne = new Point(sh0.ne.x, sh0.ne.y);
        se = new Point(sh0.ne.x, midY);
        sw = new Point(midX, midY);
        sh = new Shingle(nw, ne, se, sw);
        shingleList.push(sh);

        //SE shingle
        nw = new Point(midX, midY);
        ne = new Point(sh0.ne.x, midY);
        se = new Point(sh0.se.x, sh0.se.y);
        sw = new Point(midX, sh0.se.y);
        sh = new Shingle(nw, ne, se, sw);
        shingleList.push(sh);

        //SW shingle
        nw = new Point(sh0.sw.x, midY);
        ne = new Point(midX, midY);
        se = new Point(midX, sh0.sw.y);
        sw = new Point(sh0.sw.x, sh0.sw.y);
        sh = new Shingle(nw, ne, se, sw);
        shingleList.push(sh);

        sh0.due = 0; // splitting is done

    }

    print('ending subd', shingleList.length)
}


function createShape(row, col) {
    gpt = grid.getGPt(col, row);
    xStep = grid.xStep;
    yStep = grid.yStep;
    x = gpt.x;
    y = gpt.y;

    strokeWeight(20)
    stroke(params.blkColor)
    fill(random(palette))
    htp = int(random(row, grid.rows));
    wdp = int(random(col, grid.cols));
    newpt = grid.getGPt(htp, wdp);
    //noStroke();

    beginShape();

    vertex(x, y)
    if (random() < 0.5) {
        vertex(newpt.x, y);
        vertex(newpt.x, newpt.y);
    }
    if (random() < 0.5) {
        vertex(newpt.x, newpt.y);
        vertex(x, newpt.y);
    }
    endShape(CLOSE);



}
