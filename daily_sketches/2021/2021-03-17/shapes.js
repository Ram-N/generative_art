// shapes.js
//Ram Narasimhan

//dervied from: https://www.dariomazzanti.com/uncategorized/fun-with-polygons-p5-js/
class Polygon {
  constructor(_x, _y, _n, _size, _col) {
    this.posX = _x;
    this.posY = _y;
    // this.speedX = random(-0.1, 0.1);
    // this.speedY = random(-0.1, 0.1);
    this.nSides = _n;
    this.rotAngle = 0.0;
    this.col = _col;
    this.dim = _size;
    // this.startDim = this.dim;
    // this.dimMult = 1.0;
    // this.thickness = 5;
    // this.timeOffset = random(1000);
    // this.pulseSpeed = random(0.01, 0.02);
    // this.rotSpeed = random(0.001, 0.003);
    this.polyAngle = TWO_PI / this.nSides;
  }

  render() {
    push();
    translate(this.posX, this.posY);
    rotate(this.rotAngle);
    stroke(this.col);
    beginShape();
    for (var a = 0; a < TWO_PI; a += this.polyAngle) {
      var sx = cos(a) * this.dim;
      var sy = sin(a) * this.dim;
      vertex(sx, sy);
    }
    endShape(CLOSE);
    pop();
  }

  // updating current rotation angle (radians)
  rotate(rotAngle) {
    this.rotAngle += rotAngle;
  }
  // scaling the shape over time
  pulsate() {
    this.dimMult = sin(this.pulseSpeed * (frameCount + this.timeOffset));
    this.dim = (this.dimMult * this.startDim + this.startDim) * 0.5;
    if (this.dim <= 1) {
      this.posX = random(width);
      this.posY = random(height);
      this.speedX = random(-0.1, 0.1);
      this.speedY = random(-0.1, 0.1);
      this.col = color(palette[int(random(maxColNum))]);
    }
  }
  // moving around randomly
  move() {
    this.posX += this.speedX * deltaTime;
    this.posY += this.speedY * deltaTime;
  }
  // calling some functions...
  animate() {
    this.rotate();
    this.pulsate();
    this.move();
  }
}

function get_vertices(x, y, radius, npoints) {
  let vertices = [];
  let angle = TWO_PI / npoints;
  let a = PI / 2;
  for (let i = 0; i < npoints; i++) {
    a += angle;
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertices.push(createVector(sx, sy));
  }

  return vertices;

}

function render_poly(verts) {
  beginShape();
  for (v of verts) {
    vertex(v.x, v.y);
  }
  endShape(CLOSE);
}

function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}