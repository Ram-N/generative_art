// Daily Sketch for 2021-04-21
// Ram Narasimhan.
/*

Original Code by Michael Lowe.
I am deconstructing it here to understand how this works...

Keywords: Isometric Tiling, Symmetry
*/

const generationSpeed = 100;

//Increase for better quality images but slower generation
const resolution = 3;

const palettes = [
    ['red', 'brown', 'black'],
    //    ["#605063", "#248f8d", "#c2e5ca"],
    // ["#FFBE40", "#AB3E5B", "#ECF081"],
    // ["#233d4d", "#fe7f2d", "#fcc736"],
    // ["#C8C8A9", "#83AF9B", "#F9CDAD"]
];

const occupied = [];

let colors, i, j, size, tw, th, r, noiseScale;

function setup() {
    createCanvas(min(windowWidth, windowHeight * 2), windowHeight);

    colors = random(palettes);
    size = random(random(8, 16), random(37, 50));
    size = 80;
    noiseScale = random(2e-3, 6e-3);
    if (random() < 0.15) noiseScale = 1;

    i = 1;
    j = 1;
    th = size / 2;
    tw = sqrt(3) / 2 * size;
    r = 2 * th / sqrt(3);

    background("#E8F2FC");
    pixelDensity(resolution);
    //noStroke();

    for (let col = 0; col < width / tw + 2; col++) {
        occupied[col] = [];
        for (let row = 0; row < height / th + 2; row++) {
            occupied[col][row] = false;
        }
    }
}

function draw() {

    const count = occupied.filter((value) => value).length;
    console.log(count);
    for (let iter = 0; iter < generationSpeed && j < occupied[0].length; iter++) {
        //    for (let iter = 0; iter < generationSpeed && j < 5; iter++) {
        print(iter, 'iter', i, j);
        if (!occupied[i][j]) {
            print("trying", i, j, 'not occupied')
            let neighbors = [{
                neighColumn: i,
                neighRow: j - 1,
                fillColor: colors[i % 2 == j % 2 ? 0 : 1],
            }, {
                neighColumn: i,
                neighRow: j + 1,
                fillColor: colors[i % 2 == j % 2 ? 1 : 0],
            }, {
                neighColumn: i % 2 == j % 2 ? i + 1 : i - 1,
                neighRow: j,
                fillColor: colors[2]
            }];
            print('3 neighs of', i, j, i, j - 1, i, j + 1, 'up or down', j)
            //flip a curlNoise coin to decide Horirontal or vertical tile
            let horizontalTile = curlNoise(i * tw * noiseScale, j * th * noiseScale) < 0.5;
            //horizontalTile = random() < 0.1;

            //This is where the color alignment occurs...
            if (horizontalTile) {
                print(i, j, 'is horiz tile')
                // seem to be reordering the 3 neighbors
                neighbors = [neighbors[2]].concat(shuffle([neighbors[0], neighbors[1]]));
            } else {
                neighbors = shuffle([neighbors[0], neighbors[1]]).concat([neighbors[2]])
            }

            for (let { neighColumn, neighRow, fillColor } of neighbors) {
                print('neighbor', neighColumn, neighRow)
                if (!occupied[neighColumn][neighRow]) {
                    fill(fillColor)
                    if (j == 4) {
                        fill(0, 0, 200);
                        if (i % 2) {
                            fill(0, 150, 200);
                        }
                    }
                    drawTriangle(i, j)
                    drawTriangle(neighColumn, neighRow)
                    print(i, j, neighColumn, neighRow, 'FILLED with the same color...', fillColor)
                    occupied[i][j] = true;
                    occupied[neighColumn][neighRow] = true;
                    break
                }
            }
        }
        i++;
        if (i >= occupied.length - 1) {
            i = 1;
            j++;
        }
    }
    if (frameCount >= 10) {
        print(frameCount, 'fcount')
        noLoop();
        print(occupied)
    }

}

function getTrianglePoints(i, j, scaleFactor = 1) {

    //subtract (1,1) from the coordinates so it starts off screen
    i -= 1;
    j -= 1;

    //whether it is a left-pointing or right-pointing triangle
    //if i,j are both ODD, or both EVEN, then point Left.
    const isPointingLeft = i % 2 == j % 2;
    let points = [];
    let center = { // center of the isometric grid triangle.
        //notice that left pointing triangles have to be offset by size/3
        x: i * tw + (isPointingLeft ? tw / 3 : 0),
        y: j * th
    }
    //fill(0, 255, 0);
    //print(center.x, center.y)
    //circle(center.x, center.y, 30)

    scaleFactor = isPointingLeft ? 0.4 : 0.8
    for (let angle = isPointingLeft ? TAU / 6 : 0; angle < TAU; angle += TAU / 3) {
        points.push({
            x: center.x + r * scaleFactor * cos(angle),
            y: center.y + r * scaleFactor * sin(angle)
        })
    }
    return points; //3 points
}

function drawTriangle(i, j) {
    const points = getTrianglePoints(i, j, 1.043);
    //points = getTrianglePoints(i, j, 0.8);

    strokeWeight(3)
    stroke(55, 55, 55)
    beginShape();
    for (let point of points) {
        vertex(point.x, point.y);
    }
    endShape();
}


/* Seems to produce an angle, between 0 to 360 degrees, which is a vector's heading.
    Divide it by TAU to convert to a fraction of TWO_PI.
*/
function curlNoise(x, y) {
    let eps = 10e-13;
    x += 123.243
    y += 234.123

    //Find rate of change in X direction
    let n1X = noise(x + eps, y, 0);
    let n2X = noise(x - eps, y, 0);

    //Average to find approximate derivative
    let a = (n1X - n2X) / (2 * eps);

    //Find rate of change in Y direction
    let n1Y = noise(x, y + eps, 0);
    let n2Y = noise(x, y - eps, 0);

    //Average to find approximate derivative
    let b = (n1Y - n2Y) / (2 * eps);

    let angle = createVector(a, -b).heading();
    if (angle < 0) angle += TAU;
    return angle / TAU;
}

function keyPressed() {

    if (key == " ") {
        noiseSeed(random(10e9));
        setup();
    }
    if (key == 'r') redraw();
}