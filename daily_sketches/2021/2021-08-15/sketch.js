// Daily Sketch for 2021-08-15
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
    colSplit = [1, 2, 4, 2, 1]
    rowSplit = [1, 2, 3, 2, 1]


    panels = new PanelGrid(cnv, colSplit, rowSplit)
    print(panels)
    panels.renderPanelGrid(10);
    draw_border(clr = params.bgColor, sw = 50); //rn_utils.js
}


class PanelGrid {
    /**
     * Create and Return a Panel object
     * @param: cnv
     * @param  {Integer} colVector
     * @param  {Integer} rowVector - fractions of how to split cnv.height
     **/
    constructor(cnv, colSplit, rowSplit) {
        this.panels = this.createPanels(cnv, colSplit, rowSplit);
    }


    createPanels(cnv, colSplit, rowSplit) {
        let panels = [];
        let cumulative_x = cnv.xMargin;

        let vec = this.makePanelVectors(colSplit, rowSplit);
        let colVector = vec.colVector;
        let rowVector = vec.rowVector;

        for (let px of colVector) {
            let pw = px * cnv.width
            let cumulative_y = cnv.yMargin;
            for (let py of rowVector) {
                let ph = py * cnv.height
                let x = cumulative_x;
                let y = cumulative_y;
                let panel = createVector(x, y);
                panel.pw = pw;
                panel.ph = ph;
                panels.push(panel)
                cumulative_y += ph
            }
            cumulative_x += pw
        }
        return panels
    }


    /* function takes in any vector, and returns fractions to help in splitting
    */
    makePanelVectors(colSplit, rowSplit) {
        let rv = [];
        let cv = [];

        var colSum = colSplit.reduce(function (a, b) { return a + b; }, 0);
        var rowSum = rowSplit.reduce(function (a, b) { return a + b; }, 0);
        if (colSum == 1) {
            cv = colSplit
        }
        if (colSum < 1) {
            cv = colSplit;
            cv.push(1 - colSum)
        }
        if (colSum > 1) {
            cv = colSplit.map(function (x) { return x / colSum });
        }

        if (rowSum == 1) {
            rv = rowSplit;
        }
        if (rowSum < 1) {
            rv = rowSplit;
            rv.push(1 - rowSum)
        }
        if (rowSum > 1) {
            rv = rowSplit.map(function (x) { return x / rowSum });
        }


        return ({
            colVector: cv,
            rowVector: rv
        })
    }


    getPanel(xloc, yloc) {
        // get the tile that any point belongs to
        let tx = int((xloc - cnv.xMargin) / this.tw)
        let ty = int((yloc - cnv.yMargin) / this.th)
        return ({ tx: tx, ty: ty })
    }

    renderPanelGrid(sw = 5) {
        // noFill();
        drawingContext.shadowOffsetX = 5;
        drawingContext.shadowOffsetY = -5;
        drawingContext.shadowBlur = 10;
        for (let p of this.panels) {
            let from = color(random(palette));
            let to = color(random(palette2));
            colorMode(HSB); // Try changing to HSB.
            let interB = lerpColor(from, to, 0.66);
            fill(interB)
            drawingContext.shadowColor = random(palette);
            rect(p.x, p.y, p.pw, p.ph)
            strokeWeight(sw);
            stroke(params.bgColor)
            rect(p.x, p.y, p.pw, p.ph)
        }

    }


}








