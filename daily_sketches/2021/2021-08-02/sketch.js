// Daily Sketch for 2021-08-02
// Ram Narasimhan

/*
Keywords: Thread connect

*/



bidirection = 0.5


nscale = 0.008  //# scale of the noise
step_size = 20  //# how fast the particles move
offset = 100  //# offset in the noise input to get a different x & y velocities



class FlowPoint { // A point on the Grid
    constructor(x, y, tcol, trow) {
        this.x = x;
        this.y = y;
        this.col = tcol;
        this.row = trow;
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
            if (this.out_of_bounds()) {
                this.active = false;
            } else { //  # draw a tiny line from prev position to updated position
                strokeWeight(3)
                //print(x, y, this.x, this.y)
                line(oldX, oldY, this.x, this.y)
            }
        }

    }

    out_of_bounds(tcol, trow) {
        xstart = cnv.xMargin + tcol * tg.tw
        ystart = cnv.yMargin + trow * tg.th
        xend = cnv.xMargin + (tcol + 1) * tg.tw
        yend = cnv.yMargin + (trow + 1) * tg.th

        // calculate the tile ends xstart.. yend for a given tile.
        if ((this.x <= xstart) || (this.x > xend)) {
            return 1
        }
        if ((this.y <= ystart) || (this.y > yend)) {
            return 1
        }
        return 0
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



let palette = []
let grid;
const cnv = {
    xMargin: 50,
    yMargin: 50,
}


const params = {
    bgColor: "#0f0f0f", //black
    //    bgColor: '#ab3977', //black
    numColors: 20,
    numpins: 24,
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


    tg = new TileGrid(4, 5, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin)
    stroke(200)
    renderTileGrid(tg.tiles, 4, 5, cnv)

    for (p = 0; p < 200; p++) {
        xloc = random(cnv.width)
        yloc = random(cnv.height)
        stroke(random(palette2))
        strokeWeight(int(random(5)))
        fp = new FlowPoint(xloc, yloc, 1, 3)
        for (i = 0; i < 100; i++) {
            fp.update()
        }
    }


    draw_border(clr = 20, sw = 50); //rn_utils.js
}





