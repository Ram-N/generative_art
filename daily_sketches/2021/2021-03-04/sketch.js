// Daily Sketch by Ram Narasimhan, 2021-03-04

//Basic Idea: Draw a "scalloped Circle" 
//Vary its parameters

let palette = []

let numPts = 250;
let base_r = 150;
let amplitude = 35;
let n_waves = 12;
let n_threads = 20; // each thread is one scalloped circle


function setup() {
  createCanvas(860, 860);
  //background("#d3d3d3");
  background("#030303");

  palette = [
    "#03071e",
    "#370617",
    "#6a040f",
    "#9d0208",
    "#d00000",
    "#dc2f02",
    "#e85d04",
    "#f48c06",
    "#faa307",
    "#ffba08",
  ];  // brown-orange-red

  palette = replicate(palette, 10)

  let angleStep = TWO_PI / numPts;
  for (j = 0; j < n_threads; j++) {
    stroke(palette[j]);
    strokeWeight(Math.floor(j / 2));
    star(angleStep, PI / 7 * j, j);
  }

}


//x(t) = (2+.5*cos(nt))cos(t)
//y(t) = (2+.5*cos(nt))sin(t)
function star(angleStep, rot_angle, thread) {
  push();
  translate(width / 2, height / 2);
  rotate(rot_angle);
  noFill();
  beginShape();
  for (i = 0; i < numPts; i++) {
    theta = i * angleStep;
    r = base_r + amplitude * cos(n_waves * theta) + thread * 10
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