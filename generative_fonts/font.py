from bezier_sketch import render_outline, render_letter_top
from bezier_sketch import render_letter_base


def get_cell_gridlines(cell_x, cell_y, fw, fh, margin, _sq=8):

    gx, gy = [], []

    for s in range(_sq + 1):
        gx.append(cell_x + margin + (fw / _sq * s))
        gy.append(cell_y + margin + (fh / _sq * s))
    return gx, gy


def draw_cell_gridlines(cell_x, cell_y, gx, gy, sq=8):

    for s in range(sq + 1):
        line(gx[s], gy[0], gx[s], gy[sq])  # verts
        line(gx[0], gy[s], gx[sq], gy[s])  # horiz


class FontGrid:

    """Represents a rectangular grid on the screen.
    
    It has a list of font_letters in its alphabet
    And there is a rectangle (a bounding box) for the grid, since it has to be rendered in the xy plane
    
    """

    def __init__(
        self, num_rows, num_cols, canvas_width, canvas_height, xstart=0, ystart=0
    ):

        self.num_rows = num_rows
        self.num_cols = num_cols
        self.alphabet = []
        self.nw_corners = []
        self.letter_width = (canvas_width - (2 * xstart)) / num_cols
        self.letter_height = (canvas_height - (2 * ystart)) / num_rows
        self.grid_xmargin = xstart
        self.grid_ymargin = ystart

        letw = self.letter_width
        leth = self.letter_height

        # Create letter-forms
        id = 0
        for row in range(num_rows):
            for col in range(num_cols):
                cx, cy = (xstart + col * letw, ystart + leth * row)
                letter = Letter(cx, cy, letw, leth, id)
                letter.row, letter.col = row, col  # position of this particular letter
                letter.gx, letter.gy = get_cell_gridlines(cx, cy, letw, leth, margin=0)

                self.alphabet.append(letter)
                self.nw_corners.append((cx, cy))
                id += 1

    def render_grid_border(self):
        rectMode(CORNER)
        print(
            self.grid_xmargin, self.grid_ymargin, self.letter_height, self.letter_width
        )
        for row in range(self.num_rows):
            lstart_y = self.grid_ymargin + row * self.letter_height
            for col in range(self.num_cols):
                lstart_x = self.grid_xmargin + col * self.letter_width
                rect(lstart_x, lstart_y, self.letter_width, self.letter_height)

        print(lstart_x, lstart_y)

    def render_letters(self, show_gridlines=False):
        for l in self.alphabet:
            l.render()
            if show_gridlines:
                l.render_gridlines()


class Letter(object):
    def __init__(self, _x, _y, _width, _height, _id):
        self.x, self.y = _x, _y
        self.id = _id
        self.width = _width
        self.height = _height

    def render(self):
        # x,y is the top left corner (NW corner)
        shp_opt = generate_base()
        xoffset = self.x + self.width / 2
        yoffset = self.y + self.height * 3 / 4
        # render_element("base", shp_opt, xoffset, yoffset, self.width, self.height)
        noFill()
        st, end, _dir = render_outline(self.x, self.y, self.gx, self.gy)
        render_letter_top(st, end, _dir, self.gx, self.gy)
        render_letter_base(st, end, _dir, self.gx, self.gy)

    def render_gridlines(self):
        gx, gy = get_cell_gridlines(
            self.x, self.y, self.width, self.height, margin=0, _sq=8
        )
        draw_cell_gridlines(self.x, self.y, gx, gy)


class Font(object):
    def __init__(self, _id, _x, _y, _vx=0, _vy=0, _radius=10, _colornum=0, _launch=0):
        self.x, self.y = _x, _y
        self.vx, self.vy = _vx, _vy
        self.id = _id
        # store the starting coords of each ball. For relaunching.
        self.startx, self.starty = _x, _y
        self.active = False
        self.radius = _radius
        self.color = _colornum
        self.prev_collision = -3  # frameCount when the collision occurred
        self.launch = _launch  # frameCount for ball to make its first appearance?

    def create(self):
        """
        Get the new letter of the alphabet.
        Outline, Interior, top and base
        """
        self.baseshape = generate_base()  # a key that refers to the shape


def generate_base():
    """
    Choices are: 
        S1: simple rect/square
        T1: Simple triangle
        T2: two triangles
        TC: Curved Triangle
        2R: Two roots
        RR: Right root
        LR: Left root
    """
    _opts1 = ["S1", "T1", "T2", "TC", "R2", "RR", "RL"]
    _opts2 = ["fill", "nofill"]
    rnd1 = int(random(len(_opts1)))
    rnd2 = int(random(len(_opts2)))

    return (_opts1[rnd1], _opts2[rnd2])


def render_element(shape_kind, shape_option, x, y, letw, leth):

    base_width = 10
    base_height = 10

    if shape_kind == "base":
        if shape_option[1] == "fill":
            fill(0)
        if shape_option[1] == "nofill":
            noFill()

        if shape_option[0] == "S1":  # simple rectangle
            rectMode(CENTER)
            rect(x, y, base_width, base_width)
        if shape_option[0] == "T1":  # single Triangle
            triangle(
                x, y, x - base_width, y + base_height, x + base_width, y + base_height
            )
        if shape_option[0] == "T2":  # Two Triangles
            for x_elem in [x - (letw / 4), x + letw / 4]:
                triangle(
                    x_elem,
                    y,
                    x_elem - base_width,
                    y + base_height,
                    x_elem + base_width,
                    y + base_height,
                )


def get_grid_centers(fg):
    """ get the center x and y coords for each hexagon as a list of (x,y)"""
    return [(letter.x, letter.y) for letter in fg.alphabet]
