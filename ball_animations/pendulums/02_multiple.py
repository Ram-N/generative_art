"""

Ram Narasimhan
November 2020
"""

from ball import Pendulum

w, h = 1000, 1000
num_balls = 4

balls = [
    Pendulum(
        _id="ball_" + str(id),
        _x=0,
        _y=100,
        _radius=20,
        _speed=1 + int(random(10)),
        _angle=int(random(360)) / 360.0 * TWO_PI,
        _cx=w / 2,
        _cy=h / 2,
        _length=75 * (id + 1),
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
        if not frameCount % 30:
            print(frameCount, b.id, b.x, b.y, b.angle)

    # saveFrame("images/freq###.png")

    if not frameCount % 540:
        # save("images/no_trail_diff_amplitudes.png")
        noLoop()

