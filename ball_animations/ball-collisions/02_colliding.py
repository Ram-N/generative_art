"""

This is one script in a series.
In 01.. we have the ability to launch a set of balls inside a confined Box

Note: This requires that the file ball.py (rename 01ball.py to ball.py) to be in the same folder


Author: Ram Narasimhan
August 2020

"""

from ball import Ball
import colors

w, h = 600, 600
radius = 10
num_balls = 5
num_active = 0

launch_gap = num_balls * 2

balls = []
for id in range(num_balls):
    balls.append(
        Ball(
            id,
            0,
            int(random(h)),
            1 + int(random(3)),
            2 + int(random(4)),
            _radius=radius,
        )
    )
    balls.append(
        Ball(
            num_balls + id,
            int(random(h)),
            0,
            2 + int(random(3)),
            1 + int(random(5)),
            _radius=radius,
        )
    )


def setup():
    size(w, h)
    background(127)
    smooth()
    noStroke()
    frameRate(30)


def draw():
    global balls, num_active
    background(127)

    # when to launch? Waits for a "launch_gap" number of frames before it launches
    # the next ball
    if num_active < num_balls * 2:
        if not frameCount % (launch_gap):
            balls[num_active].active = True  # launch one more ball
            num_active += 1

    # move each ball and show it on the screen
    for b in balls:
        if b.active:
            b.move()
            b.display()
            b.collide(balls)

    saveFrame("images/coll_###.jpg")

    if frameCount > 600:
        noLoop()
