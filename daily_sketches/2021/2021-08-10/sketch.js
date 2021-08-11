// Daily Sketch for 2021-08-10
// Ram Narasimhan

/*
Desc: Flow particles inside circle, but with bubbles added in

Make the shape to be a set of points
Then use distance from each point to detect out of bounds...

*/


bidirection = 0.5
nscale = 0.009  //# scale of the noise
step_size = 25  //# how fast the particles move
offset = 130  //# offset in the noise input to get a different x & y velocities
const cnv = {
    xMargin: 50,
    yMargin: 50,
}

let palette = []
let radius = []; // List of circle radii
let ipd; //inter point distance for the shape

class FlowPoint { // A point on the Grid
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.active = true;
    }

    update() { // update its location
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
            if (out_of_bounds(this)) {
                this.active = false;
            } else { //  # draw a tiny line from prev position to updated position
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

//parameters:
//containing_cirlcle is the INDEX of the circle in question
// 0 is the innermost circle and 1,2,3...
function out_of_bounds(fp) {
    if (!isPtInsideCircle(fp, midX, midY, radius[0])) {
        return 1
    }
    // for (p of containing_shape) {
    //     if (dist(p.x, p.y, fp.x, fp.y) < 5) {
    //         return 1
    //     }
    // }
    return 0 //not out of bounds
}




const params = {
    //    bgColor: "#F1E0EA",
    //bgColor:"#EAB6AB"
    bgColor: "#0f0f0f", //black
    //    bgColor: '#ab3977', //black
    numColors: 20,
    numFlowPts: 3000,
    numCircles: 1,

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
    palette = ['white', 'yellow', "#FC6400", "red",
        'orange', 'salmon', 'brown', 'green']
    palette = replicate(palette, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    bg = random(palette2)
    //    displayBgRect(bg)


    print(cnv)
    // GET THE RADII ready and store in radius[r]
    midX = width / 2
    midY = height / 2
    for (r = 0; r < params.numCircles; r++) {
        xwidth = midX - cnv.xMargin
        xStep = xwidth / params.numCircles
        r1 = r + 1
        radius[r] = r1 * xStep
    }

    // shape_pts = []
    // r0 = radius[0]
    // nScale = r0 / 6;
    // //get the shape to be a bunch of points
    // for (a = 0; a < TAU; a += 0.05) {
    //     x = r0 * cos(a) + midX + noise(a * cos(a)) * nScale
    //     y = r0 * sin(a) + midY + noise(a + 100) * nScale
    //     shape_pts.push(createVector(x, y))
    // }

    // ipd = dist(shape_pts[0].x, shape_pts[0].y, shape_pts[1].x, shape_pts[1].y)
    // print(ipd)
    // fill('orange')
    // for (pt of shape_pts) {
    //     circle(pt.x, pt.y, 10)
    // }


    strokeWeight(1)
    stroke(palette[3])
    for (pr = 0; pr < params.numFlowPts; pr++) {
        xloc = cnv.xMargin + random(cnv.width)
        yloc = cnv.yMargin + random(cnv.height)
        //each xloc, yloc belongs to one unique circle. Find that circle index
        ci = getCircle(xloc, yloc, radius)
        if (ci == 0) {//inside outermost circle
            fp = new FlowPoint(xloc, yloc)
            for (i = 0; i < 300; i++) {
                fp.update()
            }
        }
    }

    //place a n bubbles
    fill(params.bgColor)
    noStroke();
    for (bubble = 0; bubble < 15; bubble++) {
        circle(random(cnv.width), random(cnv.height), random(30, 100))
    }

    draw_border(clr = 20, sw = 50); //rn_utils.js
}

//each xloc, yloc belongs to one unique circle. Find that circle index
//Logic: start from the innermost circle and work up
function getCircle(xloc, yloc, radius) {
    pt = createVector(xloc, yloc)
    for (r = 0; r < params.numCircles; r++) {
        if (isPtInsideCircle(pt, width / 2, height / 2, radius[r])) {
            return (r)
        }
    }
    return (10)
}



