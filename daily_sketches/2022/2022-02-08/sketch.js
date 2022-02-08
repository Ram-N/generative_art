// Daily Sketch for 2022-02-08
// Ram Narasimhan.


/*
Genuary Retrospective
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



const imagesNames = ["2022/2022-01-31/images/keep_2022-02-01-15-09-28.png",
    "2022/2022-01-30/images/keep_2022-01-31-22-38-20.png",
    "2022/2022-01-29/images/keep_2022-01-30-09-29-02.png",
    "2022/2022-01-28/images/keep_2022-01-29-10-07-19.png",
    "2022/2022-01-27/images/keep_2022-01-28-11-19-59.png",
    "2022/2022-01-26/images/keep_2022-01-27-09-25-31.png",
    "2022/2022-01-25/images/keep_2022-01-26-12-01-31.png",
    "2022/2022-01-24/images/keep_2022-01-25-09-58-07.png",
    "2022/2022-01-23/images/keep_2022-01-23-23-38-26.png",
    "2022/2022-01-22/images/keep_2022-01-22-23-29-38.png",
    "2022/2022-01-21/images/keep_2022-01-21-23-19-29.png",
    "2022/2022-01-20/images/keep_2022-01-20-22-51-20.png",
    "2022/2022-01-19/images/keep_2022-01-20-13-48-42.png",
    "2022/2022-01-18/images/keep0.gif",
    "2022/2022-01-17/images/keep_2022-01-17-23-03-40.png",
    "2022/2022-01-16/images/keep_2022-01-17-11-02-48.png",
    "2022/2022-01-15/images/keep0.gif",
    "2022/2022-01-14/images/keep_2022-01-14-21-57-32.png",
    "2022/2022-01-13/images/keep1.gif",
    "2022/2022-01-12/images/keep_2022-01-12-22-57-39.png",
    "2022/2022-01-11/images/keep_2022_01_11.JPG",
    "2022/2022-01-10/images/keep_2022-01-10-21-47-48.png",
    "2022/2022-01-09/images/keep_2022-01-10-11-36-52.png",
    "2022/2022-01-08/images/keep_2022-01-08-22-23-06.png",
    "2022/2022-01-07/images/keep_2022-01-07-21-25-38.png",
    "2022/2022-01-06/images/keep_2022-01-07-15-29-12.png",
    "2022/2022-01-05/images/keep_2022-01-05-17-23-06.png",
    "2022/2022-01-04/images/keep_2022-01-04-22-14-11.png",
    "2022/2022-01-03/images/keep_2022-01-03-23-25-14.png",
    "2022/2022-01-02/images/keep_2022-01-02-22-35-49.png",
    "2022/2022-01-01/images/keep_2022-01-01-15-40-32.png",]

let img = [];
function preload() {
    for (i = 0; i < imagesNames.length; i++) {
        img[i] = loadImage("../../" + imagesNames[i]);
    }
}



function setup() {
    base = 180
    createCanvas(7 * base, 6 * base);
    //colorMode(HSB);
    background(params.blkColor);

    palette = random(RGBPalList);
    palette = replicate(palette, 100)
    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width

    pgrid = createMonthGrid()

    pgrid.display(colr = 128)
    i = -1;
    numDaysInMonth = 31 //January
    monthFirst = 6 //Saturday start
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 6; row++) {
            i++;
            push();
            pos = col + row * 7;
            dayCount = numDaysInMonth - 1 - (pos - monthFirst) // 0...29, 30, 31
            print(pos)
            if ((pos >= monthFirst) && (pos < 31 + monthFirst)) {
                p = pgrid.panels[i]
                translate(p.x, p.y)
                //stroke('black')
                //text(str(pos), 10, 10)
                ih = p.h;
                y = 0;
                // two hacks to account for non-standard image sizes
                if (pos == 18) { ih = p.h / 5; y = p.h / 2 }
                if (pos == 23) { ih = p.h * 4 / 7; y = p.h / 2 - ih / 2 }
                image(img[dayCount], 0, y, p.w, ih)
            }
            pop();
        }
    }

    textSize(100)
    fill('white')
    text('GENUARY 2022', 210, 150)

    draw_border(clr = params.bgColor, sw = 50); //rn_utils.js
}
