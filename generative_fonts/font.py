class FontGrid:

    """Represents a rectangular grid on the screen.
    
    It has a list of font_letters in its alphabet
    And there is a rectangle (a bounding box) for the grid, since it has to be rendered in the xy plane
    
    """

    def __init__(
        self,
        num_rows,
        num_cols,
        canvas_width,
        canvas_height,
        size=1,
        xstart=0,
        ystart=0,
    ):

        self.num_rows = num_rows
        self.num_cols = num_cols
        self.letter_size = size
        self.alphabet = []
        self.centers = []
        self.letter_width = (canvas_width - (2 * xstart)) / num_cols
        self.letter_height = (canvas_height - (2 * ystart)) / num_rows
        self.xmargin = xstart
        self.ymargin = ystart

        xdist = self.letter_width
        ydist = self.letter_height
        letw = self.letter_width
        leth = self.letter_height

        id = 0
        for row in range(num_rows):
            for col in range(num_cols):
                cx, cy = (xstart + col * xdist, ystart + ydist * row)
                letter = Letter(cx, cy, letw, leth, id)
                letter.row, letter.col = row, col
                self.alphabet.append(letter)
                self.centers.append((cx, cy))
                id += 1

    def render_letters(self):
        for l in self.alphabet:
            l.render()

    def render_grid_border(self, v_pairs=None, **kwargs):

        for row in range(self.num_rows):
            lstart_y = self.ymargin + row * self.letter_height
            for col in range(self.num_cols):
                lstart_x = self.xmargin + col * self.letter_width
                rect(lstart_x, lstart_y, self.letter_width, self.letter_height)


def get_hexgrid_centers(fg):
    """ get the center x and y coords for each hexagon as a list of (x,y)"""
    return [(letter.x, letter.y) for letter in fg.alphabet]


class Letter(object):
    def __init__(self, _x, _y, _width, _height, _id):
        self.x, self.y = _x, _y
        self.id = _id
        self.width = _width
        self.height = _height

    def generate(self):
        a = 10

    def render(self):
        # x,y is the top left corner (NW corner)
        xoffset = self.x + self.width / 2
        yoffset = self.y + self.height / 2
        shp_opt = generate_base()
        render_element("base", shp_opt, xoffset, yoffset)


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
    _opts2 = ["Fill", "NoFill"]
    rnd1 = int(random(len(_opts1)))
    rnd2 = int(random(len(_opts2)))

    return (_opts1[rnd1], _opts2[rnd2])


def render_element(shape_kind, shape_option, x, y):

    base_width = 10

    if shape_kind == "base":
        if shape_option[0] == "S1":  # simple rectangle
            rectMode(CENTER)
            rect(x, y, base_width, base_width)
