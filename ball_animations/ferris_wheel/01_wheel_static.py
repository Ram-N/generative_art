radius = 100
num_pods = 12


def setup():
    size(800, 600)
    background(255)
    smooth()
    noStroke()
    fill(0, 0, 200)

    xpos = radius
    ypos = 0
    translate(width / 2, height / 2)  # recenters coords
    ellipse(0, 0, 3, 3)  # centerpoint for visual referencing
    for pod in range(num_pods):  # a pod is a capsule or a gondola
        xpos = radius * sin(pod * TWO_PI / num_pods)
        ypos = radius * cos(pod * TWO_PI / num_pods)
        ellipse(xpos, ypos, 20, 20)

    # this works. But one 'drawback' is that we have to calculate the position of each
    # gondola, or ball at each point in time. This is where the power of rotate comes in.
    # See the next script in this series.


def draw():
    pass
