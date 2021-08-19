// Daily Sketch for 2021-08-19
// Ram Narasimhan

/*
Domain Warping
Within Panels...
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
}

/*
Two images are produced of identical size, placed side by side.
THe LHS is pure Perlin Noise.
The RHS image is where the domain warping happens
*/

// Per: https://gamedev.stackexchange.com/questions/162454/how-to-distort-2d-perlin-noise

function distort(x, y) {
    wiggle = 0.02
    return noise(x * wiggle, y * wiggle)
}

function domain_warp(x, y, distortion_strength, noise_scale) {

    x_distortion = distortion_strength * distort(x, y * y)
    y_distortion = distortion_strength * distort(-x * x, y)
    y_distortion = 0
    x_distortion = 0
    dw_value = noise((x + x_distortion) * noise_scale,
        (y - y_distortion) * noise_scale)

    color_mapping(dw_value); // set HSV

    point(x, y)
}


function color_mapping(dw_value) {
    colr = map(dw_value, 0, 1, 120, 180)
    offset = 0
    value = 100
    if (dw_value < 0.5) {
        offset = 155
        value = 75
    }
    colr = (colr + offset) % 360
    stroke(colr, 100, value)

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

    //Custom Tiling
    colSplit = [1, 1, 1, 1, 1, 1]
    rowSplit = [3, 3, 3, 2, 2, 2]
    pgrid = new PanelGrid(cnv, colSplit, rowSplit)
    //pgrid.renderPanelGrid(10);

    for (p of pgrid.panels) {
        domainWarpInsidepanel(p)
    }

    draw_border(clr = params.bgColor, sw = 50); //rn_utils.js
}

function domainWarpInsidepanel(panel, dw_properties) {

    push();
    translate(panel.x, panel.y);
    //panelAreaRatio = panel.pw * panel.ph / cnv.width / cnv.height;
    for (x = 0; x <= panel.pw; x++) {
        distortion_strength = 0;
        for (y = 0; y <= panel.ph; y++) {
            noise_scale = 0.002 + (panel.x + x) * 0.0001
            distortion_strength += 1e-6
            domain_warp(x, y, distortion_strength, noise_scale)
        }
    }
    pop();

}








