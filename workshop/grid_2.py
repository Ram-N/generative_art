colors = ["#FE4019", "#0B85CF", "#FF5FB9", "#36225E", "#ffffff"]


def setup():
    size(400, 400)

    for x in range(10):
        for y in range(10):
            pick = int(random(5))
            fill(colors[pick])
            pushMatrix()
            translate(40 * x + 20, 40 * y + 20)
            rotate(int(random(4)) * PI / 2)
            arc(0, 0, 40, 40, 0, HALF_PI)
            # rect(40 * x, 40 * y, 40, 40)
            popMatrix()
