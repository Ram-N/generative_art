colors = ["#0B85CF", "#36225E", "#ffffff", "#FF5FB9"]  # "#FE4019",


def setup():
    size(400, 400)

    for x in range(10):
        for y in range(10):
            pick = int(random(len(colors)))
            fill(colors[pick])
            pushMatrix()
            translate(40 * x + 20, 40 * y + 20)  # go to the tile center
            rotate(int(random(4)) * PI / 2)  # rotate randomly by 90, 180, 270 or 0
            arc(20, 20, 80, 80, PI, 3 * HALF_PI)
            popMatrix()

    saveFrame("images/grid2.png")

