"""

Cell: One rectangle where one single form is placed
Cell gridlines: The fine grid inside each Cell
Main Grid: The big grid on the canvas, where each Cell sits 

Updated February 08 2021
"""

ROTATIONS = [(1, 1), (1, -1), (-1, 1), (-1, -1)]


def get_cell_gridlines(cell_x, cell_y, cw, ch, margin, _sq=8):
    """Returns two lists gx and gy with fine grid coordinates"""

    gx, gy = [], []
    for s in range(_sq + 1):
        gx.append(cell_x + margin + (cw / _sq * s))
        gy.append(cell_y + margin + (ch / _sq * s))
    return gx, gy


def draw_cell_gridlines(cell_x, cell_y, gx, gy, mesh_sq=8):
    """
        mesh_sq is the number of squares in one Grid Box
    """
    pushStyle()
    stroke(120)
    for s in range(mesh_sq + 1):
        line(gx[s], gy[0], gx[s], gy[mesh_sq])  # verts
        line(gx[0], gy[s], gx[mesh_sq], gy[s])  # horiz
    popStyle()


class Grid:

    """Represents a large rectangular grid on the screen.
    
    And there is a rectangle (a bounding box) for the grid
    Inside it are 'cells' in rows and columns
    
    Canvas: The drawing area for this grid.
    Cell: Interior rectangles inside the current grid

    """

    def __init__(
        self,
        num_rows,
        num_cols,
        canvas_width,
        canvas_height,
        canvas_x_margin=0,
        canvas_y_margin=0,
        grid_nw_x=0,  # useful if you have multiple Grids, esp for tiling
        grid_nw_y=0,
        cell_mesh_sq=8,  # subdivide a cell into
    ):

        self.num_rows = num_rows
        self.num_cols = num_cols
        self.width = canvas_width
        self.height = canvas_height  # grid height
        self.cell_width = (canvas_width - (2 * canvas_x_margin)) / num_cols
        self.cell_height = (canvas_height - (2 * canvas_y_margin)) / num_rows
        self.grid_xmargin = canvas_x_margin
        self.grid_ymargin = canvas_y_margin
        self.grid_nw_x = grid_nw_x
        self.grid_nw_y = grid_nw_y
        # Properties of cells within the grid
        self.cells = []  # list of cells in the Grid
        self.nw_corners = []

        cw = self.cell_width
        ch = self.cell_height

        # Create cell objects
        xstart, ystart = self.grid_nw_x, self.grid_nw_y
        xmargin, ymargin = self.grid_xmargin, self.grid_ymargin
        cell_id = 0
        for row in range(num_rows):
            for col in range(num_cols):
                nwx, nwy = (
                    xstart + xmargin + col * cw,
                    ystart + ymargin + ch * row,
                )  # NW corner of each cell
                # print(cx, cy, "RC", row, col, ch, cw)
                cell = Cell(
                    nwx, nwy, cw, ch, cell_id, internal_lines=True, mesh_sq=cell_mesh_sq
                )  # create Cell object
                cell.row, cell.col = (row, col)  # address of cell within grid
                cell.cx, cell.cy = nwx + cw / 2, nwy - ch / 2  # cell centers
                self.cells.append(cell)
                self.nw_corners.append((nwx, nwy))
                cell_id += 1

    def render_grid_border(self, fill_color=None):
        """One large rectangle for the entire grid border, with all the cells inside"""

        pushStyle()
        strokeWeight(3)
        stroke(0)
        if fill_color:
            print(fill_color)
            fill(*fill_color)
        else:
            noFill()
        rect(self.grid_nw_x, self.grid_nw_y, self.width, self.height)
        popStyle()

    def background(self, _color):
        """_color should be a tuple (H,S,B)"""
        for c in self.cells:
            c.fill_cell(_color)

    def render_cell_centers(self):
        """Draws the center point for each cell in the grid"""
        for _cell in self.cells:
            _cell.render_cell_dot()

    def render_cell_borders(self, _color):
        """Draws the borders for each cell in the grid"""

        rectMode(CORNER)
        noFill()
        stroke(*_color)
        for row in range(self.num_rows):
            lstart_y = self.grid_ymargin + row * self.cell_height
            for col in range(self.num_cols):
                lstart_x = self.grid_xmargin + col * self.cell_width
                rect(lstart_x, lstart_y, self.cell_width, self.cell_height)
                # print(lstart_x, lstart_y, self.cell_width, self.cell_height)

    def render_cells(self, show_gridlines=False):
        # This will only work in Cell Objects have been created first
        for l in self.cells:
            l.render()
            if show_gridlines:
                l.render_gridlines()

    def get_cell(self, _rownum, _colnum, verbose=False):
        """returns the Cell object given row and colum in grid"""

        if (
            _rownum < 0
            or _colnum < 0
            or _rownum >= self.num_rows
            or _colnum >= self.num_cols
        ):
            return None  # out of bounds

        cellnum = self.num_cols * _rownum + _colnum
        if verbose:
            print(cellnum, _rownum, _colnum)
        try:
            return self.cells[cellnum]
        except:
            print("Error: There is no cellnum", cellnum)
            print(cellnum, _rownum, _colnum)
            return None

    def get_neighbor_of(self, _rownum, _colnum, verbose=False):
        """returns a list of upto 8 Cell objects that are neighbors of the given cell location"""

        neighbors = []
        for col_shift in [-1, 0, 1]:
            for row_shift in [-1, 0, 1]:
                if col_shift or row_shift:  # eliminate both 0's which is c itself
                    if (
                        self.get_cell(_rownum + row_shift, _colnum + col_shift)
                        is not None
                    ):
                        neighbors.append(
                            self.get_cell(_rownum + row_shift, _colnum + col_shift)
                        )

        return neighbors


class Cell(object):
    def __init__(self, _x, _y, _width, _height, _id, internal_lines=False, mesh_sq=8):
        self.nwx, self.nwy = _x, _y  # NW corner of each cell
        self.x, self.y = _x + _width / 2, _y + _height / 2
        self.id = _id
        self.width = _width
        self.height = _height
        self.internal = internal_lines  # only used if needed
        self.mesh_sq = mesh_sq
        self.gw = self.width / self.mesh_sq  # internal mesh distance
        self.gh = self.height / self.mesh_sq

        if internal_lines:
            self.gx, self.gy = get_cell_gridlines(
                self.nwx, self.nwy, self.width, self.height, margin=0, _sq=self.mesh_sq
            )

    def fill_cell(self, _color):
        fill(*_color)
        rect(self.nwx, self.nwy, self.width, self.height)

    def render(self):
        xoffset = self.x + self.width / 2
        yoffset = self.y + self.height * 3 / 4
        noFill()
        strokeWeight(2)

    #        st, end, _dir = render_outline(self.x, self.y, self.gx, self.gy)
    #        render_cell_interior(st, end, _dir, self.gx, self.gy)
    #        render_cell_top(st, end, _dir, self.gx, self.gy)
    #        render_cell_base(st, end, _dir, self.gx, self.gy)
    # change this to become form.render() and cell.render only draws bg maybe

    def render_gridlines(self):
        """ Draws Lines interior to a cell"""
        if self.internal:
            draw_cell_gridlines(
                self.nwx, self.nwy, self.gx, self.gy, mesh_sq=self.mesh_sq
            )

    def render_cell_center_dot(self):
        """Draws a single point (tiny ellipse) at the cell's center"""
        ellipse(self.x, self.y, 3, 3)
