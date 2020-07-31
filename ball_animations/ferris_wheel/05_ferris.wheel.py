radius = 150
num_pods = 12


def setup():
    size(800, 600)
    background(200)
    smooth()
    noStroke()
    fill(0, 0, 200)
    frameRate(60)


def draw():
    background(200)
    xpos = radius
    ypos = 0

    translate(width / 2, height / 2)  # recenters coor
    noFill()
    strokeWeight(10)
    stroke(100)
    line(-150, width / 2, -10, 0)
    line(150, width / 2, 10, 0)
    strokeWeight(3)
    for r in range(2):
        ellipse(0, 0, 240 + 80 * r, 240 + 80 * r)

    fill(200, 0, 0)
    ellipse(0, 0, 50, 50)  # centerpoint for visual referencing
    fill(0, 0, 200)
    ellipse(0, 0, 20, 20)  # centerpoint for visual referencing

    # Rotate the whole Frame
    rotate(radians(frameCount % 360))

    for b in range(num_pods):
        # Rotate the coord system for each ball
        rotate(TWO_PI / num_pods)
        ellipse(xpos, 0, 20, 20)

    saveFrame("images/ferris-###.png")

    if frameCount > 50:
        noLoop()
