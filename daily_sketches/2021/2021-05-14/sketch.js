// Daily Sketch for 2021-05-14
// Ram Narasimhan.
/*

1. Clean up so that edges don't have any segments.
2. Have thick and thin segments..DONE
3. Thin segs are diagonal... DONE
4. Put circles only around Anchor points...
5. If a thick semgment has a "free" neighboring point, it swings there.
6. 10 swings per draw frame

7. Each Seg shd have 6 Neighbors, not 4 as currently implemented.

Keywords: Grid points, Lego shapes, segments


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
    bgColor: "#0f0f0f", //black
}


function setup() {
    createCanvas(960, 960);
    background(params.bgColor);
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

    initializeActiveSegments(grid)
    print(grid.segments.length, 'num segs')

}


function draw() {
    background(params.bgColor);

    // for (var row = 0; row < grid.rows; row += 1) {
    //     for (col = 0; col < grid.cols; col += 1) {
    //         draw_diagonal_segments(row, col);
    //     }
    // }

    displaySegments(grid, palette2[3], sw = 6)


    stroke(255);
    strokeWeight(3);
    for (g of grid.points) {
        if (g.active) {
            if ((g.col) && (g.row)) {
                if ((g.col != grid.cols) && (g.row != grid.rows)) {
                    circle(g.x, g.y, 10)
                }
            }
        }
    }

    updateActiveSegment(grid)
    draw_border(clr = 20, sw = 20); //rn_utils.js
    noLoop();
}

function updateActiveSegment(grid) {
    attempts = 0;
    done = 0;
    while ((!done) && attempts < 100) {
        attempts += 1
        rnd = int(random(grid.segments.length))
        se = grid.segments[rnd]
        if (se.active) {
            //find an inactive neighbor
            for (nseg of se.neighbors) {
                if (nseg && (!nseg.active)) {
                    nseg.active = 1
                    se.active = 0
                    done = 1
                    print('done')
                }
            }
        }
    }
    print('attempts', attempts)
}

function initializeActiveSegments(grid) {
    for (se of grid.segments) {
        if (random() < 0.4) {
            if (se.start) {
                se.start.active = 1
            }
            if (se.end) {
                se.end.active = 1
            }
            if ((se.start) && (se.end)) {
                se.active = 1
            }
        }
    }
}



function draw_diagonal_segments(row, col) {
    gpt = grid.getGPt(col, row);
    xStep = grid.xStep;
    yStep = grid.yStep;
    x = gpt.x;
    y = gpt.y;
    if (row % 2) {
        strokeWeight(random([3]));
    } else {
        strokeWeight(random([4]));
    }
    stroke(palette[4]);

    let _dir = random(4)
    if (_dir < 1) {
        line(x, y, x + xStep, y + yStep); // \
        gpt.active = 1
        grid.getGPt(col + 1, row + 1).active = 1;
    }
    else if (_dir < 2) {
        line(x, y + yStep, x + xStep, y); // /
        grid.getGPt(col, row + 1).active = 1;
        grid.getGPt(col + 1, row).active = 1;
    }

}
