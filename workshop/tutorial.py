colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00"]

x, y = 100, 300
direction = -1


def setup():
    size(400, 400)


def draw():
    global x, y, direction
    fill(colors[0])
    rect(0, 0, x, y)

    fill(colors[1])
    rect(x, 0, width - x, y)

    fill(colors[2])
    rect(0, y, x, height - y)

    fill(colors[3])
    rect(x, y, width - x, height - y)

    # change direction
    if x == 100:  # bounce
        direction *= -1
    if x == 300:  # bounce
        direction *= -1

    x += 1 * direction
    y += -1 * direction
