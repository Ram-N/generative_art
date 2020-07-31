radius = 100
num_balls = 12


def setup():
    size(800, 600)
    background(255)
    smooth()
    noStroke()
    fill(0, 0, 200)
    frameRate(100)


def draw():
    background(255)
    xpos = radius
    ypos = 0

    translate(width / 2, height / 2)  # recenters coor
    ellipse(0, 0, 3, 3)  # centerpoint for visual referencing

    # Rotate the whole Frame
    rotate(radians(frameCount % 360))

    for b in range(num_balls):
        # Rotate the coord system for each ball
        rotate(TWO_PI / num_balls)
        ellipse(xpos, 0, 20, 20)

