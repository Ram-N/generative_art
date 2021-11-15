// A JS utility library to use with p5.js sketches. 
//Ram Narasimhan

// Updated: November 2021

//Functions in this library

/*

*/

function bubblesLayer(_box, numBubbles, palette) {
    for (let cir = 0; cir < numBubbles; cir++) {
        noFill();
        colr = random(palette);
        strokeWeight(5);
        stroke(colr[0], 20, 80)
        toss = random();
        if (toss > 0.5) {
            fill(colr[0], 20, 80)
            radius = random(10, 15);
        }
        if (toss <= 0.5) {
            strokeWeight(3);
            stroke(colr)
            fill(colr)
            radius = random(15, 30);
        }
        cx = random(_box.x + radius, _box.x + _box.w - radius);
        cy = random(_box.y + radius, _box.y + _box.h - radius);
        circle(cx, cy, radius);

    }

}

function coloredPanelBackground() {
    //Custom Tiling
    colSplit = Array(10).fill(1)
    rowSplit = Array(10).fill(1)

    pgrid = new PanelGrid(cnv, colSplit, rowSplit, margin = 0) //rn_grids
    pgrid.renderPanelGrid(1);
    pMargin = 0;
    for (p of pgrid.panels) {
        _box.x = p.x + pMargin;
        _box.y = p.y + pMargin;
        _box.w = p.w - 2 * pMargin;
        _box.h = p.h - 2 * pMargin;
        fill(random(random(palList)))
        rect(p.x, p.y, p.w, p.h)
        fill(random(random(palList)))
        triangle(p.x, p.y, p.x, p.y + p.h, p.x + p.w, p.y + p.h)
    }

}