"""

Ram Narasimhan
November 2020
"""

from ball import Pendulum
from rn_utils import pick_one

w, h = 800, 800
num_balls = 5
radius = 30

balls = [
    Pendulum(
        _id="ball_" + str(id),
        _x=0,
        _y=100,
        _radius=radius,
        _speed=(1 + int(random(5))) * pick_one([1, -1]),
        _angle=int(random(360)) / 360.0 * TWO_PI,
        _cx=w / 2,
        _cy=h / 2,
        _length=100 + 2 * (radius - 5) * id,
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

    saveFrame("images/5_pen_collisions_###.png")
    if not frameCount % 1000:
        noLoop()

