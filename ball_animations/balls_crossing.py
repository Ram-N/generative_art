w, h = 800, 800

from ball import Ball

num_set = 8  # half the balls are horizontal, the other half will move vertically
num_balls = num_set * 2
hballs = [Ball(id, 0, h / 2, 5, 0) for id in range(num_set)]
vballs = [Ball(id + num_set, w / 2, h, 0, -5) for id in range(num_set)]
balls = [None] * (len(hballs) + len(vballs))  # placeholder
balls[::2] = hballs  # odd places
balls[1::2] = vballs  # even elements
num_active = 0
launch_gap = num_balls


def setup():
    size(w, h)
    background(127)
    smooth()
    noStroke()


def draw():
    global balls, num_active
    background(127)

    # when to launch?
    if num_active < num_balls:
        if not frameCount % (launch_gap):
            balls[num_active].active = True  # launch one more ball
            num_active += 1

    # move each ball and show it on the screen
    for b in balls:
        if b.active:
            b.move()
            b.display()

