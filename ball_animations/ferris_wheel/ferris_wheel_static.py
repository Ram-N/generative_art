radius = 100
num_pods = 10


def setup():
    size(800, 600)
    background(255)
    smooth()
    noStroke()
    fill(0, 0, 200)


def draw():
    background(255)
    xpos = radius
    ypos = 0
    translate(width / 2, height / 2)  # recenters coords
    ellipse(0, 0, 3, 3)  # centerpoint for visual referencing
    for pod in range(12):  # a pod is a capsule or a gondola
        xpos = radius * sin(pod * TWO_PI / num_pods)
        ypos = radius * cos(pod * TWO_PI / num_pods)
        ellipse(xpos, ypos, 20, 20)
