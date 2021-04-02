"""
Updated: 2021-02-03
"""


def nested_L(cx, cy, cw, ch, numL, orientation=0, _colors=None):

    pushMatrix()
    translate(cx, cy)
    rotate(orientation * PI / 2)
    translate(-cw / 2, -ch / 2)  # go to nx, ny
    xstep, ystep = cw / numL, ch / numL
    cstep = 250 / numL  # color_step if B&W
    for l in range(numL):
        lw, lh = (numL - l) * xstep, (numL - l) * ystep
        if _colors is None:
            fill(250 - cstep * l)
        else:
            fill(_colors[l % len(_colors)])
        rect(xstep * l, 0, lw, lh)

    popMatrix()


def nested_squares(cx, cy, cw, ch, num_sq, orientation=0, _colors=None):

    pushMatrix()
    translate(cx, cy)
    rotate(orientation * PI / 2)
    translate(-cw / 2, -ch / 2)  # go to nx, ny
    xstep, ystep = cw / 2 / num_sq, ch / 2 / num_sq
    cstep = 250 / num_sq  # color_step if B&W
    for l in range(num_sq):
        lw, lh = (num_sq - l) * xstep * 2, (num_sq - l) * ystep * 2
        if _colors is None:
            fill(250 - cstep * l)
        else:
            fill(_colors[l % len(_colors)])
        rect(xstep * l, ystep * l, lw, lh)

    popMatrix()


def rhombus(x, y, orientation=0, hw=1):
    """
        Draws a Rhombus with one vertex at x,y.. and of 3 (6) possible orientations
    """
    pushMatrix()
    translate(x, y)

    hh = hw / 0.866  # w/(sqrt(3)/2)
    rotate(orientation * TWO_PI / 6)

    center = (0, 0)
    v0, v1 = (hw, -hh / 2), (hw, hh / 2)
    v2, v3 = (0, hh), (-hw, hh / 2)
    v4, v5 = (-hw, -hh / 2), (0, -hh)

    vers1 = [center, v0, v1, v2]
    vers2 = [center, v2, v3, v4]
    vers3 = [center, v4, v5, v0]

    #    vers = [v0, v1, v2, v3, v4, v5]
    ellipse(0, 0, 10, 10)

    beginShape()
    for v in vers3:
        vertex(v)
    endShape(CLOSE)

    popMatrix()


def hexagon(x, y, orientation=0, hw=1):
    """
    current default is a pointy-topped Hexagon of side hw
    """
    pushMatrix()
    translate(x, y)

    hh = hw / 0.866  # w/(sqrt(3)/2)
    rotate(orientation * TWO_PI / 6)

    center = (0, 0)
    v0, v1 = (hw, -hh / 2), (hw, hh / 2)
    v2, v3 = (0, hh), (-hw, hh / 2)
    v4, v5 = (-hw, -hh / 2), (0, -hh)

    vers1 = [center, v0, v1, v2]
    vers2 = [center, v2, v3, v4]
    vers3 = [center, v4, v5, v0]

    vers = [v0, v1, v2, v3, v4, v5]
    ellipse(0, 0, 10, 10)

    beginShape()
    for v in vers:
        vertex(v)
    endShape(CLOSE)

    popMatrix()


# part of circle packing
def get_radius(
    x,
    y,
    circles,
    panel_x,
    panel_y,
    window_width,
    window_height,
    min_radius,
    max_radius,
    min_gap=1,
):
    """

    x,y: xy coord in consideration
    circles: already generated

    MAX_RADIUS is the largest circle
    MIN_RAD is teh smallest. Anything less and xy is abandoned
    MIN_GAP is the minimum number of pixels between two circles

    """
    radius = max_radius

    # check against the 4 walls
    min_d = (
        min(
            x - panel_y,
            y - panel_y,
            panel_x + window_width - x,
            panel_y + window_height - y,
        )
        - min_gap
    )
    if min_d < min_radius:
        return 0
    if min_d < radius:
        radius = min_d

    # check against all other circles
    for c in circles:
        d = dist(x, y, c.x, c.y)
        if d < c.radius + min_radius + min_gap:
            return 0
        if d < radius + c.radius + min_gap:
            radius = d - c.radius - min_gap

    return radius


NUM_ATTEMPTS = 1000


def circle_pack(
    panel_x, panel_y, window_width, window_height, min_radius, max_radius, min_gap=1
):
    """
    Pack many circles inside a given rectangular box.
    cx, cy = box center

    NUM_ATTEMPTS is the number of xy attempts before abandoning
    """
    circles = []
    done, failed = 0, 0
    print(window_height, window_width)
    while not done:
        x, y = random(window_width), random(window_height)
        real_x, real_y = x + panel_y, y + panel_y
        radius = get_radius(
            real_x,
            real_y,
            circles,
            panel_x,
            panel_y,
            window_width,
            window_height,
            min_radius,
            max_radius,
            min_gap=min_gap,
        )
        if radius:
            p = PVector(real_x, real_y)
            p.radius = radius
            circles.append(p)
            failed = 0
        else:
            failed += 1  # keep track of num failures

        if failed > NUM_ATTEMPTS:
            done = 1

    return circles

