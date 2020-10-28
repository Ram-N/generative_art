from rn_utils import choose_one

dot_sep = 80
jn_per_dot = 5
dot_size = 7  # how big is each dot
jn_px = 3  # how big is each jn point
cover_size = 2
MODIFIER = 0.75

COVER_SIZE = ["narrow", "full"]
COVER_C = ["1C", "2C", "4D", "IC"]
COVER_D = ["1D", "2D", "4C", "ID"]
CARDINAL = ["N", "E", "S", "W"]
DIAGONAL = ["NW", "NE", "SE", "SW"]

# pixel separation between 2 junctions
jnp = dot_sep / (jn_per_dot - 1)

# This dict has the 45degree multiples for rotations, based on the Direction
direction_dict = {
    "2C": {"N": 0, "E": 2, "S": 4, "W": 6},
    "2D": {"NE": 0, "SE": 2, "SW": 4, "NW": 6},
    "1C": {"W": 2, "N": 4, "E": 6, "S": 0},
    "1D": {"SW": 0, "NW": 2, "NE": 4, "SE": 6},
    "4C": {"SW": 0, "NW": 0, "NE": 0, "SE": 0},
    "4D": {"W": 0, "N": 0, "E": 0, "S": 0},
    "IC": {"W": 2, "N": 0, "E": 2, "S": 0},
    "ID": {"NE": 0, "NW": 2, "SE": 2, "SW": 0},
}
ROTATIONS = [(1, 1), (1, -1), (-1, 1), (-1, -1)]


class Point(object):
    """A Point in the kolam plane is either a DOT or a Junction."""

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

    def render_cell_border(self):  # for each DOT
        """Define a fine grid around each dot"""
        # rectMode(CORNER)
        # print(
        #     self.grid_xmargin, self.grid_ymargin, self.letter_height, self.letter_width
        # )
        noFill()
        stroke(0, 244, 0)
        cx = self.x - dot_sep / 2
        cy = self.y - dot_sep / 2
        rect(cx, cy, dot_sep, dot_sep)

    # define all types of junctions for each dot
    # shared jns. Unique jns.

    def cover(self, style, _dir, _size):
        """Go to single dot and draw per directions"""

        # print(self.x, self.y)
        strokeWeight(3)
        stroke(250)

        pushMatrix()
        noFill()
        translate(self.x, self.y)
        render_cover(style, _dir, cover_size, jnp, _size=_size)
        popMatrix()


def mark_points(n, sep_pix, _isdot):
    """ Points (dots or jns) get created here, with their pos and coords set. """

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
            offset = 0
            xx = m * (jn_per_dot - 1) + 1
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

    """GridPattern is made up of dots and jns. Typically, we 
       only draw the dots and show the jn connections."""

    def __init__(self, dot_pattern="square", num_seq=None):

        self.total = 10  # ununsed but available
        # 5,1, 2 means start with 5, go down to 1, in steps of -2
        # n1, n2, step
        self.dots = []
        self.jns = []

        n = num_seq[0]

        if dot_pattern == "square":
            self.dots = mark_points(n, dot_sep, _isdot=True)
            self.jns = mark_points(n, jnp, _isdot=False)

    def render_axis(self):
        midx = int(self.jns[0].x + self.jns[-1].x / 2)
        line(0, self.jns[0].y, 0, self.jns[-1].y)

    def render_dots(self, show_cell_border=False):
        fill(255)
        for rx, ry in ROTATIONS:
            pushMatrix()
            scale(rx, ry)
            for dt in self.dots:
                ellipse(dt.x, dt.y, dot_size, dot_size)
                if show_cell_border:
                    dt.render_cell_border()
            popMatrix()

    def render_jns(self):
        fill(255, 200, 100)

        for rx, ry in ROTATIONS:
            pushMatrix()
            scale(rx, ry)
            for jn in self.jns:
                ellipse(jn.x, jn.y, jn_px, jn_px)
            popMatrix()

    def render_kolam(self, kolam_pattern, _reflection=True):

        kpc = kolam_pattern["covers"]

        if _reflection:
            for rx, ry in ROTATIONS:
                pushMatrix()
                scale(rx, ry)
                for idx, dt in enumerate(self.dots):
                    # print(dt.posx, dt.posy)
                    dt.cover(kpc[idx][0], kpc[idx][1], kpc[idx][2])
                popMatrix()
        else:
            for idx, dt in enumerate(self.dots):
                # print(dt.posx, dt.posy)
                dt.cover(kpc[idx][0], kpc[idx][1], kpc[idx][2])


def get_random_kolam_pattern(dots_in_quarter):

    kolam_pattern = {}
    kd = []

    for d in range(dots_in_quarter):
        _cv = choose_one(COVER_C)
        _dir = choose_one(CARDINAL)
        _size = choose_one(COVER_SIZE)
        kd.append((_cv, _dir, _size))
    kolam_pattern["covers"] = kd

    return kolam_pattern


def bottom_line(cover_size, jnp):
    line(-cover_size * jnp, cover_size * jnp, cover_size * jnp, cover_size * jnp)


def top_line(cover_size, jnp):
    line(-cover_size * jnp, -cover_size * jnp, cover_size * jnp, -cover_size * jnp)


def west_line(cover_size, jnp):
    line(-cover_size * jnp, -cover_size * jnp, -cover_size * jnp, cover_size * jnp)


