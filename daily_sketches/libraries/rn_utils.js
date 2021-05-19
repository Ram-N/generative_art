//Use with p5.js sketches. 
//Ram Narasimhan
// May 2021

function keyTyped() {
    // png is much higher quality than jpg
    if (key == 's') {
        let timeStamp = year() + "-" + nf(month(), 2) + "-" + nf(day(), 2) + "-" + nf(hour(), 2) + "-" + nf(minute(), 2) + "-" + nf(second(), 2);// + "-" + nf(millis(), 3, 0);
        print('ts', timeStamp)
        saveCanvas('keep_' + timeStamp);
    }
    if (key == 'k') {
        let timeStamp = year() + "-" + nf(month(), 2) + "-" + nf(day(), 2) + "-" + nf(hour(), 2) + "-" + nf(minute(), 2) + "-" + nf(second(), 2);// + "-" + nf(millis(), 3, 0);
        saveCanvas('keep_' + timeStamp + 'png');
        saveCanvas('keep0.png'); //representative. will overwrite existing file
    }

    if (key == 'r') { // R = resume, reloop, redraw
        //print('redraw')
        draw();
    }

    if (key == 'x') {
        noLoop();
    }
}

function replicate(arr, times) {
    var al = arr.length,
        rl = al * times,
        res = new Array(rl);
    for (var i = 0; i < rl; i++)
        res[i] = arr[i % al];
    return res;
}


function draw_border(clr = 0, sw = 20) {
    push();
    strokeWeight(sw);
    stroke(clr);
    noFill();
    rect(0, 0, width, height)
    pop();
}

