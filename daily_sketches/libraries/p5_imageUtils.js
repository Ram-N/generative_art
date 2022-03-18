// A JS utility library to use with p5.js sketches. 
//Ram Narasimhan

// Updated: December 2021

//Functions in this library
/*
imageIndex(img, x, y)
getPatchAvgRGBA
paintPatch
*/


//BEGIN DITHERING CODE
//Coding Train: 
// https://thecodingtrain.com/CodingChallenges/090-floyd-steinberg-dithering.html
// Index is the pixel index at position (x,y) in the image
function imageIndex(img, x, y) {
    return 4 * (x + y * img.width); //integer
}

function getColorAtindex(img, x, y) {
    let idx = imageIndex(img, x, y);
    let pix = img.pixels;
    let red = pix[idx];
    let green = pix[idx + 1];
    let blue = pix[idx + 2];
    let alpha = pix[idx + 3];
    return color(red, green, blue, alpha);
}

function setColorAtIndex(img, x, y, clr) {
    let idx = imageIndex(img, x, y);

    let pix = img.pixels;
    pix[idx] = red(clr);
    pix[idx + 1] = green(clr);
    pix[idx + 2] = blue(clr);
    pix[idx + 3] = alpha(clr);
}

// Finds the closest bucket for a given value
// The step 0 is always included, so the number of steps
// is actually steps + 1
function closestDiscreteValue(value, steps, max) {
    return round(steps * value / max) * floor(max / steps);
}

function getNewcolor(existingClr, rules) {
    let oldR = red(existingClr);
    let oldG = green(existingClr);
    let oldB = blue(existingClr);
    steps = rules.steps;
    // convert pixel to its closest color from a subset
    let newR = closestDiscreteValue(oldR, steps, 255);
    let newG = closestDiscreteValue(oldG, steps, 255);
    let newB = closestDiscreteValue(oldB, steps, 255);
    if (rules.noRed) { newR = 0; }
    if (rules.noBlue) { newB = 0; }
    if (rules.noGreen) { newG = 0; }
    return color(newR, newG, newB);

}


function makeDithered(img, rules) {
    img.loadPixels();

    yStep = 10;
    for (let y = 0; y < img.height; y += yStep) {
        for (let x = 0; x < img.width; x += yStep) {
            let existingClr = getColorAtindex(img, x, y);

            let newClr = getNewcolor(existingClr, rules);
            setColorAtIndex(img, x, y, newClr);
            fill(newClr)
            rect(x, y, yStep, yStep);

            //but we are not done.
            //take residual error and "push" it to 4 neighboring pixels 
            //to the right and below the current xy pixel
            let errR = red(existingClr) - red(newClr);
            let errG = green(existingClr) - green(newClr);
            let errB = blue(existingClr) - blue(newClr);

            distributeError(img, x, y, errR, errG, errB);
        }
    }

    img.updatePixels();
}

//7-3-5-1
function distributeError(img, x, y, errR, errG, errB) {
    //Note that the "error" can only be pused to pixels that have not been set as yet.
    //So North, and West options are unavailable, since we process left to right
    addError(img, 7 / 16.0, x + 1, y, errR, errG, errB); //East
    addError(img, 3 / 16.0, x - 1, y + 1, errR, errG, errB); //South West
    addError(img, 5 / 16.0, x, y + 1, errR, errG, errB); //South
    addError(img, 1 / 16.0, x + 1, y + 1, errR, errG, errB); //South East
}

function addError(img, factor, x, y, errR, errG, errB) {
    if (x < 0 || x >= img.width || y < 0 || y >= img.height) return;
    let clr = getColorAtindex(img, x, y);
    let r = red(clr);
    let g = green(clr);
    let b = blue(clr);
    clr.setRed(r + errR * factor);
    clr.setGreen(g + errG * factor);
    clr.setBlue(b + errB * factor);

    setColorAtIndex(img, x, y, clr);
}

// END OF FLOYD-STEINBERG DITHERING FUNCTIONS


//Based on: https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB
//code from: https://stackoverflow.com/questions/8022885/rgb-to-hsv-color-in-javascript/54070620#54070620
// Kamil Kiełczewski
// input: r,g,b in [0,1], out: h in [0,360) and s,v in [0,1]
function rgb2hsv(r, g, b) {
    let v = Math.max(r, g, b), c = v - Math.min(r, g, b);
    let h = c && ((v == r) ? (g - b) / c : ((v == g) ? 2 + (b - r) / c : 4 + (r - g) / c));
    return [60 * (h < 0 ? h + 6 : h), v && c / v, v];
}

// in: r,g,b in [0,1], out: h in [0,360) and s,l in [0,100]
function rgb2hsl(r, g, b) {
    let v = Math.max(r, g, b), c = v - Math.min(r, g, b), f = (1 - Math.abs(v + v - c - 1));
    let h = c && ((v == r) ? (g - b) / c : ((v == g) ? 2 + (b - r) / c : 4 + (r - g) / c));
    return [60 * (h < 0 ? h + 6 : h), (f ? c / f : 0), (v + v - c) / 2];
}



