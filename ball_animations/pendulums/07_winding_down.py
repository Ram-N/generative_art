"""

07 Winding Down.

Mainly, this is a test of the gravity slow down feature
in ball.py

Ram Narasimhan
November 2020
"""

from ball import Pendulum
from rn_utils import pick_one
import colors

w, h = 900, 900
pendulums_x, pendulums_y = 6, 6
pendulums_x, pendulums_y = 1, 1
ipd = int(w / (pendulums_x + 1))  # center to center distance
length = ipd / 2
margin = ipd
radius = 15

balls = [
    Pendulum(
        _id=str(x) + "_" + str(y),
        _x=0,
        _y=100,
        _radius=radius,
        _speed=1,
        # _angle=0,
        _angle=random(90) / 360.0 * TWO_PI,
        _cx=margin + x * ipd,
        _cy=margin + y * ipd,
        _length=length,
        # _colornum=int(random(5)),
        _colornum=0,
    )
    for y in range(pendulums_y)
    for x in range(pendulums_x)
]

balls[0].speed = 3
angle_step = 360.0 / 120.0  # 6 degrees per frame


def setup():
    size(w, h)
    background(128)
    smooth()


def draw():

    background(128)

    for idx, b in enumerate(balls):
        b.settle()
        # b.revolve(angle_step)
        b.display_pendulum()
        b.collide(balls, consecutive=True)  # allow multiple same pair colls

    # saveFrame("images/5_pen_collisions_###.png")
    # if not frameCount % 1500:
    #     noLoop()

