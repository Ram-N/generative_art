def setup():
    size(500, 500)
    stroke(0, 0, 250)  # blue


num_steps = 360
step = TWO_PI / num_steps
r = 100  # Radius


def draw():
    background(250)
    noFill()
    strokeWeight(3)
    translate(width / 2, height / 2)
    stroke(0, 240, 0)
    ellipse(0, 0, 2 * r, 2 * r)  # base circle in Green
    stroke(0, 0, 240)

    # Every 360 frames, when max_angle gets to be TWO_PI, reset it to Zero
    max_angle = frameCount % num_steps
    n = 1
    m = 2
    # Draw Partial Sinusoidal shape
    for ang in range(max_angle):
        a = ang * step
        x = r * cos(n * a)
        y = r * sin(m * a)

        ellipse(x, y, 3, 3)  # basically the x,y point. Drawing it as an ellipse

