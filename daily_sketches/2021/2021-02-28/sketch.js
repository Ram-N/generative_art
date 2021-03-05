// Daily Sketch by Ram Narasimhan, 2021-02-28
// Core Idea from boredomresearch in Openprocessing.
// https://openprocessing.org/sketch/114089

let centers = [];
let palette = ["#a8e6cf", "#dcedc1", "#ffd3b6", "#ffaaa5", "#ff8b94"];
palette = [
    "#36225E",  //# dark blue
    "#FE4019",  //# orange
    "#e71d36",  //# red
    "#0B85CF",  //# light blue
    //    "#FF5FB9",  //# pink
    "#2ec4b6",  //# teal
    "#f69e55",  //# orange
    "#FFA900",  //# yellow
    "#ffffff",  //# white
];

function setup() {
    let c = createCanvas(860, 860);
    background(random(palette));
}

function draw() {
    //Just draw one frame and stop
    let endPoint = random(0, 100);
    for (let sw = 200; sw > endPoint; sw -= 5) {
        strokeWeight(sw);
        stroke(random(palette));
        //stroke(random(0, 150), random(0, 50), random(150, 250));
        drawShapes();
    }

    noLoop();

}

function drawShapes() {
    for (center of centers) {
        if (center.shape == 'circle') {
            point(center.x, center.y);
        } else if (center.shape == 'triangle') {
            triangle(center.x, center.y, center.x - 1, center.y + 1, center.x + 1, center.y + 1)
        } else {
            rect(center.x, center.y, 3, 3);
        }
    }
}

function mousePressed() {
    cv = createVector(mouseX, mouseY);
    cv.shape = 'circle'
    let dice = random(1)
    if (dice < 0.33) {
        cv.shape = 'rect'
    } else if (dice < 0.66) {
        cv.shape = 'triangle'
    }

    centers.push(cv);
    loop();
}

function mouseDragged() {
    centers.push(createVector(mouseX, mouseY));
    loop();
}

// function keyPressed() {

//     if (key == 's') {
//         save('images/my-great-proejct.png');
//     }

// }


function keyTyped() {
    // png is much higher quality than jpg
    if (key == 's') {
        let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + "-" + nf(millis(), 3, 0);
        //save(timeStamp + 'png');
        saveCanvas(timeStamp + 'png');
    }
}