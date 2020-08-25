def setup():
    size(800, 800)


r = 100  # Radius of the base circle
num_steps = 360  # increase one degree in each frame
angular_step = TWO_PI / num_steps


def draw():
    background(250)
    noFill()
    strokeWeight(3)
    translate(width / 2, height / 2)
    stroke(0, 250, 0)
    ellipse(0, 0, r * 2, 2 * r)  # base circle
    x, y = 0, 200

    # Whenever max_angle gets to be TWO_PI, we reset it to be zero
    max_angle = frameCount % num_steps

    # This is where the fun shape gets gets drawn
    for idx in range(max_angle):
        stroke(0, 0, 250)
        a = idx * angular_step
        x_multiplier = r * (1 + cos(5 * a))
        y_multiplier = r * (1 + sin(2 * a))
        x = x_multiplier * cos(a)
        y = y_multiplier * sin(3 * a)
        ellipse(x, y, 3, 3)  # basically the x,y point. Drawing it as an ellipse

    # if x and y:
    #     ellipse(x, 150, 3, 3)
    #     ellipse(120, y, 3, 3)

    # if frameCount > 358: #try to freeze the curve
    #     noLoop()


# Interesting to try
# m, n = 3, 2
# m, n = 5, 2

# x = r * cos(m * a)
# y = r * sin(n * a)

# x = r * (1 + sin(a)) * cos(a)
# y = r * (1 + cos(2 * a)) * sin(a)

# x_multiplier = r * (1 + cos(a))
# y_multiplier = r * (1 - sin(a))

# x_multiplier = r * (1 + cos(a))
# y_multiplier = r * (1 + sin(2 * a))
