
const points = [];

function setup() {
  createCanvas(500, 500);
  let buffer = 20;
  let numPts = int(random(50));

  for (let i = 0; i < numPts; i++) {
    points.push(createVector(random(buffer, width - buffer), random(buffer, height - buffer)));
  }

  hull = getHull(points);
  print(hull.length)
  background(0);
  renderHull();
}

// Adapted from Gift Wrapping Algorithm by Daniel Shiffman
// Made it a stand-alone function for me to use
function getHull(points) {

  let hull = [];

  points.sort((a, b) => a.x - b.x);
  let leftMost = points[0];
  currentVertex = leftMost;
  hull.push(currentVertex);
  nextVertex = points[1];

  done = false;
  attempts = 0;
  while (!done && attempts < 1000) {

    nextVertex = getNextVertex(currentVertex);
    if (nextVertex == leftMost && hull.length > 2) {
      done = true;
    } else {
      hull.push(nextVertex);
      currentVertex = nextVertex;
      nextVertex = leftMost;
    }
    attempts++;
  }
  return (hull)
}


function getNextVertex(currentVertex) {
  nextVertex = random(points);
  for (index = 0; index < points.length; index++) {
    let checking = points[index];
    stroke(255);
    //line(currentVertex.x, currentVertex.y, checking.x, checking.y);

    const a = p5.Vector.sub(nextVertex, currentVertex);
    const b = p5.Vector.sub(checking, currentVertex);
    const cross = a.cross(b);

    if (cross.z < 0) { // found a better point
      nextVertex = checking;
      nextIndex = index;
    }

  }

  return (nextVertex)

}

function renderHull() {
  stroke(0, 0, 255);
  fill(0, 0, 255, 50);
  strokeWeight(2);
  beginShape();
  for (let p of hull) {
    vertex(p.x, p.y);
  }
  endShape(CLOSE);
}
