// Daily Sketch for 2022-01-27
// Ram Narasimhan.

let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}

const params = {
    tw: 80, // triangle width within the Hexgrid
    xStep: 5,
    yStep: 5,
    bgColor: [210, 50, 80],
    blkColor: [0, 0, 0],
}

function setup() {

    createCanvas(960, 960);
    background(params.blkColor);
    print(params.bgColor)
    palette = gen2
    palette = replicate(palette, 100)
    palette2 = random(palList)
    palette2 = replicate(palette2, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(params.blkColor);
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);


    baseImg = squigglesArray();
    baseImg.loadPixels(); //keep in memory in the offscreen buffer

    img2 = cubeArray(); //build a second image 
    //    img2 = maskImage(img2);
    img2.loadPixels(); //keep in memory in the offscreen buffer


    //overlay img2 on top of baseImage
    print(baseImg.pixels.length)
    // use the buffer as a guide for altering the image
    maskColor = 47;
    for (var i = 0; i < baseImg.pixels.length; i += 4) {
        // if buffer pixel red is not 255 overlay new image... 
        if ((img2.pixels[i] != maskColor) && (img2.pixels[i + 1] != maskColor) && (img2.pixels[i + 2] != maskColor)) {
            baseImg.pixels[i] = img2.pixels[i];
            baseImg.pixels[i + 1] = img2.pixels[i + 1];
            baseImg.pixels[i + 2] = img2.pixels[i + 2];
            baseImg.pixels[i + 3] = img2.pixels[i + 3];
        }
    }
    baseImg.updatePixels();
    image(baseImg, 0, 0);

    //image(img2, 0, 0); Ended up using just img2 for final image in GENuary2022

    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}


function connectCurves(pg, curve1, curve2) {
    pg.push()
    pg.stroke(random(palette.slice(0, 5)));
    pg.strokeWeight(5);
    for (l = 0; l < curve2.pts.length; l++) {
        c1 = curve1.pts[l]
        c2 = curve2.pts[l]
        pg.line(c1.x, c1.y, c2.x, c2.y)
    }
    pg.pop()
    return pg
}



function maskImage(pg) {

    pg.fill(47, 47, 47)
    pg.push();
    pg.noStroke();
    pg.beginShape();
    pg.vertex(0, 0)
    pg.vertex(pg.width, 0);
    pg.vertex(pg.width, 200);

    for (let index = 10; index > 0; index--) {
        x = width / 10 * index;
        y = 400 - (index * 20) + jitter(-20, 30);
        pg.vertex(x, y);
    }
    pg.vertex(0, 400);
    pg.endShape(CLOSE);
    pg.pop();

    return pg

}


function squigglesArray() {

    pg = createGraphics(width, height);
    pg.background(palette[1]);

    for (let index = 0; index < 20; index++) {
        push();
        start = createVector(random(0, 200), random(0, 500));
        end = createVector(width - random(0, 200), random(0, 500));
        curve1 = new SquigglyLine(start, end, 50) //p5_styling
        jDist = int(random(10, 100))
        start.x += jitter(-jDist, jDist)
        start.y += jitter(-jDist, jDist)
        end.x += jitter(-jDist, jDist)
        end.y += jitter(-jDist, jDist)
        curve2 = new SquigglyLine(start, end, 50);
        connectCurves(pg, curve1, curve2);
        pop();
    }

    return pg
}



function cubeArray() {

    // create a p5.Graphics: offscreen graphics buffer
    pg = createGraphics(width, height);
    pg.background(0);

    // draw text to buffer in white
    push();


    let p = 0;
    let cl = 0;
    stepSize = 50;
    for (y = cnv.yMargin; y < cnv.yMargin + cnv.height; y += stepSize) {
        for (x = cnv.xMargin; x < cnv.xMargin + cnv.width; x += stepSize) {
            pers = "Below"
            view = "L"
            p += 1;
            clen = stepSize;
            cw = stepSize
            ch = stepSize

            toss = random()
            if (toss < 0.5) {
                pg.colr = palette[p % 5];
                cubecolor = { face: random(palette.slice(1, 5)), top: random(palette.slice(1, 5)), side: palette[0] }
                _cuboid(pg, x, y, clen, cw, ch, cubecolor, _perspective = random(['Above', 'Below']),
                    view = random(['L', 'R']))

            }
            else if (toss < 0.7) {
                colr = palette[p % 5];
                cl += 1
                pg.fill(colr)
                pg.push();
                for (c = 0; c < 9; c += 2) {
                    pg.circle(x + c, y + c, stepSize * 0.8);
                }
                pg.pop();
            }
        }
    }

    pop();
    return pg
}


