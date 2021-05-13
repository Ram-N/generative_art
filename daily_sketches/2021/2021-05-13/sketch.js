// Daily Sketch for 2021-05-13
// Ram Narasimhan.
/*

Keywords: Grid points, Shape-filling, shape shrinking


*/


let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}

const params = {
    xStep: 25,
    yStep: 25,
}


function setup() {
    createCanvas(960, 960);
    background("#d3d3d3");
    //background("#0F0F0F");
    fill("#0f0f0f");
    draw_border(20); //rn_utils.js
    palette = cappuccino; //colors.js
    palette = rainbowDash; //colors.js
    palette = replicate(palette, 100)
    palette2 = take5; //colors.js
    palette2 = replicate(palette2, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);
    grid = new Grid(params.xStep, params.yStep, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin);

    for (s of grid.segments) {
        attachNeighboringSegments(s, grid)
    }


}

function draw() {
    //background(255);

    for (var row = 0; row < grid.rows; row += 1) {
        for (col = 0; col < grid.cols; col += 1) {
            draw_lines(row, col);
        }
    }

    for (g of grid.segments) {
        if (random() < 0.4) {
            g.display(random(palette), sw = 1 + int(random(10)))
        }
    }
    stroke(255)
    strokeWeight(3)
    for (g of grid.points) {
        if ((!g.count) && (g.col) && (g.row)) {
            if ((g.col != grid.cols) && (g.row != grid.rows)) {
                circle(g.x, g.y, 10)
            }
        }

    }

    draw_border(clr = 20, sw = 20); //rn_utils.js
    noLoop();

    //        this.neighbors = grid.getNeighboringSegments(this)


}


function draw_lines(row, col) {
    gpt = grid.getGPt(row, col);
    xStep = grid.xStep;
    yStep = grid.yStep;
    x = gpt.x;
    y = gpt.y;
    if (row % 2) {
        strokeWeight(random([3]));
        stroke(palette2[3]);
    } else {
        strokeWeight(random([4]));
        stroke(palette[4]);
    }

    let _dir = random(4)
    if (_dir < 1) {
        line(x, y, x + xStep, y + yStep); // \
        grid.getGPt(row + 1, col + 1).count++;
    }
    else if (_dir < 2) {
        line(x, y + yStep, x + xStep, y); // /
        grid.getGPt(row + 1, col).count++;
    }

}
