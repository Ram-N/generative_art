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


num_steps = 12
base_col = random(360)
step = 0


def setup():
    size(w, h)
    background(0)
    noFill()
    colorMode(HSB, 360, 100, 100)


step = 1
rad = 15 * (num_steps - step)
alp = step * 150.0 / num_steps
rnd = (step + 1) * 1.0 / num_steps


def draw():
    global base_col, step, rad, alp, rnd
    if not (frameCount % 10):
        step = frameCount / 10
        rad = 15 * (num_steps - step)
        alp = step * 150.0 / num_steps
        rnd = (step + 1) * 1.0 / num_steps
        base_col += 5

    c = frameCount % 10
    col = (
        (base_col + c + (step * 200.0 / num_steps)) % 360,
        50 + (step + 1) * 50.0 / num_steps,
        50 + (step) * 50.0 / num_steps,
    )
    pancake(random(width), random(height), rad, rnd, col, alp)

    saveFrame("images/order_chaos_###.png")

    if frameCount > num_steps * 10:
        noLoop()
