colors = ["#FE4019", "#0B85CF", "#FF5FB9", "#36225E", "#ffffff"]


def setup():
    size(400, 400)
    for y in range(5):
        fill(colors[y])
        rect(20, 100 + 25 * y, 200 + 10 * y, 20)
