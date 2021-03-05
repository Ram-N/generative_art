// Daily Sketch by Ram Narasimhan, 2021-03-02

//Basic Idea: n Points, emanate from a circle (equidistant)
// The bounce up and down between two other cirlces, with velocities
// If any 2 points are withing 'striking distance' they link up wiht a line of color and alpha,
// based on points i and j

let palette = []

let numPts = 8;
let r = 230
let rmin = r - 50;
let rmax = r + 300;
let distCutoff = 40;
let pts = [];
let velocityScale = 0.7;
let origin;

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
  origin = createVector(width / 2, height / 2);

  for (i = 0; i < numPts; i++) {
    theta = i * angleStep;
    x = r * cos(theta) + width / 2;
    y = r * sin(theta) + height / 2;
    p = createVector(x, y);
    ellipse(x, y, 3, 3)
    vx = random(-1, 1) * velocityScale;
    vy = random(-1, 1) * velocityScale;
    p.velocity = createVector(vx, vy);
    pts.push(p)
  }

  // console.log('done');
  // for (p of pts) {
  //   print(p.x, p.y);
  // }


}

function overMax(x, y) {
  if (dist(x, y, width / 2, height / 2) >= rmax) {
    return (1);
  }
  return (0);
}

function underMin(x, y) {
  if (dist(x, y, width / 2, height / 2) <= rmin) {
    return (1);
  }
  return (0);
}



function draw() {

  for (let rep = 0; rep < 5; rep++) { // just to speed up each frame by repetition
    for (const [index, p] of pts.entries()) {
      fill(palette[index], 100);
      stroke(palette[index], 100);
      //ellipse(p.x, p.y, 5, 5)
      p.add(p.velocity)

      for (q of pts) {
        if (q != p) {
          if (dist(q.x, q.y, p.x, p.y) < distCutoff) {
            line(q.x, q.y, p.x, p.y)
          }
        }
      }

      if (underMin(p.x, p.y) || (overMax(p.x, p.y))) { // collision detected...
        let baseDelta = p5.Vector.sub(p, origin); // p is rmax circle boundary at the moment of collision
        baseDelta.normalize();
        let normal = createVector(-baseDelta.y, baseDelta.x); // vec normal to the rmax circle

        incidence = p.velocity.normalize(); // this is how the point is approaching
        let dot = incidence.dot(normal);

        // https://p5js.org/examples/motion-non-orthogonal-reflection.html
        //calculate reflection vector
        //assign reflection vector to direction vector
        p.velocity.set(
          2 * normal.x * dot - incidence.x,
          2 * normal.y * dot - incidence.y,
          0
        );

      }
    }

  }

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