"""

LEAFONT: A leaf-based alien font

"""
from font import *

w, h = 800, 1000
xmargin, ymargin = 20, 20
num_rows, num_cols = 10, 10


def setup():
    size(w, h)
    background(250)

    fg = FontGrid(num_rows, num_cols, w, h, size=1, xstart=xmargin, ystart=ymargin)
    fg.render_grid_border()
    fg.render_letters()
