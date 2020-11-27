from dots import GridPattern
from rn_utils import *

w, h = 1000, 1000
cells = GridPattern(dot_pattern="square", num_seq=[8, 3])
# Initialize dot covers
cells.get_random_kolam_pattern()
dots_in_quarter = 9


def setup():
    size(w, h)
    background(0)
    jn = cells.jns[-1]


def draw():
    global cells

    if not frameCount % 40:
        # cells.get_random_kolam_pattern(dot="random")
        cells.get_random_kolam_pattern(dot="all")
        # saveFrame("images/random1_####.png")

    if frameCount > 100:
        noLoop()
        print(cells.print_pattern())

    background(0)
    translate(width / 2, height / 2)
    fill(255, 0, 0)
    ellipse(0, 0, 15, 15)
    #    cells.render_jns()
    cells.render_dots()
    cells.render_kolam()
    #    cells.render_axis()
    # noLoop()

