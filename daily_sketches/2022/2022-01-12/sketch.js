// Daily Sketch for 2022-01-12
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

class Triangle { // Shape, made up of 3 points...
    constructor(_type, ptA, ptB, ptC, pal) {
        this.type = _type //quad or triangle
        this.render = 1;
        this.ptA = ptA;
        this.ptB = ptB;
        this.ptC = ptC;
        this.ab = dist(ptA.x, ptA.y, ptB.x, ptB.y)
        this.bc = dist(ptB.x, ptB.y, ptC.x, ptC.y)
        this.ac = dist(ptA.x, ptA.y, ptC.x, ptC.y)
        this.open = 1; // still open to get split
        this.palette = pal;

    }

    display(colr, swt = 1) {
        strokeWeight(swt)
        // if (colr) {
        //     fill(colr);
        // }
        stroke(params.blkColor)
        fill(random(this.palette))

        beginShape()
        vertex(this.ptA.x, this.ptA.y);
        vertex(this.ptB.x, this.ptB.y);
        vertex(this.ptC.x, this.ptC.y);
        endShape(CLOSE);

    }


}

class Quad { // A roughly rectangular shape, made up of 4 points...
    constructor(_type, nw, ne, se, sw, pal) {
        this.type = _type //quad or triangle
        this.nw = nw; // a point with x and y
        this.ne = ne;
        this.se = se;
        this.sw = sw;
        this.render = 1;
        this.vsize = dist(nw.x, nw.y, sw.x, sw.y)
        this.hsize = dist(nw.x, nw.y, ne.x, ne.y)
        this.open = 1; // still open to get split
        this.palette = pal;

    }

    display(colr, swt = 1) {
        strokeWeight(swt)
        // if (colr) {
        //     fill(colr);
        // }
        stroke(params.blkColor)
        fill(random(this.palette))

        beginShape()
        vertex(this.nw.x, this.nw.y);
        vertex(this.ne.x, this.ne.y);
        vertex(this.se.x, this.se.y);
        vertex(this.sw.x, this.sw.y);
        endShape(CLOSE);

    }

