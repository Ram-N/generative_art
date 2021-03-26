//Use with p5.js sketches. 
//Ram Narasimhan
// March 2021

function keyTyped() {
    // png is much higher quality than jpg
    if (key == 's') {
        let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + "-" + nf(millis(), 3, 0);
        saveCanvas('keep_' + timeStamp + 'png');
    }
    if (key == 'k') {
        let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + "-" + nf(millis(), 3, 0);
        saveCanvas('keep_' + timeStamp + 'png');
        saveCanvas('keep0.png'); //representative. will overwrite existing file
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
