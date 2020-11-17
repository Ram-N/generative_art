"""

Ram Narasimhan
November 2020
"""

from ball import Pendulum
from rn_utils import pick_one

w, h = 800, 800
num_balls = 4
radius = 30

balls = [
    Pendulum(
        _id="ball_" + str(id),
        _x=0,
        _y=100,
        _radius=radius,
        _speed=(1 + int(random(7))) * pick_one([1, -1]),
        _angle=int(random(360)) / 360.0 * TWO_PI,
        _cx=w / 4 * (2 * (id % 2) + 1),
        _cy=h / 4 * (2 * int(id / 2) + 1),
        _length=w / 4 + (radius - 5),
        _colornum=id,
    )
    for id in range(num_balls)
]

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
        b.collide(balls)

    # saveFrame("images/5_pen_collisions_###.png")
    if not frameCount % 1000:
        noLoop()

