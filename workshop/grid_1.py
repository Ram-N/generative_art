colors = ["#FE4019", "#0B85CF", "#FF5FB9", "#36225E", "#ffffff"]


def setup():
    size(400, 400)

    for x in range(10):
        for y in range(10):
            pick = int(random(5))
            fill(colors[pick])
            rect(40 * x, 40 * y, 20, 20)
