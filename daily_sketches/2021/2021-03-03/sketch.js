// Daily Sketch by Ram Narasimhan, 2021-03-03

//Basic Idea: Draw a "scalloped Circle"
// Have a circle, but its edges are a sine/cosine curve.
//ref: https://tex.stackexchange.com/questions/82773/how-to-draw-a-sine-wave-on-a-circular-path-in-tikz

let palette = []

let numPts = 250;
let base_r = 230
let amplitude = 35;
let n_waves = 12;
let n_stars = 10;
function setup() {
  createCanvas(860, 860);
  background("#d3d3d3");

  palette = [color(255, 0, 0, 100),
  color(255, 165, 0, 100),
  //  color(255, 255, 0, 100),
  color(0, 128, 0, 100),
  color(0, 0, 255, 100),
  color(75, 0, 130, 100),
  color(238, 130, 238, 100),
  ];

  palette = replicate(palette, 10)

  let angleStep = TWO_PI / numPts;
  for (j = 0; j < n_stars; j++) {
    star(angleStep, PI / 7 * j);
  }

}


function star(angleStep, rot_angle) {
  push();
  translate(width / 2, height / 2);
  rotate(rot_angle);
  noFill();
  //x(t) = (2+.5*cos(nt))cos(t)
  //y(t) = (2+.5*cos(nt))sin(t)
  beginShape();
  for (i = 0; i < numPts; i++) {
    theta = i * angleStep;
    r = base_r + amplitude * cos(n_waves * theta)
    x = r * cos(theta);
    y = r * sin(theta);
    vertex(x, y)
  }
  endShape(CLOSE);

  pop();
}


function keyTyped() {
  // png is much higher quality than jpg
  if (key == 's') {
    let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + "-" + nf(millis(), 3, 0);
    //save(timeStamp + 'png');
    saveCanvas('keep_' + timeStamp + 'png');
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