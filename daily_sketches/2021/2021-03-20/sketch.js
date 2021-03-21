// Daily Sketch for 2021-03-20
// Ram Narasimhan.
/*
Pendants, rhythmic parallel lines

*/
let palette = []
const cnv = {
  xMargin: 50,
  yMargin: 50,
}

const grid = {
  rows: 100,
  cols: 100
}

function setup() {
  createCanvas(860, 860);
  background("#d3d3d3");
  //background("#0F0F0F");
  //background(seablue);
  draw_border(20);
  palette = red_brown_orange; //colors.js
  palette = purples; //colors.js
  palette = replicate(palette, 10)

  cnv.height = height - 2 * cnv.yMargin
  cnv.width = width - 2 * cnv.yMargin
  fill(20)
  rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height)
  gridPts = createGrid(grid.rows, grid.cols);
  stroke(255)
  //renderGridPoints(gridPts) // grid.js
  let alphaValue = 100;

  nTiles = 3
  tiles = createTileGrid(nTiles, cnv)
  let pendants = [];

  //fill("#1167b1")
  stroke(0);
  strokeWeight(5)

  for (tile of tiles) {
    push();
    translate(tile.nwx, tile.nwy)
    stroke(250)
    strokeWeight(3)
    //rect(0, 0, tile.width, tile.height)
    pop();

    push();
    bbOffset = 50;
    translate(tile.x, tile.y)
    stroke(250)
    // strokeWeight(10)
    // point(0, 0)
    strokeWeight(2)
    pen = new Pendant(0, 0, 20, tile.width - 2 * bbOffset, tile.height - 2 * bbOffset,
      { x: -(tile.width - 2 * bbOffset) / 2, y: 0 },
      { x: (tile.width - 2 * bbOffset) / 2, y: 0 },
      'vert', '#454221');
    print(pen.x, pen.y, pen.nwy)
    xOffset = pen.width / pen.n
    pen.render()
    pendants.push(pen);
    pop();
  }

  for (t = 0; t < 8; t++) {
    push();
    //translate(pendants[t].x, pendants[t].y)
    print(pendants[t + 1].entry, pendants[t + 1].exit)
    x0exit = pendants[t].x + pendants[t].exit.x
    x1exit = pendants[t + 1].x + pendants[t + 1].exit.x
    line(x0exit, pendants[t + 1].entry.x, pendants[t + 1].entry.y);
    pop();
  }


}


class Pendant {
  //all coords are relative to center
  constructor(_cx, _cy, _n, _width, _height, _entry, _exit, _dir, _col) {
    this.x = _cx; // Centerx
    this.y = _cy; // Centery
    this.col = _col;
    this.width = _width;
    this.height = _height;
    this.nwx = this.x - this.width / 2; //nw corner of bbox
    this.nwy = this.y - this.height / 2; //nw corner of bbox
    this.entry = _entry;
    this.exit = _exit;
    this.dir = _dir; //'horiz' or 'vertical'
    this.n = _n; //numEcho
    print('entry', _entry)
    print('exit', _exit)
  }

  render() {
    // if n is odd, 1 and n-1 both should be lower-half-verts
    // if n is even, 1 is lower halt-vert, n-1 is upper-half-vert

    push();
    translate(this.x, this.y) //center
    for (let e = 0; e < pen.n; e++) {
      let xl = pen.nwx + e * xOffset
      let ys = pen.nwy;
      let ye = ys + pen.height;
      let n = pen.n
      if (e == 0) {
        line(xl, 0, xl + xOffset, 0) //start central h-con
        line(xl + xOffset, ye, xl + 2 * xOffset, ye) //start central h-con
        line(xl + xOffset, 0, xl + xOffset, ye) //half vert
      } else if (e == (pen.n - 1)) {
        line(xl, 0, xl + xOffset, 0) //end central h-con
        if (n % 2) {//odd n
          line(xl, 0, xl, ye) // lower end half vert
        } else {
          line(xl, ys, xl, 0)
        }
      }
      else {
        if (e > 1) {
          line(xl, ys, xl, ye) //regular vert
          if (e % 2) { //odd
            line(xl, ye, xl + xOffset, ye)//h-connector bottom
          } else {
            line(xl, ys, xl + xOffset, ys)//h-connector top
          }
        }
      }
    }
    pop();
  }
}


function draw_border(c = 0) {
  push();
  strokeWeight(20);
  stroke(c);
  noFill();
  rect(0, 0, width, height)
  pop();
}
