import math


def ball_dist(b1, b2):
    """ Euclidean distance between two ball """
    return math.sqrt((b1.x - b2.x) ** 2 + (b1.y - b2.y) ** 2)


class Ball(object):
    def __init__(self, _id, _x, _y, _vx=0, _vy=0, _radius=0):
        self.x, self.y = _x, _y
        self.vx, self.vy = _vx, _vy
        self.id = _id
        # store the starting coords of each ball. For relaunching.
        self.startx, self.starty = _x, _y
        self.active = False
        self.radius = _radius

    def move(self):
        self.x += self.vx
        self.y += self.vy

        # check for out of bounds
        if self.x > width or self.x < 0:
            self.vx *= -1
        if self.y > height or self.y < 0:
            self.vy *= -1

    def display(self):
        ellipse(self.x, self.y, 20, 20)

    def collide(self, balls):
        # check with all the other balls to see if colliding...
        for b in balls:
            if b.id != self.id:
                min_dist = self.radius + b.radius
                if ball_dist(b, self) < min_dist:
                    ydist = b.y - self.y
                    xdist = b.x - self.x
                    # Logic taken from https://processing.org/examples/bouncybubbles.html
                    theta = atan2(ydist, xdist)
                    acc_x = self.x + cos(theta) * min_dist - b.x
                    acc_y = self.y + sin(theta) * min_dist - b.y
                    self.vx -= acc_x
                    self.vy -= acc_y
                    b.vx += acc_x
                    b.vy += acc_y

