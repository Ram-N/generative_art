class Tetris(object):
    """One single Tetris shape"""

    def __init__(self, _row, _col, x, y, n=4, grid=None):
        """ position is index in the grid
            x,y are the cartesian coords of the dot

            n is the number of grid_squares in the tetris-shape
        """
        self.col = _col
        self.row = _row
        self.x = x  # x coord
        self.y = y  # y coord
        self.n = n

        self.shape = self.create_shape(grid)
        self.active = True

    def create_shape(self, grid):
        """A Tetris piece gets created here and its cells returned"""

        curr_x, curr_y = self.col, self.row  # grid positions
        curr_cell = grid.get_cell(curr_y, curr_x)
        if not curr_cell.available:
            return None

        _shape = []
        _shape.append([curr_y, curr_x])  # storing row, col
        done, num_attempts = 0, 0
        newx, newy = curr_x, curr_y
        while not done and num_attempts < 100:
            _dir = int(random(4))
            if _dir == 0 and curr_x + 1 != grid.num_cols:  # east
                newx += 1
            elif _dir == 1 and curr_y + 1 != grid.num_rows:  # south
                newy += 1
            elif _dir == 2 and curr_x != 0:  # west
                newx -= 1
            elif _dir == 3 and curr_y != 0:  # north
                newy -= 1

            new_cell = grid.get_cell(newy, newx)

            if new_cell.available and [newy, newx] not in _shape:
                _shape.append([newy, newx])  # storing row, col
                num_attempts = 0
                curr_x, curr_y = newx, newy
            else:
                num_attempts += 1
                newx, newy = curr_x, curr_y

            if len(_shape) == self.n:
                done = 1

        if len(_shape) != self.n:
            return None

        update_cell_availability(_shape, grid)
        return _shape

    def move(self, _dir, grid):
        """move tetris piece on the screen one unit in _dir"""

        for idx, t in enumerate(self.shape):
            if _dir == 1:
                self.shape[idx][0] += 1  # move it south

        if min([t[0] for t in self.shape]) >= grid.num_rows:
            self.active = False

    def render(self, grid, _color):
        """display tetris piece on the screen"""

        if not self.active:
            return

        try:
            for trow, tcol in self.shape:
                if trow < grid.num_rows:
                    gc = grid.get_cell(trow, tcol)
                    gc.fill_cell(_color)
        except:
            print(self.shape, "unable to render", grid.num_rows, grid.num_cols)


def update_cell_availability(_shape, grid):
    """ for each cell in each tetris piece, all its 8 neighbors are marked unavailable"""
    for crow, ccol in _shape:
        cell = grid.get_cell(crow, ccol)
        if cell is not None:
            cell.available = 0

        # mark all the neighbors of cell as unavailable
        for neigh in grid.get_neighbor_of(crow, ccol):
            ncell = grid.get_cell(neigh.row, neigh.col)
            ncell.available = 0

