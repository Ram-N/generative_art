w, h = 900, 900

import colors
from circle_like import Circular
from rn_utils import pick_one


def pancake_stack(x, y, num, base_radius=10, band_size=10):
    pushMatrix()
    translate(x, y)  # new origin
    chosen_palette = pick_one(colors.PALETTES)
    for c in range(num, 0, -1):
        r = base_radius + band_size * c
        p = Circular(0, 0, r, random(0.3, 1), pick_one(chosen_palette))
        p.render()
    popMatrix()


def setup():
    size(w, h)
    background(66)
    noFill()

    for x in range(100, 800, 200):
        for y in range(100, 800, 200):
            pancake_stack(x, y, 5)

    save("images/pancakes.png")

