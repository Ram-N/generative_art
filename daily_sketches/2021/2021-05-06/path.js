class Path {
  constructor(x1, y1, x2, y2) {
    this.start = createVector(x1, y1);
    this.end = createVector(x2, y2);
    this.radius = 20;
  }

  show() {
    stroke(255);
    strokeWeight(2);
    line(this.start.x, this.start.y, this.end.x, this.end.y);

    stroke(255, 100);
    strokeWeight(this.radius * 2);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }
}