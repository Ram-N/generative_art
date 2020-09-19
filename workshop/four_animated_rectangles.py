colors = ["#FE4019", "#0B85CF", "#FF5FB9", "#36225E", "#ffffff"]

x, y = 100, 300
direction = -1


def setup():
    size(400, 400)


def draw():
    global x, y, direction
    fill(colors[0])
    rect(0, 0, x, y)  # top left

    fill(colors[1])
    rect(0, y, x, height - y)

    fill(colors[2])  # Top right
    rect(x, 0, width - x, y)

    fill(colors[3])  # bottom right
    rect(x, y, width - x, height - y)

    if x == 300:
        direction *= -1
    if x == 100:
        direction *= -1

    x += direction
    y -= direction

