from rn_utils import choose_one

dot_sep = 80
jn_per_dot = 5
dot_size = 7  # how big is each dot
jn_px = 3  # how big is each jn point
cover_size = 2
MODIFIER = 0.75

COVER_SIZE = ["narrow", "full"]
COVER_C = ["1C", "2D", "4D", "IC"]  # mid points
COVER_D = ["1D", "2C", "4C", "ID"]  # corners
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


BINARY_PATTERN = [
    "0001",
    "0010",
    "0011",
    "0100",
    "0101",
    "0110",
    "0111",
    "1000",
    "1001",
    "1010",
    "1011",
    "1100",
    "1101",
    "1110",
    "1111",
]

# binary-dictionary translate from the 4 digit code to full directions
# This is for Cardinal directions N E S W
mid_binary = {
    "0000": ("0", "0", "narrow"),
    "0001": ("1C", "W", "narrow"),
    "0010": ("1C", "S", "narrow"),
    "0100": ("1C", "E", "narrow"),
    "1000": ("1C", "N", "narrow"),
    "0011": ("2D", "NE", "any"),
    "0110": ("2D", "NW", "any"),
    "1100": ("2D", "SW", "any"),
    "1001": ("2D", "SE", "any"),
    "1010": ("IC", "N", "any"),
    "0101": ("IC", "E", "any"),
    "1101": ("1C", "N", "full"),
    "1110": ("1C", "E", "full"),
    "0111": ("1C", "S", "full"),
    "1011": ("1C", "W", "full"),
    "1111": ("4D", "N", "full"),
}


ROTATIONS = [(1, 1), (1, -1), (-1, 1), (-1, -1)]


class Cell(object):
    """A Cell in the kolam plane is the square around a DOT"""

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

    def get_neighbor(self, _dir, grid):
        """Get neighboring cell based on _dir specified"""

        if _dir.lower() not in ["n", "e", "s", "w", "up", "down", "left", "right"]:
            return None

        _dir = _dir.lower()
        px, py = self.posx, self.posy
        for dt in grid.dots:
            dx, dy = dt.posx, dt.posy
            if _dir == "n" and (px == dx) and dy == (py - 1):
                return dt
            if _dir == "s" and (px == dx) and dy == (py + 1):
                return dt
            if _dir == "w" and (py == dy) and dx == (px - 1):
                return dt
            if _dir == "e" and (py == dy) and dx == (px + 1):
                return dt

        return None

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

    def set_walls(self, cells):
        """ Sets the booleans for the walls for one dot"""

        legal, loop_count = 0, 0
        while not legal:
            loop_count += 1
            self.north = choose_one(["0", "1"])
            self.east = choose_one(["0", "1"])
            self.south = choose_one(["0", "1"])
            self.west = choose_one(["0", "1"])
            legal = 1

            if self.posx == 0:  # west wall
                self.west = "0"  # west wall cannot have a 1
            if self.posy == 0:  # west wall
                self.north = "0"  # west wall cannot have a 1

            # Set Common walls based on N and W neighbors
            north_cell = self.get_neighbor("n", cells)
            west_cell = self.get_neighbor("w", cells)
            if north_cell:  # N Wall should match N-cell's south wall
                self.north = north_cell.south
            if west_cell:  # W Wall should match W-cell's east wall
                self.west = west_cell.east

            bin_pattern = "".join([self.north, self.east, self.south, self.west])
            if bin_pattern == "0000":
                legal = 0
            if loop_count > 100:
                raise ValueError

        return bin_pattern

    def cover(self, style, _dir, _size):
        """Go to single dot and draw cover per directions"""

        # print(self.x, self.y)
        strokeWeight(3)
        stroke(250)

        pushMatrix()
        noFill()
        translate(self.x, self.y)
        render_cover(style, _dir, cover_size, jnp, _size=_size)
        popMatrix()


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
            self.dots = self.mark_points(n, dot_sep, _isdot=True)
            self.jns = self.mark_points(n, jnp, _isdot=False)

    def mark_points(self, n, sep_pix, _isdot):
        """ Cells (dots or jns) get created here.
        
          Their attributes walls, pos and coords set. 
         """

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
                cell = Cell(
                    x, y, (x - m - offset) * sep_pix, (y - m - offset) * sep_pix, _isdot
                )
                pts.append(cell)

        return pts

    def get_random_kolam_pattern(self):

        kolam_pattern = {}
        kd = []

        for d in self.dots:
            # bin_p = set_walls(d)
            # bin_p = choose_one(BINARY_PATTERN)
            bin_p = d.set_walls(self)  # use the binary code to set the walls

            _cv, _dir, _size = mid_binary[bin_p]
            if _size == "any":
                _size = choose_one(COVER_SIZE)
            kd.append((_cv, _dir, _size))
            # print(_cv, _dir, _size)

        kolam_pattern["covers"] = kd

        # print(get_binary("1", "1", "0", "1"))
        self.pattern = kolam_pattern

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

    def render_kolam(self, _reflection=True):

        kpc = self.pattern["covers"]

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


def get_binary(a, b, c, d):
    """Give 4 walls, get its binary representation string
    
    Parameters:
        a, b, c and d are 0 or 1
    """

    return "".join([a, b, c, d])

