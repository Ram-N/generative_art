// Daily Sketch for 2022-01-22
// Ram Narasimhan.


/*
18 different colors
4000 circles
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

const wikiarticles = {
    English: 644,
    Cebuano: 611,
    Swedish: 272,
    German: 266,
    French: 239,
    Dutch: 208,
    Russian: 179,
    Spanish: 175,
    Italian: 174,
    EgyptianArabic: 154,
    Polish: 151,
    Japanese: 131,
    Vietnamese: 127,
    WarayWaray: 127,
    Chinese: 125,
    Arabic: 115,
    Ukrainian: 113,
    Portuguese: 108,
}

let imgs = [];
numImages = 1;
function preload() {
    for (let i = 0; i < numImages; i++) {
        imgs[i] = loadImage("assets/wiki.png");
    }
}

function setup() {
    createCanvas(960, 960);
    colorMode(HSB);
    imageMode(CENTER);
    background(params.blkColor);

    palette = random(RGBPalList);
    palette = replicate(palette, 100)
    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width

    let dotsize = 10
    let numDots = 20
    numRings = 21;
    circleCount = 0;

    push();
    translate(width / 2, height / 2)
    scale(0.8)
    image(imgs[0], 0, 0, 150, 150)
    for (let r = 0; r < numRings; r++) {
        rad = (r * 18) + 80
        numDots = 20 + 18 * r
        for (let c = 0; c < numDots; c++) {
            colr = getDotColor(circleCount);
            fill(colr)
            push();
            rotate(TAU / numDots * c)
            circle(rad, 0, dotsize)
            pop();
            circleCount++;
            if (circleCount >= 3919) {
                break
            }
        }
    }
    pop();

    print('Total', circleCount)

    renderLangNames(dotsize)




    draw_border(clr = params.bgColor, sw = 50); //rn_utils.js
}



const langColors = {
    English: "white",
    Cebuano: "salmon",
    Swedish: "#004B87",
    German: "gray",
    French: "#0055A4",
    Dutch: "orange",
    Russian: "red",
    Spanish: "#F1BF00",
    Italian: "#008C45",
    EgyptianArabic: "#77ab59",
    Polish: "darkred",
    Japanese: "#BC002D",
    Vietnamese: "gold",
    WarayWaray: "yellow",
    Chinese: "#FE0000",
    Arabic: "#007A3D",
    Ukrainian: "lightblue",
    Portuguese: "lightgreen",
}


function renderLangNames(dotsize) {
    let langs = Object.keys(langColors);
    textStyle(BOLD);
    y = height - 450;
    for (l of langs) {
        fill(langColors[l])
        y += 20
        text(l, 60, y)
    }

    fill('white')
    circle(85, y + 45, dotsize)
    text("       = 10, 000 articles", 70, y + 50)

}


//cNum is the index of the dot being rendered
function getDotColor(cNum) {
    cumul = 0;

    let langs = Object.keys(wikiarticles).reverse();

    for (lang of langs) {
        //    for (const [key, value] of Object.entries(wikiarticles)) {
        cumul += wikiarticles[lang];
        if (cumul >= cNum) {
            return langColors[lang]
        }
    }
}
