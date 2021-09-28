// Daily Sketch for 2021-09-26
// Ram Narasimhan.

/*
Keywords: fractals
Addition: Add a stopping criteria for shapes that are too small...
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
        this.render = 1;
        this.vsize = dist(nw.x, nw.y, sw.x, sw.y)
        this.hsize = dist(nw.x, nw.y, ne.x, ne.y)
        this.open = 1; // still open to get split
    }

    display(colr, swt = 1) {
        strokeWeight(swt)
        if (colr) {
            fill(colr);
        }
        stroke(params.blkColor)

        beginShape()
        curveVertex(this.nw.x, this.nw.y);
        curveVertex(this.ne.x, this.ne.y);
        curveVertex(this.se.x, this.se.y);
        curveVertex(this.sw.x, this.sw.y);
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
    //fill("#0f0f0f");
    //rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);

    grid = new Grid(params.xStep, params.yStep, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin);



    //initialize one large shingle with 4 corners
    let shingleList = [];
    let nw = new Point(cnv.xMargin, cnv.yMargin)
    let ne = new Point(cnv.xMargin + cnv.width, cnv.yMargin)
    let se = new Point(cnv.xMargin + cnv.width, cnv.yMargin + cnv.height)
    let sw = new Point(cnv.xMargin, cnv.yMargin + cnv.height)
    let sh = new Shingle(nw, ne, se, sw);
    shingleList.push(sh);

    numSubdivisions = 250
    vSizeCutoff = 5
    hSizeCutoff = 5

    for (s = 0; s <= numSubdivisions; s += 1) {
        subdivide(shingleList);
    }



    for (sh of shingleList) {
        if (sh.render) {
            sh.display(random(palette2), 5);
            //print(sh.vsize, sh.hsize)
        }
    }

    draw_border(clr = params.blkColor, sw = 29 + cnv.xMargin); //rn_utils.js
    //    draw_border(clr = 20, sw = 20); //rn_utils.js

    //midPt = getinBetweenPtOnLine(1, 1, 3, 3, 0.33)
}


/*
To "process" a shingle is to 
a. subdivide it into 4
b. add the 4 new into the list
c. mark the original shingle as done. It doesn't have to be displayed anymore. It's "children" will take over
*/
function subdivide(shingleList) {

    //pick a shingle to divide
    let sh0 = random(shingleList);

    if ((sh0.open) && (sh0.vsize > vSizeCutoff) && (sh0.hsize > hSizeCutoff)) { // untouched, so go ahead and subdivide
        fracW = random(0.3, 0.7)
        let mWest = getInbetweenPtOnLine(sh0.nw.x, sh0.nw.y, sh0.sw.x, sh0.sw.y, fracW)
        fracE = random(0.3, 0.7)
        let mEast = getInbetweenPtOnLine(sh0.ne.x, sh0.ne.y, sh0.se.x, sh0.se.y, fracE)
        fracN = random(0.3, 0.7)
        let mNorth = getInbetweenPtOnLine(sh0.nw.x, sh0.nw.y, sh0.ne.x, sh0.ne.y, fracN)
        fracS = random(0.3, 0.7)
        let mSouth = getInbetweenPtOnLine(sh0.sw.x, sh0.sw.y, sh0.se.x, sh0.se.y, fracS)


        result = intersectionPtOf2Lines(mWest.x, mWest.y, mEast.x, mEast.y,
            mNorth.x, mNorth.y, mSouth.x, mSouth.y)



        let midX = result.x
        let midY = result.y


        //NW SHINGLE
        let nw = sh0.nw
        let ne = new Point(mNorth.x, mNorth.y);
        let se = new Point(midX, midY);
        let sw = new Point(mWest.x, mWest.y);
        let sh = new Shingle(nw, ne, se, sw);
        shingleList.push(sh);

        //NE shingle
        nw = new Point(mNorth.x, mNorth.y);
        ne = new Point(sh0.ne.x, sh0.ne.y);
        se = new Point(mEast.x, mEast.y);
        sw = new Point(midX, midY);
        sh = new Shingle(nw, ne, se, sw);
        shingleList.push(sh);

        //SE shingle
        nw = new Point(midX, midY);
        ne = new Point(mEast.x, mEast.y);
        se = new Point(sh0.se.x, sh0.se.y);
        sw = new Point(mSouth.x, mSouth.y);
        sh = new Shingle(nw, ne, se, sw);
        shingleList.push(sh);

        //SW shingle
        nw = new Point(mWest.x, mWest.y);
        ne = new Point(midX, midY);
        se = new Point(mSouth.x, mSouth.y);
        sw = new Point(sh0.sw.x, sh0.sw.y);
        sh = new Shingle(nw, ne, se, sw);
        shingleList.push(sh);
        sh0.open = 0; // splitting is done
        sh0.render = 0;

    } else {
        sh0.open = 0; //too small, but still should be rendered
    }

    print('ending subd', shingleList.length)
}




