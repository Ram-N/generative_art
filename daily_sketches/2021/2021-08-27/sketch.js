// Daily Sketch for 2021-08-27
// Ram Narasimhan

/*
Domain Warping
Layers - Single color
attempted 3D
*/


const cnv = {
    xMargin: 30,
    yMargin: 30,
}

let palette = []
const params = {
    bgColor: "#0f0f0f", //black
}

sqSize = 660;

function setup() {
    createCanvas(sqSize, sqSize, WEBGL);
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

    startColrs = [random(360), 354, random(360)]
    startColrs = [80, 120, 240, 270, 360]

    for (p of pgrid.panels) {
        domainWarpInsidepanel(p)
    }


    //draw_border(clr = params.bgColor, sw = 50); //rn_utils.js
}



numLayers = 5
cutoff = [0.5, 0.5, 0.6, 0.5, 0.6]

function domainWarpInsidepanel(panel, dw_properties) {

    push();
    //translate(panel.x, panel.y, 0);

    rotateX(PI / 3);
    for (layer = 0; layer < numLayers; layer++) {
        translate(-200, -600, -100);

        for (x = 0; x <= panel.pw; x++) {
            for (y = 0; y <= panel.ph; y++) {
                domain_warp(x, y, layer)
            }
        }
    }
    pop();

}

function distort(x, y) {
    wiggle = 0.02
    return noise(x * wiggle, y * wiggle)
}




function domain_warp(x, y, layer) {


    dw_value = noise((x + 100 * layer) * 0.01, (y + layer * 233) * 0.01)
    if (color_mapping(dw_value, layer)) {
        point(x, y, layer * 10)
    }

}


function color_mapping(dw_value, layer) {
    offset = layer * 20
    startColr = startColrs[layer]
    endColr = startColr //same color
    colr = map(dw_value, 0, 1, startColr + offset, endColr + offset) % 360
    if (dw_value < cutoff[layer]) {
        stroke(colr, 50 + 10 * layer, 60 + 10 * layer)
        return 1
    }
    return 0 // don't draw the point
}







