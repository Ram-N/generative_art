// A JS utility library to use with p5.js sketches. 
//Ram Narasimhan

// Updated: November 2021

//Functions in this library

/*

*/

function bubblesLayer(numBubbles, palette) {
    for (let cir = 0; cir < numBubbles; cir++) {
        noFill();
        colr = random(palette);
        strokeWeight(5);
        stroke(colr[0], 20, 80)
        if (random() > 0.5) { fill(colr[0], 20, 80) }
        circle(random(height), random(width), random(10, 15));

        strokeWeight(3);
        stroke(colr)
        if (random() > 0.5) { fill(colr) }
        circle(random(height), random(width), random(15, 30));

    }

}