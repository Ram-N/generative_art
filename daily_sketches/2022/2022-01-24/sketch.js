// Daily Sketch for 2022-01-24
// Ram Narasimhan.


//All the NY State Lotto winning numbers from 2003 to 2016
//Frequency of occurrence...

posFreq = [{
    1: 209, 2: 198, 3: 173, 4: 168, 5: 149, 6: 125, 7: 127, 8: 138, 9: 91, 10: 81, 11: 80, 12: 73, 13: 58, 14: 53,
    15: 66, 16: 43, 17: 46, 18: 30, 19: 38, 20: 27, 21: 23, 22: 20, 23: 25, 24: 12, 25: 16, 26: 3, 27: 12, 28: 10, 29: 6, 30: 6, 31: 8, 32: 1, 33: 3, 34: 2, 35: 0,
    36: 0, 37: 0, 38: 2, 39: 1, 40: 1, 41: 1, 42: 0, 43: 0, 44: 0, 45: 0, 46: 0, 47: 0, 48: 0, 49: 0, 50: 0, 51: 0, 52: 0, 53: 0, 54: 0, 55: 0, 56: 0, 57: 0, 58: 0, 59: 0
},
{
    1: 0, 2: 20, 3: 34, 4: 50, 5: 55, 6: 63, 7: 63, 8: 89, 9: 94, 10: 96, 11: 90, 12: 84, 13: 88, 14: 84, 15: 97, 16: 93, 17: 85, 18: 84, 19: 83, 20: 69, 21: 67,
    22: 63, 23: 61, 24: 65, 25: 55, 26: 51, 27: 50, 28: 38, 29: 37, 30: 33, 31: 33, 32: 25, 33: 20, 34: 13, 35: 13, 36: 18, 37: 12, 38: 7, 39: 9, 40: 6, 41: 5, 42: 6,
    43: 7, 44: 2, 45: 3, 46: 2, 47: 1, 48: 1, 49: 0, 50: 1, 51: 0, 52: 0, 53: 0, 54: 0, 55: 0, 56: 0, 57: 0, 58: 0, 59: 0
},
{
    1: 0, 2: 0, 3: 1, 4: 2, 5: 4, 6: 8, 7: 17, 8: 19, 9: 21, 10: 37, 11: 42, 12: 38, 13: 49, 14: 54, 15: 52, 16: 65, 17: 61, 18: 65, 19: 84, 20: 78, 21: 89,
    22: 74, 23: 64, 24: 68, 25: 85, 26: 70, 27: 86, 28: 71, 29: 76, 30: 76, 31: 79, 32: 73, 33: 52, 34: 54, 35: 57, 36: 53, 37: 43, 38: 44, 39: 33, 40: 36, 41: 32,
    42: 20, 43: 17, 44: 15, 45: 12, 46: 16, 47: 8, 48: 4, 49: 6, 50: 5, 51: 6, 52: 4, 53: 0, 54: 0, 55: 0, 56: 0, 57: 0, 58: 0, 59: 0
},
{
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 1, 8: 1, 9: 4, 10: 1, 11: 6, 12: 12, 13: 16, 14: 12, 15: 16, 16: 21, 17: 29, 18: 20, 19: 17, 20: 38, 21: 36, 22: 40,
    23: 49, 24: 48, 25: 56, 26: 60, 27: 60, 28: 68, 29: 64, 30: 81, 31: 82, 32: 61, 33: 74, 34: 76, 35: 83, 36: 71, 37: 82, 38: 70, 39: 69, 40: 80, 41: 63, 42: 73,
    43: 66, 44: 69, 45: 59, 46: 40, 47: 42, 48: 41, 49: 37, 50: 35, 51: 25, 52: 24, 53: 20, 54: 17, 55: 6, 56: 2, 57: 2, 58: 0, 59: 0
},
{
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 1, 13: 0, 14: 2, 15: 4, 16: 6, 17: 2, 18: 3, 19: 4, 20: 5, 21: 7, 22: 8, 23: 21,
    24: 15, 25: 21, 26: 19, 27: 27, 28: 22, 29: 18, 30: 34, 31: 43, 32: 33, 33: 36, 34: 52, 35: 50, 36: 68, 37: 56, 38: 54, 39: 66, 40: 80, 41: 77, 42: 83,
    43: 99, 44: 86, 45: 82, 46: 83, 47: 85, 48: 86, 49: 92, 50: 106, 51: 90, 52: 93, 53: 79, 54: 73, 55: 68, 56: 40, 57: 30, 58: 16, 59: 0
},
{
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 1, 21: 0, 22: 2, 23: 0,
    24: 2, 25: 3, 26: 2, 27: 5, 28: 7, 29: 5, 30: 0, 31: 7, 32: 6, 33: 6, 34: 12, 35: 15, 36: 14, 37: 17, 38: 22, 39: 19, 40: 17, 41: 35, 42: 30, 43: 40, 44: 55, 45: 43, 46: 62, 47: 56, 48: 71, 49: 86, 50: 91, 51: 69, 52: 104, 53: 161, 54: 142, 55: 166, 56: 156, 57: 204, 58: 184, 59: 208
}]

