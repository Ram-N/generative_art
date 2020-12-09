"""
Order from Chaos

4 things that can be varied for each pancake.
    1. Radius - Large to small, shrinking
    2. Color - Dark to Brigher
    3. Alpha - Diffused to Opaque
    4. Roundness - Jagged to Round

"""

w, h = 900, 900

import colors
from circle_like import Circular
from rn_utils import pick_one


def pancake(x, y, base_radius, roundness, colr, alpha):
    pushMatrix()
    translate(x, y)  # new origin
    p = Circular(0, 0, base_radius, roundness, colr, alpha)
    p.render()
    popMatrix()


def setup():
    size(w, h)
    background(0)
    noFill()

    for rad in [100, 75, 50, 25]:
        for c in range(25):
            chosen_palette = pick_one(colors.PALETTES)
            pancake(
                random(width),
                random(height),
                rad,
                0.3,
                pick_one(chosen_palette),
                alpha=30,
            )

    save("images/order_chaos1.png")