// 4 _perspectives: RAbove, Rbelow, LAbove, LBelow
// 2 View: Left view or Right View .. where the camera is placed
//x and y are the center of the front face of the cuboid.
function _cuboid(pg, x, y, clen, cw, ch, cubecolor, _perspective = 'Above', view = 'L') {

    let hu = 0; let sa = 0; let br = 0;
    let angle = PI / 4;
    pg.push();
    //go to the nw corner
    pg.translate(x - clen / 2, y - ch / 2)

    flip = 1
    if (view == 'L') {
        flip = -1
    }

    //back faces Left ABOVE
    xnwla = cw * cos(angle) * flip //left above
    ynwla = cw * sin(angle) * -1
    xswla = xnwla;
    yswla = ynwla + ch;
    xnela = xnwla + clen;
    ynela = ynwla;
    xsela = xnela;
    ysela = ynela + ch;

    //Right Above
    xnwra = cw * cos(angle);
    ynwra = -cw * sin(angle);
    xnera = xnwra + clen;
    ynera = ynwra;
    xsera = xnwra + clen;
    ysera = ynera + ch;

    //Left BELOW
    xnwlb = -cw * cos(angle) //left below
    ynwlb = cw * sin(angle)
    xswlb = xnwlb;
    yswlb = ynwlb + ch;
    xnelb = xnwlb + clen;
    ynelb = ynwlb;
    xselb = xnelb;
    yselb = ynelb + ch;





    //front face is easier
    xnwf = 0;
    ynwf = 0;
    xnef = clen;
    ynef = 0;
    xsef = clen;
    ysef = ch;
    xswf = 0;
    yswf = ch;

    pg.fill(cubecolor.face)
    pg.rect(0, 0, clen, ch) // front plate

    //fill(hu, sa * 0.7, br * 0.4);
    pg.fill(cubecolor.top)
    if (view == 'L') {
        if (_perspective == 'Above') {
            //top wall or bottom plate depending on A or B view
            pg.quad(0, 0, xnwla, ynwla, xnela, ynela, xnef, ynef) // top lid
        } else { // Left Below
            pg.quad(0, ch, xswlb, yswlb, xselb, yselb, xsef, ysef) // bottom plate

        }
    } else { //RIGHT VIEW
        if (_perspective == 'Above') {
            //top wall or bottom plate depending on A or B view
            pg.quad(0, 0, xnwra, ynwra, xnera, ynera, xnef, ynef) // top lid
        } else { // Below
            //RIGHT BELOW
            xnwrb = cw * cos(angle) //left below
            ynwrb = cw * sin(angle)
            xswrb = xnwrb;
            yswrb = ynwrb + ch;
            xnerb = xnwrb + clen;
            ynerb = ynwrb;
            xserb = xnerb;
            yserb = ynerb + ch;
            pg.quad(0, ch, xswrb, yswrb, xserb, yserb, xsef, ysef) // bottom plate
        }
    }

    //fill(hu, 50, br);
    pg.fill(cubecolor.side)
    if (view == 'L') {
        if (_perspective == 'Above') {
            pg.quad(0, 0, xnwla, ynwla, xswla, yswla, xswf, yswf) // side wall
        } else { //Below
            pg.quad(xnwf, ynwf, xnwlb, ynwlb, xswlb, yswlb, xswf, yswf) // side wall
        }
    } else { //RIGHT VIEW
        if (_perspective == 'Above') {
            pg.quad(xnef, ynef, xnera, ynera, xsera, ysera, xsef, ysef) // side wall
        } else {
            pg.quad(xnef, ynef, xnerb, ynerb, xserb, yserb, xsef, ysef) // side wall

        }
    }
    pg.pop();
}
