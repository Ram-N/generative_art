cols = ["#4a4e4d", "#0e9aa7", "#3da40b", "#f6cd61", "#fe8a71", "#ff0367"]

BASE_SIDE = 400
HALF_BASE = BASE_SIDE / 2.0
GUTTER = 0
TUMBLER_SIDE = HALF_BASE + GUTTER
WIDTH, HEIGHT = 900, 900
PI_30 = PI / 6.0
PI_60 = PI / 3.0
PI_120 = PI * 2 / 3.0
PI_240 = PI_120 * 2

# frames per rotation cycle. If 100, the tumbler will rotate in 100 frames.
FPCYLE = 60 * 1.0
DEGREES_TO_TUMBLE = 120.0

# These are the angles for the 6 tumblers
starting_angles = [0, 0, PI_120, PI_120, PI_240, PI_240]


def equi_triangle(side, angles, colr=0):
    """ Draws a triangle centered at 0,0 of length side"""
    a1, a2 = angles[0], angles[1]
    x1, y1 = side * cos(a1), side * sin(a1)
    x2, y2 = side * cos(a2), side * sin(a2)
    stroke(colr)
    strokeWeight(5)
    triangle(0, 0, x1, y1, x2, y2)


def draw_base_shape(x, y, side):
    pushMatrix()
    translate(width / 2, height / 4.0)
    angles = [PI / 3.0, 2 / 3.0 * PI]
    equi_triangle(side, angles)
    popMatrix()


pivot_points = [
    (
        WIDTH / 2.0 - HALF_BASE * cos(PI_60) - GUTTER,
        HEIGHT / 4.0 + HALF_BASE * sin(PI_60),
    ),  # p0
    (WIDTH / 2.0, HEIGHT / 4.0),  # p1
    (
        WIDTH / 2.0 + HALF_BASE * cos(PI_60) + GUTTER,
        HEIGHT / 4.0 + HALF_BASE * sin(PI_60),
    ),  # p2
    (
        WIDTH / 2.0 + BASE_SIDE * cos(PI_60) + GUTTER,
        HEIGHT / 4.0 + BASE_SIDE * sin(PI_60),
    ),  # p3
    (WIDTH / 2.0, HEIGHT / 4.0 + BASE_SIDE * sin(PI_60)),  # p4
    (
        WIDTH / 2.0 - BASE_SIDE * cos(PI_60) - GUTTER,
        HEIGHT / 4.0 + BASE_SIDE * sin(PI_60),
    ),  # p5
]


def render_pivot_points():
    fill(255, 0, 0)
    noStroke()
    for px, py in pivot_points:
        ellipse(px, py, 10, 10)
    noFill()  # reset
    stroke(0)


def render_tumblers(rot_step):
    global shift

    fper = frameCount % FPCYLE  # Single tumble completes in 60 frames
    if not fper:
        shift += 1

    for t in range(6):
        pushMatrix()
        translate(pivot_points[t][0], pivot_points[t][1])
        angles = [PI_120 + starting_angles[t], PI + starting_angles[t]]
        accel = 2 if (t % 2) else 1  # 1,3,5 get double
        rotate(rot_step / 360.0 * TAU * accel)
        # print("T", t, (t + len(cols) + shift))
        # This is a hack to trick the human eye
        # After each tumble, I shift the colors of all the tumblers by 1.
        # Whenever teh "shift" flag is incremented, the colors 'jump' forward
        # Negative numbers are impervious to the modulo operator
        # so even as shift grows, we are fine.
        colr = cols[(t - shift) % len(cols)]
        equi_triangle(TUMBLER_SIDE, angles, colr)
        popMatrix()
    stroke(0)


def setup():
    size(WIDTH, HEIGHT)


shift = 0


def draw():
    global shift
    background(250)
    render_pivot_points()
    draw_base_shape(0, 0, side=BASE_SIDE)
    fper = frameCount % FPCYLE  # Single tumble completes in 60 frames
    rot_step = fper / FPCYLE * DEGREES_TO_TUMBLE
    render_tumblers(rot_step)
    saveFrame("images/colored###.png")

    if frameCount > FPCYLE * 6:
        noLoop()

