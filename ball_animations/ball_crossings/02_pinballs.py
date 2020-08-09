w, h = 800, 800

from ball import Ball


h_waves = 8
h_margin = 0
num_hset = 2  # Num Balls in a horizontal wave

CROSSING_BUFFER = 7
v_waves = 8
v_margin = 0
num_vset = 2  # Num Balls in a vertical wave

num_dia = 6  # Num balls in Diagonal 1  - SW to NE
num_rhomballs = 8  # Num Balls in the rhombus

speed = 4
sep = w / num_dia
rhomb_sep = 2 * w / num_rhomballs

dia1 = []
bounceballs = []


def get_junctions():
    jbx = (0.25, 0.25, 0.75, 0.75, 0.5)
    jby = (0.75, 0.25, 0.25, 0.75, 0.5)
    # rhombus and diagonals intersect:
    juncs = []
    for j in range(len(jbx)):
        juncs.append((jbx[j] * w, jby[j] * h))

    return juncs


def get_close_encounters(jj, occ_list):
    """
    Are the balls crossing too close?

    Logic: traverse the list two at a time. If teh occupied difference is less than epsilon
    store it.
    """
    coll_flag = False

    for idx, occ in enumerate(occ_list[:-1]):
        time_diff = occ_list[idx + 1][0] - occ[0]
        if time_diff < CROSSING_BUFFER:
            print("TOO CLOSE!", jj, occ, occ_list[idx + 1])
            coll_flag = True

    return coll_flag


def compute_junction_occupied_times(jn, _balls, circuit_dist, extra_x_dist, junctions):
    """

    params:

    circuit_dist:
        The distance one representative ball takes to complete the entire circuit.
    """

    jnx = jn[0]
    for b in _balls:
        circuit_time = circuit_dist / b.vx
        xd = abs(b.x - jnx) + extra_x_dist
        for circ in range(3):
            junctions[jn]["occupied"].append(
                (b.launch + xd / b.vx + circ * circuit_time, b.id)
            )
    return junctions


def compute_junction_availability(junctions, dia0, dia1, bounceballs):

    juncs = get_junctions()
    for jn in juncs:
        junctions[jn] = {}

    # this is the extra distance each ball has to travel
    # to get to the junction in question
    dia_dist_offset = (0, 0, 0, 0, 0)
    bounce_dist_offset = (0, w / 2, w, w * 3 / 2, 0)

    for jindex in [0, 2]:  # take care of the junction in the forward diagonal
        jn = juncs[jindex]  # ... dia-balls will hit it.
        junctions[jn]["occupied"] = []
        circuit_dist = w
        junctions = compute_junction_occupied_times(
            jn, dia1, circuit_dist, dia_dist_offset[jindex], junctions
        )

        circuit_dist = 2 * w  # The bounce balls travel 2w in each circuit
        junctions = compute_junction_occupied_times(
            jn, bounceballs, circuit_dist, bounce_dist_offset[jindex], junctions
        )

    # Now, let's handle junctions 1 and 3, which are on DIAGONAL 0
    for jindex in [1, 3]:  # take care of the junction in the forward diagonal
        jn = juncs[jindex]  # ... dia-balls will hit it.
        junctions[jn]["occupied"] = []
        circuit_dist = w
        junctions = compute_junction_occupied_times(
            jn, dia0, circuit_dist, dia_dist_offset[jindex], junctions
        )

        circuit_dist = 2 * w  # THe bounce balls travel 2w in each circuit

        junctions = compute_junction_occupied_times(
            jn, bounceballs, circuit_dist, bounce_dist_offset[jindex], junctions
        )

    # Next, handle junction 4 (CENTER POINT), which is for both DIAGONALS
    jindex = 4
    jn = juncs[jindex]  # ... both dia-balls will hit it.
    junctions[jn]["occupied"] = []
    circuit_dist = w
    junctions = compute_junction_occupied_times(
        jn, dia0, circuit_dist, dia_dist_offset[jindex], junctions
    )
    junctions = compute_junction_occupied_times(
        jn, dia1, circuit_dist, dia_dist_offset[jindex], junctions
    )

    # sort all the junction occupied times
    for jj in junctions.keys():
        if "occupied" in junctions[jj]:
            junctions[jj]["occupied"].sort()
            # print(jj)
            # print(junctions[jj]["occupied"])
            # print("--")
            # are any of the balls crossing too close?
            coll_flag = get_close_encounters(jj, junctions[jj]["occupied"])
            if coll_flag:
                print("Some collisions in", jj)
            else:
                print("No collisions! in ", jj)

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


dia0_launch_offset = 9
dia0 = [
    Ball(
        _id="dia0_" + str(id),
        _x=0,
        _y=0,
        _vx=speed,
        _vy=speed,
        _radius=12,
        _launch=int(dia0_launch_offset + id * sep / speed),
        _colornum=0,
    )
    for id in range(num_dia)
]


dia1_launch_offset = sep / speed / 2 + dia0_launch_offset
dia1 = [
    Ball(
        _id="dia1_" + str(id),
        _x=0,
        _y=h,
        _vx=speed,
        _vy=-speed,
        _radius=12,
        _launch=int(dia1_launch_offset + id * sep / speed),
        _colornum=1,
    )
    for id in range(num_dia)
]

bounce_launch_offset = 0
bounceballs = [
    Ball(
        _id="bounce_" + str(id),
        _x=w / 2,
        _y=0,
        _vx=speed,
        _vy=speed,
        _radius=12,
        _launch=int(rhomb_sep / speed * id + bounce_launch_offset),
        _colornum=-1,
    )
    for id in range(num_rhomballs)
]


junctions = {}


def setup():
    global junctions
    size(w, h)
    background(255)
    smooth()
    noStroke()

    junctions = compute_junction_availability(junctions, dia0, dia1, bounceballs)


def draw():
    # noLoop()
    background(100, 200, 175)
    # display_grid_points(
    #     h_margin, v_margin, num_rows=num_vset, num_cols=num_vset, sep=sep
    # )
    # display_grid_squares(
    #     h_margin, v_margin, num_rows=num_vset, num_cols=num_vset, sep=sep
    # )

    for b in dia1:
        if frameCount > b.launch:
            b.move_warp()
            b.display()

    for b in dia0:
        if frameCount > b.launch:
            b.move_warp()
            b.display()

    for b in bounceballs:
        if frameCount > b.launch:
            b.move()
            b.display()

    # saveFrame("images/bounce5_###.jpg")

    if frameCount > 1000:
        noLoop()

        print(frameCount)
        noLoop()

        for b in dia1:
            print(b.id, b.launch)

        for b in bounceballs:
            ball_index = b.id
            print(b.id, b.launch)

