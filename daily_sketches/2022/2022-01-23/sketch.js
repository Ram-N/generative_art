// Daily Sketch for 2022-01-23
// Ram Narasimhan.




bidirection = 0.5
nscale = 0.009  //# scale of the noise
step_size = 25  //# how fast the particles move
offset = 130  //# offset in the noise input to get a different x & y velocities
class FlowPoint { // A point on the Grid
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.active = true;
    }

    update(buf) { // update its location
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
            if (out_of_bounds(this, buf.rect)) {
                this.active = false;
            } else { //  # draw a tiny line from prev position to updated position
                buf.line(oldX, oldY, this.x, this.y)
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


function isPtInsideRect(pt, rect) {
    if (pt.x < rect.minX) { return 0 }
    if (pt.x > rect.maxX) { return 0 }
    if (pt.y < rect.minY) { return 0 }
    if (pt.y > rect.maxY) { return 0 }
    return 1
}


/*containing_rect should have minX, maxX, minY, maxY */
function out_of_bounds(fp, containing_rect) {
    //check if fp is inside containing rect, but OUTSIDE the smaller rect
    if (isPtInsideRect(fp, containing_rect)) {
        print(fp.x, fp.y, containing_rect)
        return 0 //fine
    }
    return 1 //OOB
}



let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}

const params = {
    xStep: 60,
    yStep: 60,
    bgColor: [210, 50, 80],
    blkColor: [0, 0, 0],
}


const BgParams = {
    size: "medium",
    rows: 10,
    columns: 10,
    color: "red",
    sw: 3

}


function setup() {

    createCanvas(960, 960);
    colorMode(HSB);
    background(params.blkColor);
    print(params.bgColor)
    palette2 = HrainbowDash; //colors.js
    //palette2 = Hcappuccino; //colors.js
    palette2 = random(palList)
    palette = replicate(palette, 100)

    vegPalette = getVegPalette();

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(params.blkColor);
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);
    pgrid = createSquareGrid(5);

    buffers = createPanelBuffers(pgrid);

    for (p of pgrid.panels) {
        push();
        _box = new Bbox(p.x, p.y, p.w, p.h);
        BgParams.numLayers = random([0, 2, 3]);
        BgParams.palette = palette2;
        coloredWall(_box, BgParams)
        pop();
    }


    //create the mini-canvases as buffers, and paint them as images 
    for (const [index, p] of pgrid.panels.entries()) {
        drawTruchet(buffers[index], p);
        //drawCircloids(buffers[index])
        image(buffers[index], p.x, p.y);
    }


    for (p of pgrid.panels) {
        sqSide = p.w / 4
        if (p.type == 2) {
            push();
            noFill();
            stroke("black");
            strokeWeight(9)
            arc(p.x + sqSide - 10, p.y + p.h / 2, p.w / 2, p.w / 2, 1.5 * PI, 2.25 * PI)
            arc(p.x + p.w - sqSide + 10, p.y + p.h / 2, p.w / 2, p.w / 2, 0.5 * PI, 1.25 * PI)


            stroke(random(vegPalette));
            strokeWeight(6)
            arc(p.x + sqSide - 10, p.y + p.h / 2, p.w / 2, p.w / 2, 1.5 * PI, 2.25 * PI)
            arc(p.x + p.w - sqSide + 10, p.y + p.h / 2, p.w / 2, p.w / 2, 0.5 * PI, 1.25 * PI)
            pop();

            //Corner Leaf Type 1
            push();
            stroke("black");
            strokeWeight(3)
            fill(random(vegPalette))
            rect(p.x, p.y, sqSide, sqSide, 0, 0, 30, 0);
            fill(random(vegPalette))
            rect(p.x + p.w - sqSide, p.y + p.h - sqSide, sqSide, sqSide, 30, 0, 0, 0);

            pop();

        }

        if (p.type == 1) {
            push();
            noFill();

            stroke("black");
            strokeWeight(9)
            arc(p.x + p.w / 2 - 10, p.y + p.h - sqSide, p.w / 2, p.w / 2, PI, 1.75 * PI)
            arc(p.x + p.w / 2 + 10, p.y + p.h / 2 - sqSide - 10, p.w / 2, p.w / 2, 0, 0.75 * PI)


            stroke(random(vegPalette));
            strokeWeight(6)
            arc(p.x + p.w / 2 - 10, p.y + p.h - sqSide, p.w / 2, p.w / 2, PI, 1.75 * PI)
            arc(p.x + p.w / 2 + 10, p.y + p.h / 2 - sqSide - 10, p.w / 2, p.w / 2, 0, 0.75 * PI)

            pop();

            push();

            //Corner Leaf Type 2
            stroke("black");
            strokeWeight(3)
            fill(random(vegPalette))
            rect(p.x + p.w - sqSide, p.y, sqSide, sqSide, 0, 0, 0, 30);
            fill(random(vegPalette))
            rect(p.x, p.y + p.h - sqSide, sqSide, sqSide, 0, 30, 0, 0);

            pop();

        }
    }

    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}

