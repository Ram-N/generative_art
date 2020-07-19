class Ball(object):
    def __init__(self, _id, _x, _y, _vx=0, _vy=0):
        self.x, self.y = _x, _y
        self.vx, self.vy = _vx, _vy
        self.id = _id
        # store the starting coords of each ball. For relaunching.
        self.startx, self.starty = _x, _y
        self.active = False

    def move(self):
        self.x += self.vx
        self.y += self.vy

        # check for out of bounds
        if self.x > width or self.y > height or self.x < 0 or self.y < 0:
            self.x = self.startx
            self.y = self.starty

    def display(self):
        ellipse(self.x, self.y, 20, 20)

