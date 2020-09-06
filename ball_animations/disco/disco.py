"""
DISCO DISCO

A quick sketch to try out using 1D Perlin Noise as the height of a 'pendulum'

Ram Narasimhan
September 2020

Idea: A ball is sitting on a background of concentric cirlces, of alternating colors.
The ball moves along one of these circle. The height that moves to is determined by 1-D Perlin Noise.

"""


def setup():
    size(500, 500)
    stroke(0)


YELLOW = color(255, 204, 0)
RED = color(200, 5, 20)
GREEN = color(55, 188, 25)
BLUE = color(15, 35, 250)
LIGHTBLUE = color(125, 235, 250)
PURPLE = color(160, 60, 235)
BLACK = color(0, 10, 20)
WHITE = color(250, 250, 245)
_colors = [YELLOW, RED, GREEN, BLUE, LIGHTBLUE, PURPLE, WHITE]

r_drop = 20
starting_radius = 1000
ending_radius = 100
num_circles = 20
step = int((starting_radius - ending_radius) / num_circles * 1.0)

angle = 0
increment = 1
max_angle = 100
rail = 5


def draw():
    global angle, increment, max_angle, rail
    background(250)
    for c in range(num_circles):
        cx, cy = width / 2, height / 4 + (c * step / 15.0)
        if c % 2:
            fill(BLACK)
        else:
            fill(WHITE)
        ellipse(cx, cy, starting_radius - c * step, starting_radius - c * step)

    pushMatrix()
    translate(width / 2, height / 4 + (num_circles - 5) * step / 15.0)
    rotate(angle * TWO_PI / 360)
    fill(WHITE)
    ellipse(0, 5 * step, 50, 50)
    popMatrix()
    angle += increment
    if abs(angle) >= max_angle:
        increment *= -1  # pendulum swings back
        # quant_leap = 1 if int(random(2)) else -1
        # rail = min(max(rail + quant_leap, 3), 8)
        # print(rail)
    if angle == 0:  # at its lowest point, we decide how high it will go, based on 1D-PN
        max_angle = 120 * (noise(frameCount * 0.005))

    saveFrame("images/disco_####.png")


def keyPressed():
    if key == CODED and keyCode == CONTROL:
        saveFrame("screenshot.png")
    elif key == "f":  # freeze
        noLoop()
