// Daily Sketch by Ram Narasimhan, 2021-02-28

//Basic Idea: n Points, emanate from a circle (equidistant)
// The bounce up and down between two other cirlces, with velocities
// If any 2 points are withing 'striking distance' they link up wiht a line of color and alpha,
// based on points i and j

let palette = [
  //  "#000000",  //# black
  //  "#9B870C", //Khaki
  //  "#36225E",  //# dark blue
  //  "#2ec4b6",  //# teal
  //  "#930096", //purple
  "#FDFD97",
  "#FF6633",
  "#9EE09E",
  "#FE4019",  //# orange
  //  "#FF5FB9",  //# pink
  //  "#e71d36",  //# red
  //  "#0B85CF",  //# light blue
  "#ffffff",  //# white
  //  "#FF5FB9",  //# pink
  //  "#e71d36",  //# red
  "#FDFD97",
  "#9EE09E",
  "#FDFD97",
  "#FF6633",
  "#9EE09E",
  "#FDFD97",
  "#9EE09E",
  "#FDFD97",
  "#FF6633",
  "#9EE09E",
];


let numPts = 12;
let r = 200
let rmin = r - 50;
let rmax = r + 50;

let pts = [];
let velocityScale = 0.3;
let origin;

function setup() {
  createCanvas(860, 860);
  background("#000000");

  let angleStep = TWO_PI / numPts;
  origin = createVector(width / 2, height / 2);

  stroke(0);
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

function draw() {

  for (const [index, p] of pts.entries()) {
    fill(palette[index])
    ellipse(p.x, p.y, 5, 5)
    p.add(p.velocity)

    if (overMax(p.x, p.y)) { // collision detected...
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
  //console.log(p.x, p.y)
}




