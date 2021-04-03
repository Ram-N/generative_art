class Ripple {
    /**
     * Create and Return a grid object
     * @param  {Integer} nRows Number of rows
     * @param  {Integer} nCols Number of columns
     */
    constructor(_source, _target, grid) {
        this.source = _source; // a grid point
        this.target = _target; // a grid point
        this.path = this.createPath(grid)
    }

    createPath(grid) {
        let path = [];
        let curr = this.source;
        let max_loop = 100; //circuit breaker
        let iter = 0;
        //print('from', this.source, 'to', this.target)
        while (!this.terminatePath(curr, grid) && (iter < max_loop)) {
            let next = this.getNextGPt(curr, grid)
            if (next) {
                next.free = false;
                //print('next node', next.col, next.row)
                path.push({ gs: curr, ge: next });
                curr = next;
            }
            iter++;
        }
        //print(path.length, 'path length')
        return path
    }

    terminatePath(GPt, grid) {
        //print('term conditions', GPt.col, GPt.row, (GPt.col == grid.cols), (GPt.row == 0), (GPt.row == grid.rows));
        if ((GPt.row == 0) || (GPt.row == grid.rows)) {
            return 1
        }
        if ((GPt != this.source) && (GPt.col == grid.cols)) {
            return 1
        }
        if ((GPt != this.source) && (GPt.col == 0)) {
            return 1
        }

        return 0
    }

    getNextGPt(currGPt, grid) {
        let n;
        let neigh = grid.get4NearestGridPoints(currGPt.col, currGPt.row);
        let currMinDist = 10000;
        let next;
        //print('length of neigh', neigh.length)
        for (n of neigh) {
            //print('neighbor', n, this.target)
            if (n.free) {
                let dn = dist_metric(n.x, n.y, this.target.x, this.target.y)
                if (dn < currMinDist) {
                    currMinDist = dn;
                    next = n;
                }
            }
        }
        return next;
    }

    /* when rendering, everything gets converted to Global coords */
    render(clr) {
        // each LINK has a gs (grid start) and ge (grid end) for a single link of the ripple
        let _drawLine = false;
        push();
        stroke(clr);
        if (random(1) < 0.75) {
            _drawLine = true;
            strokeWeight(3);
        } else {
            strokeWeight(4)
        }
        for (let link of this.path) {
            if (_drawLine) {
                //print('link', link, 'link')
                line(link.gs.x, link.gs.y, link.ge.x, link.ge.y)
            } else {
                point(link.gs.x, link.gs.y)
            }
        }
        pop();
    }

}

function dist_metric(nx, ny, tx, ty) {
    let distance;

    distance = Math.abs(nx - tx) + 3 * Math.abs(ny - ty)

    return distance
}