def east_line(cover_size, jnp):
    line(cover_size * jnp, -cover_size * jnp, cover_size * jnp, cover_size * jnp)


def sw_line(cover_size, jnp, _narrow_A=True, _narrow_B=False):
    """A is South and B is West"""
    mod_A = MODIFIER if _narrow_A else 1
    mod_B = MODIFIER if _narrow_B else 1
    line(0, cover_size * jnp * mod_A, -cover_size * jnp * mod_B, 0)


def se_line(cover_size, jnp, _narrow_A=True, _narrow_B=False):
    """A is South and B is East"""
    mod_A = MODIFIER if _narrow_A else 1
    mod_B = MODIFIER if _narrow_B else 1
    line(0, cover_size * jnp * mod_A, cover_size * jnp * mod_B, 0)


def ne_line(cover_size, jnp, _narrow_A=True, _narrow_B=False):
    """A is North and B is East"""
    mod_A = MODIFIER if _narrow_A else 1
    mod_B = MODIFIER if _narrow_B else 1
    line(0, -cover_size * jnp * mod_A, cover_size * jnp * mod_B, 0)


def nw_line(cover_size, jnp, _narrow_A=True, _narrow_B=False):
    """A is North and B is West"""
    mod_A = MODIFIER if _narrow_A else 1
    mod_B = MODIFIER if _narrow_B else 1
    line(0, -cover_size * jnp * mod_A, -cover_size * jnp * mod_B, 0)


def render_cover(style, _dir, cover_size, jnp, _size):
    """Cover a single dot per instructions
    
        _size: full or Narrow
    
    """
    if style in direction_dict:
        rotate(PI / 4 * direction_dict[style][_dir])

    if style == "4D":
        _narrow = True if _size == "narrow" else False
        ne_line(cover_size, jnp, _narrow, _narrow)
        nw_line(cover_size, jnp, _narrow, _narrow)
        se_line(cover_size, jnp, _narrow, _narrow)
        sw_line(cover_size, jnp, _narrow, _narrow)

    if style == "4C":
        _narrow = True if _size == "narrow" else False
        bottom_line(cover_size, jnp)
        top_line(cover_size, jnp)
        west_line(cover_size, jnp)
        east_line(cover_size, jnp)

    if style == "2C":
        _narrow = True if _size == "narrow" else False

        line(-cover_size * jnp, 0, -cover_size * jnp, cover_size * jnp)
        line(cover_size * jnp, 0, cover_size * jnp, cover_size * jnp)
        bottom_line(cover_size, jnp)
        bezier(
            -cover_size * jnp,
            0,
            0,
            -cover_size * jnp,
            0,
            -cover_size * jnp,
            cover_size * jnp,
            0,
        )

    if style == "2D":  # base image has rounded NE
        _narrow = True if _size == "narrow" else False
        sw_line(cover_size, jnp, False, False)  # full line, center to mid
        # nw_line(cover_size, jnp, _narrow, False)
        # se_line(cover_size, jnp, False, _narrow)

        modifier = (MODIFIER * 1.5) if _narrow else 1
        bezier(
            -cover_size * jnp,
            0,
            0,  # cover_size * jnp * modifier,
            -cover_size * jnp * modifier,
            cover_size * jnp * modifier,
            0,  # -cover_size * jnp * modifier,
            0,
            cover_size * jnp,
        )

    if style == "1D":  # one sharp corner, diagonal
        _narrow = True if _size == "narrow" else False

        west_line(cover_size, jnp)
        bottom_line(cover_size, jnp)
        bezier(
            -cover_size * jnp,
            0,
            0,
            -cover_size * jnp,
            cover_size * jnp,
            0,
            0,
            cover_size * jnp,
        )

    if style == "1C":  # one sharp corner, Cardinal. Base has rounded North
        _narrow = True if _size == "narrow" else False
        modifier = MODIFIER if _narrow else 1
        sw_line(cover_size, jnp, False, _narrow)
        se_line(cover_size, jnp, False, _narrow)
        bezier(
            -cover_size * jnp * modifier,
            0,
            0,
            -cover_size * jnp,
            0,
            -cover_size * jnp,
            cover_size * jnp * modifier,
            0,
        )

    if style == "IC":  # two sharp corners, Cardinal. Base is along N-S axis
        _narrow = True if _size == "narrow" else False
        modifier = MODIFIER if _narrow else 1
        bezier(
            0,
            -cover_size * jnp,
            -cover_size * jnp * modifier,
            0,
            -cover_size * jnp * modifier,
            0,
            0,
            cover_size * jnp,
        )
        bezier(
            0,
            -cover_size * jnp,
            cover_size * jnp * modifier,
            0,
            cover_size * jnp * modifier,
            0,
            0,
            cover_size * jnp,
        )

    if style == "ID":  # two sharp corners, Cardinal. Base is along SW-NE axis
        _narrow = True if _size == "narrow" else False
        modifier = MODIFIER if _narrow else 1
        bezier(
            -cover_size * jnp,
            cover_size * jnp,
            -cover_size * jnp * modifier,
            0,
            0,
            -cover_size * jnp * modifier,
            cover_size * jnp,
            -cover_size * jnp,
        )

        bezier(
            -cover_size * jnp,
            cover_size * jnp,
            0,
            cover_size * jnp * modifier,
            cover_size * jnp * modifier,
            0,
            cover_size * jnp,
            -cover_size * jnp,
        )