const winDict = {
    0: 0,
    1: 209,
    2: 218,
    3: 208,
    4: 220,
    5: 208,
    6: 196,
    7: 208,
    8: 247,
    9: 210, 10: 215, 11: 218, 12: 208,
    13: 211,
    14: 205, 15: 235,
    16: 228,
    17: 223, 18: 202,
    19: 226,
    20: 218,
    21: 222,
    22: 207,
    23: 220,
    24: 210,
    25: 236,
    26: 205,
    27: 240,
    28: 216,
    29: 206,
    30: 230, 31: 252,
    32: 199,
    33: 191,
    34: 209, 35: 218, 36: 224, 37: 210,
    38: 199, 39: 197,
    40: 220, 41: 213,
    42: 212, 43: 229,
    44: 227, 45: 199,
    46: 203, 47: 192,
    48: 203, 49: 221,
    50: 238, 51: 190,
    52: 225, 53: 260,
    54: 232, 55: 240,
    56: 198, 57: 236,
    58: 200, 59: 208
}

let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}

const params = {
    tw: 80, // triangle width within the Hexgrid
    xStep: 60,
    yStep: 60,
    bgColor: [210, 50, 80],
    blkColor: [0, 0, 0],
}

function setup() {

    createCanvas(960, 960);
    colorMode(HSB);
    background(params.blkColor);
    print(params.bgColor)
    palette2 = HrainbowDash; //colors.js
    //palette2 = Hcappuccino; //colors.js
    palette2 = random(palList)
    palette = replicate(palette, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(params.blkColor);
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);

    hg = new HexGrid(cnv.width, cnv.height, cnv.xMargin, cnv.yMargin, params.tw);

    stroke(255)
    //renderGridPoints(gridPts) // grid.js
    print(hg.points.length) // columns. each one is a column of points

    //fill("#1167b1")
    stroke(0);
    strokeWeight(5)
    //base_r = cnv.width / (25)
    base_r = params.tw

    print(hg.points.length, 'numCOls')

    minMax = [];
    //calc max and min for each position
    for (pos of [0, 1, 2, 3, 4, 5]) {
        dic = posFreq[pos]
        _min = 1000; _max = 0;
        for (const [key, value] of Object.entries(dic)) {
            if (value > _max) {
                _max = value
            }
            if (value < _max) {
                _min = value
            }
        }
        minMax.push({ min: _min, max: _max })
    }

    print(minMax)

    fill('white')
    textSize(30);
    co = hg.points[2]
    for (rNum of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
        gpt = co[rNum + 2]
        text(str(rNum), gpt.x, gpt.y)
    }

    for (cNum of [0, 1, 2, 3, 4, 5]) {
        gpt = hg.points[4 + cNum][1]
        yAdj = (cNum % 2) * params.tw / 2 - 5 // move odd columns down a notch
        text(str(cNum * 10), gpt.x - 20, gpt.y + yAdj)
    }
    offset = 50
    for (colNum of [0, 1, 2, 3, 4, 5,]) {
        co = hg.points[colNum + 4]
        print('numrows', co.length)
        for (rNum of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
            gpt = co[rNum + 2]
            push();
            translate(gpt.x, gpt.y) // go to grid point center
            num = rNum + (colNum * 10)
            if (num) {
                rad = base_r * 0.5
                hx = new Polygon(0, 0, 6, rad, random(palette));

                //first render the slices of the hexagon
                for (pos of [0, 1, 2, 3, 4, 5]) { //draw the 6 slices of hexagon
                    freq = posFreq[pos][num]
                    _hue = (freq + offset)
                    _min = minMax[0].min
                    _max = minMax[0].max
                    _hue = map(freq, _min, _max, 0, 255)
                    // sat = map(freq, _min, _max, 0, 100)
                    // bri = map(freq, _min, _max, 60, 100);
                    sat = 100;
                    bri = 100;
                    //print('fract', freq / _max)
                    c = color([_hue, sat, bri])
                    fill(c);
                    hx.renderSlice([pos, (pos + 1) % 6])
                }

                //overall color from the hex
                push();
                strokeWeight(9);;
                noFill();
                freq = map(winDict[num], 0, 260, 0, 255);
                stroke([freq, 100, 100])
                hx.render();
                pop();

                strokeWeight(3);

            }
            pop();
        }
    }

    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}

//did not use since it didn't turn out looking good
function renderSlice(vSet, frac, hx) {
    push();
    translate(hx.posX, hx.posY);
    rotate(hx.rotAngle);
    beginShape();
    vertex(0, 0)
    for (var v of vSet) {
        vertex(hx.vertices[v].x * frac, hx.vertices[v].y * frac);
    }
    endShape(CLOSE);
    pop();
}