//A patch is a rectangle of image
//Returns a dictionary of rgba for the patch in question
function getPatchAvgRGBA(patch) {

    patch.loadPixels();
    rgb = { r: 0, g: 0, b: 0, a: 0 }

    wR = 0; wG = 0; wB = 0;
    wTotal = 0;
    for (var y = 0; y < patch.height; y++) {
        for (var x = 0; x < patch.width; x++) {
            var index = (x + y * patch.width) * 4;
            var r = patch.pixels[index + 0];
            var g = patch.pixels[index + 1];
            var b = patch.pixels[index + 2];
            var a = patch.pixels[index + 3];

            const w = a / 255; // w is in the interval [0, 1]
            wR += r * w;
            wG += g * w;
            wB += b * w;
            wTotal += w;
        }
    }


    numP = patch.height * patch.width;
    rgb.r = wR / numP | 0;
    rgb.g = wG / numP | 0;
    rgb.b = wB / numP | 0;
    rgb.a = wTotal / numP | 0;
    return rgb
}


// PATCH RENDERING FUNCTION
/*
A patch can be rendered in ONE TOUCH --> single value or stroke or shape for the whole patch
or in PATCH SWEEP. In a SWEEP, we need a stepsize for averaging stamps, and then paint each stamp.

Terminology: RenderStamp --> rgb is already single-value.

It may or may not use randomness.
StokeWeight
StrokeColor
Shape - rect, circle, Text, X, or line.

RGB or Black and White 
*/

function renderStamp(x, y, _directions) {

    _sw = 3
    bwFlag = 0;
    rectFlag = 0;
    circleFlag = 0;
    rgba = _directions['rgba']
    colr = color(rgba.r, rgba.g, rgba.b)

    push();

    rot_angle = 0;
    ss = _directions['stepSize'];
    ss5 = ss / 2;
    bSlash = false; fSlash = true;
    if (rgba.r > 196) { bSlash = true; fSlash = false }


    //if (random() > 0.5) { bSlash = true; fSlash = false }

    if ('strokeWeight' in _directions) {
        _sw = _directions['strokeWeight']
    }
    if ('rotateRandom' in _directions) {
        if (_directions['rotateRandom']) {
            rot_angle = random(0, TAU);
        }
    }
    if ('colorMode' in _directions) {
        if (_directions['colorMode'] == 'BW') {
            bwFlag = 1;
            //Y = 0.299R + 0.587G + 0.114B - YUV model
            colr = rgba.r * 0.299 + rgba.g * 0.587 + rgba.b * 0.114
            _sw = int(1 + (Math.abs(colr - 128) / 20))
            if (colr > 128) { bSlash = true; fSlash = false }
            if (colr <= 128) { bSlash = false; fSlash = true }
        }
        if (_directions['colorMode'] == 'HSB') {
            colorMode(HSB)
        }
        if (_directions['colorMode'] == 'RGB_Max') {
            if ((rgba.r > rgba.g) && (rgba.r > rgba.g)) {
                colr = color(rgba.r, 0, 0)
            } else if (rgba.g > rgba.b) {
                colr = color(0, rgba.g, 0)
            } else {
                colr = color(0, 0, rgba.b)
            }

        }
    }

    if ('shape' in _directions) {
        if (_directions['shape'] == 'rect') { rectFlag = 1 }
        if (_directions['shape'] == 'circle') { circleFlag = 1 }
        fSlash = false;
        bSlash = false;
    }

    translate(x, y);
    rotate(rot_angle);
    strokeWeight(_sw);
    stroke(colr);
    fill(colr);


    ts = map(rgba.r, 128, 255, 5, 20)
    textSize(ts)
    //Line
    if (fSlash) {
        //line(-ss5, -ss5, ss5, ss5)
        text('1', 0, 0)
    }
    if (bSlash) {
        //line(ss5, -ss5, -ss5, ss5)
        text('0', 0, 0)
    }

    if (rectFlag) {
        rect(0, 0, ss, ss);
    }
    if (circleFlag) {
        circle(0, 0, ss);
    }

    pop();
}


function paintPatch(posX, posY, rgb, stepSize) {

    push();
    translate(posX, posY);

    //ac = getPatchAvgRGBA(c)

    pc = color(rgb.r, rgb.g, rgb.b)
    stroke(pc);
    fill(pc);

    odds = random();
    if (odds < 0.5) {
        rect(0, 0, stepSize, stepSize);
    } else {
        ellipse(0, 0, stepSize, stepSize);
    }

    pop();
}



// _directions = {'red':128, 'blue:200', 'green':220}
// 128 is the red-cutoff value
function imgHeatMap(img, _directions) {
    img.loadPixels();

    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
            let clr = getColorAtindex(img, x, y);
            let oldR = red(clr);
            let oldG = green(clr);
            let oldB = blue(clr);
            let oldAlpha = alpha(clr);

            //convert pixel as directed
            let newClr = color(0, 0, 0);
            if ('red' in _directions) {
                if (oldR > _directions['red']) {
                    newClr = color(oldR, 0, 0);
                }
            }
            if ('blue' in _directions) {
                if (oldB > _directions['blue']) {
                    newClr = color(0, 0, oldB);
                }
            }
            if ('green' in _directions) {
                if (oldG > _directions['green']) {
                    newClr = color(0, oldG, 0);
                }
            }
            if ('brightness' in _directions) {
                if (oldAlpha > _directions['brightness']) {
                    newClr = color(oldAlpha);
                }
            }
            setColorAtIndex(img, x, y, newClr);
        }
    }

    img.updatePixels();
}
