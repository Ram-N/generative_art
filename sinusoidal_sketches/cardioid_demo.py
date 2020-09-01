def setup():
    size(800, 800)


r = 50  # Radius of the base circle
num_steps = 360  # increase one degree in each frame
angular_step = TWO_PI / num_steps
num_rows, num_cols = 3, 3

YELLOW = color(255, 204, 0)
RED = color(200, 5, 20)
GREEN = color(55, 188, 25)
BLUE = color(15, 35, 250)
LIGHTBLUE = color(125, 235, 250)
PURPLE = color(160, 60, 235)
BLACK = color(0, 10, 20)
WHITE = color(250, 250, 245)
_colors = [YELLOW, RED, GREEN, BLUE, LIGHTBLUE, PURPLE, WHITE]

palette = []
directions = []
for row in range(num_rows):
    for col in range(num_cols):
        c = int(random(len(_colors)))
        palette.append((_colors[c]))
        directions.append((int(random(2)), int(random(5)), int(random(5))))


def draw_partial_shape(cx, cy, row, col, max_angle, r, _color, _directions):
    pushMatrix()
    translate(cx, cy)
    stroke(230, 250, 240)
    ellipse(0, 0, r * 2, 2 * r)  # base circle
    stroke(_color)
    sign_flip, cos_factor, sin_factor = _directions[0], _directions[1], _directions[2]
    for idx in range(max_angle):
        a = idx * angular_step
        x_multiplier = r * (1 + sign_flip * cos(col * a))
        y_multiplier = r * (1 + sign_flip * sin(row * a))
        x = x_multiplier * cos(a * cos_factor)
        y = y_multiplier * sin(a * sin_factor)
        ellipse(x, y, 3, 3)  # basically the x,y point. Drawing it as an ellipse

    popMatrix()


def draw():

    global palette, directions
    xstep = width / num_cols
    ystep = height / num_rows

    background(10)
    noFill()
    strokeWeight(3)
    # translate(width / 2, height / 2)

    # Whenever max_angle gets to be TWO_PI, we reset it to be zero
    max_angle = frameCount % num_steps

    if not max_angle:  # reset everything once every TWO_PI
        palette = []
        directions = []
        for row in range(num_rows):
            for col in range(num_cols):
                c = int(random(len(_colors)))
                palette.append((_colors[c]))
                directions.append((int(random(2)), int(random(5)), int(random(5))))

    for row in range(3):
        for col in range(3):
            x, y = (col + 0.5) * xstep, (row + 0.5) * ystep
            colr = palette[col + row * num_rows]
            _dir = directions[col + row * num_rows]
            draw_partial_shape(x, y, row + 1, col + 1, max_angle, r, colr, _dir)

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
