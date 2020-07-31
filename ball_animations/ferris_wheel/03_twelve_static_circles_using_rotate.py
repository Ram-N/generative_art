radius = 100
num_balls = 12


def setup():
    size(800, 600)
    background(255)
    smooth()
    noStroke()
    fill(0, 0, 200)

    xpos = radius
    translate(width / 2, height / 2)  # recenters coor
    ellipse(0, 0, 3, 3)  # centerpoint for visual referencing
    for b in range(num_balls):
        rotate(TWO_PI / num_balls)
        ellipse(xpos, 0, 20, 20)


def draw():
    pass
