"""

Debugging the collisions

Author: Ram Narasimhan
August 2020

"""

from ball import Ball
import colors

w, h = 600, 600

num_balls = 1
num_active = 0

launch_gap = num_balls * 2

balls = []
for id in range(num_balls):
    balls.append(Ball(id, _x=100, _y=100, _vy=1, _vx=0, _radius=10, _colornum=2))
    balls.append(
        Ball(num_balls + id, _x=100, _y=300, _vy=-1, _vx=0, _radius=10, _colornum=4)
    )
    balls.append(
        Ball(num_balls * 2 + id, _x=200, _y=350, _vy=0, _vx=1, _radius=10, _colornum=1)
    )
    balls.append(
        Ball(num_balls * 3 + id, _x=400, _y=350, _vy=0, _vx=-1, _radius=10, _colornum=3)
    )


def setup():
    size(w, h)
    background(127)
    smooth()
    noStroke()


def draw():
    global balls, num_active
    background(127)

    # when to launch? Waits for a "launch_gap" number of frames before it launches
    # the next ball
    if num_active < len(balls):
        if not frameCount % (launch_gap):
            balls[num_active].active = True  # launch one more ball
            num_active += 1

    # move each ball and show it on the screen
    for b in balls:
        if b.active:
            b.move()
            b.display()
            b.collide(balls)

