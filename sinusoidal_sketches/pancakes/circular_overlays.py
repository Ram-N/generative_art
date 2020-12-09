w, h = 900, 900

from circle_like import Circular
from colors import COLORS


def pancake_stack(x, y, num, base_radius=10, band_size=10):
    pushMatrix()
    translate(x, y)  # new origin
    for c in range(num, 0, -1):
        r = base_radius + band_size * c
        rnd = 1 - float(c) / (1.7 * num)
        p = Circular(0, 0, r, rnd, COLORS[c])
        p.render()
    popMatrix()


def setup():
    size(w, h)
    background(0)
    noFill()

    pancake_stack(width / 2, height / 2, 15, base_radius=30, band_size=20)

    save("images/15_overlaps.png")

