# Piet Mondrian Color Palette
BLACK = (0, 0, 0)
MOND_WHITE = (223, 224, 236)
MOND_RED = (162, 45, 40)
MOND_BLUE = (38, 71, 124)
MOND_YELLOW = ((240, 217, 92),)

RED, GREEN = (255, 0, 0), (0, 255, 0)
BLUE, BLACK = (0, 0, 255), (0, 0, 0)
PURPLE, CYAN, YELLOW = (255, 0, 255), (0, 255, 255), (255, 255, 0)
ORANGE = (255, 150, 0)
ROSE, TEAL = (255, 102, 204), (0, 128, 128)
COLORS = [
    MOND_WHITE,
    CYAN,
    ORANGE,
    BLUE,
    TEAL,
    GREEN,
    BLACK,
    PURPLE,
    RED,
    YELLOW,
    ROSE,
    BLACK,
] * 10

DARKS = [MOND_BLUE, BLUE, BLACK, GREEN, TEAL, PURPLE] * 10
BRIGHT = [RED, YELLOW, ROSE, ORANGE, MOND_WHITE] * 10
REORYE = [RED, YELLOW, ORANGE]


# typically choose_one of the following
PALETTES = [COLORS, DARKS, BRIGHT, REORYE]
