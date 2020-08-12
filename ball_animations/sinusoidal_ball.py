"""
Starter Script for Learners: How to make a ball move in a sinusoidal pattern?

Ram Narasimhan
August 2020

Things to Try:

1. Comment out the background refresh in draw() to see the full path
2. Increase AMPLITUDE to make the balls move more in the orthogonal axis
3. Increase FREQUENCY to make the balls cycle through faster/quicker

"""


from ball import Ball

w, h = 1000, 500
num_balls = 3
speed = 2

balls = [
    Ball(
        _id="sin_" + str(id),
        _x=0,
        _y=50 + id * 100,
        _vx=speed,
        _vy=0,
        _radius=10,
        _launch=int(speed * id),
        _colornum=id,
    )
    for id in range(num_balls)
]


def setup():
    size(w, h)
    background(128)
    smooth()
    noStroke()


fp_cycle = 60.0

freq = [0.5, 1, 2]
amplitude = [20, 50, 80]


def draw():
    background(128)

    theta = 360.0 / fp_cycle

    for idx, b in enumerate(balls):
        b.vy = cos(radians(frameCount * theta) * freq[idx]) * 20
        # b.vy = cos(radians(frameCount) * theta) * amplitude[idx]
        b.move_sinusoidal()
        b.display()
    if not frameCount % 30:
        print(b.x, b.y, b.vx, b.vy)

    if not frameCount % 500:
        save("images/diff_frequencies.jpg")
        noLoop()
