w, h = 800, 800

from ball import Ball


h_waves = 8
h_margin = 0
num_hset = 2  # Num Balls in a horizontal wave
sep = 100

CROSSING_BUFFER = 10
v_waves = 8
v_margin = 0
num_vset = 2  # Num Balls in a vertical wave

num_dia = 8  # Num balls in Diagonal 1  - SW to NE
num_rhomballs = 8  # Num Balls in the rhombus

speed = 4

balls = []
bounceballs = []


jbx = (0.25, 0.25, 0.75, 0.75)
jby = (0.75, 0.25, 0.25, 0.75)


def get_junctions():
    # rhombus and diagonals intersect:
    juncs = []
    for j in range(4):
        juncs.append((jbx[j] * w, jby[j] * h))

    return juncs


def get_close_encounters(jj, occ_list):
    """
    Are the balls crossing too close?

    Logic: traverse the list two at a time. If teh occupied difference is less than epsilon
    store it.
    """

    for idx, occ in enumerate(occ_list[:-1]):
        time_diff = occ_list[idx + 1][0] - occ[0]
        if time_diff < CROSSING_BUFFER:
            print("TOO CLOSE!", jj, occ, occ_list[idx + 1])


def compute_junction_availability(junctions, balls, bounceballs):

    juncs = get_junctions()
    for jn in juncs:
        junctions[jn] = {}

    dia_dist_offset = (0, 0, 0, 0)
    # this is the extra distance each ball has to travel
    # to get to the junction in question
    bounce_dist_offset = (0, 0, w, 0)

    for jb in [0, 2]:  # take care of the junction in the forward diagonal
        jn = juncs[jb]  # ... dia-balls will hit it.
        junctions[jn]["occupied"] = []

        for b in balls:
            circuit_time = (w) / b.vx
            print(jn, b.id, b.launch)
            xd = abs(b.x - jn[0]) + dia_dist_offset[jb]
            for circs in range(3):
                junctions[jn]["occupied"].append(
                    (b.launch + xd / b.vx + circs * circuit_time, b.id)
                )

        for b in bounceballs:
            circuit_time = 2 * w / b.vx
            print("bounce", jn, b.id, b.launch)
            xd = abs(b.x - jn[0]) + bounce_dist_offset[jb]
            for circs in range(3):
                junctions[jn]["occupied"].append(
                    (b.launch + xd / b.vx + circs * circuit_time, b.id)
                )

    # sort all the junction occupied times
    for jj in junctions.keys():
        if "occupied" in junctions[jj]:
            junctions[jj]["occupied"].sort()
            # are any of the balls crossing too close?
            get_close_encounters(jj, junctions[jj]["occupied"])

    return junctions


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


# for wave in range(h_waves):
#     for id in range(num_hset):
#         balls.append(
#             Ball(
#                 _id=wave * num_hset + id,
#                 _x=sep + id * (w - 2 * sep),
#                 _y=h,
#                 _vx=0,
#                 _vy=-1 * speed,
#                 _radius=10,
#                 _launch=sep / speed * wave,
#             )
#         )

taken = len(balls)
print(taken, "before vballs")
launch_offset = sep / speed / 2
# for wave in range(v_waves):
#     vert_wave = [
#         Ball(
#             _id=taken + wave * num_vset + id,
#             _x=0,
#             _y=sep + id * (h - 2 * sep),
#             _vx=speed,
#             _vy=0,
#             _radius=10,
#             _launch=int(launch_offset + sep / speed * wave),
#             _colornum=-2,
#         )
#         for id in range(num_vset)
#     ]
#     balls.extend(vert_wave)

taken = len(balls)
dia1 = [
    Ball(
        _id="dia1_" + str(id),
        _x=0,
        _y=h,
        _vx=speed,
        _vy=-speed,
        _radius=15,
        _launch=int(launch_offset + id * sep / speed),
        _colornum=0,
    )
    for id in range(num_dia)
]

balls.extend(dia1)


taken = len(balls)
print(taken, "taken before rhomballs", len(balls))

rhomballs = [
    Ball(
        _id="bounce_" + str(id),
        _x=w / 2,
        _y=0,
        _vx=speed,
        _vy=speed,
        _radius=15,
        _launch=int(50 * id),
        _colornum=2,
    )
    for id in range(num_rhomballs)
]

print(len(rhomballs))
bounceballs = rhomballs

junctions = {}


def setup():
    global junctions
    size(w, h)
    background(255)
    smooth()
    noStroke()

    junctions = compute_junction_availability(junctions, balls, bounceballs)


def draw():
    # noLoop()
    global balls
    background(255)
    # display_grid_points(
    #     h_margin, v_margin, num_rows=num_vset, num_cols=num_vset, sep=sep
    # )
    # display_grid_squares(
    #     h_margin, v_margin, num_rows=num_vset, num_cols=num_vset, sep=sep
    # )

    for b in balls:
        if frameCount > b.launch:
            b.move_warp()
            b.display()

    for b in bounceballs:
        if frameCount > b.launch:
            b.move()
            b.display()

    saveFrame("images/bounce5_###.jpg")

    if frameCount > 1000:
        noLoop()

        print(frameCount)
        noLoop()

        for b in balls:
            print(b.id, b.launch)

        for b in bounceballs:
            ball_index = b.id
            print(b.id, b.launch)

