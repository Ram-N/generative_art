// A JS utility library to use with p5.js sketches. 
//Ram Narasimhan

// Updated: October 2021

/*Functions in this library

Lines Related
    wobbly line
    curvedLine
    doubleLine
    fatLine
    fat-and-thin line (contained inside)
    gradientLine()

*/

//source: https://erraticgenerator.com/blog/gradient-lines-and-brushes-in-p5js/

// c1 is the start color
// c2 is the ending color
// sz is the size of the line/ellipse
function gradientLine(x1, y1, x2, y2, c1, c2, sz) {
    const d = dist(x1, y1, x2, y2)
    for (let i = 0; i < d; i++) {
        const step = map(i, 0, d, 0, 1)
        const x = lerp(x1, x2, step)
        const y = lerp(y1, y2, step)
        const c = lerpColor(c1, c2, step)
        fill(c)
        ellipse(x, y, sz, sz)
    }
}

