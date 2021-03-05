// Daily Sketch by Ram Narasimhan, 2021-03-05

//Basic Idea: Variations "scalloped Circle" 
//Vary its parameters

let palette = []

let numPts = 250;
let base_r = 80;
let amplitude = 15;
let n_blooms = 3;
let n_petals = 8;
let n_layers = 10; // each layer is one scalloped circle
const LAYER_PIX = 5;

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

  for (bloom = 0; bloom < n_blooms; bloom++) {
    push();
    xoff = (bloom % 2) * width / 2 + width / 4
    translate(xoff, height * 0.25 * (bloom + 1));
    render_bloom(angleStep);
    pop();
  }
}


function render_bloom(angleStep) {
  n_petals = 7 + int(random(10));
  print('petals', n_petals)
  for (j = n_layers; j > 0; j--) {
    stroke(palette[j]);
    if (random(1) < 0.5) {
      fill(palette[j]);
    } else {
      noFill();
    }
    strokeWeight(Math.floor(j / 2));
    push();
    rotate(PI / 9 * j);
    star(angleStep, j, n_petals);
    pop();
  }

}


//Creates a single scalloped shape. Circular Sinusoid
function star(angleStep, layer, n_petals) {
  beginShape();
  for (i = 0; i < numPts; i++) {
    theta = i * angleStep;
    //base + waviness + petal offset
    r = base_r + amplitude * cos(n_petals * theta) + layer * LAYER_PIX
    x = r * cos(theta);
    y = r * sin(theta);
    vertex(x, y)
  }
  endShape(CLOSE);
}
//x(t) = (2+.5*cos(nt))cos(t)
//y(t) = (2+.5*cos(nt))sin(t)


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