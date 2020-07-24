w, h = 1000, 800


class Ball(object):
    def __init__(self, _id, _x, _y, _vx=0, _vy=0):
        self.x, self.y = _x, _y
        self.vx, self.vy = _vx, _vy
        self.id = _id

    def move(self):
        self.x += self.vx
        self.y += self.vy

        # x out of bounds
        if self.x > width:
            self.x = 0
            self.y = 0

        if self.y > height:
            self.y = 0
            self.x = 0

    def display(self):
        ellipse(self.x, self.y, 20, 20)


num_balls = 16
balls = [Ball(x, 0, 0, 5, 5) for x in range(num_balls)]
a = 0
active_balls = []


def setup():

    size(w, h)
    background(127)
    smooth()
    noStroke()


def draw():
    global balls, active_balls, a
    background(127)

    if a < num_balls:
        if not frameCount % 10:
            active_balls.append(balls[a])
            a += 1

    print(len(active_balls), a)
    for b in active_balls:
        b.move()
        b.display()
