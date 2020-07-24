def frange(start, stop=None, step=None):
    # if stop and step argument is None set start=0.0 and step = 1.0
    start = float(start)
    if stop == None:
        stop = start + 0.0
        start = 0.0
    if step == None:
        step = 1.0

    count = 0
    while True:
        temp = float(start + count * step)
        if step > 0 and temp >= stop:
            break
        elif step < 0 and temp <= stop:
            break
        yield temp
        count += 1


num_sides = 30
theta_increment = TWO_PI / num_sides
num_rings = 3


def setup():
    size(800, 800)
    background(200)
    stroke(0, 0, 200)
    translate(width / 2, height / 2)
    noFill()
    max_offset = 10

    for ring in range(num_rings):
        scale((ring + 1) * 0.6)

        beginShape()
        for theta in frange(0, TWO_PI, theta_increment):

            x_noise_offset = map(cos(theta), -1, 1, 0, max_offset) + map(
                ring, 0, num_rings, 0, 100
            )
            y_noise_offset = map(cos(theta), -1, 1, 0, max_offset) + map(
                ring, 0, num_rings, 0, 100
            )

            radius = map(noise(x_noise_offset, y_noise_offset), 0, 1, 100, 200)
            x = radius * cos(theta)
            y = radius * sin(theta)
            vertex(x, y)
        endShape(CLOSE)
