class Cell(object):
    def __init__(self, _pos, _x, _y, _cw, _ch, _color=None):
        self.pos = _pos
        self.x, self.y = _x, _y  # NW Corner
        self.color = _color
        self.h = _ch
        self.w = _cw
        self.centerx = _x + _cw / 2
        self.centery = _y + _ch / 2

    def render(self, fc=None):
        if self.color:
            fill(self.color)
        if fc:
            fill(fc)
        rect(self.x, self.y, self.w, self.h)


class Grid(object):
    def __init__(
        self, _rows, _cols, _xmargin=20, _ymargin=20, _cell_gutter=10, square=False
    ):
        self.rows, self.cols = _rows, _cols
        self.xmargin, self.ymargin = _xmargin, _ymargin
        self.cell_ht = (height - 2 * _ymargin - (_rows - 1) * _cell_gutter) / _rows
        self.cell_w = (width - 2 * _xmargin - (_cols - 1) * _cell_gutter) / _cols
        self.gutter = _cell_gutter
        self.cells = self.create_cells()  # list of xy

    def __str__(self):

        print("Grid has ", self.rows, "rows and ", self.cols, " columns.")
        print("Cell Height:", self.cell_ht, "Cell Width:", self.cell_w)
        for x in range(self.cols):
            for y in range(self.rows):
                pos = y * self.cols + x
                print(x, y, self.cells[pos].x, self.cells[pos].y, self.cells[pos].h)
        return " "

    def create_cells(self):
        cells = []
        for x in range(self.cols):
            for y in range(self.rows):
                cx, cy = (
                    self.xmargin + x * (self.cell_w + self.gutter),
                    self.ymargin + (self.cell_ht + self.gutter) * y,
                )
                cell = Cell((x, y), cx, cy, self.cell_w, self.cell_ht)
                cells.append(cell)
        return cells

    def render_grid(self, color=None):
        stroke(0)
        if color:
            fill(color)
        else:
            fill(255)
        for cell in self.cells:
            rect(cell.x, cell.y, self.cell_w, self.cell_ht)

    def render_margin(self, _color=127):
        stroke(_color)
        noFill()
        strokeWeight(self.xmargin * 2)
        rect(0, 0, width, height)
        strokeWeight(1)  # reset
        stroke(0)  # reset
