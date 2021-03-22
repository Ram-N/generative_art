class Pendant {
    //all coords are relative to center
    constructor(_cx, _cy, _n, _width, _height, _entry, _exit, _dir, _col) {
        this.x = _cx; // Centerx - real world coord
        this.y = _cy; // Centery - real world coords
        this.col = _col;
        this.width = _width;
        this.height = _height;
        this.nwx = this.x - this.width / 2; //nw corner of bbox
        this.nwy = this.y - this.height / 2; //nw corner of bbox
        this.entry = this.getJnxCoords(_entry);
        this.exit = this.getJnxCoords(_exit);
        this.dir = _dir; //'horiz' or 'vertical'
        this.n = _n; //numEcho
    }

    getJnxCoords(_entry) { //works for entry as well as exit
        let xOffset = 0;
        let yOffset = 0;
        if (['N', 'S'].includes(_entry.wall)) {
            xOffset = (_entry.frac) * this.width
            y = this.nwy //North wall
            x = this.nwx + xOffset
            if (_entry.wall == 'S') {
                y += this.height;
                x = this.nwx + this.width - xOffset
            }
        } else {
            yOffset = (_entry.frac) * this.height
            x = this.nwx + this.width //East wall
            y = this.nwy + yOffset
            if (_entry.wall == 'W') {
                x = this.nwx;
                y = this.nwy + this.height - yOffset
            }
        }
        return (createVector(x, y))
    }

    render() {
        // if n is odd, 1 and n-1 both should be lower-half-verts
        // if n is even, 1 is lower halt-vert, n-1 is upper-half-vert
        let n = this.n
        let xOffset = this.width / n

        push();
        // strokeWeight(10);
        // point(this.x, this.y);
        // point(this.nwx, this.nwy)
        strokeWeight(2)
        for (let e = 0; e < this.n; e++) {
            let xl = this.nwx + e * xOffset
            let ys = this.nwy;
            let ye = ys + this.height;
            let ym = this.nwy + this.height / 2;
            if (e == 0) {
                line(xl, ym, xl + xOffset, ym) //start central h-con
                line(xl + xOffset, ye, xl + 2 * xOffset, ye) //start central h-con
                line(xl + xOffset, ym, xl + xOffset, ye) //half vert
            } else if (e == (pen.n - 1)) {
                line(xl, ym, xl + xOffset, ym) //end central h-con
                if (n % 2) {//odd n
                    line(xl, ym, xl, ye) // lower end half vert
                } else {
                    line(xl, ys, xl, ym)
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

