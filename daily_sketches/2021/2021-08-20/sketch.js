// Daily Sketch for 2021-08-20
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

n_shift = [10, 40]

function domain_warp(x, y, distortion_strength, noise_scale, layer) {

    x_distortion = distortion_strength * distort(x + n_shift[layer], y * y)
    y_distortion = distortion_strength * distort(-x * x, y + n_shift[layer])
    dw_value = noise((x + x_distortion) * noise_scale,
        (y - y_distortion) * noise_scale)

    if (layer == 1) {
        dw_value = noise((x + 100) * 0.01, y * 0.01)
    }

    //stroke(100, 0, 0)
    colr = color_mapping(dw_value, layer); // set HSV
    stroke(colr, 100, 100)
    if ((x < 3) && (y < 5)) {
        print(x, layer, dw_value, colr)
    }

    point(x, y)
}


cutoff = [0.1, 0.3]

function color_mapping(dw_value, layer) {
    colr = map(dw_value, 0, 1, 0, 360)
    offset = 0
    if (dw_value < cutoff[layer]) {
        offset = 180 * layer
        value = 73
        colr = (colr + offset) % 360
        //print(colr, dw_value)        
    }
    return colr
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
    colSplit = [1]
    rowSplit = [3]
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
    for (layer = 0; layer <= 1; layer++) {
        noisebase = layer * 0.003
        distortion_strength = layer * 0.01;
        for (x = 0; x <= panel.pw; x++) {
            for (y = 0; y <= panel.ph; y++) {
                noise_scale = noisebase + (panel.x + x) * 0.0001
                distortion_strength += 1e-6
                domain_warp(x, y, distortion_strength, noise_scale, layer)
            }
        }
    }
    pop();

}








