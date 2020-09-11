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

w, h = 360 * 3, 500
num_balls = 3
speed = 2

# Create 3 balls, and set their properties.
balls = [
    Ball(
        _id="ball_" + str(id),
        _x=0,
        _y=100 + id * 100,
        _vx=speed,
        _vy=0,  # vertical speed. We will set this later
        _radius=10,
        _colornum=id,
    )
    for id in range(num_balls)
]


# Try changing any of these PARAMETERS
FREQ = [0.5, 1, 2]
AMPLITUDE = [20, 50, 80]
ERASE_TRAILS = True  # True or False are valid options
angle_step = 360.0 / 60.0  # 6 degrees


def setup():
    size(w, h)
    background(128)
    smooth()
    for x in range(24):
        line(x * 60, 0, x * 60, 500)

    for y in range(3):
        line(0, 100 + 100 * y, w, 100 + 100 * y)


def draw():

    if ERASE_TRAILS:
        background(128)

    stroke(0)
    for x in range(24):
        line(x * 60, 0, x * 60, 500)
    for y in range(3):
        line(0, 100 + 100 * y, w, 100 + 100 * y)
    noStroke()

    for idx, b in enumerate(balls):
        b.vy = cos(radians(frameCount * angle_step) * FREQ[idx]) * 20
        # b.vy = cos(radians(frameCount) * angle_step) * AMPLITUDE[idx]

        # b.vy is the distance in the y-direction that ball b has moved.
        # Thus, b's y position is ystart + vy

        b.move_sinusoidal()  # record the ball's new x and y positions
        b.display()
        if not frameCount % 30:
            print(frameCount, b.id, b.x, b.y, b.starty, b.vx, b.vy)

    saveFrame("images/freq###.png")
    # saveFrame("images/amp###.png")
    if not frameCount % 540:
        save("images/no_trail_diff_frequencies.jpg")
        # save("images/no_trail_diff_amplitudes.png")
        noLoop()

