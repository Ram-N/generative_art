import colors


class Ball(object):
    def __init__(self, _id, _x, _y, _vx=0, _vy=0, _radius=10, _colornum=0, _launch=0):
        self.x, self.y = _x, _y
        self.vx, self.vy = _vx, _vy
        self.id = _id
        # store the starting coords of each ball. For relaunching.
        self.startx, self.starty = _x, _y
        self.active = False
        self.radius = _radius
        self.color = _colornum
        self.prev_collision = -3  # frameCount when the collision occurred
        self.launch = _launch  # frameCount for ball to make its first appearance?

    def move_bounce(self):
        self.x += self.vx
        self.y += self.vy

        # check for out of bounds
        if self.x > width or self.x < 0:
            self.vx *= -1
        if self.y > height or self.y < 0:
            self.vy *= -1

    def move_warp(self):
        self.x += self.vx
        self.y += self.vy

        # check for out of bounds
        if self.x > width or self.y > height or self.x < 0 or self.y < 0:
            self.x = self.startx
            self.y = self.starty

    def move_sinusoidal(self):
        self.x += self.vx
        self.y = self.starty + self.vy

        # check for out of bounds
        if self.x > width or self.x < 0:
            self.x = self.startx

    def display(self):
        fill(*colors.COLORS[self.color])
        ellipse(self.x, self.y, 2 * self.radius, 2 * self.radius)

