import colors

max_offset = 10
num_sides = 90
ai = int(360.0 / num_sides)


class Circular(object):
    """A Circular is a circle like object"""

    def __init__(self, _cx, _cy, _rad, _roundness, _color, _alpha=0):
        """ cx cy is the circular's center
            radius and a degree of roundness 1 means perfect circle
        """
        self.cx = _cx
        self.cy = _cy
        self.radius = _rad
        self.roundness = _roundness
        self.color = _color
        self.alpha = _alpha  # 0 to 255

    def render(self):
        # +-25% for very rough. 0% for round.
        radius_band = (1 - self.roundness) * self.radius / 2.0
        rmin, rmax = self.radius - radius_band, self.radius + radius_band
        re, g, b = self.color[0], self.color[1], self.color[2]
        fill(re, g, b, self.alpha)

        maxo = max_offset + random(16)
        beginShape()
        for angle in range(0, 360, ai):
            theta = angle / 360.0 * TWO_PI
            x_noise_offset = map(cos(theta), -1, 1, 0, maxo / 5.0)
            y_noise_offset = map(cos(theta), -1, 1, 0, maxo / 5.0)

            radius = map(noise(x_noise_offset, y_noise_offset), 0, 1, rmin, rmax)
            x = radius * cos(theta)
            y = radius * sin(theta)
            vertex(x, y)

        endShape(CLOSE)
