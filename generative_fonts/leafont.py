"""

LEAFONT: A leaf-based alien font

"""
from font import *

w, h = 800, 1000
canvas_xmargin, canvas_ymargin = 20, 20
num_rows, num_cols = 10, 10

fg = FontGrid(num_rows, num_cols, w, h, xstart=canvas_xmargin, ystart=canvas_ymargin)
render_again = True


def setup():
    size(w, h)
    background(250)


def draw():
    global render_again

    if render_again:
        background(250)
        fg = FontGrid(
            num_rows, num_cols, w, h, xstart=canvas_xmargin, ystart=canvas_ymargin
        )
        fg.render_grid_border()
        fg.render_letters(show_gridlines=False)
        render_again = False


def keyPressed():
    global render_again

    if key == "n":
        render_again = True

    elif key == "t":  # Toggle
        show = not show
