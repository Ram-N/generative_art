w, h = 800, 800


def setup():
    size(w, h)
    stroke(0, 0, 250)  # blue


num_steps = 360
step = TWO_PI / num_steps
r = 100  # Radius of both generating circles


def draw():
    background(250)
    noFill()
    strokeWeight(3)
    translate(width / 2, height / 2)
    ellipse(0, 0, 100, 100)  # base circle

    # Every 360 frames, when max_angle gets to be TWO_PI, reset it to Zero
    max_angle = frameCount % num_steps

    if max_angle:  # Draw the orange circle
        fill(220, 69, 0)
        a = max_angle * step
        ellipse(r * cos(a), r * sin(a), 100, 100)  # large orange circle

        # Let's exaggerate and show the point of contact between the two circles
        fill(100, 255, 0)
        x = r * (1 - cos(a)) * cos(a) + r / 2
        y = r * (1 - cos(a)) * sin(a)
        ellipse(x, y, 10, 10)

    # This is where the cardioid gets drawn.
    for ang in range(max_angle):
        fill(0, 0, 250)
        a = ang * step
        x = r * (1 - cos(a)) * cos(a) + r / 2
        y = r * (1 - cos(a)) * sin(a)

        ellipse(x, y, 3, 3)  # basically the x,y point. Drawing it as an ellipse

    if frameCount > 360:
        noLoop()


#    saveFrame("images/c1_###.png")

