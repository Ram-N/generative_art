// shapes.js
//Ram Narasimhan
//Modified and built from: https://www.dariomazzanti.com/uncategorized/fun-with-polygons-p5-js/



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
    this.vertices = this.vertices()
  }

  vertices() {
    let verts = [];
    for (var a = 0; a < TWO_PI - 0.001; a += this.polyAngle) {
      var sx = cos(a) * this.dim;
      var sy = sin(a) * this.dim;
      verts.push(createVector(sx, sy));
    }
    return verts; // coordinates relative to the center
  }

  renderVertices() {
    push();
    translate(this.posX, this.posY);
    rotate(this.rotAngle);
    stroke(this.col);
    for (let v of this.vertices) {
      point(v.x, v.y);
    }
    pop();
  }

  renderStripes(sw = 1, stripeDensity = 0.25) {
    let _dir;
    let epa;
    let epb;
    push();
    translate(this.posX, this.posY);
    rotate(this.rotAngle);
    stroke(this.col);
    strokeWeight(sw);
    _dir = random([[0, 3], [1, 4], [2, 5]])
    for (let _frac = 0; _frac <= 1; _frac += stripeDensity) {
      epa = this.getPtsOnEdge(_dir[0], _frac)[0]
      epb = this.getPtsOnEdge(_dir[1], 1 - _frac)[0]
      line(epa.x, epa.y, epb.x, epb.y)
    }
    pop();
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


  getPtsOnEdge(edge, dist_frac) {
    /*
    Given a Edgenum[0 - 5] return a point(x, y) distance from vert away on the edge
    
    Parameters
    ----------
    
      edge: int or None
    edge is the edge - number from 0..5.If it is None, all 6 edges are included.
    
      dist_frac : float
    distance from the hexagon vertex, in hexagon - size units.Note: This is not absolute distance.Typically
      `dist` goes from 0 to 1, and gets multiplied by the`size` of the hexagon. 
        0 is closest to the starting vertex, 1 is the next vertex.
    
      Returns
    -------
      list
    List of new points, in [(x1, y1), (x2, y2) ...] format  
    */

    let edgePts = [];
    let e;
    let theta_offset = 30;
    if (dist_frac == null) {
      dist_frac = random(0, 1)
    }
    let _dist = dist_frac * this.dim
    let pt;

    if (edge == null) { // get from all edges
      for (pt of this.vertices) {
        edgePts.push(
          createVector(
            pt.x + _dist * sin((-60 * (edge + 1) + theta_offset) * PI / 180),
            pt.y + _dist * cos((-60 * (edge + 1) + theta_offset) * PI / 180)
          )
        )
      }

    } else { // single edge

      pt = this.vertices[edge]
      edgePts.push(
        createVector(
          pt.x + _dist * sin((-60 * (edge + 1) + theta_offset) * PI / 180),
          pt.y + _dist * cos((-60 * (edge + 1) + theta_offset) * PI / 180)
        )
      )

    }
    return edgePts;
  }
}

/////////////////////////
function getRectVertices(r) {
  let verts = [
    createVector(r.x, r.y),
    createVector(r.x + r.width, r.y),
    createVector(r.x + r.width, r.y + r.height),
    createVector(r.x, r.y + r.height)]
  return verts;
}

function displayPoly(shp) {

  //fill(random(palette))
  noFill();
  strokeWeight(2)
  beginShape();
  for (v of shp.vertices) {
    vertex(v.x, v.y);
  }
  endShape(CLOSE);
}

function displayEcho(shp, multiplier) {

  cenX = shp.x + shp.width / 2;
  cenY = shp.y + shp.height / 2;
  cen = createVector(cenX, cenY);
  strokeWeight(3)
  point(cen.x, cen.y)

  push();
  strokeWeight(4);
  fill(random(palette))
  beginShape();

  for (let vEcho = 0; vEcho < shp.vertices.length; vEcho++) {
    vert1 = shp.vertices[vEcho];
    vnew = p5.Vector.lerp(cen, vert1, multiplier);
    vertex(vnew.x, vnew.y);
  }
  endShape(CLOSE);
  pop();
}


//Bbox only has x0, x1, y0 and y1
function getRectGridBbox(ix, iy, iw, ih) {
  try {
    return {
      xMin: ix,
      xMax: ix + iw,
      yMin: iy,
      yMax: iy + ih
    };
  } catch (err) {
    print("Rect NW in grid coords", ix, iy, "hull", iw, ih)
  }
}

function renderShapeEcho(shp, grid) {
  /* A shp has a set of perimeter points.
  Take 2 at a time, and then get the points to the right/left of these two.
  whichever pLeft or pRight is not internal, connect them.
  Goal is to  build a new shape this way, which envelops the input shape.
  */
  push();
  strokeWeight(8);
  let shade = 0;
  for (pe = 0; pe < shp.perimeter.length - 1; pe++) {
    stroke(255 - shade)
    p = shp.perimeter[pe];
    q = shp.perimeter[pe + 1];
    //point(p.x, p.y)

    if (p.col == q.col) {//vertical
      pLeft = grid.getGPt(p.col - 1, p.row)
      pRight = grid.getGPt(p.col + 1, p.row)
      if ((pLeft == null) || (pRight == null)) { continue; }
      if (shp.interior.includes(pLeft)) {// interior
        stroke(0, 255, 0)
        stroke(random(cappuccino))
        point(pRight.x, pRight.y)
      }
      if (shp.interior.includes(pRight)) {// interior
        stroke(0, 255, 0)
        stroke(random(cappuccino))
        point(pLeft.x, pLeft.y)
      }
    }//vert
    if (p.row == q.row) {//horizontal
      pUp = grid.getGPt(p.col, p.row - 1)
      pDown = grid.getGPt(p.col, p.row + 1)
      if ((pUp == null) || (pDown == null)) { continue; }
      if (shp.interior.includes(pUp)) {// interior
        stroke(0, 0, 250)
        stroke(random(cappuccino))
        point(pDown.x, pDown.y)
      }
      if (shp.interior.includes(pDown)) {// interior
        stroke(0, 0, 250)
        stroke(random(cappuccino))
        point(pUp.x, pUp.y)
      }
    }//horizontal

    shade += 4;
  }
  pop();

}


function displayInteriorPts(shp) {
  for (g of shp.interior) {
    push();
    //stroke(random(red_orange))
    strokeWeight(6)
    point(g.x, g.y)
    pop();
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