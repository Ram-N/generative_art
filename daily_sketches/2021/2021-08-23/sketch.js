// Daily Sketch for 2021-08-24
// Ram Narasimhan

/*
Domain Warping
Layers
Repeating colors...
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

numLayers = 3
cutoff = [0.5, 0.4, 0.3]

function domainWarpInsidepanel(panel, dw_properties) {

    push();
    translate(panel.x, panel.y);
    for (layer = 0; layer < numLayers; layer++) {
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

function distort(x, y) {
    wiggle = 0.02
    return noise(x * wiggle, y * wiggle)
}


function domain_warp(x, y, distortion_strength, noise_scale, layer) {


    dw_value = noise((x + 100 * layer) * 0.01, (y + layer * 233) * 0.01)
    if (color_mapping(dw_value, layer)) {
        point(x, y)
    }

    if ((x < 3) && (y < 4)) {
        print(x, layer, dw_value, colr, cutoff[layer])
    }

}



function color_mapping(dw_value, layer) {
    offset = layer * 20
    start_colr = 200
    endColr = start_colr + 80
    colr = map(dw_value, 0, 1, start_colr + offset, endColr + offset) % 360
    if (dw_value < cutoff[layer]) {
        stroke(colr, 50 + 10 * layer, 60 + 10 * layer)
        return 1
    }
    return 0 // don't draw the point
}








