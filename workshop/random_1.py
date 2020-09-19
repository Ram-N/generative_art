colors = ["#FE4019", "#0B85CF", "#FF5FB9", "#36225E", "#ffffff"]


def setup():
    size(400, 400)

    for y in range(400):
        pick = int(random(5))
        stroke(colors[pick])
        line(random(100), y, 250 + random(100), y)
