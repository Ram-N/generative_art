"""
GENUARY 2021 - "Any Shape, none can touch"

Ram Narasimhan
Jan29 2021

"""

from datetime import datetime
from tetris import Tetris, update_cell_availability
from grid import Grid

margin = 30
w, h, = 1020, 1020  # working area
wm, hm = w + 2 * margin, h + 2 * margin  # total size


def generate_tetris_pieces(rows, cols, NUM_ATTEMPTS, grid, tet_set):
    """ Will search rows 0 to rows, and columns 0 to cols
        and will generate non-overlapping tetris pieces
        on a grid
    """

    done, num_failed = 0, 0
    while not done:
        col = int(random(cols))
        row = int(random(rows))
        # print("gen", row, col)
        tetris = Tetris(row, col, 100, 100, 4, grid=grid)
        if tetris.shape is not None:
            tet_set.append(tetris)
            _color = (10, 10, 10)
        else:
            num_failed += 1

        if num_failed == NUM_ATTEMPTS:
            done = 1


bg_color = 20
tet_set = []
num_grid_rows, num_grid_cols = 20, 25
g = Grid(num_grid_rows, num_grid_cols, wm, hm, margin, margin)


def setup():
    size(wm, hm)
    colorMode(HSB)
    background(bg_color)

    print(g.num_cols, g.num_rows)

    for cell in g.cells:
        cell.available = 1

    generate_tetris_pieces(num_grid_rows, num_grid_cols, 100, g, tet_set)

    noStroke()
    for piece in tet_set:
        _color = (10, 10, 30)
        piece.render(g, _color)


SOUTH = 1


def draw():

    strokeWeight(1)
    _color = (143, 0, 86)
    g.background(_color)
    _color = (150, 100, 100)
    g.render_cell_borders(_color)

    noStroke()
    for piece in tet_set:
        _color = (0, 200, 150)
        piece.render(g, _color)

    if not frameCount % 50:
        noLoop()

    if not frameCount % 100:
        print(frameCount)
        for piece in tet_set:
            piece.move(SOUTH, g)

        for cell in g.cells:
            cell.available = 1
        for piece in tet_set:
            update_cell_availability(piece.shape, g)

        generate_tetris_pieces(4, num_grid_cols, 10, g, tet_set)

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

