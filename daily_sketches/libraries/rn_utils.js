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

function irpm(n) {
    return int(random(-n, n));
}


//https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript/966938#966938
// usage: createArray(3, 2);
function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while (i--) arr[length - 1 - i] = createArray.apply(this, args);
    }

    return arr;
}

function create2DArray(cols) {
    var arr = [];
    for (var i = 0; i < cols; i++) {
        arr[i] = [];
    }
    return arr;
}

function chooseOne(_list) {
    return (random(_list))
}

function alphaFill(clr, alphaValue) {
    c = color(clr);
    c.setAlpha(alphaValue);
    fill(c);
}