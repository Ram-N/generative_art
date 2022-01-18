// Daily Sketch for 2022-01-16
// Ram Narasimhan.


/*
Color gradients gone wrong...
*/

let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}


const params = {
    xStep: 20,
    yStep: 20,
    bgColor: "#d3d3d3",
    blkColor: "#0f0f0f",
}



function setup() {

    createCanvas(960, 960);
    background(params.blkColor);
    colorMode(HSB);

    palette = random(RGBPalList);
    palette = ['red', 'white', 'orange']
    palette = replicate(palette, 100)
    palette2 = random(palList)
    palette2 = replicate(palette2, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width


    noFill();


    rowCount = 8
    pg = createSquareGrid(rowCount, margin = 10)

    pnl = pg.panels[0] //just a sample panel for its dimensions
    clen = pnl.h / 2
    cw = pnl.h / 4;
    ch = clen;

    print(pnl.w, pnl.h)
    for (rep = 0; rep < 25; rep++) {
        x = width - random([1, 2, 3, 4, 5]) * clen;
        y = height - random([1, 2, 3]) * ch;

        cubecolor = { face: palette[0], top: palette[1], side: palette[2] }
        cuboid(x, y, clen, cw, ch, cubecolor, _perspective = 'Above', view = 'L')
    }


    for (rep = 0; rep < 15; rep++) {
        startCol = int(random(4))
        startRow = int(random(8))
        start = pg.getRandomPtfromCR(startCol, startRow);
        end = pg.getRandomPtfromCR(4 + startCol, 7 - startRow);
        curve1 = new SquigglyLine(start, end, 200)

        jDist = int(random(10, 300))
        start.x += jitter(-jDist, jDist)
        start.y += jitter(-jDist, jDist)
        end.x += jitter(-jDist, jDist)
        end.y += jitter(-jDist, jDist)
        curve2 = new SquigglyLine(start, end, 200)
        connectCurves(curve1, curve2);


    }


    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}


function connectCurves(curve1, curve2) {
    stroke(random(palette.slice(0, 3)))
    strokeWeight(random([1, 2]));
    for (l = 0; l < curve2.pts.length; l++) {
        c1 = curve1.pts[l]
        c2 = curve2.pts[l]
        line(c1.x, c1.y, c2.x, c2.y)
    }

}


// Adapted from: https://stackoverflow.com/a/69389801/918215
class SquigglyLine { // Creates a squiggly line between two points

    constructor(start, end, numPoints = 100) {
        this.start = start;
        this.end = end;
        this.numPoints = numPoints;
        this.pts = this.createSquigglyLineBetween2Points(start, end, this.numPoints);
    }

    display() {
        beginShape();
        for (let pt of this.pts) {
            curveVertex(pt.x, pt.y)
        }
        endShape();
    }


    createSquigglyLineBetween2Points(start, end, numPoints) {

        // The level of detail in the line in number of pixels between each point.
        const pixelsPerSegment = 3;
        const noiseScale = 160;
        const noiseFrequency = 0.01;

        let lineLength = start.dist(end);

        // Determine the number of segments, and make sure there is at least one.
        let segments = max(1, round(lineLength / pixelsPerSegment));
        // Determine the number of points, which is the number of segments + 1
        let points = numPoints;

        // We need to know the angle of the line so that we can determine the x
        // and y position for each point along the line, and when we offset based
        // on noise we do so perpendicular to the line.
        let angle = atan2(end.y - start.y, end.x - start.x);

        var pts = [];


        // for each point that is neither the start nor end point
        for (let i = 1; i < points - 1; i++) {
            // let x = start.x + xInterval * i;
            // let y = start.y + yInterval * i;

            // determine the x and y positions along the straight line from start to end
            let x = lerp(start.x, end.x, i / points);
            let y = lerp(start.y, end.y, i / points);

            // calculate the offset distance using noice
            let offset =
                // The bigger this number is the greater the range of offsets will be
                noiseScale *
                (noise(
                    // The bigger the value of noiseFrequency, the more erretically
                    // the offset will change from point to point.
                    i * pixelsPerSegment * noiseFrequency
                ) - 0.5);

            // Translate offset into x and y components based on angle - 90°
            // (or in this case, PI / 2 radians, which is equivalent)
            let xOffset = offset * cos(angle - PI / 2);
            let yOffset = offset * sin(angle - PI / 2);
            pts.push(createVector(x + xOffset, y + yOffset));

        }

        //pts.push(createVector(end.x, end.y));
        return pts;

    }

}
