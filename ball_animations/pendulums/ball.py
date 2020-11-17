import colors
import math

SPEED_LIMIT = 10
COLL_RECUPERATION = 15


def ball_dist(b1, b2):
    """ Euclidean distance between two ball """
    return math.sqrt((b1.x - b2.x) ** 2 + (b1.y - b2.y) ** 2)


def speed_limit(comp):
    """Don't let it go beyond -1*SPEED_LIMIT or +1*SPEED_LIMIT"""
    return max(min(comp, SPEED_LIMIT), -1 * SPEED_LIMIT)


class Ball(object):
    def __init__(
        self,
        _id,
        _x,
        _y,
        _vx=0,
        _vy=0,
        _radius=10,
        _angle=0,
        _cx=0,
        _cy=0,
        _length=0,
        _colornum=0,
        _launch=0,
    ):
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

    def move(self):
        self.x += self.vx
        self.y += self.vy

        # check for out of bounds
        if self.x > width or self.x < 0:
            self.vx *= -1
        if self.y > height or self.y < 0:
            self.vy *= -1

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

    def collide(self, balls):
        # check with all the other balls to see if colliding...
        for b in balls:
            if (
                frameCount > self.prev_collision + 5
            ):  # hack to avoid successive collision
                if self.id < b.id:  # check n^2/ 2 pairs.
                    min_dist = self.radius + b.radius
                    if ball_dist(b, self) < min_dist - 0.5:

                        b.vx, self.vx = self.vx, b.vx
                        b.vy, self.vy = self.vy, b.vy
                        b.color = next_color(b.color)
                        self.color = next_color(self.color)
                        self.prev_collision = frameCount
                        b.prev_collision = frameCount


class Pendulum(Ball):
    def __init__(
        self,
        _id,
        _x,
        _y,
        _vx=0,
        _vy=0,
        _radius=10,
        _speed=1,
        _angle=0,
        _cx=0,
        _cy=0,
        _length=0,
        _colornum=0,
        _launch=0,
    ):
        Ball.__init__(self, _id=_id, _x=_x, _y=_y, _radius=_radius, _colornum=_colornum)
        self.angle = _angle
        self.cx, self.cy = _cx, _cy
        self.length = _length
        self.speed = _speed

    def revolve(self, angle_step):
        self.angle += radians(self.speed)
        self.x = self.cx + self.length * sin(self.angle)
        self.y = self.cy + self.length * cos(self.angle)

    def display_pendulum(self):
        strokeWeight(3)
        line(self.cx, self.cy, self.x, self.y)
        self.display()

    def collide(self, balls):
        # check with all the other balls to see if colliding...
        for b in balls:
            if (
                frameCount > self.prev_collision + COLL_RECUPERATION
            ):  # hack to avoid successive collision
                if self.id < b.id:  # check n^2/ 2 pairs.
                    if ball_dist(b, self) < 2 * self.radius:
                        print(b.speed, self.speed)
                        b.speed, self.speed = self.speed, b.speed
                        self.prev_collision = frameCount
                        b.prev_collision = frameCount
