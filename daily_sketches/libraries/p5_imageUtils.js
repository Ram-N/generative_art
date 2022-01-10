// A JS utility library to use with p5.js sketches. 
//Ram Narasimhan

// Updated: December 2021

//Functions in this library
/*
imageIndex(img, x, y)
getAvgPatchColor
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

function makeDithered(img, steps) {
    img.loadPixels();

    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
            let clr = getColorAtindex(img, x, y);
            let oldR = red(clr);
            let oldG = green(clr);
            let oldB = blue(clr);

            //convert pixel to its closest color from a subset
            let newR = closestDiscreteValue(oldR, steps, 255);
            let newG = closestDiscreteValue(oldG, steps, 255);
            let newB = closestDiscreteValue(oldB, steps, 255);
            let newClr = color(newR, newG, newB);
            setColorAtIndex(img, x, y, newClr);

            //but we are not done.
            //take residual error and "push" it to 4 neighboring pixels 
            //to the right and below the current xy pixel
            let errR = oldR - newR;
            let errG = oldG - newG;
            let errB = oldB - newB;

            distributeError(img, x, y, errR, errG, errB);
        }
    }

    img.updatePixels();
}

//7-3-5-1
function distributeError(img, x, y, errR, errG, errB) {
    addError(img, 7 / 16.0, x + 1, y, errR, errG, errB);
    addError(img, 3 / 16.0, x - 1, y + 1, errR, errG, errB);
    addError(img, 5 / 16.0, x, y + 1, errR, errG, errB);
    addError(img, 1 / 16.0, x + 1, y + 1, errR, errG, errB);
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
function getAvgPatchColor(patch) {

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


function paintPatch(posX, posY, rgb, stepSize) {

    push();
    translate(posX, posY);

    //ac = getAvgPatchColor(c)

    pc = color(rgb.r, rgb.g, rgb.b)
    stroke(pc);
    odds = random();
    //fillProbability(0, pc);
    if ((stepSize == 20) && (odds < 0.3)) {
        fill(pc)
    } else {
        noFill();
    }
    if (odds < 0.3) {
        strokeWeight(stepSize / 8);
    } else {
        strokeWeight(stepSize / 6);
    }

    odds = random();
    // if (odds < 0.5) {
    //   rect(0, 0, stepSize, stepSize);
    // } else {
    ellipse(0, 0, stepSize, stepSize);
    // }

    pop();
}
