"""

Ram Narasimhan
November 2020
"""

from ball import Pendulum
from rn_utils import pick_one
import colors

w, h = 900, 900
pendulums_x, pendulums_y = 6, 6
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
        _speed=0,
        _angle = 0,
        #_angle=int(random(360)) / 360.0 * TWO_PI,
        _cx=margin + x * ipd,
        _cy=margin + y * ipd,
        _length=length,
        # _colornum=int(random(5)),
        _colornum=0,
    )
    for y in range(pendulums_y)
    for x in range(pendulums_x)
]

for b in balls:
    if random(1) < 0.2:
        b.speed = (1 + int(random(7))) * pick_one([1, -1])
        b.color = int(random(5))
angle_step = 360.0 / 120.0  # 6 degrees per frame


def setup():
    size(w, h)
    background(128)
    smooth()


def draw():

    background(128)

    for idx, b in enumerate(balls):
        b.revolve(angle_step)
        b.display_pendulum()
        b.collide(balls, consecutive=True)  # allow multiple same pair colls

    # saveFrame("images/5_pen_collisions_###.png")
    # if not frameCount % 1500:
    #     noLoop()

