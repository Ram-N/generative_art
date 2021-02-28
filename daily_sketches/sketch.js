
function setup() {
  createCanvas(860, 860);

  background("#00ffff");
  fill("#1167b1")
  stroke(0);
  translate(width / 2, height / 2);
  push();
  //rotate(PI / 6);
  //polygon(0, 0, 200, 6);
  let verts = get_vertices(0, 0, 200, 6);
  pop();

  rect(0, 0, 10, 10);
  render_poly(verts);

  let r1 = 70;
  let r2 = 170;
  let theta = 0;
  let I20 = TWO_PI / 3;

  strokeWeight(2);
  for (let i = 0; i < 3; i++) {

    v_angle = theta - (2 * i) * I20;
    p1x = r1 * cos(v_angle);
    p1y = r1 * sin(v_angle);
    line(0, 0, p1x, p1y);
    p2x = p1x + r2 * cos(v_angle + I20);
    p2y = p1y + r2 * sin(v_angle + I20);

    line(p1x, p1y, p2x, p2y);
    //line(verts[2 * i].x, verts[2 * i].y, p2x, p2y);

    opp_index = ((2 * i) + 3) % 6
    line(p2x, p2y, verts[2 * i].x, verts[2 * i].y);

  }
  // for (v of verts) {
  //   line(v.x, v.y, 0, 0)
  //   console.log(v.x, v.y);
  // }
  console.log(verts.length)
  console.log('done');


}


function get_vertices(x, y, radius, npoints) {
  let vertices = [];
  let angle = TWO_PI / npoints;
  let a = PI / 2;
  for (let i = 0; i < npoints; i++) {
    a += angle;
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertices.push({ x: sx, y: sy });
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