colors = ["#FE4019", "#0B85CF", "#FF5FB9", "#36225E", "#ffffff"]


def setup():
    size(400, 400)


def draw():
    background(255)
    for y in range(400):
        pick = int(random(5))
        stroke(colors[pick])
        x = random(100)
        line(x, y, x + mouseX, y)
