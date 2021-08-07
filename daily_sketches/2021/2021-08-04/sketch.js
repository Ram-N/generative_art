// Daily Sketch for 2021-08-04
// Ram Narasimhan

/*
Desc: Flow particles inside a set of concentric squares

*/



bidirection = 0.5
nscale = 0.008  //# scale of the noise
step_size = 20  //# how fast the particles move
offset = 100  //# offset in the noise input to get a different x & y velocities
const cnv = {
    xMargin: 50,
    yMargin: 50,
}

let palette = []
let rectangles = [];


class FlowPoint { // A point on the Grid
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.active = true;
    }

    update(containing_rect) { // update its location
        if (this.active) {
            let x_perturb = noise(nscale * this.x, nscale * this.y) - bidirection
            let y_perturb = noise(offset + nscale * this.x, offset + nscale * this.y) - bidirection
            let dx = step_size * x_perturb
            let dy = step_size * y_perturb

            let oldX = this.x;
            let oldY = this.y;
            // fp gets displaced slightly.Store its new location
            this.x += dx
            this.y += dy
            if (out_of_bounds(this, containing_rect)) {
                this.active = false;
            } else { //  # draw a tiny line from prev position to updated position
                strokeWeight(3)
                //print(x, y, this.x, this.y)
                line(oldX, oldY, this.x, this.y)
            }
        }

    }

    display(colr, sw = 1) {
        strokeWeight(sw)
        if (colr) {
            stroke(colr);
            fill(colr);
        }
        circle(this.x, this.y, 10)
    }

}

function out_of_bounds(fp, containing_rect) {
    //check if fp is inside containing rect, but OUTSIDE the smaller rect
    if (containing_rect == 0) {
        return (!isPtInsideRect(fp, rectangles[0]))
    }

    main_rect = rectangles[containing_rect]
    smaller_rect = rectangles[containing_rect - 1]
    if (isPtInsideRect(fp, main_rect)) {
        if (isPtInsideRect(fp, smaller_rect)) {
            return 1 //out of bounds
        }
        return 0 //fine
    }
    return 0 //fine
}




const params = {
    bgColor: "#0f0f0f", //black
    //    bgColor: '#ab3977', //black
    numColors: 20,
    numFlowPts: 1500,
    numRects: 3,

}


xstart = cnv.xMargin
ystart = cnv.yMargin
xend = cnv.xMargin + cnv.width
yend = cnv.yMargin + cnv.height

function setup() {
    createCanvas(660, 660);
    background(params.bgColor);
    palette2 = purples;
    palette2 = replicate(palette2, 100)
    palette = red_brown_orange; //colors.js
    // palette = cappuccino; //colors.js
    // palette = take5;
    palette = ['lightblue', 'blue', 'black', 'orange', 'blue',
        'salmon', 'brown', 'green']
    palette = replicate(palette, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    bg = random(palette2)
    //    displayBgRect(bg)


    print(cnv)
    //tg = new TileGrid(5, 5, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin)
    //tg.renderTileGrid(cnv)
    stroke(200)
    for (r = 0; r < params.numRects; r++) {
        midX = width / 2
        midY = height / 2
        xwidth = midX - cnv.xMargin
        xStep = xwidth / params.numRects
        yht = midY - cnv.yMargin
        yStep = yht / params.numRects
        r1 = r + 1
        rectangles[r] = new Rectangle(midX - (r1 * xStep),
            midY - (r1 * yStep),
            r1 * xStep * 2,
            r1 * yStep * 2,
        )
        rectangles[r].display()
    }

    for (p = 0; p < params.numFlowPts; p++) {
        xloc = cnv.xMargin + random(cnv.width)
        yloc = cnv.yMargin + random(cnv.height)
        stroke(random(palette2))
        strokeWeight(int(random(5)))
        //each xloc, yloc belongs to one unique rect. Find that rect index
        rct = getRect(xloc, yloc, rectangles)
        stroke(palette[rct + 3])
        fp = new FlowPoint(xloc, yloc)
        for (i = 0; i < 100; i++) {
            fp.update(rct)
        }
    }

    draw_border(clr = 20, sw = 50); //rn_utils.js
}


function getRect(xloc, yloc, rectangles) {
    pt = createVector(xloc, yloc)
    for (r = 0; r < params.numRects; r++) {
        if (isPtInsideRect(pt, rectangles[r])) {
            return (r)
        }
    }
}



