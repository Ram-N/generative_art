reflections = [(1.0, 1.0), (1.0, -1.0), (-1.0, 1.0), (-1.0, -1.0)]


def some_lines():
    line(100, 220, 300, 180)
    line(200, 270, 200, 200)
    line(300, 200, 50, 150)


def setup():
    size(900, 900)
    strokeWeight(3)
    translate(width / 2, height / 2)

    for scale_factor in reflections:
        pushMatrix()
        scale(scale_factor[0], scale_factor[1])
        some_lines()
        popMatrix()
