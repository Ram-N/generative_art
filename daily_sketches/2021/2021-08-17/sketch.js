// Daily Sketch for 2021-08-17
// Ram Narasimhan

/*
Domain Warping
*/


const cnv = {
    xMargin: 30,
    yMargin: 30,
}

let palette = []
const params = {
    //    bgColor: "#F1E0EA",
    //bgColor:"#EAB6AB"
    bgColor: "#0f0f0f", //black
    //    bgColor: '#ab3977', //black
    numLeaves: 400,

}

/*
Two images are produced of identical size, placed side by side.
THe LHS is pure Perlin Noise.
The RHS image is where the domain warping happens
In this expt, we see the imapact of 1 or 2 variables on DW...
1. Distortion strength
*/

// Per: https://gamedev.stackexchange.com/questions/162454/how-to-distort-2d-perlin-noise
function distort(x, y) {
    wiggle = 0.02
    return noise(x * wiggle, y * wiggle)
}

function domain_warp(x, y, distortion_strength, noise_scale) {

    x_distortion = distortion_strength * distort(x + 53, y + 99)
    y_distortion = distortion_strength * distort(x - 30, y)
    dw_value = noise((x + x_distortion) * noise_scale, (y - y_distortion) * noise_scale)

    // if (x / 300 == int(x / 300)) {
    //     print(distortion_strength, 'strength')
    //     print(distort(x + 53, y + 99), 'dist')
    //     print(x_distortion, y_distortion)
    //     print(x, y, dw_value)
    // }
    colr = map(dw_value, 0, 1, 0, 360)
    colr = (colr + 123) % 360
    stroke(colr, 100, 100)
    point(x, y)
}


function setup() {
    createCanvas(660, 660);
    colorMode(HSB);
    background(0, 0, 0);

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    print(cnv)
    xstart = cnv.xMargin
    ystart = cnv.yMargin
    xend = cnv.xMargin + cnv.width
    yend = cnv.yMargin + cnv.height
    midX = width / 2
    midY = height / 2

    palette2 = red_brown_orange; //colors.js
    palette = flame;
    //palette = replicate(palette, 100)

    distortion_strength = 0

    render_dw()

    draw_border(clr = params.bgColor, sw = 50); //rn_utils.js
}

function render_dw() {

    distortion_strength += 10
    w = width / 2
    for (side of [0, 1]) {
        print(side, "side")
        noise_scale = 0.05 + side * 0.2
        push()
        translate(side * w, cnv.yMargin)
        for (x = 0; x <= w; x++) {
            for (y = 0; y <= height; y++) {
                domain_warp(x, y, distortion_strength * side, noise_scale)
            }
        }
        pop()
    }

    // fill(0, 100, 200)
    // textSize(32)
    // text("Pure Perlin", margin + w / 4, h + margin + margin / 2)
    // text(
    //     "DW Strength:" + str(distortion_strength),
    //     margin + w / 4 + w,
    //     h + margin + margin / 2,
    // )
}








