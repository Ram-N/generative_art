"""
GENUARY 2021 - "Any Shape, none can touch"

Ram Narasimhan
Jan29 2021

"""

from datetime import datetime
from tetris import Tetris
from grid import Grid

margin = 30
w, h, = 1020, 1020  # working area
wm, hm = w + 2 * margin, h + 2 * margin  # total size


bg_color = 20
tet_set = []
num_grid_rows, num_grid_cols = 20, 25
g = Grid(num_grid_rows, num_grid_cols, wm, hm, margin, margin)


def setup():
    size(wm, hm)
    colorMode(HSB)
    background(bg_color)

    _color = (70, 100, 100)
    g.background(_color)
    _color = (150, 100, 100)
    g.render_cell_borders(_color)
    print(g.num_cols, g.num_rows)

    for cell in g.cells:
        cell.available = 1

    done, num_failed = 0, 0
    while not done:
        col = int(random(num_grid_cols))
        row = int(random(num_grid_rows))
        # print("gen", row, col)
        tetris = Tetris(row, col, 100, 100, 4, grid=g)

        if tetris.shape is not None:
            tet_set.append(tetris)
            _color = (10, 10, 10)
        else:
            num_failed += 1

        if num_failed == 100:
            done = 1


SOUTH = 1


def draw():

    strokeWeight(1)
    _color = (70, 100, 100)
    g.background(_color)
    _color = (150, 100, 100)
    g.render_cell_borders(_color)

    noStroke()
    for piece in tet_set:
        _color = (10, 10, 30)
        piece.render(g, _color)

    if not frameCount % 100:
        print(frameCount)
        for piece in tet_set:
            piece.move(SOUTH, g)

    canvas_border = 30
    draw_canvas_border(canvas_border, border_color=220)  #
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    titlestr = "tetris_"
    # save("frames/" + titlestr + timestamp + ".png")


def draw_canvas_border(grid_margin, border_color=255):
    strokeWeight(grid_margin)
    noFill()
    stroke(border_color)
    rect(0, 0, wm, hm)

