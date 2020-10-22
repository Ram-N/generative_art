dot_sep = 80
jnp = dot_sep / 4
dot_size = 7
jn_px = 3
COVER_SIZE = 2


class Point(object):
    def __init__(self, _posx, _posy, x, y, _isdot):
        """ position is dot index
            x,y are the cartesian coords of the dot
        """
        self.posx = _posx
        self.posy = _posy
        self.x = x  # x coord
        self.y = y  # y coord
        self.dot = _isdot  # a point can be a dot or a junction

        self.circled = False  # only dots need to be circled
        self.neighbors = []

    # define a fine grid around each dot

    # define all types of junctions for each dot
    # shared jns. Unique jns.


def mark_points(n, sep_pix, _isdot):

    pts = []
    m = n // 2
    if n % 2:  # odd
        offset = 0
        xx = m + 1
        if not _isdot:
            xx = m * 5 + 3
            m = 0
    else:  # even n
        offset = -0.5
        xx = m
        if not _isdot:
            xx = m * 5
            m = 0
    for x in range(xx):
        for y in range(xx):
            pts.append(
                Point(
                    x, y, (x - m - offset) * sep_pix, (y - m - offset) * sep_pix, _isdot
                )
            )

    return pts


class GridPattern(object):

    # GridPattern is made up of dots and jns.
    # typically, we only draw the dots
    # and show the jn connections

    def __init__(self, dot_pattern="square", num_seq=None):

        self.total = 10
        # 5,1, 2 means start with 5, go down to 1, in steps of -2
        # n1, n2, step
        self.dots = []
        self.jns = []

        n = num_seq[0]

        if dot_pattern == "square":
            self.dots = mark_points(n, dot_sep, True)
            self.jns = mark_points(n, jnp, False)

    def render_dots(self):
        fill(255)
        rots = [(1, 1), (1, -1), (-1, 1), (-1, -1)]
        for rx, ry in rots:
            pushMatrix()
            scale(rx, ry)
            for dt in self.dots:
                ellipse(dt.x, dt.y, dot_size, dot_size)
            popMatrix()

    def render_jns(self):
        fill(255, 200, 100)

        rots = [(1, 1), (1, -1), (-1, 1), (-1, -1)]
        for rx, ry in rots:
            pushMatrix()
            scale(rx, ry)
            for jn in self.jns:
                ellipse(jn.x, jn.y, jn_px, jn_px)
            popMatrix()

    def render_kolam(self, kolam_pattern):

        for idx, dt in enumerate(self.dots):
            print(dt.posx, dt.posy)
            cover_dot(dt, kolam_pattern[idx][0], kolam_pattern[idx][1])


direction_dict = {
    "2C": {"N": 0, "E": 2, "S": 4, "W": 6},
    "2D": {"NE": 0, "SE": 2, "SW": 4, "NW": 6},
    "1C": {"W": 2, "N": 4, "E": 6, "S": 0},
    "1D": {"SW": 0, "NW": 2, "NE": 4, "SE": 6},
    "4D": {"SW": 0, "NW": 0, "NE": 0, "SE": 0},
    "4C": {"W": 0, "N": 0, "E": 0, "S": 0},
}


def draw_cover(style, _dir):
    rotate(PI / 4 * direction_dict[style][_dir])

    if style == "4D":
        line(-COVER_SIZE * jnp, 0, 0, COVER_SIZE * jnp)
        line(0, COVER_SIZE * jnp, COVER_SIZE * jnp, 0)
        line(COVER_SIZE * jnp, 0, 0, -COVER_SIZE * jnp)
        line(0, -COVER_SIZE * jnp, -COVER_SIZE * jnp, 0)

    if style == "4C":
        line(-COVER_SIZE * jnp, COVER_SIZE * jnp, COVER_SIZE * jnp, COVER_SIZE * jnp)
        line(COVER_SIZE * jnp, COVER_SIZE * jnp, COVER_SIZE * jnp, -COVER_SIZE * jnp)
        line(COVER_SIZE * jnp, -COVER_SIZE * jnp, -COVER_SIZE * jnp, -COVER_SIZE * jnp)
        line(-COVER_SIZE * jnp, -COVER_SIZE * jnp, -COVER_SIZE * jnp, COVER_SIZE * jnp)

    if style == "2C":
        line(-COVER_SIZE * jnp, 0, -COVER_SIZE * jnp, COVER_SIZE * jnp)
        line(COVER_SIZE * jnp, 0, COVER_SIZE * jnp, COVER_SIZE * jnp)
        line(-COVER_SIZE * jnp, COVER_SIZE * jnp, COVER_SIZE * jnp, COVER_SIZE * jnp)
        bezier(
            -COVER_SIZE * jnp,
            0,
            0,
            -COVER_SIZE * jnp,
            0,
            -COVER_SIZE * jnp,
            COVER_SIZE * jnp,
            0,
        )

    if style == "2D":
        line(-COVER_SIZE * jnp, 0, 0, COVER_SIZE * jnp)
        line(-COVER_SIZE * jnp, 0, 0, -COVER_SIZE * jnp)
        line(0, COVER_SIZE * jnp, COVER_SIZE * jnp, 0)
        bezier(
            0,
            -COVER_SIZE * jnp,
            COVER_SIZE * jnp,
            -COVER_SIZE * jnp,
            COVER_SIZE * jnp,
            -COVER_SIZE * jnp,
            COVER_SIZE * jnp,
            0,
        )

    if style == "1D":  # one sharp corner, diagonal

        line(-COVER_SIZE * jnp, 0, -COVER_SIZE * jnp, COVER_SIZE * jnp)  # vert W wall
        line(-COVER_SIZE * jnp, COVER_SIZE * jnp, 0, COVER_SIZE * jnp)  # horiz S
        bezier(
            -COVER_SIZE * jnp,
            0,
            0,
            -COVER_SIZE * jnp,
            COVER_SIZE * jnp,
            0,
            0,
            COVER_SIZE * jnp,
        )

    if style == "1C":  # one sharp corner, Cardinal

        line(-COVER_SIZE * jnp, 0, 0, COVER_SIZE * jnp)  # W to center slope
        line(0, COVER_SIZE * jnp, COVER_SIZE * jnp, 0)  # center to E slope
        bezier(
            -COVER_SIZE * jnp,
            0,
            0,
            -COVER_SIZE * jnp,
            0,
            -COVER_SIZE * jnp,
            COVER_SIZE * jnp,
            0,
        )


def cover_dot(dot, style, _dir):

    print(dot.x, dot.y)
    strokeWeight(3)
    stroke(250)

    pushMatrix()
    noFill()
    translate(dot.x, dot.y)
    draw_cover(style, _dir)
    popMatrix()
