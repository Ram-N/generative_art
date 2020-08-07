w, h = 800, 800

from ball import Ball


h_waves = 8
h_margin = 0
num_hset = 2  # Num Balls in a horizontal wave
sep = 100

v_waves = 8
v_margin = 0
num_vset = 2  # Num Balls in a vertical wave

num_rhomballs = 4  # Num Balls in the rhombus

speed = 4

balls = []
bounceballs = []


def display_grid_squares(x_margin, y_margin, num_rows, num_cols, sep):
    """
    Display small squares around grid vertics
    """

    for row in range(num_rows):
        for col in range(num_cols):
            x = x_margin + sep * col
            y = y_margin + sep * row
            ellipse(x, y, 3, 3)
            pushMatrix()
            translate(x, y)
            noFill()
            rect(0, 0, 20, 20)
            popMatrix()


def display_grid_points(x_margin, y_margin, num_rows, num_cols, sep):
    for row in range(num_rows):
        for col in range(num_cols):
            x = x_margin + sep * col
            y = y_margin + sep * row
            ellipse(x, y, 5, 5)


# horiz balls = hwaves * num_hset = 80
# final launch = (10-1) * 30
# ycoord of 1st wave = frameCount * vy = 270*3 = 810

# vballs = [Ball(id + num_vset, w / 2, h, 0, -5) for id in range(num_vset)]

for wave in range(h_waves):
    for id in range(num_hset):
        balls.append(
            Ball(
                _id=wave * num_hset + id,
                _x=sep + id * (w - 2 * sep),
                _y=h,
                _vx=0,
                _vy=-1 * speed,
                _radius=10,
                _launch=sep / speed * wave,
            )
        )

taken = len(balls)
print(taken, "before vballs")
launch_offset = sep / speed / 2
for wave in range(v_waves):
    vert_wave = [
        Ball(
            _id=taken + wave * num_vset + id,
            _x=0,
            _y=sep + id * (h - 2 * sep),
            _vx=speed,
            _vy=0,
            _radius=10,
            _launch=int(launch_offset + sep / speed * wave),
            _colornum=-2,
        )
        for id in range(num_vset)
    ]
    balls.extend(vert_wave)

taken = len(balls)
print(taken, "taken before rhomballs", len(vert_wave), len(balls))

rhomballs = [
    Ball(
        _id=id,
        _x=w / 2,
        _y=0,
        _vx=speed,
        _vy=speed,
        _radius=10,
        _launch=int(43 * id),
        _colornum=-3,
    )
    for id in range(num_rhomballs)
]

print(len(rhomballs))
bounceballs = rhomballs


def setup():
    size(w, h)
    background(255)
    smooth()
    noStroke()
    print(balls[-10].launch, balls[-10].id)


def draw():
    global balls
    background(255)
    # display_grid_points(
    #     h_margin, v_margin, num_rows=num_vset, num_cols=num_vset, sep=sep
    # )
    # display_grid_squares(
    #     h_margin, v_margin, num_rows=num_vset, num_cols=num_vset, sep=sep
    # )

    for b in balls:
        if frameCount > balls[b.id].launch:
            b.move_warp()
            b.display()

    for b in bounceballs:
        if frameCount > b.launch:
            b.move()
            b.display()

    # saveFrame("images/test###.jpg")

    if frameCount > 500:
        noLoop()

        print(frameCount)
        noLoop()

        print(v_waves, h_waves, len(balls), taken)

        for wave in range(h_waves):
            ball_index = wave * num_hset
            print(balls[ball_index].id, balls[ball_index].launch)
        for b in bounceballs:
            ball_index = b.id
            print(b.id, b.launch)

