// Daily Sketch for 2021-08-16
// Ram Narasimhan

/*
Custom Paneling
Desc: Paneling using custom splits. Idea from graphic novels. Blur effects.
Desc: Texture inside the box

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


function setup() {
    createCanvas(660, 660);
    //colorMode(HSB);
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
    colSplit = [1, 4, 1]
    rowSplit = [1, 3, 1]


    pgrid = new PanelGrid(cnv, colSplit, rowSplit)
    pgrid.renderPanelGrid(10);

    for (p of pgrid.panels) {
        renderCirclesInsideBox(p)
    }


    draw_border(clr = params.bgColor, sw = 50); //rn_utils.js
}

function renderCirclesInsideBox(box, circleProperties) {

    push();
    translate(box.x, box.y);
    boxAreaRatio = box.pw * box.ph / cnv.width / cnv.height;
    r = 10;
    noFill();
    stroke(random(palette2))
    strokeWeight(2)
    numCircles = 200 * boxAreaRatio
    for (i = 0; i < numCircles; i++) {
        cx = random(r, box.pw - r);
        cy = random(r, box.ph - r);
        circle(cx, cy, random(10, 20));
    }
    pop();

}








