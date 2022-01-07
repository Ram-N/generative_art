// Daily Sketch for 2021-08-30
// Ram Narasimhan

/*
Octagonal Design
*/


const cnv = {
  xMargin: 30,
  yMargin: 30,
}

let palette = []
const params = {
  bgColor: "#0f0f0f", //black
}

sqSize = 960;

function setup() {
  createCanvas(sqSize, sqSize);
  //colorMode(HSB);
  background(0, 0, 0);

  cnv.height = height - 2 * cnv.yMargin // usable height
  cnv.width = width - 2 * cnv.yMargin //usable width
  print(cnv)
  xstart = cnv.xMargin
  ystart = cnv.yMargin
  xend = cnv.xMargin + cnv.width
  yend = cnv.yMargin + cnv.height
  midX = width / 2
  midY = height / 2

  palette = purples;
  palette = replicate(palette, 100)
  palette2 = red_brown_orange; //colors.js
  palette2 = replicate(palette2, 100)

  vertices = [];
  mpts = []; //midpoints
  midspokes = [];

  r = 250;
  r2 = r / 2;
  r3 = 3 / 2 * r2;

  createOctagon(r);

  v0 = vertices[0]
  side = dist(v0.x, v0.y, v0.nx, v0.ny);
  s2 = side / 2;
  print(side, s2)


  render_octagrid(1, width / 2, height / 2);

  palette = red_orange;
  palette = replicate(palette, 100)

  for (i = 0; i < 8; i++) {
    print(i)
    sc = 0.25

    rDist = r * 1.25
    tx = width / 2 + rDist * cos(PI / 4 * i + PI / 8)
    ty = width / 2 + rDist * sin(PI / 4 * i + PI / 8)
    // tx = width / 2 + mpts[i].x
    // ty = width / 2 + mpts[i].y
    render_octagrid(sc, tx, ty);
  }


  draw_border(clr = params.bgColor, sw = 50); //rn_utils.js
}



// Returns three sets of points
//Vertices, EDGEmipts and mispokes.
//NOTE: THese are all relative to origin (0,0)
function createOctagon(r) {
  for (i = 0; i < 8; i++) {
    angle = PI / 4 * i;
    cx = r * cos(angle);
    cy = r * sin(angle);
    nx = r * cos(angle + PI / 4);
    ny = r * sin(angle + PI / 4);
    v = createVector(cx, cy) // Vertices of Octagon
    v.nx = nx //next vertex
    v.ny = ny
    v.midx = (cx + nx) / 2
    v.midy = (cy + ny) / 2
    mpts.push(createVector(v.midx, v.midy))
    midspokes.push(createVector(mpts[i].x / 2, mpts[i].y / 2))
    vertices.push(v);
  }

}

function render_octagrid(sc, transX, transY) {
  push();
  noFill();
  stroke(222)
  translate(transX, transY);
  scale(sc)
  for (let i = 0; i < 8; i++) {
    n1i = (i + 1) % 8
    n2i = (i + 2) % 8
    n3i = (i + 3) % 8
    n4i = (i + 4) % 8

    strokeWeight(20)

    stroke(palette[1])
    line(mpts[i].x, mpts[i].y, mpts[n4i].x, mpts[n4i].y)
    stroke(palette[2])
    line(vertices[i].x, vertices[i].y, vertices[n3i].x, vertices[n3i].y)
    strokeWeight(7)
    stroke(palette[7])
    line(mpts[i].x, mpts[i].y, mpts[n2i].x, mpts[n2i].y)

    stroke(palette[1])
    strokeWeight(20)
    line(vertices[i].x, vertices[i].y, vertices[n1i].x, vertices[n1i].y)
    //circle(midspokes[i].x, midspokes[i].y, 10);
  }
  pop();


}




