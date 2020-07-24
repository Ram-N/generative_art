radius = 100


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
    pushMatrix()
    translate(width / 2, height / 2)  # recenters coor
    rotate(radians(frameCount % 360))
    ellipse(0, 0, 3, 3)  # centerpoint for visual referencing
    ellipse(xpos, ypos, 20, 20)
    ellipse(-1 * xpos, ypos, 20, 20)
    popMatrix()
