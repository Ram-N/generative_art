BASE_SIDE = 400
HALF_BASE = BASE_SIDE / 2.0
GUTTER = 0
TUMBLER_SIDE = BASE_SIDE / 2.0 + GUTTER
WIDTH, HEIGHT = 900, 900


def equi_triangle(side, angles):
    """ Draws a triangle centerd at 0,0"""
    a1, a2 = angles[0], angles[1]
    x1, y1 = side * cos(a1), side * sin(a1)
    x2, y2 = side * cos(a2), side * sin(a2)
    stroke(20)
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
        WIDTH / 2.0 - HALF_BASE * sin(PI / 6.0) - GUTTER,
        HEIGHT / 4.0 + HALF_BASE * cos(PI / 6.0),
    ),
    (WIDTH / 2, HEIGHT / 4.0),
]


def render_tumblers(rot_step):

    for t in range(2):
        pushMatrix()
        translate(pivot_points[t][0], pivot_points[t][1])
        angles = [2 / 3.0 * PI, PI]
        rotate(rot_step / 360.0 * TAU * (t + 1))
        equi_triangle(TUMBLER_SIDE, angles)
        popMatrix()


def setup():
    size(WIDTH, HEIGHT)
    background(128)


def draw():
    background(128)
    draw_base_shape(0, 0, side=BASE_SIDE)
    fper = frameCount % 60  # Rotation completes in 60 frames
    rot_step = fper * (120 / 60.0)
    render_tumblers(rot_step)