//Creates one off-screen buffer for each panel.
//This could even become part of the Panel object as a method inside it.
function createPanelBuffers(pgrid) {
    buffers = [];
    for (p of pgrid.panels) {

        bf = createGraphics(p.w, p.h)
        bf.rect = new Rectangle(p.x, p.y, p.w, p.h);
        buffers.push(bf)//off-screen tile buffers
    }
    return buffers
}



function getVegPalette() {
    pal = []
    for (rep = 0; rep < 10; rep++) {
        h = int(random(110, 130));
        s = int(random(5, 10)) * 10;
        b = int(random(5, 10)) * 10;
        pal.push([h, s, b])
    }
    return pal
}


function drawTruchet(buf, pnl) {
    buf.colorMode(HSB);

    toss = random();
    buf.stroke('black')

    if (toss < 0.5) {
        buf.push();
        buf.translate(0, 0) //NW
        coords = getQuartCirclePts(buf.width / 2, 0);
        renderQC(coords, buf);
        buf.pop();

        buf.push();
        buf.translate(buf.width, buf.height) //SE
        coords = getQuartCirclePts(buf.width / 2, PI);
        renderQC(coords, buf);
        pnl.type = 1;
        buf.pop();
    } else {
        buf.push();
        buf.translate(0, buf.height) //SW
        coords = getQuartCirclePts(buf.width / 2, 3 * PI / 2);
        renderQC(coords, buf);
        buf.pop();

        buf.push();
        buf.translate(buf.width, 0) //NE
        coords = getQuartCirclePts(buf.width / 2, PI / 2);
        renderQC(coords, buf);
        pnl.type = 2;
        buf.pop();

    }




}

function renderQC(coords, buf) {

    for (pt of coords) {
        buf.stroke("black")
        buf.strokeWeight(3)
        buf.fill(random(vegPalette))
        buf.circle(pt.x, pt.y, 10)

        tangent = {
            x: pt.x + 20 * cos(pt.angle + PI / 2),
            y: pt.x + 20 * sin(pt.angle + PI / 2)
        }

        buf.stroke("black")
        buf.line(pt.x, pt.y, tangent.x, tangent.y)

        buf.strokeWeight(2)
        buf.stroke(random(vegPalette))
        buf.line(pt.x, pt.y, tangent.x, tangent.y)

    }
}


function getQuartCirclePts(rad, thetaStart) {
    coords = []
    numPts = 10;
    angleStep = PI / 2 / numPts;
    for (c = 0; c < numPts; c++) {
        x = rad * cos(thetaStart + angleStep * c)
        y = rad * sin(thetaStart + angleStep * c)
        coords.push({ x: x, y: y, angle: thetaStart + angleStep * c })
    }
    return coords
}


radii = [15, 12, 10, 5]
function drawCircloids(buf) {
    buf.colorMode(HSB);
    coords = []

    buf.fill(0, 0, 0);
    bw2 = buf.width / 2;
    bh2 = buf.height / 2;
    bigRadius = buf.width * 0.5;
    bigX = random(buf.width / 4, buf.width * 0.75)
    bigY = buf.height - (1 / 4 * bigRadius)
    //Start with a big circle
    coords.push(new Circ(bigX, bigY, bigRadius))

    //medium satellites
    prevRadius = bigRadius;
    prevX = bigX
    prevY = bigY;
    for (ang in [0, 1]) {
        for (c in [0, 1]) {
            var rad = random(radii) + buf.width / 4
            angle = random(PI + PI / 2 * ang, 3 / 2 * PI + PI / 2 * ang)
            x = prevX + rad * cos(angle)
            y = prevY + rad * sin(angle)
            coords.push(new Circ(x, y, rad))
        }
    }

    //do the actual rendering
    buf.noStroke()
    for (outline in [0, 1, 2, 3]) {
        buf.fill(140, 100 - 10 * outline, 100 - 10 * outline);
        sc = (1 - outline * 0.15)
        for (co of coords) {
            buf.circle(co.x, co.y, co.radius * sc);
        }
    }

}



class Circ { // Coords of a cirlce
    constructor(x, y, r) {
        this.x = x; // center x
        this.y = y; //center y
        this.radius = r;
    }
}
