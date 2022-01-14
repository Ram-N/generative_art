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
    xStep: 20,
    yStep: 20,
    tw: 25,
    bgColor: "#d3d3d3",
    blkColor: "#0f0f0f",
}


function setup() {

    // let p5canvas = createCanvas(800, 80);
    // canvas = p5canvas.canvas;
    createCanvas(800, 80);
    // let framerate = 30;
    // var capturer = new CCapture({ format: 'webm', framerate, name: 'noise_visualization', quality: 100, });
    // background(params.blkColor);
    palette = random(RGBPalList);
    palette = replicate(palette, 100)
    palette2 = random(palList)
    palette2 = replicate(palette2, 100)




    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width

    hg = new HexGrid(cnv.width, cnv.height, cnv.xMargin, cnv.yMargin, params.tw);
    stroke(255)
    let alphaValue = 100;
    print(hg.points.length)

    wagons = [];
    base_r = cnv.width / 400

    for (co of hg.points) {
        for (g of co) {
            translate(g.x, g.y)
            rad = base_r * (12 - abs(g.col - (hg.cols / 4)))
            cutoff = abs(g.col - (hg.cols / 4))

            palette = random(RGBPalList);
            hx = new Polygon(0, 0, 6, rad, random(palette));

            //hx.rotate(PI / 4 * int(random(5)))
            // hx.render()
            // hx.renderVertices();
            // stroke(palette[g.col]);

            // if (random() < 0.3) { hx.renderStripes(2, 0.2); }

            colr = random(palette);
            wagon = new HexWagon(g.x, g.y, colr, rad); //shell
            wagons.push(wagon)
        }
    }

    //    capturer.start();
}

function draw() {
    background(params.blkColor)
    for (hx of wagons) {
        hx.update();
        hx.display();
    }

    noLoop();
    // capturer.capture(canvas);
    // let secondsElapsed = frameCount / framerate;
    // if (secondsElapsed >= 5) {
    //     capturer.stop(); capturer.save();
    //     noLoop(); // This is optional
    // }    // //this is a bit painful. save each image, but it works
    // saveFrames("images/hex", "png", 5, 3);
}


class HexWagon {
    constructor(x, y, colr, rad) {
        this.x = x;
        this.y = y;
        this.colr = colr;
        this.fillcolor = random(palette)
        this.r = rad;
        this.velx = int(random([-2, -1, 1, 2]))
        this.vely = int(random([-2, -1, 1, 2, 3]))
        this.hx = new Polygon(x, y, 6, rad, colr);
    }

    update() {
        this.x += this.velx;
        this.y += this.vely;
        if ((this.hx.dim < 25)) {
            this.hx.dim += 0.1
        } else if (this.hx.dim > 5) {
            this.hx.dim -= 0.1
        }
        if (Xout_of_bounds(this)) {
            this.velx *= -1
        }
        if (Yout_of_bounds(this)) {
            this.vely *= -1
        }
    }

    display() {
        strokeWeight(2);
        fill(this.fillcolor)
        stroke(this.colr);
        push();
        translate(this.x, this.y);
        //hx = new Polygon(0, 0, 6, this.r, this.colr);
        this.hx.render()
        this.hx.renderSpokes();
        //this.hx.renderStripes(2, 0.2);
        pop();
    }

}

function Xout_of_bounds(wag) {
    if ((wag.x >= width) || (wag.x <= 0)) {
        return 1
    }
    return 0
}

function Yout_of_bounds(wag) {
    if ((wag.y >= height) || (wag.y <= 0)) {
        wag.hx.rotAngle += PI / 7;
        return 1
    }
    return 0
}