    shrink(colr, swt = 1) {
        push();
        let tpx = (this.nw.x + this.se.x) / 2;
        let tpy = (this.nw.y + this.se.y) / 2;
        translate(tpx, tpy)
        scale(0.9, 0.9);
        strokeWeight(swt)
        // if (colr) {
        //     fill(colr);
        // }
        stroke(params.blkColor)
        fill(random(this.palette))

        beginShape()
        vertex(this.nw.x - tpx, this.nw.y - tpy);
        vertex(this.ne.x - tpx, this.ne.y - tpy);
        vertex(this.se.x - tpx, this.se.y - tpy);
        vertex(this.sw.x - tpx, this.sw.y - tpy);
        endShape(CLOSE);


        pop()
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

    grid = new Grid(params.xStep, params.yStep, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin);



    //initialize one large Quad with 4 corners
    let shingleList = [];
    let nw = new Point(cnv.xMargin, cnv.yMargin)
    let ne = new Point(cnv.xMargin + cnv.width, cnv.yMargin)
    let se = new Point(cnv.xMargin + cnv.width, cnv.yMargin + cnv.height)
    let sw = new Point(cnv.xMargin, cnv.yMargin + cnv.height)
    let sh = new Quad('q', nw, ne, se, sw, random(palList));
    shingleList.push(sh);

    numQdivisions = 500
    numSubdivisions = 200

    vSizeCutoff = 50
    hSizeCutoff = 50

    sh0 = random(shingleList);
    quadivide(sh0, 0, shingleList);
    // sh0 = random(shingleList);
    // tridivide(sh0, 0, shingleList);

    //DO QUAD-DIVISIONS
    for (s = 0; s <= numQdivisions; s += 1) {
        sh0 = random(shingleList);
        quadivide(sh0, 1, shingleList);
    }

    //DO A FEW TRIDIVIDES
    // for (s = 0; s <= numSubdivisions; s += 1) {
    //     //pick a shingle to divide
    //     sh0 = random(shingleList);
    //     tridivide(sh0, 1, shingleList);
    // }


    //DISPLAY THE SHINGLES
    for (sh of shingleList) {
        //print('sh', sh)
        if (sh.render) {
            // sh.display(random(palette2), 10);
            sh.shrink(random(palette2), 2);
        }
    }

    draw_border(clr = params.blkColor, sw = 29 + cnv.xMargin); //rn_utils.js
    //    draw_border(clr = 20, sw = 20); //rn_utils.js

    //midPt = getinBetweenPtOnLine(1, 1, 3, 3, 0.33)
}


/*
To "process" a Quad is to 
a. quadivide it into 4
b. add the 4 new into the list
c. mark the original Quad as done. It doesn't have to be displayed anymore. It's "children" will take over
*/
function quadivide(sh0, maintainColor, shingleList) {

    if ((sh0.open) && (sh0.vsize > vSizeCutoff) && (sh0.hsize > hSizeCutoff)) { // untouched, so go ahead and quadivide
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

        if (maintainColor) {
            pal = sh0.palette
        } else {
            pal = purples
        }

        //NW Quad
        let nw = sh0.nw
        let ne = new Point(mNorth.x, mNorth.y);
        let se = new Point(midX, midY);
        let sw = new Point(mWest.x, mWest.y);
        let sh = new Quad('q', nw, ne, se, sw, pal);
        shingleList.push(sh);


        if (maintainColor) {
            pal = sh0.palette
        } else {
            pal = cappuccino;
        }


        //NE Quad
        nw = new Point(mNorth.x, mNorth.y);
        ne = new Point(sh0.ne.x, sh0.ne.y);
        se = new Point(mEast.x, mEast.y);
        sw = new Point(midX, midY);
        sh = new Quad('q', nw, ne, se, sw, pal);
        shingleList.push(sh);

        if (maintainColor) {
            pal = sh0.palette
        } else {
            pal = red_orange
        }

        //SE Quad
        nw = new Point(midX, midY);
        ne = new Point(mEast.x, mEast.y);
        se = new Point(sh0.se.x, sh0.se.y);
        sw = new Point(mSouth.x, mSouth.y);
        sh = new Quad('q', nw, ne, se, sw, pal);
        shingleList.push(sh);

        if (maintainColor) {
            pal = sh0.palette
        } else {
            pal = green_yellow
        }

        //SW Quad
        nw = new Point(mWest.x, mWest.y);
        ne = new Point(midX, midY);
        se = new Point(mSouth.x, mSouth.y);
        sw = new Point(sh0.sw.x, sh0.sw.y);
        sh = new Quad('q', nw, ne, se, sw, pal);
        shingleList.push(sh);
        sh0.open = 0; // splitting is done
        sh0.render = 0;

    } else {
        sh0.open = 0; //too small, but still should be rendered
    }
}


/*
To "tridivide" a Shingle is to 
a. divide it into 2
b. add the 2 new into the Shinglelist
c. mark the original Shingle as done. It doesn't have to be displayed anymore. It's "children" will take over
*/

function tridivide(sh0, maintainColor, shingleList) {

    if (sh0.type == 'q') {
        if ((sh0.open) && (sh0.vsize > vSizeCutoff) && (sh0.hsize > hSizeCutoff)) { // untouched, so go ahead and quadivide

            if (random() < 0.5) {
                if (maintainColor) {
                    pal = sh0.palette
                } else {
                    pal = purples
                }

                //NW Quad
                let ptA = sh0.nw
                let ptB = sh0.ne
                let ptC = sh0.sw
                let sh = new Triangle('t', ptA, ptB, ptC, pal);
                shingleList.push(sh);


                if (maintainColor) {
                    pal = sh0.palette
                } else {
                    pal = cappuccino;
                }

                //SE Quad
                ptA = sh0.ne
                ptB = sh0.se
                ptC = sh0.sw
                sh = new Triangle('t', ptA, ptB, ptC, pal);
                shingleList.push(sh);
            } else {
                if (maintainColor) {
                    pal = sh0.palette
                } else {
                    pal = purples
                }

                //NE Quad
                let ptA = sh0.ne
                let ptB = sh0.se
                let ptC = sh0.sw
                let sh = new Triangle('t', ptA, ptB, ptC, pal);
                shingleList.push(sh);


                if (maintainColor) {
                    pal = sh0.palette
                } else {
                    pal = cappuccino;
                }

                //SW Quad
                ptA = sh0.sw
                ptB = sh0.nw
                ptC = sh0.ne
                sh = new Triangle('t', ptA, ptB, ptC, pal);
                shingleList.push(sh);
            }

        } else {
            sh0.open = 0; //too small to subdivide, but still should be rendered
        }
    }

    if (sh0.type == 't') {
        if ((sh0.open) && (sh0.ab > vSizeCutoff) && (sh0.bc > hSizeCutoff)) { // untouched, so go ahead and divide

            fracAC = random(0.3, 0.7)
            let midAC = getInbetweenPtOnLine(sh0.ptA.x, sh0.ptA.y, sh0.ptC.x, sh0.ptC.y, fracAC)


            if (maintainColor) {
                pal = sh0.palette
            } else {
                pal = purples
            }

            //Divide at AC. to make ABnewC
            ptA = sh0.ptA
            ptB = sh0.ptB
            ptC = midAC
            sh = new Triangle('t', ptA, ptB, ptC, pal);
            shingleList.push(sh);


            if (maintainColor) {
                pal = sh0.palette
            } else {
                pal = cappuccino;
            }

            //Divide at AC. to make newCBC
            ptA = midAC
            ptB = sh0.ptB
            ptC = sh0.ptC
            sh = new Triangle('t', ptA, ptB, ptC, pal);
            shingleList.push(sh);


        } else {
            sh0.open = 0; //too small to subdivide, but still should be rendered
        }
    }


}



