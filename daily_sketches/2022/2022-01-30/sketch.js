// Daily Sketch for 2022-01-30
// Ram Narasimhan.

/*
    Desc: Organic shapes with Rectangles
*/

let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}


const params = {
    tw: 40, // triangle width of the hexg,
    xStep: 20,
    yStep: 20,
    bgColor: "#d3d3d3",
    blkColor: "#0f0f0f",
}



function setup() {
    createCanvas(960, 960);
    //colorMode(HSB);
    background(params.blkColor);

    palette = random(RGBPalList);
    palette = replicate(palette, 100)
    palette2 = random(RGBPalList);
    palette2 = replicate(palette2, 100)
    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width


    baseImg = squigglesArray();
    baseImg.loadPixels(); //keep in memory in the offscreen buffer
    image(baseImg, 0, 0);

    draw_border(clr = params.bgColor, sw = 50); //rn_utils.js
}


function connectCurves(pg, curve1, curve2) {
    pg.push()
    pg.strokeWeight(random([1, 2, 4, 7]));
    pg.fill(random(palette2));
    pg.stroke(random(palette.slice(0, 5)));
    //pg.rotate(random([0, 1, 2, 3]) * PI / 4)
    for (l = 0; l < curve2.pts.length; l++) {
        c1 = curve1.pts[l]
        c2 = curve2.pts[l]
        d = dist(c1.x, c1.y, c2.x, c2.y)
        theta = atan((c2.y - c1.y) / (c2.x - c1.y))
        pg.push()
        //print(degrees(theta))
        //pg.rotate(theta)
        pg.rect(c1.x - 4, c1.y, 8, d)
        pg.pop()
        //pg.stroke(random(palette))
        //pg.line(c1.x, c1.y, c2.x, c2.y)
    }
    pg.pop()
    return pg
}



function squigglesArray() {

    pg = createGraphics(width, height);
    pg.background(params.blkColor);

    numStreaks = 10;
    for (let index = 0; index < numStreaks; index++) {
        push();
        ySpan = height / numStreaks;
        start = createVector(0, random(0, ySpan) + ySpan * index);
        end = createVector(width, random(0, ySpan) + ySpan * index);

        numSplits = random([20, 30, 40, 70, 100])
        curve1 = new SquigglyLine(start, end, numSplits) //p5_styling
        jDist = 500;
        start.x += jitter(-jDist, jDist)
        start.y += jitter(-jDist, jDist)
        end.x += jitter(-jDist, jDist)
        end.y += jitter(-jDist, jDist)
        curve2 = new SquigglyLine(start, end, numSplits);
        connectCurves(pg, curve1, curve2);
        pop();
    }

    return pg
}